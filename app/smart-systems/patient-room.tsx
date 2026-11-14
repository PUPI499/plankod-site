"use client";

import { useRef, useState } from "react";
import { Airflow } from "./airflow";

const devices = [
  {id:"vent", label:"Вентиляция", off:"Базовый режим", on:"Усиленный режим", x:68, y:6},
  {id:"heat", label:"Отопление", off:"Поддержание", on:"Нагрев", x:31, y:57},
  {id:"light", label:"Прикроватный свет", off:"Выключен", on:"Включён", x:65, y:23},
  {id:"blind", label:"Рулонная штора", off:"Поднята", on:"Опущена", x:26, y:9},
] as const;

type Device = typeof devices[number]["id"];
type CallState = "idle" | "pending" | "accepted";

const callMessage = {
  idle:"Активных вызовов нет",
  pending:"Новый вызов от пациента",
  accepted:"Медсестра приняла вызов",
};

export function PatientRoom() {
  const [settings,setSettings] = useState({vent:false,heat:false,light:false,blind:false});
  const [call,setCall] = useState<CallState>("idle");
  const hoverActivation = useRef<Device|null>(null);

  function change(id:Device, enabled:boolean) {
    setSettings(previous=>({...previous,[id]:enabled}));
  }

  return <div className="hr-console tr-console ward-console">
    <div className="hr-studio">
      <div className="hr-canvas">
        <img className="hr-base" src="/images/patient-room/daylight.webp" width="1536" height="1024" loading="lazy"
          alt="Одноместная палата. У кровати кнопка вызова, над изголовьем светильник и решётка вентиляции, у окна рулонная штора и радиатор."/>
        <img className="tr-working-light ward-reading" data-active={settings.light} src="/images/patient-room/reading.webp" loading="lazy" alt=""/>
        <i aria-hidden="true" className="ward-blind" data-lowered={settings.blind}/>
        {settings.vent && <Airflow x={68} y={10}/>}
        {settings.heat && <Airflow x={31} y={45} up/>}
        {devices.map(({id,label,x,y,off,on})=><button key={id} type="button" className="hr-target tr-target" aria-label={label}
          style={{left:x+"%",top:y+"%"}} aria-pressed={settings[id]}
          onPointerEnter={event=>{if(event.pointerType==="mouse" && !settings[id]){hoverActivation.current=id;change(id,true);}}}
          onPointerLeave={()=>{hoverActivation.current=null;}}
          onClick={event=>{if(event.detail===0 || hoverActivation.current!==id) change(id,!settings[id]);hoverActivation.current=null;}}>
          <span className="hr-pin" aria-hidden="true"><i/><b>{label} · {settings[id]?on:off}</b></span>
        </button>)}
        <button type="button" className="hr-target tr-target ward-call-pin" aria-label="Вызвать медсестру" aria-disabled={call!=="idle"}
          onClick={()=>{if(call==="idle") setCall("pending");}}>
          <span className="hr-pin" aria-hidden="true"><i/><b>{call==="idle"?"Вызвать медсестру":callMessage[call]}</b></span>
        </button>
      </div>
      <div className="tr-caption"><strong>У кровати пациента</strong><p>Нажмите красную кнопку на поручне. На посту появится вызов из палаты 12. Примите его и посмотрите, как изменится статус у пациента.</p>
        <output className="ward-feedback" aria-live="polite">{call==="idle"?"Кнопка готова к вызову":call==="pending"?"Вызов отправлен на пост":"Ваш вызов принят"}</output>
      </div>
    </div>
    <div className="hr-dock"><div className="hr-phone">
      <div className="hr-speaker" aria-hidden="true"/><small className="hr-app-brand">ПЛАН ◆ КОД</small>
      <p className="hr-app-title">Пост медсестры</p><h3>Палата 12</h3>
      <div className="hr-device-list">{devices.map(({id,label,off,on})=><button key={id} type="button" aria-pressed={settings[id]} onClick={()=>change(id,!settings[id])}>
        <span>{label}<small>{settings[id]?on:off}</small></span><i aria-hidden="true"/>
      </button>)}</div>
      <div className="hr-access ward-request" data-call={call}><small>Вызов пациента</small><strong role="status">{callMessage[call]}</strong>
        {call!=="idle" && <button type="button" onClick={()=>setCall(call==="pending"?"accepted":"idle")}>{call==="pending"?"Принять вызов":"Завершить вызов"}</button>}
      </div>
    </div></div>
  </div>;
}
