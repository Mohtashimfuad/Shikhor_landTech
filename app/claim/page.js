'use client';
import {useEffect,useState} from 'react';import {sb} from '../../lib/supabase';import {useApp} from '../../components/App';
export default function P(){const {t,user}=useApp(),[ev,setEv]=useState([]),[sel,setSel]=useState(''),[claims,setClaims]=useState([]),[m,setM]=useState('');
 const load=()=>{if(!user)return;sb.from('evidence').select('*, witnesses(count)').eq('user_id',user.id).then(({data})=>{setEv(data||[]);setSel(s=>s||data?.[0]?.id||'')});
  sb.from('claims').select('*').eq('user_id',user.id).order('created_at',{ascending:false}).then(({data})=>setClaims(data||[]))};
 useEffect(load,[user]);
 const e=ev.find(x=>x.id===sel),body=e?t.body(user?.user_metadata?.name||user?.email,e.plot,e.witnesses[0].count):'';
 const send=async()=>{const {error}=await sb.from('claims').insert({evidence_id:sel,body});setM(error?error.message:t.saved);load()};
 return(<div className="grid"><div className="panel"><h2>{t.claim}</h2><label>{t.pick}</label><select value={sel} onChange={x=>setSel(x.target.value)}>{ev.map(x=><option key={x.id} value={x.id}>{x.plot}</option>)}</select>
 <pre style={{whiteSpace:'pre-wrap',font:'inherit'}}>{body}</pre><p className="msg">{m}</p><div className="row"><button className="btn" disabled={!e} onClick={send}>{t.gen}</button><button className="btn sec" onClick={()=>window.print()}>PDF</button></div></div>
 <div className="panel">{claims.length?claims.map(c=><div className="item" key={c.id}><span>{new Date(c.created_at).toLocaleDateString()}</span><span className="chip">{c.status}</span></div>):<p className="muted">{t.none}</p>}</div></div>)}
