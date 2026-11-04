/* Static-export catalog interactions. No payment or supplier requests. */
(function(){
"use strict";
document.querySelectorAll("[data-store-catalog]").forEach(function(root){
const grid=root.querySelector("[data-store-grid]"), cards=Array.from(grid.querySelectorAll("[data-store-card]")), panel=root.querySelector("[data-store-filters]"),open=root.querySelector("[data-open-filters]"),close=root.querySelector("[data-close-filters]"),sort=root.querySelector("[data-store-sort]");
root.classList.add("store-ready");open.hidden=false;close.hidden=false;
const inputs=Array.from(panel.querySelectorAll("input"));
function render(){const groups={};inputs.filter(x=>x.checked).forEach(x=>(groups[x.name]||=[]).push(x.value));let visible=0;
cards.forEach(card=>{card.hidden=!Object.entries(groups).every(([key,values])=>{const actual=key==="brand"?[card.dataset.brand]:JSON.parse(card.dataset[key]);return values.some(v=>actual.includes(v));});if(!card.hidden)visible++;});
cards.sort((a,b)=>{const mode=sort.value;if(mode.startsWith("price")){const ap=a.dataset.price===""?null:Number(a.dataset.price),bp=b.dataset.price===""?null:Number(b.dataset.price);if(ap===null&&bp!==null)return 1;if(bp===null&&ap!==null)return -1;if(ap!==null&&bp!==null&&ap!==bp)return (ap-bp)*(mode==="price-desc"?-1:1);}if(mode==="new"){const d=(b.dataset.introduced||"").localeCompare(a.dataset.introduced||"");if(d)return d;}return a.dataset.name.localeCompare(b.dataset.name,"ru");}).forEach(c=>grid.appendChild(c));
root.querySelector("[data-store-count]").textContent="Найдено: "+visible;root.querySelector("[data-store-empty]").hidden=visible>0;}
function shut(){root.classList.remove("filters-open");panel.removeAttribute("role");panel.removeAttribute("aria-modal");open.setAttribute("aria-expanded","false");open.focus();}
open.setAttribute("aria-expanded","false");
open.addEventListener("click",()=>{root.classList.add("filters-open");panel.setAttribute("role","dialog");panel.setAttribute("aria-modal","true");open.setAttribute("aria-expanded","true");close.focus();});
close.addEventListener("click",shut);
panel.addEventListener("keydown",e=>{if(!root.classList.contains("filters-open"))return;if(e.key==="Escape"){shut();return;}if(e.key==="Tab"){const focus=Array.from(panel.querySelectorAll("button,input")).filter(x=>!x.hidden);const first=focus[0],last=focus[focus.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
inputs.forEach(i=>i.addEventListener("change",render));sort.addEventListener("change",render);root.querySelector("[data-reset-filters]").addEventListener("click",()=>{inputs.forEach(i=>i.checked=false);render();});render();
});
})();
