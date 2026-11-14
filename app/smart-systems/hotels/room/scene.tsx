const imageRoot = "/images/hotel-room";

export function RoomScene({curtains, light}: {curtains:boolean; light:boolean}) {
  return <div className="hr-photo" data-open={curtains} data-lit={light}>
    <img className="hr-base" src={imageRoot+"/suite.webp"} width="1536" height="1024" loading="lazy"
      alt="Гостиничный номер с двуспальной кроватью, двумя прикроватными тумбами и окном в сад слева."/>
    <img className="hr-lamplight" loading="lazy" src={imageRoot+"/lamps.webp"} alt="" aria-hidden="true"/>
    <div className="hr-fabric" aria-hidden="true"><i/><i/></div>
  </div>;
}

export function GateScene({open}:{open:boolean}) {
  return <div className="hr-entry-photo" data-open={open}>
    <img src={imageRoot+"/arrival.webp"} width="1280" height="720" loading="lazy" alt="Въезд в отель со шлагбаумом перед главным входом."/>
    <i className="hr-arm" aria-hidden="true"/>
  </div>;
}
