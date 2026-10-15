'use client';
import {useEffect,useState} from 'react';import {sb} from '../../lib/supabase';import {useApp} from '../../components/App';
const S=['submitted','under_review','field_verified','approved','rejected'];
export default function P(){const {t,role}=useApp(),[list,setList]=useState([]);
 const load=()=>sb.from('claims').select('*, evidence(plot,lat,lng,sha256,witnesses(count))').order('created_at',{ascending:false}).then(({data})=>setList(data||[]));
 useEffect(()=>{role==='admin'&&load()},[role]);
 const set=async(id,status)=>{await sb.from('claims').update({status}).eq('id',id);load()};
 if(role!=='admin')return<p className="panel">{t.noadmin}</p>;
 return(<div className="panel"><h2>{t.admin}</h2>{list.map(c=><div className="item" key={c.id}><div><b>{c.evidence?.plot}</b><div className="muted">{c.evidence?.lat?.toFixed(4)}, {c.evidence?.lng?.toFixed(4)} · {c.evidence?.witnesses[0].count} {t.witnessed}</div><div className="hash">{c.evidence?.sha256}</div></div>
 <select style={{width:'auto'}} value={c.status} onChange={e=>set(c.id,e.target.value)}>{S.map(s=><option key={s}>{s}</option>)}</select></div>)}</div>)}
