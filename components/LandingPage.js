'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from './App';

const erosionImage = '/river-erosion-bangladesh.jpg';

function BrandMark() {
  return (
    <span className="shikorMark" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 4c-6.7 7.4-6.9 13.5 0 18.3C30.9 17.5 30.7 11.4 24 4Z" fill="currentColor" />
        <path d="M12 12c-.8 6.5 2.2 10.5 8.8 11.2C21.4 17.3 18.6 13.4 12 12Zm24 0c-6.6 1.4-9.4 5.3-8.8 11.2C33.8 22.5 36.8 18.5 36 12Z" fill="currentColor" opacity=".8" />
        <path d="M6 30c5.9-5.6 12.4-5.6 18 0 5.6-5.6 12.1-5.6 18 0M8 37c5.3-4.2 10.7-4.2 16 0 5.3-4.2 10.7-4.2 16 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Icon({ name }) {
  const common = { width: 25, height: 25, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    camera: <><path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.5"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15m6-12v15"/></>,
    report: <><path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M15 3v5h5M9 13h7m-7 4h7"/></>,
    draft: <><path d="M7 3h10a2 2 0 0 1 2 2v16H5V5a2 2 0 0 1 2-2Z"/><path d="M9 8h6m-6 4h6m-6 4h4"/></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1Zm13-12a3 3 0 0 1 0 6m2 2a4 4 0 0 1 3 4"/></>,
    arrow: <><path d="M4 12h15m-6-6 6 6-6 6"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const features = [
  { icon: 'camera', title: 'প্রমাণ সংরক্ষণ', titleEn: 'Capture evidence', english: 'EVIDENCE', body: 'ছবি, ভিডিও ও অবস্থানের তথ্য এক জায়গায় রাখুন।', bodyEn: 'Keep photos, videos and location details together.' },
  { icon: 'map', title: 'মানচিত্রে দেখুন', titleEn: 'Explore the map', english: 'MAPPING', body: 'স্যাটেলাইট চিত্র ও নিজের সংরক্ষিত তথ্য পাশাপাশি দেখুন।', bodyEn: 'View satellite imagery alongside your saved information.' },
  { icon: 'report', title: 'প্রমাণ গুছিয়ে নিন', titleEn: 'Organize your records', english: 'RECORDS', body: 'তারিখ, ছবি ও জমির তথ্য এক জায়গায় গুছিয়ে রাখুন।', bodyEn: 'Keep dates, photos and land details in one place.' },
  { icon: 'draft', title: 'আবেদনের খসড়া', titleEn: 'Prepare a draft', english: 'APPLICATIONS', body: 'খাস জমি বা পুনর্বাসনের আবেদনের খসড়া গুছিয়ে নিন।', bodyEn: 'Organize a draft for a khas-land or resettlement application.' },
  { icon: 'people', title: 'কমিউনিটির সাক্ষ্য', titleEn: 'Community witnesses', english: 'COMMUNITY', body: 'পরিচিত প্রতিবেশীর সাক্ষ্য ও প্রমাণের ইতিহাস যোগ করুন।', bodyEn: 'Add witness information and keep an evidence history.' },
];

const steps = [
  { number: '01', icon: 'camera', title: 'তথ্য সংগ্রহ', titleEn: 'Capture your information', body: 'ছবি, ভিডিও ও জমির পরিচিতি দিয়ে শুরু করুন।', bodyEn: 'Start with photos, videos and your land details.', href: '/capture' },
  { number: '02', icon: 'map', title: 'অবস্থান মিলিয়ে দেখুন', titleEn: 'Review the location', body: 'GPS এবং মানচিত্রে নিজের জমির অবস্থান দেখুন।', bodyEn: 'View your land location with GPS and on the map.', href: '/map' },
  { number: '03', icon: 'report', title: 'প্রমাণ গুছিয়ে নিন', titleEn: 'Organize your evidence', body: 'সময়ের সঙ্গে নথি ও প্রতিবেশীর সাক্ষ্য সাজান।', bodyEn: 'Arrange records and witness information over time.', href: '/verify' },
  { number: '04', icon: 'draft', title: 'খসড়া প্রস্তুত করুন', titleEn: 'Prepare an application draft', body: 'নিজের তথ্য দিয়ে আবেদনের খসড়া তৈরি করুন।', bodyEn: 'Prepare an application draft from your own information.', href: '/claim' },
];

export default function LandingPage() {
  const { user, lang, setLang } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const isBn = lang !== 'en';
  const startHref = user ? '/capture' : '/login';

  return (
    <div className="landing">
      <header className="landingHeader">
        <div className="landingNav">
          <Link href="/" className="landingBrand" aria-label={isBn ? 'শিকড় — হোম' : 'Shikor — Home'}>
            <BrandMark />
            <span><b>শিকড়</b><small>SHIKOR</small></span>
          </Link>
          <button className="landingMenuButton" type="button" aria-expanded={menuOpen} aria-controls="landing-links" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="srOnly">{isBn ? `মেনু ${menuOpen ? 'বন্ধ করুন' : 'খুলুন'}` : `Menu ${menuOpen ? 'close' : 'open'}`}</span><i /><i /><i />
          </button>
          <nav id="landing-links" className={`landingLinks${menuOpen ? ' isOpen' : ''}`} aria-label={isBn ? 'প্রধান নেভিগেশন' : 'Main navigation'}>
            <a href="#home" onClick={() => setMenuOpen(false)}>{isBn ? 'শুরু' : 'Home'}</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>{isBn ? 'সুবিধা' : 'Features'}</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>{isBn ? 'যেভাবে কাজ করে' : 'How it works'}</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>{isBn ? 'আমাদের কথা' : 'About'}</a>
          </nav>
          <div className="landingNavActions">
            <button className="languageToggle" type="button" aria-label={isBn ? 'ইংরেজিতে পরিবর্তন করুন' : 'Switch language to Bengali'} aria-pressed={!isBn} onClick={() => setLang(isBn ? 'en' : 'bn')}>{isBn ? 'EN' : 'বাং'}</button>
            <Link className="navLogin" href="/login">{isBn ? 'লগ ইন' : 'Log in'}</Link>
            <Link className="navJoin" href="/login">{isBn ? 'শুরু করুন' : 'Get started'}<Icon name="arrow" /></Link>
          </div>
        </div>
      </header>

      <div className="landingContent">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="heroImage" role="img" aria-label={isBn ? 'বাংলাদেশে নদীভাঙনে ক্ষয়প্রাপ্ত নদীর পাড়' : 'A riverbank affected by erosion in Bangladesh'} />
          <div className="heroWash" />
          <div className="heroContour" aria-hidden="true"><svg viewBox="0 0 1440 180" preserveAspectRatio="none"><path d="M-30 105c138-105 214 101 355 23s192-97 327-28 208 76 327 2 183-96 264-42 125 57 226-9"/><path d="M-40 135c130-87 220 75 364 8s191-74 326-15 203 54 330-5 180-71 260-29 129 45 236-7"/></svg></div>
          <div className="heroContent">
            <div className="heroCopy">
              <p className="eyebrow"><span /> {isBn ? 'নদী ও উপকূলের মানুষের পাশে' : 'For river and coastal communities'}</p>
              <h1 id="hero-title">{isBn ? <>আপনার শিকড়ের<br /><em>স্বীকৃতি প্রাপ্য।</em></> : <>Your roots deserve<br /><em>recognition.</em></>}</h1>
              <p className="heroBangla" lang="bn">জমি হারালেও, নিজের ইতিহাস হারিয়ে যায় না।</p>
              <p className="heroDescription">{isBn ? 'নদী বা উপকূলের ভাঙনে জমি হারানোর অভিজ্ঞতা, ছবি ও অবস্থানের তথ্য যত্নে সংরক্ষণ করুন—প্রমাণ প্রতিবেদন ও আবেদনের খসড়া গুছিয়ে নিন।' : 'Keep your experience, photographs and location details together after erosion, then prepare an evidence report and application draft.'}</p>
              <div className="heroActions">
                <Link className="primaryCta" href={startHref}>{isBn ? 'আপনার প্রমাণ গুছিয়ে নিন' : 'Start documenting'}<Icon name="arrow" /></Link>
                <a className="textCta" href="#how-it-works">{isBn ? 'কীভাবে কাজ করে' : 'How it works'}<span aria-hidden="true">↓</span></a>
              </div>
              <p className="heroNote">{isBn ? 'আপনি যখন প্রস্তুত, তখনই শুরু করুন' : 'Begin whenever you are ready'}</p>
            </div>
            <div className="heroVisual" aria-hidden="true">
              <div className="heroCoordinates"><Icon name="pin" /><span>{isBn ? 'বাংলাদেশ' : 'Bangladesh'}<br /><small>{isBn ? 'নদী ও বদ্বীপের মানচিত্র' : 'Rivers and delta landscapes'}</small></span></div>
              <div className="heroCaption"><span className="captionDot" /> {isBn ? 'স্মৃতি সংরক্ষণ, নিজের শর্তে' : 'Preserve your story, on your terms'}</div>
              <div className="heroPhotoCredit">Photo: Helena Wright / Wikimedia Commons · CC BY 2.0</div>
            </div>
          </div>
          <a className="scrollCue" href="#features" aria-label={isBn ? 'নিচে দেখুন' : 'Scroll to discover more'}><span />{isBn ? 'আরও জানুন' : 'Discover more'}</a>
        </section>

        <section className="featureSection" id="features" aria-labelledby="feature-title">
          <div className="sectionIntro"><p className="eyebrow dark"><span /> {isBn ? 'এক জায়গায়, ধাপে ধাপে' : 'A clearer path, step by step'}</p><h2 id="feature-title">{isBn ? 'আপনার গল্প, আপনার প্রমাণ' : 'Your story. Your evidence.'}</h2><p>{isBn ? 'ভাঙনের ক্ষতি মুছে যায় না। কিন্তু তার প্রমাণ গুছিয়ে রাখা যায়।' : 'Erosion takes a lot. Keeping your records together should not be another burden.'}</p></div>
          <div className="featureGrid">
            {features.map((feature, index) => <article className="featureCard" key={feature.english} style={{ '--card-index': index }}>
              <div className="featureIcon"><Icon name={feature.icon} /></div>
              <p className="featureEnglish">{feature.english}</p><h3>{isBn ? feature.title : feature.titleEn}</h3><p className="featureBody">{isBn ? feature.body : feature.bodyEn}</p>
            </article>)}
          </div>
        </section>

        <section className="journeySection" id="how-it-works" aria-labelledby="journey-title">
          <div className="journeyInner">
            <div className="journeyCopy"><p className="eyebrow"><span /> {isBn ? 'সহজ চারটি ধাপ' : 'A simple four-step journey'}</p><h2 id="journey-title">{isBn ? <>আজকের প্রমাণ,<br /><em>আগামীর প্রস্তুতি।</em></> : <>Evidence today.<br /><em>Better prepared tomorrow.</em></>}</h2><p>{isBn ? 'নিজের ফোন থেকেই তথ্য রাখুন। প্রতিটি ধাপ আপনাকে নিজের নথি আরও পরিষ্কারভাবে গুছিয়ে নিতে সাহায্য করে।' : 'Start with your phone. Each step helps you bring your own records into clearer order.'}</p><Link className="journeyCta" href={startHref}>{isBn ? 'যাত্রা শুরু করুন' : 'Begin your journey'}<Icon name="arrow" /></Link></div>
            <div className="journeySteps">
              {steps.map((step, index) => <Link href={step.href} className="journeyStep" key={step.number} style={{ '--step-index': index }}>
                <span className="stepIcon"><Icon name={step.icon} /></span><span className="stepInfo"><small>{isBn ? `ধাপ ${step.number}` : `STEP ${step.number}`}</small><b>{isBn ? step.title : step.titleEn}</b><span>{isBn ? step.body : step.bodyEn}</span></span><span className="stepArrow" aria-hidden="true">↗</span>
              </Link>)}
              <div className="journeyNote"><span className="noteMark">i</span><p>{isBn ? 'এটি প্রমাণ গুছিয়ে রাখার সহায়ক ব্যবস্থা; সরকারি সনদ বা আবেদন জমা দেওয়ার বিকল্প নয়।' : 'Shikor helps organize supporting evidence. It is not an official certificate or a government submission service.'}</p></div>
            </div>
          </div>
          <div className="journeyRiver" aria-hidden="true"><svg viewBox="0 0 700 370" fill="none"><path d="M706 24c-110 39-164 4-253 45-95 44-57 105-160 119-78 11-170-39-260 20-41 27-46 72-33 162" stroke="currentColor" strokeWidth="48" opacity=".055"/><path d="M700 24c-110 39-164 4-253 45-95 44-57 105-160 119-78 11-170-39-260 20-41 27-46 72-33 162" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 9" opacity=".3"/></svg></div>
        </section>

        <section className="aboutSection" id="about" aria-labelledby="about-title">
          <div className="aboutPhoto" style={{ backgroundImage: `url("${erosionImage}")` }} role="img" aria-label={isBn ? 'নদীভাঙনের একটি বাস্তব চিত্র' : 'A photograph of river erosion in Bangladesh'} />
          <div className="aboutCopy"><p className="eyebrow"><span /> {isBn ? 'শিকড়ের মানে' : 'Why Shikor exists'}</p><h2 id="about-title">{isBn ? 'জমির সঙ্গে জড়িয়ে থাকে জীবনের গল্প।' : 'Land holds more than a boundary.'}</h2><p>{isBn ? 'নদী যখন জমি কেড়ে নেয়, তার সঙ্গে হারিয়ে যেতে পারে বহু বছরের স্মৃতি, পরিচয় আর নথি। শিকড় তৈরি হয়েছে সেই গল্প ও প্রমাণ যত্নে একত্রে রাখার জন্য।' : 'When a river takes land, years of memory, identity and paperwork can be lost with it. Shikor gives people a calm place to keep their own story and supporting records together.'}</p><Link href="/map" className="aboutLink">{isBn ? 'মানচিত্র এক্সপ্লোর করুন' : 'Explore the map'}<Icon name="arrow" /></Link><small className="aboutCredit">Photo: Helena Wright · CC BY 2.0</small></div>
        </section>

        <section className="closingCta" aria-labelledby="closing-title"><div className="closingDecor" aria-hidden="true"><BrandMark /></div><p className="eyebrow"><span /> {isBn ? 'শুরুটা আপনার হাতে' : 'Whenever you are ready'}</p><h2 id="closing-title">{isBn ? 'আপনার গল্পটি আজ থেকেই সংরক্ষণ করুন।' : 'Start preserving your story today.'}</h2><p>{isBn ? 'আপনার তথ্য, আপনার প্রমাণ—নিজের মতো করে গুছিয়ে রাখুন।' : 'Keep your information and evidence organized, in your own words.'}</p><Link className="closingButton" href={startHref}>{isBn ? 'শুরু করুন' : 'Get started'}<Icon name="arrow" /></Link></section>
      </div>

      <footer className="landingFooter" id="contact"><div className="footerTop"><Link href="/" className="landingBrand footerBrand"><BrandMark /><span><b>শিকড়</b><small>SHIKOR</small></span></Link><p>{isBn ? 'আপনার শিকড়ের স্বীকৃতি প্রাপ্য।' : 'Your roots deserve recognition.'}<br /><span lang="bn">জমি হারালেও, নিজের ইতিহাস হারিয়ে যায় না।</span></p><nav aria-label={isBn ? 'ফুটার নেভিগেশন' : 'Footer navigation'}><a href="#features">{isBn ? 'সুবিধা' : 'Features'}</a><a href="#how-it-works">{isBn ? 'যেভাবে কাজ করে' : 'How it works'}</a><Link href="/login">{isBn ? 'লগ ইন' : 'Log in'}</Link><Link href="/capture">{isBn ? 'প্রমাণ যোগ করুন' : 'Add evidence'}</Link></nav></div><div className="footerBottom"><span>© {new Date().getFullYear()} Shikor</span><span>{isBn ? 'নদী ও উপকূলের মানুষের জন্য তৈরি' : 'Made for river and coastal communities'}</span><span>Photo: Helena Wright, cropped · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">CC BY 2.0</a> · <a href="https://commons.wikimedia.org/wiki/File:River_erosion_in_Bangladesh_(15255986711).jpg" target="_blank" rel="noreferrer">Source</a></span></div></footer>
    </div>
  );
}
