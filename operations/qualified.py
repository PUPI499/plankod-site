"""Run on a trusted manager-controlled host, outside the public website.
NOTION_TOKEN: integration with access only to the leads DB; METRIKA_TOKEN: conversion import.
QUALIFIED_LEDGER: absolute path to a persistent SQLite file shared by every run.
Never reset the ledger. Reconcile reserved rows manually after ambiguous HTTP failures.
"""
import csv, io, os, re, sqlite3, time
from datetime import datetime
import requests

SOURCE='9b0cfbd6-54b4-4164-9b17-5d3af4406f70'
COUNTER='113254722'
def field(p,k):
    v=p.get(k,{})
    return ''.join(x.get('plain_text','') for x in v.get(v.get('type'),[]) if isinstance(x,dict)).strip()
def dispatch(page,db,send):
    p=page['properties']
    select=lambda k: (p.get(k,{}).get('select') or {}).get('name')
    if select('Источник')!='Сайт' or select('Решение')!='Подтверждена' or not p.get('Проверил',{}).get('people'): return 'skip'
    if not all(field(p,k) for k in ['Объект','Задача','Следующий шаг']): return 'skip'
    key=field(p,'Номер заявки').upper(); cid=field(p,'ClientID')
    if not re.fullmatch('[A-F0-9]{12}',key) or not re.fullmatch('[0-9]{1,32}',cid): return 'skip'
    when=(p.get('Дата проверки',{}).get('date') or {}).get('start','')
    if 'T' not in when: return 'skip'
    dt=datetime.fromisoformat(when.replace('Z','+00:00'))
    if dt.tzinfo is None or dt.timestamp()>time.time(): return 'skip'
    db.execute('CREATE TABLE IF NOT EXISTS sends (request_id TEXT PRIMARY KEY, page_id TEXT UNIQUE, receipt TEXT)')
    with db:
        if not db.execute('INSERT OR IGNORE INTO sends VALUES (?,?,NULL)',(key,page['id'])).rowcount: return 'already_reserved'
    buf=io.StringIO(); w=csv.writer(buf);w.writerow(['ClientId','Target','DateTime']);w.writerow([cid,'project_qualified',int(dt.timestamp())])
    # Commit reservation before network I/O. On timeout never retry blindly.
    receipt=send(buf.getvalue())
    with db: db.execute('UPDATE sends SET receipt=? WHERE request_id=?',(str(receipt),key))
    return 'uploaded'
def main():
    ledger=os.environ['QUALIFIED_LEDGER']
    if not os.path.isabs(ledger): raise ValueError('Ledger requires a persistent absolute path')
    db=sqlite3.connect(ledger)
    headers={'Authorization':'Bearer '+os.environ['NOTION_TOKEN'],'Notion-Version':'2025-09-03'}
    auth={'Authorization':'OAuth '+os.environ['METRIKA_TOKEN']}
    def send(body):
        r=requests.post(f'https://api-metrika.yandex.net/management/v1/counter/{COUNTER}/offline_conversions/upload',headers=auth,files={'file':('qualified.csv',body,'text/csv')},timeout=30)
        r.raise_for_status();return r.json()['uploading']['id']
    query={'filter':{'property':'Решение','select':{'equals':'Подтверждена'}}}
    while True:
        r=requests.post(f'https://api.notion.com/v1/data_sources/{SOURCE}/query',headers=headers,json=query,timeout=30);r.raise_for_status();data=r.json()
        for page in data['results']:
            state=dispatch(page,db,send)
            if state=='uploaded':
                res=requests.patch('https://api.notion.com/v1/pages/'+page['id'],headers=headers,json={'properties':{'Передача':{'select':{'name':'Загружена'}}}},timeout=30);res.raise_for_status()
        if not data['has_more']: break
        query['start_cursor']=data['next_cursor']
if __name__=='__main__': main()
