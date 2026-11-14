"use client";
import { useRef, useState } from "react";
import { GateScene, RoomScene } from "./scene";

const devices = [
  {id:"curtains", label:"Шторы", off:"Закрыты", on:"Открыты", area:[1,4,26,67], point:[15,32]},
  {id:"light", label:"Бра", off:"Выключено", on:"Включено", area:[34,34,8,13], point:[38,41]},
  {id:"outlet", label:"Розетка", off:"Без питания", on:"Есть питание", area:[34,48,9,13], point:[38,54]},
  {id:"climate", label:"Климат", off:"Дежурный режим", on:"Комфорт", area:[89,0,11,17], point:[95,8]},
] as const;
type Device = typeof devices[number]["id"];
const emptyRoom = {curtains:false, light:false, outlet:false, climate:false};

export function HotelDemo() {
  const [room,setRoom] = useState(emptyRoom);
  const [gate,setGate] = useState(false);
  const [notice,setNotice] = useState("Номер в дежурном режиме");
  const activatedByHover = useRef<Device|null>(null);
  function change(id:Device, value:boolean) {
    setRoom(previous=>({...previous,[id]:value}));
    const item = devices.find(device=>device.id===id)!;
    setNotice(item.label+" · "+(value?item.on:item.off));
  }
  function vacancy() {
    setRoom(emptyRoom);
    setNotice("Номер свободен · шторы закрыты, свет и гостевая розетка выключены, климат в дежурном режиме");
  }
  return <div className="hr-console">
    <div className="hr-studio">

      <div className="hr-canvas">
        <RoomScene curtains={room.curtains} light={room.light}/>
        {devices.map(({id,label,on,off,area:[x,y,w,h],point:[px,py]})=><button key={id} type="button" className="hr-target" style={{left:x+"%",top:y+"%",width:w+"%",height:h+"%"}} aria-label={label} aria-pressed={room[id]}
          onPointerEnter={e=>{if(e.pointerType==="mouse" && !room[id]) {activatedByHover.current=id;change(id,true);}}}
          onPointerLeave={()=>{activatedByHover.current=null;}}
          onClick={e=>{if(e.detail===0 || activatedByHover.current!==id)change(id,!room[id]);activatedByHover.current=null;}}>
          <span className="hr-pin" style={{left:((px-x)/w)*100+"%",top:((py-y)/h)*100+"%"}} aria-hidden="true"><i/><b>{label} · {room[id]?on:off}</b></span>
        </button>)}
      </div>
      <div className="hr-drive"><GateScene open={gate}/><div><small>Въезд на территорию</small><strong>{gate?"Шлагбаум открыт":"Шлагбаум закрыт"}</strong><p>Откройте или закройте проезд с телефона.</p></div></div>
    </div>
    <div className="hr-dock"><div className="hr-phone"><div className="hr-speaker" aria-hidden="true"/><small className="hr-app-brand">ПЛАН ◆ КОД</small><p className="hr-app-title">Панель сотрудника</p><h2>Номер 204</h2>
      <div className="hr-device-list">{devices.map(({id,label,on,off})=><button type="button" key={id} aria-pressed={room[id]} onClick={()=>change(id,!room[id])}><span>{label}<small>{room[id]?on:off}</small></span><i aria-hidden="true"/></button>)}</div>
      <button type="button" className="hr-vacate" onClick={vacancy}>Сценарий «Номер свободен»</button>
      <div className="hr-access"><small>Контроль въезда</small><button type="button" onClick={()=>{setGate(!gate);setNotice(gate?"Шлагбаум закрыт":"Шлагбаум открыт");}}>{gate?"Закрыть":"Открыть"} шлагбаум</button></div>
      <output aria-live="polite" className="hr-status">{notice}</output>
    </div></div>
  </div>;
}
