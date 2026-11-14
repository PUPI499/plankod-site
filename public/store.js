/* Static-export catalog interactions. No payment or supplier requests. */
(function(){
"use strict";
document.querySelectorAll("[data-product-gallery]").forEach(g=>{g.querySelectorAll("[data-gallery-src]").forEach(b=>b.addEventListener("click",()=>{g.querySelector("[data-gallery-main]").src=b.dataset.gallerySrc;g.querySelectorAll("[data-gallery-src]").forEach(t=>t.setAttribute("aria-pressed",String(t===b)));}));});
document.querySelectorAll("[data-store-catalog]").forEach(function(root){
const grid=root.querySelector("[data-store-grid]"), cards=Array.from(grid.querySelectorAll("[data-store-card]")), panel=root.querySelector("[data-store-filters]"),open=root.querySelector("[data-open-filters]"),close=root.querySelector("[data-close-filters]"),sort=root.querySelector("[data-store-sort]");
const backdrop=root.querySelector("[data-filter-backdrop]");
root.classList.add("store-ready");open.hidden=false;close.hidden=false;if(backdrop)backdrop.hidden=false;
const inputs=Array.from(panel.querySelectorAll("input"));
function render(){const groups={};inputs.filter(x=>x.checked).forEach(x=>(groups[x.name]||=[]).push(x.value));let visible=0;
cards.forEach(card=>{card.hidden=!Object.entries(groups).every(([key,values])=>{const actual=key==="brand"?[card.dataset.brand]:JSON.parse(card.dataset[key]);return values.some(v=>actual.includes(v));});if(!card.hidden)visible++;});
cards.sort((a,b)=>{const mode=sort.value;if(mode.startsWith("price")){const ap=a.dataset.price===""?null:Number(a.dataset.price),bp=b.dataset.price===""?null:Number(b.dataset.price);if(ap===null&&bp!==null)return 1;if(bp===null&&ap!==null)return -1;if(ap!==null&&bp!==null&&ap!==bp)return (ap-bp)*(mode==="price-desc"?-1:1);}if(mode==="new"){const d=(b.dataset.introduced||"").localeCompare(a.dataset.introduced||"");if(d)return d;}return a.dataset.name.localeCompare(b.dataset.name,"ru");}).forEach(c=>grid.appendChild(c));
root.querySelector("[data-store-count]").textContent="Найдено: "+visible;root.querySelector("[data-store-empty]").hidden=visible>0;}
function shut(){root.classList.remove("filters-open");panel.removeAttribute("role");panel.removeAttribute("aria-modal");open.setAttribute("aria-expanded","false");open.focus();}
open.setAttribute("aria-expanded","false");
open.addEventListener("click",()=>{root.classList.add("filters-open");panel.setAttribute("role","dialog");panel.setAttribute("aria-modal","true");open.setAttribute("aria-expanded","true");close.focus();});
close.addEventListener("click",shut);if(backdrop)backdrop.addEventListener("click",shut);
panel.addEventListener("keydown",e=>{if(!root.classList.contains("filters-open"))return;if(e.key==="Escape"){shut();return;}if(e.key==="Tab"){const focus=Array.from(panel.querySelectorAll("button,input")).filter(x=>!x.hidden);const first=focus[0],last=focus[focus.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
inputs.forEach(i=>i.addEventListener("change",render));sort.addEventListener("change",render);root.querySelector("[data-reset-filters]").addEventListener("click",()=>{inputs.forEach(i=>i.checked=false);render();});render();
});
})();

document.querySelectorAll("[data-store-config]").forEach(form=>{
const status=form.parentElement.querySelector("[data-config-status]"),result=form.parentElement.querySelector("[data-config-results]");
let records;
form.addEventListener("submit",async e=>{
e.preventDefault(); const data=new FormData(form),tasks=data.getAll("task"),system=data.get("ecosystem"),object=form.elements.object.selectedOptions[0].textContent;
result.replaceChildren();if(!tasks.length){status.textContent="Выберите хотя бы одну задачу.";return;}
if(!system){
  status.textContent="Для подбора потребуется определить интерфейсы действующего оборудования.";
  const link=document.createElement("a");link.href="#contact";link.textContent="Обсудить обследование объекта →";result.appendChild(link);return;
}
status.textContent="Подбираем компоненты…";form.querySelector("button").disabled=true;result.setAttribute("aria-busy","true");
try{
if(!records){const response=await fetch("/store-products.json");if(!response.ok)throw new Error("catalog");records=await response.json();}
const ids=system==="rubetek"?["rubetek-re-3315",...(tasks.includes("Безопасность")?["rubetek-rs-3215","rubetek-rs-3225"]:[]),...(tasks.includes("Климат")?["rubetek-rc-3605"]:[]),...(tasks.includes("Освещение")?["rubetek-rs-3205"]:[])]:["wiren-board-8",...(tasks.includes("Климат")?["wb-msw-v4"]:[]),...(tasks.includes("Освещение")?["wb-mr6c-v3"]:[])];
const items=ids.map(id=>records.find(p=>p.slug===id)).filter(Boolean);

const heading=document.createElement("h3");heading.textContent=object+" / "+(system==="rubetek"?"Rubetek":"Wiren Board");result.appendChild(heading);
const list=document.createElement("ul");items.forEach(p=>{const li=document.createElement("li"),link=document.createElement("a");link.href="/products/"+p.slug+"/";link.textContent=p.name;li.appendChild(link);list.appendChild(li);});result.appendChild(list);
function note(text){const p=document.createElement("p");p.textContent=text;result.appendChild(p);}
note(system==="rubetek"?"Устройства RF 868 МГц работают через RE-3315. Нужны питание, настройка и подходящие условия радиосвязи. Для освещения проверяется схема подключения и нагрузка.":"Проводные устройства Modbus RTU. Дополнительно нужны питание, кабельная инфраструктура и настройка контроллера. Опции датчика микроклимата выбираются отдельно.");
if(tasks.includes("Климат"))note("Этот состав контролирует микроклимат. Исполнительные устройства для отопления, охлаждения или увлажнения подбираются отдельно.");
if(tasks.includes("Безопасность"))note(system==="rubetek"?"Для перекрытия воды отдельно нужны электроприводы кранов.":"В каталоге пока нет подтверждённого комплекта датчиков безопасности для этой подборки. Специалист дополнит состав.");
status.textContent="Примеры компонентов для проверки инженером. Комплектацию и стоимость согласуем по спецификации.";
const contact=document.createElement("a");contact.href="#contact";contact.className="store-primary";contact.textContent="Обсудить этот состав →";
contact.addEventListener("click",()=>{const field=document.querySelector("#contact textarea");if(field&&!field.value.trim()){field.value="Подбор оборудования: "+object+"; "+tasks.join(", ")+"; "+items.map(p=>p.name).join(", ")+". ";field.dispatchEvent(new Event("input",{bubbles:true}));}});
result.appendChild(contact);
}catch{status.textContent="Не удалось загрузить каталог. Попробуйте ещё раз или отправьте задачу через форму ниже.";}
finally{form.querySelector("button").disabled=false;result.removeAttribute("aria-busy");}
});
});
