export function Airflow({x,y,up=false}:{x:number;y:number;up?:boolean}) {
  return <svg className="tr-flow" viewBox="0 0 72 48" style={{left:x+"%",top:y+"%"}} aria-hidden="true">
    <g transform={up?"translate(72 48) rotate(180)":undefined}>
      {[12,32,52].map(start=><path key={start} d={`M${start} 4c-7 14 12 21 5 38`}/>)}
    </g>
  </svg>;
}
