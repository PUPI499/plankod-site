import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const source=readFileSync(new URL('./smart-systems.js',import.meta.url),'utf8');
assert.equal(source,readFileSync(new URL('../public/smart-systems.js',import.meta.url),'utf8'));
const goals={b2b_supply:'smart_b2b_request',equipment:'smart_equipment_request',private_home:'smart_home_request',smart_design:'smart_design_request'};
for(const [service,expectedGoal] of Object.entries(goals))for(const scenario of ['queued','rejected','unconfirmed','network']){
 const field=value=>({value,disabled:false,checked:false,addEventListener(){}});
 const fields={service:field(service),name:field('PRIVATE_NAME'),contact:field('qa@example.invalid'),company:field('PRIVATE_COMPANY'),object_type:field('Отель'),city:field('PRIVATE_CITY'),scale:field('40'),stage:field('Реконструкция'),message:field('PRIVATE_MESSAGE'),brief_url:field('https://example.invalid/PRIVATE_BRIEF'),website:field(''),consent:field('1')};
 const functions=[{...field('Контроллеры и шлюзы'),checked:true}];
 const status={hidden:true,dataset:{}},button={innerHTML:'Отправить',disabled:false};let handler,resets=0,calls=0,finish,fail;const events=[];
 const form={querySelector:s=>s==='[data-smart-status]'?status:button,querySelectorAll:s=>s.startsWith('[name="functions"]')?functions.filter(x=>!s.endsWith(':checked')||x.checked):Object.values(fields),addEventListener:(name,cb)=>{if(name==='submit')handler=cb;},reportValidity:()=>true,setAttribute(){},removeAttribute(){},reset(){resets++;Object.values(fields).forEach(x=>x.value='');functions.forEach(x=>x.checked=false);}};
 const stored=JSON.stringify({utm_source:'yandex',utm_campaign:'hotel',referrer_host:'yandex.ru',page_path:'/'});
 const mockFetch=(url,options)=>{calls++;assert.equal(url,'/contact.php');const body=new URLSearchParams(options.body);assert.equal(body.get('utm_source'),'yandex');assert.equal(body.get('page_path'),'/smart-systems/'+service+'/');assert.equal(body.get('service'),service);assert(body.get('message').includes('Контроллеры и шлюзы'));assert(body.get('message').includes('PRIVATE_BRIEF'));return new Promise((resolve,reject)=>{finish=resolve;fail=reject;});};
 vm.runInNewContext(source,{URLSearchParams,URL,AbortController,setTimeout:()=>1,clearTimeout(){},sessionStorage:{getItem:()=>stored,setItem(){}},location:{pathname:'/smart-systems/'+service+'/',search:'',origin:'https://plancod.ru'},document:{referrer:'https://plancod.ru/',querySelector:s=>s==='[data-smart-form]'?form:null,querySelectorAll:()=>[]},window:{plancodEnquiry:async(params)=>{const res=await mockFetch('/contact.php',{body:params.toString()});const data=await res.json();return {ok:res.ok&&data.ok&&data.status==='queued',data:{...data,emit_goal:true}};},ym:(...args)=>events.push(args)},FormData:class{get(key){return fields[key]?.value;}},});
 handler({preventDefault(){}});assert.equal(calls,1);assert(button.disabled);assert(Object.values(fields).every(x=>x.disabled));assert.equal(events.length,0);
 handler({preventDefault(){}});assert.equal(calls,1,'Duplicate requests must be suppressed');
 if(scenario==='network')fail(Error('offline'));else finish({ok:scenario!=='rejected',json:async()=>({ok:scenario!=='rejected',status:scenario==='queued'?'queued':undefined,request_id:'ABCDEF123456'})});
 await new Promise(r=>setImmediate(r));
 assert(!button.disabled);assert(Object.values(fields).every(x=>!x.disabled));assert(!status.hidden);
 if(scenario==='queued'){assert.equal(resets,1);assert.deepEqual(events.map(x=>x[2]),['request_accepted',expectedGoal,'smart_brief_submitted']);assert(!JSON.stringify(events).includes('PRIVATE'));assert.equal(status.dataset.error,'false');}
 else{assert.equal(events.length,0);assert.equal(resets,0);assert.equal(fields.message.value,'PRIVATE_MESSAGE');assert.equal(status.dataset.error,'true');}
}
console.log('PASS 16 form outcomes: segment goals, duplicate guard, attribution, no PII in goals, error recovery');
const titles=[],descriptions=[],h1s=[];const sitemap=readFileSync(new URL('../hostland-export/sitemap.xml',import.meta.url),'utf8');
for(const slug of ['', 'hotels/','home/','equipment/','design/']){
 const html=readFileSync(new URL('../hostland-export/smart-systems/'+slug+'index.html',import.meta.url),'utf8');
 const url='https://plancod.ru/smart-systems/'+slug;
 titles.push(html.match(/<title>(.*?)<\/title>/s)[1]);descriptions.push(html.match(/<meta name="description" content="([^"]+)"/)[1]);h1s.push(html.match(/<h1[^>]*>(.*?)<\/h1>/s)[1]);
 assert(html.includes('<link rel="canonical" href="'+url+'">'));
 assert(sitemap.includes('<loc>'+url+'</loc>'));
 assert(html.includes('BreadcrumbList'));assert(html.includes('data-smart-form'));
 for(const target of ['hotels/','home/','equipment/','design/'])assert(html.includes('href="/smart-systems/'+target+'"'));
}
for(const values of [titles,descriptions,h1s])assert.equal(new Set(values).size,5);
assert(!sitemap.includes('smart-home'));
assert(readFileSync(new URL('./hostland.htaccess',import.meta.url),'utf8').includes('smart-systems/home/ [R=301,L,NE]'));
console.log('PASS unique SEO, canonical, sitemap, breadcrumbs, four-way linking and permanent migration');
