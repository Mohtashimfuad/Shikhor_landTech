'use client';
import {useEffect,useState} from 'react';import {sb} from '../../lib/supabase';import {useApp} from '../../components/App';
export default function P(){const {t,user}=useApp(),[plot,setPlot]=useState(''),[gps,setGps]=useState(null),[file,setFile]=useState(null),[m,setM]=useState(''),[list,setList]=useState([]);
 const load=()=>user&&sb.from('evidence').select('*, witnesses(count)').eq('user_id',user.id).order('taken_at',{ascending:false}).then(({data})=>setList(data||[]));
 useEffect(()=>{load()},[user]);
 const getGps=()=>navigator.geolocation.getCurrentPosition(p=>setGps({lat:p.coords.latitude,lng:p.coords.longitude}),e=>setM(e.message),{enableHighAccuracy:true,timeout:10000});
 const save=async()=>{if(!plot||!gps||!file)return setM(t.need);setM('...');
  const h=[...new Uint8Array(await crypto.subtle.digest('SHA-256',await file.arrayBuffer()))].map(x=>x.toString(16).padStart(2,'0')).join('');
  const path=`${user.id}/${Date.now()}-${file.name}`,u=await sb.storage.from('evidence').upload(path,file);if(u.error)return setM(u.error.message);
  const r=await sb.from('evidence').insert({plot,lat:gps.lat,lng:gps.lng,file_path:path,sha256:h});
  if(r.error)return setM(r.error.message);setM(t.saved);setPlot('');setFile(null);load()};
 return(<div className="grid"><div className="panel"><h2>{t.capture}</h2><label>{t.plot}</label><input value={plot} onChange={e=>setPlot(e.target.value)}/>
 <div className="row"><button className="btn sec" onClick={getGps}>{t.gps}</button></div><p className="muted">{gps?`${gps.lat.toFixed(5)}, ${gps.lng.toFixed(5)}`:''}</p>
 <label>{t.file}</label><input type="file" accept="image/*,video/*" capture="environment" onChange={e=>setFile(e.target.files[0])}/>
 <p className="msg">{m}</p><button className="btn" onClick={save}>{t.save}</button></div>
 <div className="panel">{list.length?list.map(e=><div className="item" key={e.id}><div><b>{e.plot}</b><div className="hash">{e.sha256}</div></div><span className="chip">{e.witnesses[0].count} {t.witnessed}</span></div>):<p className="muted">{t.none}</p>}</div></div>)}
