'use client';
import Link from 'next/link';import {useApp} from '../components/App';
export default function P(){const {t,user}=useApp();return(<div className="panel" style={{padding:'2rem'}}><h1>{t.h1}</h1><p>{t.sub}</p>
<div className="row"><Link className="btn" href={user?'/capture':'/login'}>{t.start}</Link><Link className="btn sec" href="/map">{t.map}</Link></div></div>)}
