"use client";
import { useRef, useState } from "react";

import { Airflow } from "./airflow";

const systems = [
  {id:"vent", label:"Вентиляция", active:"Усиленный режим", idle:"Базовый режим", x:33.5, y:20},
  {id:"cool", label:"Кондиционирование", active:"Охлаждение", idle:"Ожидание", x:74.5, y:21},
  {id:"heat", label:"Отопление", active:"Нагрев", idle:"Ожидание", x:14, y:73},
  {id:"light", label:"Освещение", active:"Рабочий свет", idle:"Дневной свет", x:52, y:6.5},
] as const;
type System = typeof systems[number]["id"];
type Settings = Record<System, boolean>;
const standby: Settings = {vent:false, cool:false, heat:false, light:false};

export function TreatmentRoom() {
  const [state,setState] = useState(standby);
  const [status,setStatus] = useState("Кабинет свободен. Вентиляция в базовом режиме.");
  const hovered = useRef<System|null>(null);
  function switchSystem(id:System,on:boolean) {
    setState(previous=>{
      const next={...previous,[id]:on};
      if (id==="heat" && on) next.cool=false;
      if (id==="cool" && on) next.heat=false;
      return next;
    });
    const system=systems.find(item=>item.id===id)!;
    setStatus(system.label+" · "+(on?system.active:system.idle));
  }
  function prepare() {
    setState(previous=>({...previous,vent:true,light:true}));
    setStatus("К приёму включён рабочий свет, вентиляция усилена.");
  }
  function finish() {
    setState(standby);
    setStatus("Приём завершён. Рабочий свет выключен, вентиляция в базовом режиме.");
  }
  return <div className="hr-console tr-console">
    <div className="hr-studio">
      <div className="hr-canvas">
        <img className="hr-base" src="/images/treatment-room/daylight.webp" loading="lazy" width="1536" height="1024" alt="Процедурная кушетка в кабинете. Слева под окном радиатор, над стеллажом вентиляционная решётка, справа кондиционер, на потолке световая панель."/>
        <img className="tr-working-light" data-active={state.light} src="/images/treatment-room/working-light.webp" loading="lazy" alt=""/>
        {state.vent&&<Airflow x={33.5} y={23}/>}
        {state.cool&&<Airflow x={74.5} y={25}/>}
        {state.heat&&<Airflow x={14} y={53} up/>}
        {systems.map(({id,label,x,y,active,idle})=><button key={id} type="button" className="hr-target tr-target" style={{left:x+"%",top:y+"%"}} aria-label={label} aria-pressed={state[id]}
          onPointerEnter={event=>{if(event.pointerType==="mouse"&&!state[id]){hovered.current=id;switchSystem(id,true);}}}
          onPointerLeave={()=>{hovered.current=null;}}
          onClick={event=>{if(event.detail===0||hovered.current!==id)switchSystem(id,!state[id]);hovered.current=null;}}>
          <span className="hr-pin" aria-hidden="true"><i/><b>{label} · {state[id]?active:idle}</b></span>
        </button>)}
      </div>
      <div className="tr-caption"><strong>Процедурный кабинет</strong><p>Метки на оборудовании показывают, какая система получила команду. Линии у решётки, кондиционера и радиатора обозначают движение воздуха и тепла в модели.</p></div>
    </div>
    <div className="hr-dock"><div className="hr-phone">
      <div className="hr-speaker" aria-hidden="true"/><small className="hr-app-brand">ПЛАН ◆ КОД</small>
      <p className="hr-app-title">Панель сотрудника</p><h3>Процедурная</h3>
      <div className="hr-device-list">{systems.map(({id,label,active,idle})=><button key={id} type="button" aria-pressed={state[id]} onClick={()=>switchSystem(id,!state[id])}><span>{label}<small>{state[id]?active:idle}</small></span><i aria-hidden="true"/></button>)}</div>
      <div className="hr-access"><button type="button" onClick={prepare}>Подготовить к приёму</button></div>
      <button type="button" className="hr-vacate" onClick={finish}>Завершить приём</button>
      <output className="hr-status" aria-live="polite">{status}</output>
    </div></div>
  </div>;
}
