'use client';
import {useState} from 'react';import {useRouter} from 'next/navigation';import {sb} from '../../lib/supabase';import {useApp} from '../../components/App';
export default function P(){const {t}=useApp(),r=useRouter(),[reg,setReg]=useState(false),[f,setF]=useState({email:'',pass:'',name:''}),[m,setM]=useState('');
 const go=async e=>{e.preventDefault();setM('');
  const {error}=reg?await sb.auth.signUp({email:f.email,password:f.pass,options:{data:{name:f.name}}}):await sb.auth.signInWithPassword({email:f.email,password:f.pass});
  error?setM(error.message):r.push('/capture')};
 return(<form className="panel" onSubmit={go} style={{maxWidth:420,margin:'auto'}}><h2>{reg?t.reg:t.login}</h2>
 {reg&&<><label>{t.name}</label><input required value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></>}
 <label>{t.email}</label><input type="email" required value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
 <label>{t.pass}</label><input type="password" minLength={6} required value={f.pass} onChange={e=>setF({...f,pass:e.target.value})}/>
 <p className="msg" role="alert">{m}</p><div className="row"><button className="btn">{reg?t.reg:t.login}</button>
 <button type="button" className="btn sec" onClick={()=>setReg(!reg)}>{reg?t.have:t.reg}</button></div></form>)}
