'use client';
import 'leaflet/dist/leaflet.css';
import {useEffect,useRef,useState} from 'react';import {sb} from '../../lib/supabase';import {useApp} from '../../components/App';
const tile=y=>`https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-${y}_3857/default/g/{z}/{y}/{x}.jpg`;
export default function P(){const {t,user}=useApp(),top=useRef(),[o,setO]=useState(100);
 useEffect(()=>{if(!user)return;let map;(async()=>{const L=(await import('leaflet')).default;
  map=L.map('m').setView([24.6,89.7],10);const at='Sentinel-2 cloudless by EOX';
  L.tileLayer(tile(2016),{maxZoom:13,attribution:at}).addTo(map);top.current=L.tileLayer(tile(2024),{maxZoom:13,opacity:1}).addTo(map);
  const {data}=await sb.from('evidence').select('plot,lat,lng');(data||[]).forEach(e=>e.lat&&L.circleMarker([e.lat,e.lng],{radius:8,color:'#C4533A',fillOpacity:.8}).addTo(map).bindPopup(e.plot));})();
  return()=>map&&map.remove()},[user]);
 return(<div><h2>{t.map}</h2><div id="m"/><label>{t.slide} ({t.y24} → {t.y16})</label>
 <input type="range" min="0" max="100" value={o} onChange={e=>{setO(+e.target.value);top.current?.setOpacity(e.target.value/100)}}/><p className="muted">{t.sat}</p></div>)}
