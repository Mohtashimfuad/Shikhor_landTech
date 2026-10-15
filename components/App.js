'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import Link from 'next/link';import {usePathname,useRouter} from 'next/navigation';
import {sb} from '../lib/supabase';
const D={bn:{home:'হোম',capture:'প্রমাণ জমা',map:'স্যাটেলাইট মানচিত্র',verify:'প্রতিবেশীর সাক্ষ্য',claim:'আমার দাবি',admin:'অ্যাডমিন',login:'লগইন',logout:'বের হন',
 h1:'নদীভাঙনে জমি হারিয়েছেন? প্রমাণ নিজের হাতে রাখুন।',sub:'ছবি, GPS ও স্যাটেলাইট ছবি মিলিয়ে সহায়ক প্রমাণ প্রতিবেদন ও খাস জমি আবেদনের খসড়া।',start:'শুরু করুন',
 email:'ইমেইল',pass:'পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)',name:'আপনার নাম',reg:'নতুন নিবন্ধন',have:'আগের অ্যাকাউন্ট আছে',
 plot:'জমির বিবরণ (দাগ নং / মৌজা)',gps:'আমার GPS নিন',file:'ছবি বা ভিডিও',save:'প্রমাণ সংরক্ষণ করুন',saved:'সংরক্ষিত হয়েছে',need:'বিবরণ, GPS ও ফাইল লাগবে',
 witness:'আমি সাক্ষী',witnessed:'সাক্ষী',none:'কিছু নেই',y16:'২০১৬',y24:'২০২৪',slide:'স্লাইডার: ২০১৬ থেকে ২০২৪',
 pick:'প্রমাণ বাছুন',gen:'খসড়া তৈরি ও জমা দিন',status:'অবস্থা',noadmin:'এই পেজ শুধু অ্যাডমিনের জন্য।',sat:'Sentinel-2 cloudless (EOX)',
 body:(n,p,w)=>`বরাবর, উপজেলা নির্বাহী অফিসার / সহকারী কমিশনার (ভূমি)\n\nবিষয়: নদীভাঙনে ক্ষতিগ্রস্ত জমির বিপরীতে খাস জমি বন্দোবস্ত ও পুনর্বাসনের আবেদন।\n\nজনাব, আমি ${n} নদীভাঙনে আমার জমি (${p}) হারিয়েছি। ${w} জন প্রতিবেশী সাক্ষ্য দিয়েছেন। সংযুক্ত ছবি, GPS ও হ্যাশ বিবেচনা করে তদন্তপূর্বক ব্যবস্থা নেওয়ার অনুরোধ করছি।\n\n(এটি আইনি সনদ নয়, সহায়ক প্রমাণ।)`},
 en:{home:'Home',capture:'Add evidence',map:'Satellite map',verify:'Witness',claim:'My claim',admin:'Admin',login:'Log in',logout:'Log out',
 h1:'Lost land to river erosion? Keep your proof in your own hands.',sub:'Photos, GPS and satellite imagery become a supporting evidence report and a khas land claim draft.',start:'Get started',
 email:'Email',pass:'Password (min 6 characters)',name:'Your name',reg:'Create account',have:'I have an account',
 plot:'Plot (dag no. / mouza)',gps:'Use my GPS',file:'Photo or video',save:'Save evidence',saved:'Saved',need:'Plot, GPS and a file are required',
 witness:'I witness this',witnessed:'witnesses',none:'Nothing yet',y16:'2016',y24:'2024',slide:'Slider: 2016 to 2024',
 pick:'Choose evidence',gen:'Draft and submit claim',status:'Status',noadmin:'Admins only.',sat:'Sentinel-2 cloudless (EOX)',
 body:(n,p,w)=>`To: Upazila Nirbahi Officer / Assistant Commissioner (Land)\n\nSubject: Application for khas land allocation and rehabilitation after river erosion.\n\nSir, I, ${n}, lost my land (${p}) to river erosion. ${w} neighbour(s) have witnessed this. Please investigate the attached photos, GPS and hash.\n\n(This is supporting evidence, not a legal certificate.)`}};
const Ctx=createContext();export const useApp=()=>useContext(Ctx);
const PROTECTED=['/capture','/verify','/claim','/admin','/map'];
export default function App({children}){
 const [user,setUser]=useState(null),[role,setRole]=useState('citizen'),[ready,setReady]=useState(false),[lang,setLang]=useState('bn'),[fs,setFs]=useState(16);
 const path=usePathname(),router=useRouter();
 useEffect(()=>{sb.auth.getSession().then(({data})=>{setUser(data.session?.user??null);setReady(true)});
  const {data:l}=sb.auth.onAuthStateChange((_,s)=>setUser(s?.user??null));
  try{setLang(localStorage.getItem('lang')||'bn');setFs(+localStorage.getItem('fs')||16);const th=localStorage.getItem('theme');if(th)document.documentElement.dataset.theme=th}catch(e){}
  return()=>l.subscription.unsubscribe()},[]);
 useEffect(()=>{if(!user){setRole('citizen');return}sb.from('profiles').select('role').eq('id',user.id).single().then(({data})=>setRole(data?.role||'citizen'))},[user]);
 useEffect(()=>{if(ready&&!user&&PROTECTED.some(p=>path.startsWith(p)))router.replace('/login')},[ready,user,path]);
 useEffect(()=>{document.documentElement.style.setProperty('--fs',fs+'px');document.documentElement.lang=lang;try{localStorage.setItem('fs',fs);localStorage.setItem('lang',lang)}catch(e){}},[fs,lang]);
 const t=D[lang];
 const theme=()=>{const d=document.documentElement,dark=d.dataset.theme?d.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;d.dataset.theme=dark?'light':'dark';try{localStorage.setItem('theme',d.dataset.theme)}catch(e){}};
 const nav=[['/',t.home],['/capture',t.capture],['/map',t.map],['/verify',t.verify],['/claim',t.claim],...(role==='admin'?[['/admin',t.admin]]:[])];
 return(<Ctx.Provider value={{user,role,ready,t,lang}}>
  <header><div className="nav"><Link href="/" className="brand">🌊 ভাঙন প্রমাণ</Link>
   <nav className="links">{nav.map(([h,l])=><Link key={h} href={h} className={path===h?'on':''}>{l}</Link>)}</nav>
   <div className="tools"><button className="ic" onClick={()=>setLang(lang==='bn'?'en':'bn')} aria-label="Language">{lang==='bn'?'EN':'বাং'}</button>
    <button className="ic" onClick={()=>setFs(Math.max(14,fs-2))} aria-label="A-">A−</button><button className="ic" onClick={()=>setFs(Math.min(20,fs+2))} aria-label="A+">A+</button>
    <button className="ic" onClick={theme} aria-label="Theme">◐</button>
    {user?<button className="btn sec" onClick={()=>sb.auth.signOut()}>{t.logout}</button>:<Link className="btn" href="/login">{t.login}</Link>}</div></div></header>
  <main>{children}</main></Ctx.Provider>)}
