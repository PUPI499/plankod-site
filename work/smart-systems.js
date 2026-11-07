// Enquiries for smart systems. Shared by the static export and application.
(function () {
 'use strict';
 var attribution={page_path:location.pathname};
 var query=new URLSearchParams(location.search);
 ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){var value=query.get(k);if(value)attribution[k]=value.slice(0,150);});
 try{var ref=document.referrer?new URL(document.referrer):null;attribution.referrer_host=ref&&ref.origin!==location.origin?ref.hostname:'';var previous=JSON.parse(sessionStorage.getItem('plancod-smart-attribution')||'null');if(!attribution.utm_source&&previous)attribution=Object.assign({},previous,{page_path:location.pathname});else sessionStorage.setItem('plancod-smart-attribution',JSON.stringify(attribution));}catch{/* Storage must not block enquiries. */}
 var form=document.querySelector('[data-smart-form]');
 if(!form)return;
 var goalNames={b2b_supply:'smart_b2b_request',equipment:'smart_equipment_request',private_home:'smart_home_request',smart_design:'smart_design_request'};
 var serviceNames={b2b_supply:'Подбор и поставка для бизнеса',equipment:'Стоимость оборудования',private_home:'Решение для частного дома',smart_design:'Проектирование умных систем'};
 var status=form.querySelector('[data-smart-status]'),button=form.querySelector('[type="submit"]'),initialLabel=button.innerHTML,pending=false;
 function goal(name,params){if(typeof window.ym==='function')window.ym(113254722,'reachGoal',name,params);}
 function selected(){return Array.from(form.querySelectorAll('[name="functions"]:checked')).map(function(el){return el.value;});}
 function syncSelection(){var list=selected();document.querySelectorAll('[data-pick-equipment]').forEach(function(el){var on=list.includes(el.dataset.pickEquipment);el.setAttribute('aria-pressed',String(on));el.lastElementChild.textContent=on?'−':'+';});var summary=document.querySelector('[data-equipment-summary]');if(summary)summary.textContent=list.length?'Выбрано категорий: '+list.length+'. Уточните задачу в форме ниже.':'Выберите категории или сразу опишите задачу.';}
 document.querySelectorAll('[data-pick-equipment]').forEach(function(el){el.addEventListener('click',function(){var field=Array.from(form.querySelectorAll('[name="functions"]')).find(function(input){return input.value===el.dataset.pickEquipment;});if(field){field.checked=!field.checked;syncSelection();}});});
 form.querySelectorAll('[name="functions"]').forEach(function(el){el.addEventListener('change',syncSelection);});
 form.addEventListener('submit',function(event){
  event.preventDefault();if(pending||!form.reportValidity())return;
  var data=new FormData(form),service=String(data.get('service')||'');if(!goalNames[service])return;
  var lines=['Направление: '+serviceNames[service]];
  [['company','Компания'],['object_type','Тип объекта'],['city','Город'],['scale','Количество номеров / площадь'],['stage','Этап объекта']].forEach(function(pair){var value=String(data.get(pair[0])||'').trim();if(value)lines.push(pair[1]+': '+value);});
  if(selected().length)lines.push('Функции / категории: '+selected().join(', '));
  var comment=String(data.get('message')||'').trim();if(comment)lines.push('Задача / список позиций:\n'+comment);
  var brief=String(data.get('brief_url')||'').trim();if(brief){try{if(!/^https?:$/.test(new URL(brief).protocol))throw Error();}catch{status.hidden=false;status.dataset.error='true';status.textContent='Укажите ссылку на ТЗ, начинающуюся с https:// или http://.';return;}lines.push('Ссылка на ТЗ / план: '+brief);}
  var params=new URLSearchParams();['name','contact','website','consent'].forEach(function(key){params.set(key,String(data.get(key)||''));});
  if (window.plancodClientID) params.set('client_id', window.plancodClientID);
  params.set('message',lines.join('\n'));params.set('service',service);Object.keys(attribution).forEach(function(k){params.set(k,attribution[k]);});
  var controls=Array.from(form.querySelectorAll('input,select,textarea'));controls.forEach(function(el){el.disabled=true;});
  pending=true;button.disabled=true;button.textContent='Отправляем…';form.setAttribute('aria-busy','true');status.hidden=true;
  var controller=new AbortController(),timeout=setTimeout(function(){controller.abort();},30000);
  fetch('/contact.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:params.toString(),signal:controller.signal}).then(function(response){return response.json().then(function(body){if(!response.ok||!body.ok||body.status!=='queued')throw Error('not_confirmed');return body;});}).then(function(body){
   // Only real server acceptance is a conversion. No contacts, comments or TЗ URL enter analytics.
   try{goal('request_accepted',{service:service});goal(goalNames[service],{service:service});if(brief)goal('smart_brief_submitted',{service:service});}catch{/* Do not change successful UI because of analytics. */}
   form.reset();syncSelection();status.hidden=false;status.dataset.error='false';status.textContent='Заявка принята почтовой службой. Свяжемся с вами по указанному контакту.'+(/^[A-F0-9]{12}$/.test(body.request_id||'')?' Номер обращения: '+body.request_id:'');
  }).catch(function(){status.hidden=false;status.dataset.error='true';status.textContent='Не удалось подтвердить отправку. Данные сохранены в форме. Попробуйте ещё раз или свяжитесь с нами: info@plancod.ru, Telegram @plancod.';}).finally(function(){clearTimeout(timeout);pending=false;controls.forEach(function(el){el.disabled=false;});button.disabled=false;button.innerHTML=initialLabel;form.removeAttribute('aria-busy');});
 });
})();
