'use client';
import {useEffect,useState} from 'react';import {sb} from '../../lib/supabase';import {useApp} from '../../components/App';
export default function P(){const {t,user}=useApp(),[list,setList]=useState([]),[m,setM]=useState('');
 const load=()=>user&&sb.from('evidence').select('*, witnesses(count)').neq('user_id',user.id).order('taken_at',{ascending:false}).then(({data})=>setList(data||[]));
 useEffect(()=>{load()},[user]);
 const w=async id=>{const {error}=await sb.from('witnesses').insert({evidence_id:id});setM(error?error.message:'');load()};
 return(<div className="panel"><h2>{t.verify}</h2><p className="msg">{m}</p>{list.length?list.map(e=><div className="item" key={e.id}><div><b>{e.plot}</b><div className="muted">{new Date(e.taken_at).toLocaleDateString()}</div></div>
 <div className="row" style={{margin:0}}><span className="chip">{e.witnesses[0].count} {t.witnessed}</span><button className="btn sec" onClick={()=>w(e.id)}>{t.witness}</button></div></div>):<p className="muted">{t.none}</p>}</div>)}
