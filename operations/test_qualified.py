import sqlite3
from qualified import dispatch
def check():
    txt=lambda v:{'type':'rich_text','rich_text':[{'plain_text':v}]}
    sel=lambda v:{'select':{'name':v}}
    p={k:txt(v) for k,v in [('Номер заявки','ABC123456789'),('ClientID','12345'),('Объект','Тест'),('Задача','Тест'),('Следующий шаг','КП')]}
    p.update({'Источник':sel('Сайт'),'Проверил':{'people':[{'id':'tester'}]},'Дата проверки':{'date':{'start':'2026-10-10T09:00:00+03:00'}}})
    page={'id':'test','properties':p}; db=sqlite3.connect(':memory:'); events=[]
    def send(payload):events.append(payload);return 42
    for value in ['На проверке','Отклонена']: 
        p['Решение']=sel(value);assert dispatch(page,db,send)=='skip'
    p['Решение']=sel('Подтверждена');p['Проверил']['people']=[];assert dispatch(page,db,send)=='skip'
    p['Проверил']['people']=[{'id':'tester'}];assert not events
    assert dispatch(page,db,send)=='uploaded'
    assert dispatch(page,db,send)=='already_reserved'
    page['id']='copy';assert dispatch(page,db,send)=='already_reserved'
    assert len(events)==1 and '12345,project_qualified,' in events[0]
    print('PASS: pending/rejected/unreviewed = 0; approved + retries + duplicate row = 1')
if __name__=='__main__':check()
