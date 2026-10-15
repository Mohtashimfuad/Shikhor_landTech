import './globals.css';
import App from '../components/App';
export const metadata={title:'শিকড় — Your Roots Deserve Recognition',description:'নদী ও উপকূলের মানুষের জন্য জমি হারানোর প্রমাণ সংরক্ষণ ও আবেদন প্রস্তুতির সহায়ক প্ল্যাটফর্ম।'};
export default function L({children}){return(<html lang="bn"><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/></head><body><App>{children}</App></body></html>)}
