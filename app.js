const $=s=>document.querySelector(s),root=document.documentElement;
if(navigator.standalone||matchMedia('(display-mode: standalone)').matches)root.classList.add('sa');
const NSUG=15,NPOP=8,NMUS=20;
const PLATS=[['netflix','Netflix','#E50914','#fff','N'],['prime','Prime Video','#1399FF','#fff','P'],['disney','Disney+','#113CCF','#fff','D'],['hbo','HBO Max','#6B2BD9','#fff','M'],['apple','Apple TV+','#1C1C1E','#fff','A'],['mubi','MUBI','#0B1F8A','#fff','M'],['gain','Gain','#7A3FF2','#fff','G'],['exxen','Exxen','#F5C400','#111','E'],['tod','TOD','#E4002B','#fff','T'],['tabii','Tabii','#0E86D4','#fff','T'],['tvplus','TV+','#FF6A00','#fff','+']];
const PLM=Object.fromEntries(PLATS.map(p=>[p[0],p]));
const TLL=[['auto','Dili algıla'],['tr','Türkçe'],['en','İngilizce'],['de','Almanca'],['fr','Fransızca'],['es','İspanyolca'],['it','İtalyanca'],['pt','Portekizce'],['ru','Rusça'],['ar','Arapça'],['fa','Farsça'],['ja','Japonca'],['ko','Korece'],['zh-CN','Çince'],['nl','Felemenkçe'],['pl','Lehçe'],['uk','Ukraynaca'],['el','Yunanca'],['hi','Hintçe'],['sv','İsveççe'],['az','Azerbaycan Türkçesi']],TLN=Object.fromEntries(TLL);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const rnd=()=>Math.random().toString(36).slice(2,10);

/* ---------- Veri ---------- */
const ENG={google:'Google',youtube:'YouTube',yahoo:'Yahoo',bing:'Bing',duckduckgo:'DuckDuckGo',yandex:'Yandex',pinterest:'Pinterest'};
const OPT={web:['google','yahoo','bing','duckduckgo','yandex'],image:['pinterest','google','yahoo','bing','duckduckgo','yandex'],
  video:['youtube','google','yahoo','bing','duckduckgo','yandex'],same:['google','youtube','yahoo','bing','duckduckgo','yandex']};
const URLS={
 web:{google:q=>`https://www.google.com/search?q=${q}`,yahoo:q=>`https://search.yahoo.com/search?p=${q}`,bing:q=>`https://www.bing.com/search?q=${q}`,
  duckduckgo:q=>`https://duckduckgo.com/?q=${q}`,yandex:q=>`https://yandex.com/search/?text=${q}`,youtube:q=>`https://www.youtube.com/results?search_query=${q}`},
 image:{pinterest:q=>`https://www.pinterest.com/search/pins/?q=${q}`,google:q=>`https://www.google.com/search?tbm=isch&q=${q}`,yahoo:q=>`https://images.search.yahoo.com/search/images?p=${q}`,bing:q=>`https://www.bing.com/images/search?q=${q}`,
  duckduckgo:q=>`https://duckduckgo.com/?q=${q}&iax=images&ia=images`,yandex:q=>`https://yandex.com/images/search?text=${q}`,youtube:q=>`https://www.youtube.com/results?search_query=${q}`},
 video:{google:q=>`https://www.google.com/search?tbm=vid&q=${q}`,yahoo:q=>`https://video.search.yahoo.com/search/video?p=${q}`,bing:q=>`https://www.bing.com/videos/search?q=${q}`,
  duckduckgo:q=>`https://duckduckgo.com/?q=${q}&iax=videos&ia=videos`,yandex:q=>`https://yandex.com/video/search?text=${q}`,youtube:q=>`https://www.youtube.com/results?search_query=${q}`}};
const AI={chatgpt:['ChatGPT',q=>`https://chatgpt.com/?q=${q}`],claude:['Claude',q=>`https://claude.ai/new?q=${q}`],grok:['Grok',q=>`https://grok.com/?q=${q}`],
  deepseek:['DeepSeek',()=>'https://chat.deepseek.com/',1],
  qwen:['Qwen',q=>`https://chat.qwen.ai/?q=${q}`],copilot:['Copilot',q=>`https://copilot.microsoft.com/?q=${q}`]};
// [açık, koyu, koyuYazı, ad, gradyan açık, gradyan koyu]
const ACC={blue:['#007AFF','#0A84FF',0,'Mavi','#32ADE6','#64D2FF'],indigo:['#5856D6','#5E5CE6',0,'İndigo','#007AFF','#0A84FF'],
  purple:['#AF52DE','#BF5AF2',0,'Mor','#5856D6','#5E5CE6'],pink:['#FF2D55','#FF375F',0,'Pembe','#AF52DE','#BF5AF2'],
  red:['#FF3B30','#FF453A',0,'Kırmızı','#FF9500','#FF9F0A'],orange:['#FF9500','#FF9F0A',0,'Turuncu','#FFCC00','#FFD60A'],
  yellow:['#FFCC00','#FFD60A',1,'Sarı','#FF9500','#FF9F0A'],green:['#34C759','#30D158',0,'Yeşil','#00C7BE','#63E6E2'],
  mint:['#00C7BE','#63E6E2',1,'Nane','#32ADE6','#64D2FF'],brown:['#A2845E','#AC8E68',0,'Kahverengi','#FF9500','#FF9F0A']};
/* ---------- Uygulama ikonu rengi (ana ekran / Dock) ---------- */
const ICN={neurun:['neurun','#FF3560','#E4063A'],light:['Açık','#F5F7FB','#D5DBE6','#2B2D33'],blue:['Mavi','#4DA3FF','#0A62E8'],music:['Apple Müzik','#FB5C74','#FA233B'],indigo:['İndigo','#7D7AFF','#4B49C9'],purple:['Mor','#C77DEB','#9A3FCB'],red:['Kırmızı','#FF6B61','#E52B20'],orange:['Turuncu','#FFB340','#F28500'],yellow:['Sarı','#FFE066','#F5B700'],green:['Yeşil','#5DD97D','#22A94A'],teal:['Turkuaz','#5AD1DD','#1E9DB4'],graphite:['Grafit','#6B6B70','#2C2C2E']};
const shade=(h,f)=>'#'+[1,3,5].map(i=>Math.round(parseInt(h.substr(i,2),16)*f).toString(16).padStart(2,'0')).join('');
const ASTR='<rect x="-28" y="-3.65" width="56" height="7.3"/><rect x="-28" y="-3.65" width="56" height="7.3" transform="rotate(60)"/><rect x="-28" y="-3.65" width="56" height="7.3" transform="rotate(120)"/>';
function makeIcon(k,size,dark){
  const [,a,b,gc]=ICN[k]||ICN.neurun,f=dark?.72:1,c=document.createElement('canvas');c.width=c.height=size;const g=c.getContext('2d');
  const gr=g.createLinearGradient(0,0,0,size);gr.addColorStop(0,shade(a,f));gr.addColorStop(1,shade(b,f));g.fillStyle=gr;g.fillRect(0,0,size,size);
  const hl=g.createRadialGradient(size*.3,0,0,size*.3,0,size*.9);hl.addColorStop(0,'rgba(255,255,255,'+(dark?.1:.2)+')');hl.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=hl;g.fillRect(0,0,size,size);
  const L=size*.56,T=L*.1305,p=new Path2D();
  for(const ang of[0,60,120]){const r=ang*Math.PI/180,ux=Math.cos(r),uy=Math.sin(r),vx=-uy,vy=ux;
    [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy],n)=>{const x=size/2+sx*L/2*ux+sy*T/2*vx,y=size/2+sx*L/2*uy+sy*T/2*vy;n?p.lineTo(x,y):p.moveTo(x,y)});p.closePath()}
  g.save();g.shadowColor='rgba(0,0,0,.32)';g.shadowBlur=size*.035;g.shadowOffsetY=size*.012;
  const g2=g.createLinearGradient(0,size/2-L/2,0,size/2+L/2);g2.addColorStop(0,gc||'#FFFFFF');g2.addColorStop(1,gc||'#D8DEEA');g.fillStyle=g2;g.fill(p);g.restore();
  return c.toDataURL('image/png')}
let icoSig='';
async function applyIcon(){
  const k=ICN[S.appIcon]?S.appIcon:'neurun';if(k===icoSig)return;icoSig=k;
  const links=[...document.querySelectorAll('link[rel="apple-touch-icon"],link[rel="icon"]')],ml=document.querySelector('link[rel="manifest"]');
  links.forEach(l=>{if(!l.dataset.orig)l.dataset.orig=l.getAttribute('href')});if(ml&&!ml.dataset.orig)ml.dataset.orig=ml.getAttribute('href');
  if(k==='neurun'){links.forEach(l=>l.setAttribute('href',l.dataset.orig));if(ml)ml.setAttribute('href',ml.dataset.orig);return}   /* varsayılan: depodaki hazır ikon ve manifest */
  links.forEach(l=>{l.href=makeIcon(k,180,/dark/.test(l.media||''))});
  try{if(!ml||!/^https?:/.test(location.protocol))return;
    const base=await(await fetch(ml.dataset.orig,{cache:'no-cache'})).json();
    const abs=u=>new URL(u||'./',location.href).href,m={...base,id:abs(base.id||base.start_url),start_url:abs(base.start_url),scope:abs(base.scope),icons:[192,512].map(z=>({src:makeIcon(k,z,false),sizes:z+'x'+z,type:'image/png',purpose:'any'}))};
    if(k!==icoSig)return;if(applyIcon.u)URL.revokeObjectURL(applyIcon.u);applyIcon.u=URL.createObjectURL(new Blob([JSON.stringify(m)],{type:'application/manifest+json'}));ml.href=applyIcon.u}catch(e){}
}
const DEF={appIcon:'neurun',adult:true,theme:'auto',accent:'blue',scale:100,same:false,sameEngine:'google',web:'google',image:'pinterest',video:'youtube',ai:'chatgpt',hist:false,openApp:false,tlFrom:'auto',tlTo:'tr',fp:Object.fromEntries(PLATS.map(p=>[p[0],true])),modes:null,hidePop:false,autoComp:true,hideFav:false,noAnim:false,histDays:7,music:'apple',luAuto:false,luCall:'',luLen:'normal',luTone:'dengeli',chatSave:true,memAuto:true,profile:{name:'',email:'',phone:'',birth:'',photo:'',city:'',district:''},favs:[]};
const MUSP=[['spotify','Spotify'],['ytm','YouTube Müzik'],['apple','Apple Müzik'],['tidal','Tidal'],['deezer','Deezer'],['soundcloud','SoundCloud']];
const MODES=[['web','Web'],['url','URL'],['image','Görsel'],['video','Video'],['music','Müzik'],['film','Film/Dizi'],['tl','Çeviri'],['duck','Duck'],['ai','AI']];
const MUSURL={soundcloud:q=>`https://soundcloud.com/search?q=${q}`,apple:q=>`https://music.apple.com/tr/search?term=${q}`,ytm:q=>`https://music.youtube.com/search?q=${q}`,spotify:q=>`https://open.spotify.com/search/${q}`,tidal:q=>`https://listen.tidal.com/search?q=${q}`,deezer:q=>`https://www.deezer.com/search/${q}`};
const RET=[[7,'1 Hafta'],[30,'1 Ay'],[90,'3 Ay'],[180,'6 Ay'],[270,'9 Ay'],[365,'1 Yıl'],[0,'Süresiz']];

function sane(o){
  o=(o&&typeof o==='object')?o:{};const n={...DEF,favs:[],blocked:[]};
  if(['light','dark','auto'].includes(o.theme))n.theme=o.theme;
  if(ACC[o.accent])n.accent=o.accent;if(ICN[o.appIcon])n.appIcon=o.appIcon;
  if(Number.isInteger(o.scale)&&o.scale>=80&&o.scale<=125&&o.scale%5===0)n.scale=o.scale;
  n.same=!!o.same;n.adult=o.adult!==false;
  n.blocked=Array.isArray(o.blocked)?[...new Set(o.blocked.filter(x=>typeof x==='string'&&x).map(x=>x.slice(0,120)))].slice(0,500):[];
  n.sameEngine=OPT.same.includes(o.sameEngine)?o.sameEngine:DEF.sameEngine;
  for(const k of['web','image','video'])n[k]=OPT[k].includes(o[k])?o[k]:DEF[k];
  n.ai=AI[o.ai]?o.ai:DEF.ai;
  if(typeof o.hist==='boolean')n.hist=o.hist;
  if(MUSP.some(m=>m[0]===o.music))n.music=o.music;
  n.tlFrom=TLL.some(l=>l[0]===o.tlFrom)?o.tlFrom:'auto';n.tlTo=TLL.some(l=>l[0]===o.tlTo&&l[0]!=='auto')?o.tlTo:'tr';
  n.fp={};for(const p of PLATS)n.fp[p[0]]=!(o.fp&&o.fp[p[0]]===false);
  for(const k of['luAuto','chatSave','memAuto','openApp'])if(typeof o[k]==='boolean')n[k]=o[k];
  if(['kisa','normal','detay'].includes(o.luLen))n.luLen=o.luLen;
  if(['resmi','dengeli','samimi'].includes(o.luTone))n.luTone=o.luTone;
  n.luCall=typeof o.luCall==='string'?o.luCall.slice(0,40):'';
  {const pr=o.profile&&typeof o.profile==='object'?o.profile:{},st=(v,m)=>typeof v==='string'?v.slice(0,m):'';
   n.profile={name:st(pr.name,60),email:st(pr.email,80),phone:st(pr.phone,30),birth:/^\d{4}-\d{2}-\d{2}$/.test(pr.birth)?pr.birth:'',photo:typeof pr.photo==='string'&&pr.photo.startsWith('data:image/')?pr.photo:'',city:st(pr.city,40),district:st(pr.district,40)}}
  if(RET.some(r=>r[0]===o.histDays))n.histDays=o.histDays;
  if(Array.isArray(o.favs))n.favs=o.favs.filter(f=>f&&typeof f.url==='string'&&/^https?:\/\//i.test(f.url)).slice(0,60)
    .map(f=>({id:String(f.id||rnd()),name:String(f.name||'').slice(0,40),url:f.url,cover:typeof f.cover==='string'&&f.cover.startsWith('data:image/')?f.cover:''}));
  {const ids=MODES.map(m=>m[0]);let a=(Array.isArray(o.modes)?o.modes:[]).filter(m=>m&&ids.includes(m.k)).map(m=>({k:m.k,on:m.on!==false}));
   a=a.filter((m,i)=>a.findIndex(x=>x.k===m.k)===i);ids.forEach(k=>{if(!a.some(m=>m.k===k)){const mi=a.findIndex(m=>m.k==='music');const fi=a.findIndex(m=>m.k==='film');if(k==='film'&&mi>=0)a.splice(mi+1,0,{k,on:true});else if(k==='tl'&&(fi>=0||mi>=0))a.splice((fi>=0?fi:mi)+1,0,{k,on:true});else a.push({k,on:true})}});n.modes=a;
   for(const k of['hidePop','hideFav','noAnim'])n[k]=!!o[k];n.autoComp=o.autoComp!==false}
  return n;
}
let S;try{S=sane(JSON.parse(localStorage.getItem('lunai')||'{}'))}catch(e){S=sane({})}
const save=()=>{try{localStorage.setItem('lunai',JSON.stringify(S))}catch(e){}};
/* arama geçmişi */
const HK=['web','url','image','video','music','film','ai'];
function cleanH(a){return(Array.isArray(a)?a:[]).filter(h=>h&&typeof h.q==='string'&&HK.includes(h.m)&&Number.isFinite(h.t)).map(h=>({id:String(h.id||rnd()),q:h.q.slice(0,200),m:h.m,t:h.t})).slice(0,1000)}
let H=[];try{H=cleanH(JSON.parse(localStorage.getItem('lunai_h')||'[]'))}catch(e){}
const saveH=()=>{try{localStorage.setItem('lunai_h',JSON.stringify(H))}catch(e){}};
function pruneH(){if(S.histDays){const lim=Date.now()-S.histDays*864e5;H=H.filter(h=>h.t>=lim)}saveH()}
function recordH(m,t){if(!S.hist||!t)return;H=H.filter(h=>!(h.m===m&&h.q.toLowerCase()===t.toLowerCase()));H.unshift({id:rnd(),q:t.slice(0,200),m,t:Date.now()});H=H.slice(0,1000);pruneH()}
pruneH();
/* öğrenilen veri seti: sonuçlarda çıkmayan aramalar düzeltilip kalıcı kaydedilir */
const LK=['web','image','video','music'];
function cleanL(a){return(Array.isArray(a)?a:[]).filter(x=>x&&typeof x.t==='string'&&x.t.trim()&&LK.includes(x.m)&&Number.isFinite(x.w)).map(x=>({t:x.t.slice(0,120),m:x.m,w:x.w,ts:Number.isFinite(x.ts)?x.ts:0,o:Array.isArray(x.o)?x.o.filter(y=>typeof y==='string').slice(0,5):[]})).slice(0,800)}
let LRN=[];try{LRN=cleanL(JSON.parse(localStorage.getItem('lunai_learn')||'[]'))}catch(e){}
const saveL=()=>{try{localStorage.setItem('lunai_learn',JSON.stringify(LRN))}catch(e){}};
const LTY=new Map();

/* ---------- Görünüm ---------- */
const mq=matchMedia('(prefers-color-scheme: dark)');
const isDark=()=>S.theme==='dark'||(S.theme==='auto'&&mq.matches);
function sysType(){let f=1,bt=false;try{if(CSS.supports('font','-apple-system-body')){const e=document.createElement('span');e.style.cssText='font:-apple-system-body;position:absolute;visibility:hidden;pointer-events:none';document.body.appendChild(e);const cs=getComputedStyle(e);f=Math.min(1.6,Math.max(.8,(parseFloat(cs.fontSize)||17)/17));bt=(parseInt(cs.fontWeight,10)||400)>=600;e.remove()}}catch(x){}return{f,bt}}
function apply(){try{applyIcon()}catch(e){}
  const d=isDark(),a=ACC[S.accent]||ACC.blue;
  root.dataset.theme=d?'dark':'light';
  root.style.setProperty('--accent',d?a[1]:a[0]);
  root.style.setProperty('--accent2',d?a[5]:a[4]);
  root.style.setProperty('--on',a[2]?'#000':'#fff');
  root.style.setProperty('--on2',a[2]?'#000':'#fff');
  {const n=parseInt((d?a[1]:a[0]).slice(1),16);root.style.setProperty('--accent-glow',`rgba(${n>>16&255},${n>>8&255},${n&255},.38)`)}
  {const n=parseInt((d?a[1]:a[0]).slice(1),16);root.style.setProperty('--accent-soft',`rgba(${n>>16&255},${n>>8&255},${n&255},.16)`)}
  {const st=sysType();root.classList.toggle('bt',st.bt);root.style.fontSize=(S.scale*st.f)+'%'}home.classList.toggle('noanim',!!S.noAnim);
  document.querySelector('meta[name=theme-color]').content=d?'#000000':'#E9ECF8';
}
mq.addEventListener('change',()=>{apply();refreshTop()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)apply()});addEventListener('pageshow',()=>apply());

/* ---------- İkonlar ---------- */
const ICON={
 web:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>',
 image:'<svg viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 5C6.5 5 2.7 9.2 1.5 12c1.2 2.8 5 7 10.5 7s9.3-4.2 10.5-7C21.3 9.2 17.5 5 12 5zm0 3.2a3.8 3.8 0 110 7.6 3.8 3.8 0 010-7.6z"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/></svg>',
 video:'<svg viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zM9.8 8.3a.8.8 0 011.2-.7l5 3.3a.8.8 0 010 1.4l-5 3.3a.8.8 0 01-1.2-.7V8.3z"/></svg>'};
ICON.url='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>';
ICON.music='<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="8.2" cy="17.3" rx="3.8" ry="2.9" transform="rotate(-22 8.2 17.3)"/><rect x="10.7" y="3" width="2.2" height="14.3" rx="1"/><path d="M12.6 3.2c.7 3.4 4.7 3.8 5.7 8.2-1.3-2.1-3.3-3-5.7-3.1z"/></svg>';
ICON.ai='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 3l1.9 5.1L17 10l-5.1 1.9L10 17l-1.9-5.1L3 10l5.1-1.9z"/><path d="M18.5 3l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><path d="M18 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"/></svg>';
const DUCKM='<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.5 3a9 9 0 100 18 9 9 0 000-18zM8.2 7.4a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2z"/><circle cx="8.2" cy="10" r="1.1"/><path d="M20.4 10.9c1.9.1 3.2.8 3.2 1.9s-1.300 1.800-3.200 1.900z"/></svg>',DUCKC='<svg viewBox="0 0 24 24"><circle cx="11" cy="12" r="9.5" fill="#DE5833"/><circle cx="8.4" cy="10" r="2.6" fill="#fff"/><circle cx="8.4" cy="10" r="1.1" fill="#2d4f8e"/><path d="M17 10.8c3.3-.3 5.3.9 5.3 2.4S20.2 16.5 17 16z" fill="#FDD20A"/></svg>';
ICON.duck=DUCKM;
ICON.tl='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>';
ICON.film='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="11" rx="2.5"/><path d="M3 10l1.4-4a1.6 1.6 0 011.9-1L20.5 8.4 21 10M8 9.2l2.5-4.4M13.5 7.5L16 3.2"/></svg>';
const MFB=ICON.music.replace('<svg','<svg class="cvf"');
const chev='<svg class="chv" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l6 6-6 6"/></svg>';
const back='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
const tick='<svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5L19.5 7"/></svg>';
const tickW=tick.replace('class="tick"','').replace('stroke="currentColor"','stroke="currentColor"');

/* ---------- Ana ekran ---------- */
const q=$('#q'),home=$('#home');let mode='web';
const PH={web:'Ara…',url:'Ara…',image:'Ara…',video:'Ara…',music:'Şarkı sözü veya adı…',film:'Film veya dizi adı…',tl:'Çevrilecek metni yaz…',duck:'Duck’a sor…',ai:'Yazınız otomatik kopyalanır ve yapay zekanıza gönderilirsiniz'};
const LG={web:'ara',url:'www',image:'eye',video:'vid',music:'mus',film:'film',tl:'tl',duck:'duck',ai:'ai'};
let msugs=[],mAbort=null;
/* Tüm modlar gizliyse kompakt mod: tek satır, varsayılan web, i/ u/ v/ m/ d/ ai/ önekleri */
let CMP=false;
const PFXM={ai:'ai',i:'image',u:'url',v:'video',m:'music',d:'duck',f:'film',t:'tl'};
function pfxParse(v){const m=/^(ai|i|u|v|m|d|f|t)\/([\s\S]*)$/i.exec(v);if(!m)return null;const p=m[1].toLowerCase();return{p,k:PFXM[p],rest:m[2]}}
const QV=()=>{if(!CMP)return q.value;const r=pfxParse(q.value);return r?r.rest:q.value};
const QP=()=>{if(!CMP)return'';const r=pfxParse(q.value);return r?q.value.slice(0,q.value.length-r.rest.length):''};
function drawModes(){const N=Object.fromEntries(MODES),v=S.modes.filter(m=>m.on);CMP=!v.length;home.classList.toggle('cmp',CMP);q.rows=CMP?1:2;
  if(CMP){const r=pfxParse(q.value);mode=r?r.k:'web';$('#modes').innerHTML='';if(!r)q.placeholder='Ara…';return}
  if(!v.some(m=>m.k===mode))mode=v[0].k;
  $('#modes').innerHTML=v.map(m=>`<button class="m${m.k===mode?' on':''}" data-m="${m.k}" role="tab" aria-selected="${m.k===mode}" aria-label="${N[m.k]}">${ICON[m.k]}<span>${N[m.k]}</span></button>`).join('')}
drawModes();
let kcRaf=0;
function keepChip(b){const bar=$('#modes');if(!bar||!b)return;cancelAnimationFrame(kcRaf);const t0=performance.now();
  const tick=now=>{const br=bar.getBoundingClientRect(),cr=b.getBoundingClientRect(),L=cr.left-br.left+bar.scrollLeft,W=cr.width,pad=18,vw=bar.clientWidth;
    let want=bar.scrollLeft;if(L-pad<want)want=L-pad;else if(L+W+pad>want+vw)want=L+W+pad-vw;
    want=Math.max(0,Math.min(want,bar.scrollWidth-vw));const d=want-bar.scrollLeft;bar.scrollLeft+=Math.abs(d)<.5?d:d*.22;
    if(now-t0<900)kcRaf=requestAnimationFrame(tick)};
  kcRaf=requestAnimationFrame(tick)}
$('#modes').addEventListener('touchstart',()=>cancelAnimationFrame(kcRaf),{passive:true});
function setMode(k){
  mode=k;comp='';selI=-1;navBase=null;msugs=[];RES=null;
  q.inputMode=k==='url'?'url':'text';q.enterKeyHint=k==='url'?'go':'search';q.placeholder=PH[k];
  home.dataset.lg=LG[k];home.classList.toggle('imgmode',k==='image');
  if(k!=='duck')hideAns();
  if(q.value.trim()){sugs=[];onType()}else{renderGhost();drawSugg()}
  loadPop(k);if(k==='url')loadPopUrl();if(k==='music')loadTops();if(k==='film')loadFilms();if(k!=='film'&&k!=='tl')bigLoad(k==='duck'?'web':k);
  document.querySelectorAll('.m').forEach(b=>{const on=b.dataset.m===k;b.classList.toggle('on',on);b.setAttribute('aria-selected',on);if(on)keepChip(b)});
}
document.querySelector('.bar').addEventListener('mousedown',e=>e.preventDefault());
$('#modes').addEventListener('click',e=>{const b=e.target.closest('.m');if(!b)return;const k=b.dataset.m;
  if(k===mode&&(q.value.trim()||(k==='image'&&pic)))run(k);else setMode(k)});
function dropComp(){comp='';noAuto=true;selI=-1;renderGhost();drawSugg()}
function acceptComp(){q.value=q.value+comp+' ';comp='';noAuto=false;q.dispatchEvent(new Event('input'))}
function stepSel(d){
  if(mode==='music'){
    if(!msugs.length)return;
    selI=Math.max(-1,Math.min(msugs.length-1,selI+d));comp='';renderGhost();drawSugg();
    const el0=$('#sugg .sel');if(el0&&el0.scrollIntoView)el0.scrollIntoView({block:'nearest'});return;
  }
  if(!sugs.length)return;
  if(navBase===null)navBase=q.value;
  const i=selI+d;
  if(i<0){q.value=navBase;navBase=null;selI=-1;comp='';noAuto=true;renderGhost();drawSugg();return}
  const k=Math.min(i,sugs.length-1);
  q.value=QP()+sugs[k];comp='';selI=k;renderGhost();drawSugg();
  q.setSelectionRange(q.value.length,q.value.length);
  const el=$('#sugg .sel');if(el&&el.scrollIntoView)el.scrollIntoView({block:'nearest'});
}
const atEnd=()=>q.selectionStart===q.value.length&&q.selectionEnd===q.value.length;
/* Boşluk ve silme tuşu tamamlamayı etkilemez; yalnızca → tamamlamayı ekler. */
q.addEventListener('keydown',e=>{
  if(e.isComposing)return;
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();run(mode);return}
  if(e.key==='ArrowRight'&&comp&&atEnd()){e.preventDefault();acceptComp();return}
  if(e.key==='ArrowLeft'&&comp&&atEnd()){e.preventDefault();dropComp();return}
  if((e.key==='ArrowDown'||e.key==='ArrowUp')&&q.value.trim()&&(mode==='music'?msugs.length:sugs.length)){e.preventDefault();stepSel(e.key==='ArrowDown'?1:-1)}
});
const clr=$('#clr');
clr.addEventListener('mousedown',e=>e.preventDefault());
clr.addEventListener('click',()=>{const t=QV().trim();if(mode==='duck'&&t){recordH('web',t);leave().then(()=>{openSite(URLS.web.duckduckgo(encodeURIComponent(t)))});return}setPic(null);q.value='';comp='';q.style.height='auto';sugs=[];onType();q.focus()});
q.addEventListener('input',e=>{noAuto=!!(e.inputType&&e.inputType.startsWith('delete'));q.style.height='auto';q.style.height=Math.min(q.scrollHeight,144)+'px';onType()});
const POOL={
 web:['hava durumu','dolar kuru','namaz vakitleri','altın fiyatları','nöbetçi eczane','son dakika haberler','deprem son dakika','borsa istanbul','yemek tarifleri','iphone fiyatları','sınav takvimi','maç sonuçları','film önerileri','kargo takip','e-devlet giriş','tatil önerileri','euro kuru','akaryakıt fiyatları','bugün ne pişirsem','google çeviri'],
 image:['kedi resimleri','iphone duvar kağıdı','manzara fotoğrafları','anime wallpaper','uzay görselleri','istanbul fotoğrafları','çiçek resimleri','köpek yavrusu','gün batımı','minimalist arka plan','araba resimleri','dağ manzarası','galaksi','pixel art','dövme tasarımları','ev dekorasyon fikirleri','4k doğa','sanat tabloları','yemek fotoğrafları','okyanus'],
 video:['yeni çıkan şarkılar','komik videolar','lo-fi müzik','fragman','ev egzersizi','kedi videoları','belgesel','stand up','teknoloji inceleme','yemek tarifi','oyun oynanış','podcast','relax müzik','makyaj','kamp vlog','ders anlatımı','canlı müzik','maç özeti','seyahat vlog','swift öğren']};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const SEED={"web":[["canlı maç izle",3],["dolar kaç tl",2],["hava durumu [Şehir]",1],["nöbetçi eczane",2],["ehliyet randevu al",1],["netflix şifre değiştirme",1],["instagram giriş",3],["whatsapp web",3],["canlı skor",3],["altın fiyatları",2]],"image":{"pinterest":[["tırnak modelleri 2026",3],["saç kesim modelleri",3],["salon dekorasyon fikirleri",2],["yılbaşı ağacı süsleri",2],["estetik tırnak tasarımları",2],["oda düzenleme fikirleri",1]],"google":[["anime wallpaper 4k",1],["gelinlik modelleri",3],["erkek saç modelleri",2],["çizgi film karakterleri",1]]},"video":{"youtube":[["canlı futbol maçı izle",3],["yemek tarifleri",2],["çizgi film izle",2],["lofi hip hop radio",1],["minecraft survival",2],["spor haberleri",3],["bebek ninnileri",1],["eğlenceli videolar",2],["nasıl yapılır",2]],"google":[["manşet haberleri",3]]}};
const wshuf=a=>a.map(([t,w])=>[t,Math.random()**(1/w)]).sort((x,y)=>y[1]-x[1]).map(z=>z[0]);
POOL.web=wshuf(SEED.web);POOL.image=wshuf(Object.values(SEED.image).flat());POOL.video=wshuf(Object.values(SEED.video).flat());
function seedFor(m){const c=()=>(S.profile&&(S.profile.district||S.profile.city))||'';
  const l=m==='web'?SEED.web:((SEED[m]||{})[curEng(m)]||[]),fx=x=>x.replace('[Şehir]',c()).trim();
  const oth=['web','image','video'].filter(o=>o!==m).flatMap(o=>POOL[o]||[]);
  return[...new Set([...wshuf(l).map(fx),...shuf(POOL[m]||[]).map(fx),...shuf(oth).map(fx)])].filter(Boolean)}
const POP={};for(const k in POOL)POP[k]=POOL[k].filter(x=>!x.includes('[Şehir]')).slice(0,NPOP);
let sugs=[],sAbort,sTimer;
const sIc='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';
const INS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 17L7 7"/><path d="M7 16V7h9"/></svg>';
const favIcon=h=>h?`<img class="fv" src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(h)}&sz=64" alt="" onerror="this.outerHTML=ICON.url">`:ICON.url;
const rowHTML=(s,ic,sel)=>`<div class="row srow${sel?' sel':''}"><button class="main" data-sq="${esc(s)}">${ic||sIc}<span>${esc(s)}</span></button><button class="ins" data-ins="${esc(s)}" aria-label="Aramaya ekle">${INS}</button></div>`;
const PQ={},LET='abcçdefgğhıijklmnoöprsştuüvyz';
const popFor=()=>{const p=PQ[mode];return p&&p.list?p:{list:POP[mode],src:''}};
function musicRow(s,i,sel){
  const cov=s.cover?`<img class="cv" src="${esc(s.cover)}" alt="" referrerpolicy="no-referrer" onerror="this.outerHTML=MFB">`:MFB;
  return `<div class="row srow${sel?' sel':''}"><button class="main" data-mi="${i}">${cov}<span class="two"><b>${esc(s.title)}</b><small>${esc(s.artist)}</small>${s.plat?`<small class="pl">${esc(s.plat)}</small>`:''}</span></button></div>`;
}
const fold=x=>String(x||'').toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').trim();
let SONGS=null;
function songsLoad(){if(SONGS)return SONGS;const raw=(window.LUNAI_DB||{}).songs||'';
  return SONGS=raw?raw.split('\n').map(l=>{const a=l.split('|');return{k:a[0],w:+a[1],a:a[2],b:a[3],f:fold(a[2]),g:fold(a[3])}}):[]}
function localSongs(t){const q=fold(t),ws=q.split(/\s+/).filter(Boolean);if(q.length<2)return[];const r=[];
  for(const x of songsLoad()){const key=x.k==='A'?x.f:x.f+' '+x.g,kw=key.split(' ');
    const sc=x.f.startsWith(q)?0:(x.k==='S'&&x.g.startsWith(q))?0:ws.every(w=>kw.some(z=>z.startsWith(w)))?1:key.includes(q)?2:9;if(sc<9)r.push([sc,x.k==='A'?0:1,-x.w,x])}
  r.sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]);
  return r.slice(0,8).map(([,,,x])=>x.k==='A'?{title:x.a,artist:x.b,q:x.a,tr:true,local:1,line:''}:{title:x.a,artist:x.b,tr:true,local:1,line:''})}
const VOC={f:[],o:[],c:[],m:new Map(),L:[]};
function vocAdd(w,c){const f=fold(w);if(f.length<3||f.length>24||/[^a-z]/.test(f))return;
  const i=VOC.m.get(f);if(i!==undefined){if(c)VOC.c[i]=1;return}
  const n=VOC.f.length;VOC.m.set(f,n);(VOC.L[f.length]=VOC.L[f.length]||[]).push(n);VOC.f.push(f);VOC.o.push(String(w).toLocaleLowerCase('tr'));VOC.c.push(c?1:0)}
let vocDone=false;
function vocInit(){if(vocDone)return;vocDone=true;
  for(const k of['web','image','video'])for(const x of dbLoad(k))for(const w of x.t.split(' '))vocAdd(w,1);
  for(const x of songsLoad())for(const w of(x.a+' '+x.b).split(' '))vocAdd(w,1);
  for(const d of dbUrl())vocAdd(d.split('.')[0],1);
  for(const x of LRN)for(const w of x.t.split(' '))vocAdd(w,1)}
function dl(a,b,k){const n=a.length,m=b.length;if(Math.abs(n-m)>k)return k+1;let p2=null,p=Array.from({length:m+1},(_,j)=>j);
  for(let i=1;i<=n;i++){const c=[i];let mn=i;for(let j=1;j<=m;j++){let v=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));
    if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])v=Math.min(v,p2[j-2]+1);c[j]=v;if(v<mn)mn=v}
    if(mn>k)return k+1;p2=p;p=c}return p[m]}
function fixTok(tok,last){const f=fold(tok);if(f.length<4||/[^a-z]/.test(f))return null;vocInit();if(VOC.m.has(f))return null;
  for(let j=f.length-1;j>=Math.max(3,f.length-6);j--)if(VOC.m.has(f.slice(0,j)))return null;
  if(last&&VOC.f.some(x=>x.startsWith(f)))return null;
  const k=f.length>=8?2:1;let best=-1,bd=9;
  for(let n=f.length-k;n<=f.length+k;n++){const l=VOC.L[n];if(!l)continue;
    for(const i of l){const d=dl(f,VOC.f[i],k);if(d>k)continue;
      if(best<0||d<bd||(d===bd&&(VOC.c[i]>VOC.c[best]||(VOC.c[i]===VOC.c[best]&&Math.abs(VOC.f[i].length-f.length)<Math.abs(VOC.f[best].length-f.length))))){bd=d;best=i}}}
  return best<0?null:{w:VOC.o[best],c:VOC.c[best],d:bd}}
const FXC=new Map();
const dbExact=t=>['web','image','video'].some(k=>dbLoad(k).some(x=>x.t===t));
function fixInfo(t){if(FXC.has(t))return FXC.get(t);const ly=LTY.get(fold(t));if(ly&&fold(ly)!==fold(t)){const r={text:ly,sure:true};FXC.set(t,r);return r}
  const ts=t.split(/\s+/);let ch=false,allC=true,d1=true;
  const out=ts.map((w,i)=>{const r=/^\p{L}+$/u.test(w)?fixTok(w,i===ts.length-1):null;if(!r)return w;ch=true;if(!r.c)allC=false;if(r.d>1)d1=false;return r.w});
  const text=ch?out.join(' '):'',res={text,sure:ch&&allC&&(d1||VOC.f.length>20000||dbExact(text))};
  if(FXC.size>200)FXC.clear();FXC.set(t,res);return res}
const fixQuery=t=>fixInfo(t).text;
const ADT_T=new Set(['porn','porno','sex','seks','seksi','sexs','sexy','sexcam','sik','sikis','nude','nudes','naked','dick','cock','pussy','tits','boobs','milf','bdsm','swinger','blowjob','handjob','creampie','bukkake','onlyfans','xnxx','xvideos','xhamster','redtube','brazzers','pornhub','nsfw','hentai','erotik','erotic','eskort','escort','fahise','orospu','yarrak','amcik','lezbiyen']);
const ADT_P=['porn','xxx','hentai','erotik','eskort','sikis','sikik','siktir','orospu','amcik','yarrak','mastur','fetis'];
function isAdult(t){return fold(t).split(/[^a-z0-9]+/).filter(Boolean).some(x=>ADT_T.has(x)||ADT_P.some(p=>x.startsWith(p)))}
const okSug=t=>{const f=fold(t);return !S.blocked.includes(f)&&!(S.adult&&isAdult(t))};
function rebuildL(){LTY.clear();for(const x of LRN)for(const o of(x.o||[]))if(o&&o!==fold(x.t))LTY.set(o,x.t);FXC.clear()}
rebuildL();
function bigHas(k,t){const D=BIG[k==='duck'?'web':k];if(!D)return false;const q=fold(t);if(q.length<2)return false;const key=bkey(q[0])*38+bkey(q[1]);
  for(let j=D.BS[key];j<D.BS[key+1];j++){const i=D.B[j];if(fold(D.s.slice(D.O[i],D.O[i+1]-1))===q)return true}return false}
function inResults(m,t){const f=fold(t);
  if(m==='music')return msugs.some(x=>fold(x.title)===f||fold(x.title+' '+x.artist)===f);
  if(sugs.some(x=>fold(x)===f))return true;
  return dbLoad(m).some(x=>fold(x.t)===f)||bigHas(m,t)}
const skipLearn=t=>(S.adult&&isAdult(t))||/@|\d{6,}/.test(t)||/^https?:\/\//i.test(t)||/^w\/[a-z0-9]+$/i.test(t)||/^[\d\s+\-*\/^().,%=x×÷]+$/i.test(t)||/(^|\s)hava(\s*durumu)?(\s|$)/i.test(t)||fold(t)==='not';
function learnQ(kind,raw,fixed){
  const m=kind==='duck'?'web':kind;if(!LK.includes(m))return;
  const t=String(fixed||raw||'').replace(/\s+/g,' ').trim().toLocaleLowerCase('tr'),r0=fold(raw);
  if(t.length<3||t.length>120||skipLearn(t))return;
  const f=fold(t);let x=LRN.find(y=>y.m===m&&fold(y.t)===f);
  if(x){x.w++;x.ts=Date.now()}
  else{
    if(!(fixed&&fixed!==raw)&&inResults(m,t))return;
    x={t,m,w:1,ts:Date.now(),o:[]};LRN.unshift(x)}
  if(r0&&r0!==f&&!(x.o||[]).includes(r0)){x.o=[r0,...(x.o||[])].slice(0,5)}
  if(LRN.length>800){LRN.sort((a,b)=>b.w-a.w||b.ts-a.ts);LRN.length=800}
  if(vocDone)for(const w of t.split(' '))vocAdd(w,1);
  rebuildL();saveL()}
function lrnSug(m,t){const k=m==='duck'?'web':m;if(!LRN.length)return[];
  const q=fold(t),ws=q.split(/\s+/).filter(Boolean);if(!q)return[];const r=[];
  for(const x of LRN){if(x.m!==k)continue;const y=fold(x.t);if(y===q)continue;const yw=y.split(' ');
    const s=y.startsWith(q)?0:ws.every(w=>yw.some(z=>z.startsWith(w)))?1:(q.length>=3&&y.includes(q))?2:(q.length>=4&&!/[^a-z ]/.test(q)&&dl(q,y.slice(0,q.length+1),1)<=1)?3:9;
    if(s<9)r.push([s,-x.w,-x.ts,x.t])}
  return r.sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]).slice(0,4).map(z=>z[3])}
const BIG={},FMB={'ı':'i','ö':'o','ü':'u','ş':'s','ç':'c','ğ':'g','İ':'i','â':'a','î':'i','û':'u'};
const bkey=c=>{c=FMB[c]||c;const x=c.charCodeAt(0);return x>=97&&x<=122?x-97:x>=48&&x<=57?x-22:x===32?36:37};
async function bigLoad(k){if(BIG[k]!==undefined)return;const b64=(window.LUNAI_BIG||{})[k];if(!b64||typeof DecompressionStream==='undefined')return;BIG[k]=null;
  try{const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
    const s=await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
    let n=1;for(let i=s.indexOf('\n');i>=0;i=s.indexOf('\n',i+1))n++;
    const O=new Int32Array(n+1);let c=1,p=s.indexOf('\n');while(p>=0){O[c++]=p+1;p=s.indexOf('\n',p+1)}O[n]=s.length+1;
    const BS=new Int32Array(1446),B=new Int32Array(n),key=new Int16Array(n);
    for(let i=0;i<n;i++){const a=O[i];const kk=bkey(s[a]||' ')*38+bkey(s[a+1]&&s[a+1]!=='\n'?s[a+1]:' ');key[i]=kk;BS[kk+1]++}
    for(let i=0;i<1445;i++)BS[i+1]+=BS[i];
    const pos=BS.slice();for(let i=0;i<n;i++)B[pos[key[i]]++]=i;
    BIG[k]={s,O,B,BS,n};delete window.LUNAI_BIG[k];
    const t=QV().trim();if(t&&(mode===k||(k==='web'&&mode==='duck')||(['web','image','video','duck'].includes(mode)&&['web','image','video'].includes(k)))){if(mode==='url')onType();else{sugs=mergeDb(sugs,t);drawSugg()}}
  }catch(e){BIG[k]=null}}
function bigSug(m,t,max){const k=m==='duck'?'web':m,D=BIG[k];if(!D)return[];const q=fold(t);if(q.length<2)return[];
  const key=bkey(q[0])*38+bkey(q[1]),r=[];
  for(let j=D.BS[key];j<D.BS[key+1]&&r.length<(max||8);j++){const i=D.B[j],line=D.s.slice(D.O[i],D.O[i+1]-1);const f=fold(line);if(f.startsWith(q)&&f!==q)r.push(line)}
  return r}
let sLoad=false,WX=null,SM=null,lpAt=0,RES=null,rT=0,FQ={t:'',items:[]},FILM=null,FLIST=[],fAbort=null,TLS={t:'',out:'',det:'',to:'',err:''},tAbort=null;
function rerank(l,t,cut){const k=t.toLowerCase(),lw=k.split(/\s+/).pop();const sc=x=>{const y=x.toLowerCase();return y===k?0:y.startsWith(k)?1:y.split(/\s+/).some(w=>w.startsWith(lw))?2:y.includes(k)?3:4};
  const r=l.map((x,i)=>[x,i,sc(x)]).sort((a,b)=>a[2]-b[2]||a[1]-b[1]);return(cut?r.filter(z=>z[2]<4):r).map(z=>z[0])}
function drawSugg(){_drawSugg();const box=$('#sugg'),t=QV().trim();if(noteOn())return;if(mode==='web'&&SM&&SM.t===t)box.insertAdjacentHTML('afterbegin',SM.html);if(RES&&RES.m===mode&&t)box.insertAdjacentHTML('beforeend',resHTML(RES,RES.t!==t));
  if(mode==='web'&&WX&&WX.t===t)box.insertAdjacentHTML('afterbegin',WX.html||'<div class="ld"><span class="spin"></span></div>');
  if(sLoad&&t)box.insertAdjacentHTML('beforeend','<div class="ld" role="status" aria-label="Aranıyor"><span class="spin"></span></div>')}
function _drawSugg(){
  const typing=!!QV().trim(),tf=!!q.value.trim(),box=$('#sugg');
  if(noteOn()){home.classList.add('typing');$('#favs').style.display='none';if(!box.querySelector('.note'))box.innerHTML=noteHTML();return}
  const lv=typeof ansVisible==='function'&&ansVisible();
  if(mode==='ai'){home.classList.remove('typing');$('#favs').style.display=(lv||S.hideFav)?'none':'';box.innerHTML='';return}
  home.classList.toggle('typing',tf);
  $('#favs').style.display=(tf||lv||S.hideFav)?'none':'';
  if(mode==='music'){const M=typing?msugs:TOPS;box.innerHTML=M.length?`<div class="grp">${M.map((s,i)=>musicRow(s,i,typing&&i===selI)).join('')}</div>`:'';return}
  if(mode==='tl'){box.innerHTML=tlHTML();return}
  if(mode==='film'){let h='';FLIST=[];
    const sec=(ti,l)=>{if(!l||!l.length)return'';const b=FLIST.length;FLIST.push(...l);return `<div class="rhd">${ti}</div><div class="grp">${l.map((f,i)=>filmRow(f,b+i)).join('')}</div>`};
    if(typing){const t=QV().trim(),live=FQ.t===t?FQ.items:[],trI=FQ.t===t?(FQ.tr||[]):[],loc=localFilms(t,30);
      const withR=x=>{const m=dbById(x.id);return m?{...x,rating:x.rating||m.r,votes:x.votes||m.v}:x};
      const seen=new Set(),all=[];for(const x of[...trI,...live,...loc]){if(!x||!x.id||seen.has(x.id))continue;seen.add(x.id);all.push(withR(x))}
      h=all.length?sec('Sonuçlar',all.slice(0,30)):(sLoad?'':'<div class="rhd">Sonuç bulunamadı · Enter ile IMDb’de ara</div>')}
    else{const F=FILM||{new:[],top:[],wd:[]};
      const nw=F.new.length?['Yeni çıkanlar',F.new]:F.wd.length?['Yeni çıkanlar',F.wd]:FDB?['Veri tabanından son çıkanlar',dbLatest()]:null;
      const tp=F.top.length?['Son bir yılın en yüksek IMDb puanlıları',F.top]:FDB?['En yüksek puanlılar',dbTop()]:null;
      h=(nw?sec(nw[0],nw[1]):'')+(tp?sec(tp[0],tp[1]):'');if(!h)h='<div class="rhd">Film listesi yükleniyor…</div>'}
    box.innerHTML=h;setTimeout(fillAvail,0);setTimeout(()=>enrichTR(FLIST),250);return}
  let items=[],head='';
  if(typing)items=mode==='ai'?[]:sugs;
  else{
    const rc=S.hist?H.filter(h=>h.m===mode).slice(0,5).map(h=>h.q):[];
    if(rc.length){items=rc;head='Son Aramalar'}
    else if(S.hidePop){items=[]}
    else if(mode==='url'){items=PQU.list||POPURL}
    else if(mode==='web'||mode==='image'||mode==='video')items=popFor().list
  }
  items=items.filter(okSug);
  box.innerHTML=items.length?`<div class="grp">${items.map((s,i)=>rowHTML(s,mode==='url'?favIcon(host(s)):'',typing&&i===selI)).join('')}</div>`:'';
}
/* motor önerileri */
const PROXY=(window.LUNAI_PROXY||'').replace(/\/$/,'');
const SCID=String(window.LUNAI_SC_ID||'').trim(),SC_OK=!!(PROXY||SCID);
const scMap=x=>{if(!x||!x.title)return null;let title=String(x.title).trim(),artist=(x.publisher_metadata&&x.publisher_metadata.artist)||'';
  const m=/^(.{2,45}?)\s[-–—]\s(.{2,})$/.exec(title);if(m){artist=m[1];title=m[2]}
  return{title,artist:artist||(x.user&&x.user.username)||'',cover:String(x.artwork_url||(x.user&&x.user.avatar_url)||'').replace('-large.','-t200x200.'),line:'',sc:x.permalink_url||'',tr:false}};
async function soundcloud(t,signal){
  if(!SC_OK)return[];
  const e=encodeURIComponent(t),u=PROXY?PROXY+'/?sc='+e:'https://api-v2.soundcloud.com/search/tracks?q='+e+'&client_id='+SCID+'&limit=15&app_locale=tr';
  const j=await(await fetch(u,{signal})).json();
  return(j.collection||[]).map(scMap).filter(Boolean)}
async function lunaMusic(t,signal){
  if(!PROXY)return[];
  const j=await(await fetch(PROXY+'/?mode=music&n=30&q='+encodeURIComponent(t),{signal})).json();
  return(j.results||[]).filter(x=>x&&x.title).map(x=>({title:x.title,artist:x.artist||'',cover:x.cover||'',line:'',url:x.source==='Apple Music'?x.url:'',dz:x.source==='Deezer'?x.url:'',sc:x.source==='SoundCloud'?x.url:'',tr:false}))}
const px=u=>PROXY&&/^https:\/\/(sozluk\.gov\.tr|genius\.com|search\.yahoo\.com|duckduckgo\.com|suggest\.yandex\.com|www\.pinterest\.com|api\.bing\.com)\//.test(u)?PROXY+'/?u='+encodeURIComponent(u):u;
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{});
const DBX={};
function dbLoad(k){if(DBX[k])return DBX[k];const raw=(window.LUNAI_DB||{})[k]||'';
  return DBX[k]=raw?raw.split('\n').map(l=>{const a=l.split('|');return(k==='web'||k==='url')?{e:'',w:+a[0],t:a[1]}:{e:a[0],w:+a[1],t:a[2]}}):[]}
const dbUrl=()=>dbLoad('url').map(x=>x.t);
function dbSug(m,t){const k=m==='duck'?'web':m;if(k!=='web'&&k!=='image'&&k!=='video')return[];
  const e=m==='duck'?'google':curEng(m),key=k==='image'?({pinterest:'p',google:'g'})[e]:k==='video'?({youtube:'y',google:'g'})[e]:'';
  const ws=t.toLowerCase().split(/\s+/).filter(Boolean),q=ws.join(' '),r=[];
  for(const x of dbLoad(k)){if(key&&x.e!==key)continue;const y=x.t,yw=y.split(' ');
    const s=y.startsWith(q)?0:ws.every(w=>yw.some(z=>z.startsWith(w)))?1:y.includes(q)?2:9;if(s<9)r.push([s,-x.w,y])}
  return r.sort((a,b)=>a[0]-b[0]||a[1]-b[1]).slice(0,8).map(z=>z[2]).filter(y=>y!==q)}
let WORDS=null;
async function wordsInit(){if(WORDS)return;let l=[];try{const c=localStorage.getItem('lunai_tdk');if(c)l=c.split('\n')}catch(e){}
  if(l.length<1000){const u='https://sozluk.gov.tr/autocomplete.json';for(const x of[u,px(u)]){try{const j=await(await fetch(x)).json();const a=j.map(y=>typeof y==='string'?y:y&&y.madde).filter(Boolean).map(y=>y.toLocaleLowerCase('tr'));
    if(a.length>1000){l=[...new Set(a)].sort();try{localStorage.setItem('lunai_tdk',l.join('\n'))}catch(e){}break}}catch(e){}}}
  vocInit();for(const w of l)vocAdd(w,0);FXC.clear();
  const v=new Set(l);for(const k of['web','image','video'])for(const x of dbLoad(k))for(const w of x.t.split(' '))if(/^[a-zçğıöşüâîû]{3,}$/.test(w))v.add(w);
  WORDS=[...v].sort()}
setTimeout(wordsInit,1200);setTimeout(()=>bigLoad('web'),500);
function wordSug(t){if(!WORDS)return[];const m=/(\S+)$/.exec(t);if(!m||m[1].length<2)return[];const w=m[1].toLocaleLowerCase('tr'),pre=t.slice(0,t.length-m[1].length);
  let lo=0,hi=WORDS.length;while(lo<hi){const mid=(lo+hi)>>1;if(WORDS[mid]<w)lo=mid+1;else hi=mid}
  const r=[];for(let i=lo;i<WORDS.length&&r.length<16&&WORDS[i].startsWith(w);i++)if(WORDS[i]!==w)r.push(WORDS[i]);
  const out=r.sort((a,b)=>a.length-b.length).slice(0,5).map(x=>pre+x);
  if(!pre&&WORDS[lo]===w&&mode==='web')out.push(w+' ne demek',w+' anlamı');return out}
function otherSug(t,max){const own=mode==='duck'?'web':mode,r=[];
  for(const o of['web','image','video']){if(o===own)continue;if(BIG[o]===undefined)bigLoad(o);
    for(const x of[...bigSug(o,t,max),...dbSug(o,t)])r.push(x)}
  return r}
function mergeDb(l,t){if(mode==='ai'||mode==='url'||mode==='music')return l.filter(okSug).slice(0,NSUG);
  const fx=fixQuery(t),q=fx||t,b=t.toLowerCase(),live=[...new Set(l)].filter(Boolean);
  let out;if(live.length>=NSUG)out=live.slice(0,NSUG);else{
    const fill=[...(fx&&live.length<3?[fx]:[]),...bigSug(mode,q,8),...dbSug(mode,q),...wordSug(q)];
    out=[...new Set([...live,...fill])];if(out.length<NSUG)out=[...out,...otherSug(q,10)];out=[...new Set(out)].slice(0,NSUG)}
  {const L=[...new Set([...lrnSug(mode,t),...(fx?lrnSug(mode,fx):[])])],Lp=L.filter(x=>x.toLowerCase().startsWith(b)),Lo=L.filter(x=>!Lp.includes(x));
   if(L.length)out=[...new Set([...Lp.slice(0,2),...out.slice(0,1),...Lo.slice(0,2),...out.slice(1)])].slice(0,NSUG)}
  out=out.filter(okSug);
  const k=out.slice(0,4).findIndex(x=>x.toLowerCase().startsWith(b)&&x.length>b.length);if(k>0)out.unshift(...out.splice(k,1));
  return out}
const SGC=new Map();
function cachedLive(m,t){const eng=m==='duck'?'google':curEng(m),fx=fixQuery(t)||t;for(let n=fx.length;n>=2;n--){const c=SGC.get(eng+'|'+m+'|'+fx.slice(0,n));if(c)return c.list}return null}
const SG={
 google:t=>`https://suggestqueries.google.com/complete/search?client=firefox&hl=tr&q=${t}`,
 youtube:t=>`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&hl=tr&q=${t}`,
 bing:t=>`https://api.bing.com/osjson.aspx?language=tr&query=${t}`,
 yahoo:t=>`https://search.yahoo.com/sugg/gossip/gossip-us-ura/?output=json&command=${t}`,
 duckduckgo:t=>`https://duckduckgo.com/ac/?kl=tr-tr&q=${t}`,
 yandex:t=>`https://suggest.yandex.com/suggest-ff.cgi?part=${t}&uil=tr&n=7`,
  pinterest:t=>`https://www.pinterest.com/resource/AdvancedTypeaheadResource/get/?data=${encodeURIComponent(JSON.stringify({options:{term:decodeURIComponent(t)}}))}`};
const SGV={yandex:t=>`https://suggest.yandex.com/suggest-ff.cgi?part=${t}&uil=tr&n=7&srv=video`};
function parseSg(j){
  if(Array.isArray(j)){
    if(Array.isArray(j[1]))return j[1].map(x=>typeof x==='string'?x:(x&&x.phrase)||'').filter(Boolean);
    return j.map(x=>x&&x.phrase).filter(Boolean);
  }
  if(j&&j.resource_response&&j.resource_response.data&&Array.isArray(j.resource_response.data.items))return j.resource_response.data.items.map(x=>x.term||x.query).filter(Boolean);
  if(j&&j.gossip&&Array.isArray(j.gossip.results))return j.gossip.results.map(x=>x.key).filter(Boolean);
  return[];
}
async function sg(eng,text,signal,kind){const ck=eng+'|'+kind+'|'+text,c=SGC.get(ck);if(c)return c;
  let r=await sg0(eng,text,signal,kind);
  if(!r.list.length&&eng!=='google'&&(kind==='web'||kind==='duck')){try{r=await sg0('google',text,signal,kind)}catch(e){if(e&&e.name==='AbortError')throw e}}
  if(r.list.length){if(SGC.size>500)SGC.clear();SGC.set(ck,r)}return r}
async function sg0(eng,text,signal,kind){
  const u=encodeURIComponent(text),tryE=async url=>{const r=await fetch(px(url),{signal});return parseSg(await r.json())};
  try{const l=await tryE((kind==='video'&&SGV[eng]?SGV[eng]:SG[eng])(u));if(l.length)return{list:l,src:''}}
  catch(err){if(err&&err.name==='AbortError')throw err}
  if(eng==='pinterest'){try{const l=await tryE(SG.google(u));if(l.length)return{list:l,src:''}}catch(err){if(err&&err.name==='AbortError')throw err}}
  return{list:[],src:''};
}
async function trendTR(){try{const d=new Date(Date.now()-1728e5),p=n=>String(n).padStart(2,'0');
  const j=await(await fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/tr.wikipedia/all-access/${d.getFullYear()}/${p(d.getMonth()+1)}/${p(d.getDate())}`)).json();
  return j.items[0].articles.map(a=>decodeURIComponent(a.article).replace(/_/g,' ')).filter(a=>!a.includes(':')&&a!=='Ana Sayfa').slice(0,30)}catch(e){return[]}}
async function loadPop(m){
  if(m!=='web'&&m!=='image'&&m!=='video')return;
  const eng=curEng(m),key=m+eng;if(PQ[m]&&PQ[m].key===key)return;PQ[m]={key,list:null};
  try{
    const rs=await Promise.all(shuf([...LET]).slice(0,7).map(s=>sg(eng,s,undefined,m).catch(()=>({list:[],src:''}))));
    const out=[];let src='';
    for(const r of rs){if(r.src)src=r.src;const x=r.list.find(v=>!out.includes(v));if(x)out.push(x)}
    const tr=m==='web'?shuf(await trendTR()).slice(0,6):[],mix=shuf([...out,...tr]);for(const p of seedFor(m)){if(mix.length>=NPOP)break;if(!mix.includes(p))mix.push(p)}PQ[m]={key,list:mix.slice(0,NPOP),src:''}
  }catch(e){}
  if(m===mode)drawSugg();
}
let comp='',noAuto=false,selI=-1,navBase=null;
const TOP=['google.com','youtube.com','facebook.com','instagram.com','whatsapp.com','wikipedia.org','x.com','amazon.com','amazon.com.tr','netflix.com','linkedin.com','tiktok.com','reddit.com','yahoo.com','bing.com','duckduckgo.com','yandex.com','apple.com','microsoft.com','github.com','chatgpt.com','claude.ai','gemini.google.com','openai.com','spotify.com','twitch.tv','pinterest.com','ebay.com','trendyol.com','hepsiburada.com','n11.com','sahibinden.com','ciceksepeti.com','yemeksepeti.com','getir.com','migros.com.tr','a101.com.tr','turkcell.com.tr','vodafone.com.tr','turktelekom.com.tr','turkiye.gov.tr','ptt.gov.tr','hurriyet.com.tr','milliyet.com.tr','sabah.com.tr','sozcu.com.tr','ntv.com.tr','cnnturk.com','haberturk.com','eksisozluk.com','donanimhaber.com','webtekno.com','mynet.com','akbank.com','garantibbva.com.tr','isbank.com.tr','ziraatbank.com.tr','yapikredi.com.tr','enpara.com','turkishairlines.com','flypgs.com','booking.com','tripadvisor.com','airbnb.com','translate.google.com','maps.google.com','drive.google.com','gmail.com','outlook.com','office.com','zoom.us','discord.com','telegram.org','medium.com','quora.com','stackoverflow.com','imdb.com','disneyplus.com','exxen.com','gain.tv','tabii.com','mackolik.com','sporx.com','fanatik.com.tr','trt.net.tr','yemek.com','nefisyemektarifleri.com','tcdd.gov.tr','edevlet.gov.tr','kitapyurdu.com','dr.com.tr','teknosa.com','mediamarkt.com.tr'];
const TRTOP=[...new Set(["trendyol.com", "sahibinden.com", "hepsiburada.com", "eksisozluk.com", "milliyet.com.tr", "hurriyet.com.tr", "ntv.com.tr", "turkiye.gov.tr", "sgk.gov.tr", "e-okul.meb.gov.tr"].concat(['google.com','youtube.com','n11.com','sabah.com.tr','sozcu.com.tr','mynet.com','yemeksepeti.com','getir.com','instagram.com','x.com','facebook.com','netflix.com','wikipedia.org']))];
const POPURL=shuf(TRTOP.slice(0,10)).slice(0,5);
const urlSugs=t=>urlSugs0(t).filter(okSug);
function urlSugs0(t){
  t=t.toLowerCase().replace(/^https?:\/\//,'').replace(/^www\./,'');
  if(!t||t.includes('/'))return[];
  const pool=[...new Set([...S.favs.map(f=>host(f.url)).filter(Boolean),...dbUrl(),...TRTOP,...TOP])];
  const r=[...pool.filter(d=>d.startsWith(t)),...pool.filter(d=>!d.startsWith(t)&&d.includes(t))];if(r.length||bigSug('url',t,1).length)return[...new Set([...r.slice(0,4),...bigSug('url',t,6),...r.slice(4)])].slice(0,10);
  const ft=fold(t);if(ft.length<4)return[];return pool.filter(d=>{const n=fold(d.split('.')[0]);return dl(ft,n.slice(0,ft.length+1),1)<=1||dl(ft,n,ft.length>=7?2:1)<=(ft.length>=7?2:1)}).slice(0,6);
}
function toURL(t){
  t=t.trim();
  if(/^https?:\/\//i.test(t))return t;
  if(/^[\w-]+(\.[\w-]+)+(:\d+)?([\/?#]\S*)?$/.test(t))return'https://'+t;
  return URLS.web[curEng('web')](encodeURIComponent(t));
}
function lyricRest(line,v){
  const tt=v.trim().toLowerCase();if(!tt||!line)return'';
  for(const ln of String(line).split('\n')){const l=ln.replace(/<[^>]+>/g,'').trim(),i=l.toLowerCase().indexOf(tt);
    if(i>=0){let rest=l.slice(i+tt.length).replace(/\s+$/,'');if(/\s$/.test(v))rest=rest.replace(/^\s/,'');if(rest.trim())return rest}}
  return'';
}
function computeComp(){
  const v=QV();if(noAuto||!S.autoComp||!v.trim()||mode==='ai')return'';
  if(mode==='music'){const m0=msugs[0];if(!m0)return'';if(m0.line)return lyricRest(m0.line,v);const a=m0.title.toLowerCase(),b=v.toLowerCase();return a.startsWith(b)&&a.length>b.length?m0.title.slice(v.length):''}
  const top=sugs[0];if(!top)return'';
  const a=top.toLowerCase(),b=v.toLowerCase();
  return(a.startsWith(b)&&a.length>b.length)?top.slice(v.length):'';
}
function renderGhost(){$('#ghost').innerHTML=comp?`<span style="visibility:hidden">${esc(q.value)}</span><span class="gc">${esc(comp)}</span>`:''}
const toHost=s=>{s=String(s).trim().toLowerCase().replace(/^https?:\/\//,'').replace(/^www\./,'').split(/[\/?#\s]/)[0];return/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(s)?s:''};
async function sgG(text,signal){const r=await fetch(SG.google(encodeURIComponent(text)),{signal});return parseSg(await r.json())}
const PQU={list:null,busy:false};
async function loadPopUrl(){
  if(PQU.list||PQU.busy)return;PQU.busy=true;
  try{
    const rs=await Promise.all(shuf([...LET]).slice(0,7).map(s=>sgG('www.'+s).catch(()=>[])));
    const out=[];for(const l of rs){const x=l.map(toHost).find(v=>v&&!out.includes(v));if(x)out.push(x)}
    if(out.length>=3){for(const d of TOP){if(out.length>=5)break;if(!out.includes(d))out.push(d)}PQU.list=out.slice(0,5)}
  }catch(e){}
  PQU.busy=false;if(mode==='url')drawSugg();
}
async function fetchUrlG(t){
  if(sAbort)sAbort.abort();sAbort=new AbortController();
  try{
    const g=(await sgG('www.'+t,sAbort.signal)).map(toHost).filter(Boolean);
    try{const txt=(await sgG(t,sAbort.signal)).join(' ').toLowerCase();g.push(...TRTOP.concat(TOP).filter(d=>d.startsWith(t.toLowerCase())||txt.includes(d.split('.')[0])&&d.split('.')[0].length>3&&t.length>1&&d.includes(t.toLowerCase().slice(0,2))))}catch(e){}
    const key=t.toLowerCase().replace(/^https?:\/\//,'').replace(/^www\./,'');
    if(QV().trim()!==t)return;
    sugs=[...new Set([...g.filter(d=>d.includes(key)),...urlSugs(t)])].filter(okSug).slice(0,NSUG);
    comp=computeComp();selI=comp?0:-1;renderGhost();drawSugg();
  }catch(e){}
}
async function genius(t,signal){
  const r=await fetch(px('https://genius.com/api/search/multi?per_page=8&q='+encodeURIComponent(t)),{signal});
  const j=await r.json(),out=[],seen=new Set();
  for(const sec of((j.response&&j.response.sections)||[])){
    if(sec.type!=='song'&&sec.type!=='lyric')continue;
    for(const h of(sec.hits||[])){
      const x=h.result;if(!x||!x.title)continue;
      const artist=(x.primary_artist&&x.primary_artist.name)||x.artist_names||'',key=(x.title+'|'+artist).toLowerCase();
      if(seen.has(key))continue;seen.add(key);
      out.push({title:x.title,artist,cover:x.song_art_image_thumbnail_url||x.header_image_thumbnail_url||'',line:(h.highlights||[]).map(z=>z.value||'').join('\n')});
    }
  }
  return out;
}
async function itunes(t,signal){
  const r=await fetch('https://itunes.apple.com/search?country=TR&media=music&entity=song&limit=15&term='+encodeURIComponent(t),{signal});
  const j=await r.json();
  return(j.results||[]).filter(x=>x.trackName).map(x=>({title:x.trackName,artist:x.artistName||'',cover:(x.artworkUrl100||'').replace('100x100bb','120x120bb'),line:'',url:x.trackViewUrl,tr:/türk|turk|arabesk|anadolu|fantezi/i.test(x.primaryGenreName||'')}));
}
const TRW=/(^|\s)(ve|bir|bu|ben|sen|aşk|gönül|yar|değil|için|gibi|kalbim|canım|gel|git|yok|neden|benim|senin)(\s|$)/i,FRW=/(^|\s)(je|tu|le|la|les|des|une|est|pas|mon|ton|amour|pour|avec|dans|moi|toi|oui|nous)(\s|$)/i,ENW=/(^|\s)(the|you|and|my|me|love|baby|i|to|of|in|is|it|your|with|girl|boy)(\s|$)/i;
function lang(s){if(s.tr)return 0;const t=s.title+' '+s.artist+' '+(s.line||'');if(/[çğışöüÇĞİŞÖÜ]/.test(t)||TRW.test(t))return 0;if(/[éèêëàâùûôîïœ]/i.test(t)||FRW.test(t))return 2;if(ENW.test(t))return 1;return/^[\x00-\x7f]*$/.test(t)?1:3}
const rankSongs=l=>l.map((x,i)=>[x,i]).sort((a,b)=>lang(a[0])-lang(b[0])||a[1]-b[1]).map(z=>z[0]);
const norm=x=>String(x||'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
let TOPS=[];
async function loadTops(){if(!TOPS.length&&SC_OK){try{const r=await fetch(PROXY?PROXY+'/?sc=charts':'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&region=soundcloud%3Aregions%3ATR&limit=10&client_id='+SCID),j=await r.json();TOPS=(j.collection||[]).map(x=>scMap(x.track||x)).filter(Boolean).slice(0,10)}catch(e){}}
  if(!TOPS.length){try{const j=await(await fetch('https://rss.applemarketingtools.com/api/v2/tr/music/most-played/25/songs.json')).json();
  TOPS=rankSongs((j.feed.results||[]).map(x=>({title:x.name,artist:x.artistName,cover:(x.artworkUrl100||'').replace('100x100bb','120x120bb'),line:'',url:x.url,tr:/türk|turk|arabesk|anadolu/i.test((x.genres||[]).map(g=>g.name).join())}))).slice(0,10)}catch(e){}}
  if(mode==='music'&&!QV().trim())drawSugg()}
function deezer(t){return new Promise((res,rej)=>{const cb='dz'+rnd(),sc=document.createElement('script'),end=()=>{sc.remove();delete window[cb]};
  window[cb]=j=>{end();res((j.data||[]).map(x=>({title:x.title,artist:(x.artist&&x.artist.name)||'',cover:(x.album&&x.album.cover_medium)||'',line:'',dz:x.link})))};
  sc.onerror=()=>{end();rej()};sc.src='https://api.deezer.com/search?output=jsonp&limit=10&callback='+cb+'&q='+encodeURIComponent(t);document.head.appendChild(sc)})}
const MSRC={luna:['neurun',(t,sg)=>lunaMusic(t,sg)],soundcloud:['SoundCloud',(t,sg)=>soundcloud(t,sg)],apple:['Apple Music',(t,sg)=>itunes(t,sg)],deezer:['Deezer',t=>deezer(t)],genius:['Genius',(t,sg)=>genius(t,sg)]};
async function fetchMusic(t){
  if(mAbort)mAbort.abort();mAbort=new AbortController();const sig=mAbort.signal;
  const own=PROXY?'luna':SC_OK?'soundcloud':(MSRC[S.music]&&S.music!=='soundcloud'?S.music:'genius'),seen=new Set();let list=[],ok=false,pend=0;sLoad=true;const nt=norm(t),rel=x=>{const y=norm(x.title+x.artist);return y.startsWith(nt)||norm(x.title).startsWith(nt)?0:y.includes(nt)?1:2};
  const fin=()=>{if(QV().trim()!==t||sig.aborted)return;const m=x=>lyricRest(x.line,t)?0:1;
    msugs=list.map((x,i)=>[x,i]).sort((a,b)=>(a[0].lrn?-1:a[0].local?2:a[0].plat?1:0)-(b[0].lrn?-1:b[0].local?2:b[0].plat?1:0)||lang(a[0])-lang(b[0])||rel(a[0])-rel(b[0])||m(a[0])-m(b[0])||a[1]-b[1]).map(z=>z[0]).filter(x=>okSug(x.title+' '+x.artist)).slice(0,NMUS);
    comp=computeComp();selI=comp?0:-1;renderGhost();drawSugg()};
  const go=async k=>{pend++;let r=[];try{r=await MSRC[k][1](fixQuery(t)||t,sig)}catch(e){}pend--;if(!pend&&!sig.aborted)sLoad=false;
    r=r.filter(x=>{const key=norm(x.title+x.artist);if(seen.has(key))return false;seen.add(key);return true}).map(x=>({...x,plat:k===own||own==='genius'&&k==='genius'?'':MSRC[k][0]}));
    if(k===own&&r.length)ok=true;list=list.concat(r);fin()};
  for(const s of lrnSug('music',t)){const key=norm(s);if(!seen.has(key)){seen.add(key);list.push({title:s,artist:'Aramalarınızdan',q:s,tr:true,local:1,lrn:1,line:''})}}
  for(const x of(()=>{const a=localSongs(t);return a.length?a:localSongs(fixQuery(t)||t)})()){const key=norm(x.title+x.artist);if(!seen.has(key)){seen.add(key);list.push({...x,plat:''})}}
  if(list.length)fin();
  const p=go(own);await Promise.race([p,sleep(1200)]);
  if(ok||sig.aborted){if(!pend)sLoad=false;return}
  ['soundcloud','genius','apple','deezer'].filter(k=>k!==own&&(k!=='soundcloud'||SC_OK)).forEach(k=>go(k));
}
let blinkPrev=0,blinkAcc=0;
function eyeBlink(){const e=document.querySelector('.pe svg');if(!e)return;e.classList.remove('bl');void e.getBoundingClientRect();e.classList.add('bl')}
function blinkCount(){const n=q.value.length;blinkAcc+=Math.abs(n-blinkPrev);blinkPrev=n;if(n===0)blinkAcc=0;if(blinkAcc>=3){blinkAcc%=3;if(mode==='image'&&!S.noAnim)eyeBlink()}}
function onType(){
  if(CMP){const r=pfxParse(q.value),k=r?r.k:'web';if(k!==mode){setMode(k);return}}
  updClr();clearTimeout(sTimer);navBase=null;blinkCount();
  const t=QV().trim();wxCheck(mode==='web'?t:'');SM=mode==='web'?smartCard(t):null;if(noteOn()){sugs=[];msugs=[];comp='';selI=-1;sLoad=false;if(sAbort)sAbort.abort();renderGhost();drawSugg();return}
  if(!t){clearTimeout(rT);RES=null;sLoad=false;if(sAbort)sAbort.abort();if(mAbort)mAbort.abort();sugs=[];msugs=[];comp='';selI=-1;renderGhost();drawSugg();if(mode==='duck')hideAns();return}
  if(mode==='ai'){comp='';selI=-1;renderGhost();drawSugg();return}
  if(mode==='url'){sugs=urlSugs(t);comp=computeComp();selI=comp?0:-1;renderGhost();drawSugg();sTimer=setTimeout(()=>fetchUrlG(t),70);return}
  if(mode==='music'){comp=computeComp();selI=comp?0:-1;renderGhost();drawSugg();sTimer=setTimeout(()=>fetchMusic(t),90);return}
  if(mode==='tl'){comp='';selI=-1;renderGhost();drawSugg();clearTimeout(sTimer);sTimer=setTimeout(()=>runTL(t),350);return}
  if(mode==='film'){comp='';selI=-1;renderGhost();drawSugg();sTimer=setTimeout(()=>fetchFilmQ(t),140);return}
  {const cl=cachedLive(mode,t);sugs=mergeDb(rerank([...new Set([...(cl||[]),...sugs])],t,true),t)}comp=computeComp();selI=comp?0:-1;renderGhost();drawSugg();sTimer=setTimeout(()=>fetchSugg(t),60);clearTimeout(rT);rT=setTimeout(()=>fetchRes(t),450);
}
async function fetchSugg(t){
  if(sAbort)sAbort.abort();sAbort=new AbortController();
  try{sLoad=true;drawSugg();const r=await sg(mode==='duck'?'google':curEng(mode),fixQuery(t)||t,sAbort.signal,mode);if(QV().trim()!==t)return;sLoad=false;sugs=mergeDb(r.list,t);comp=computeComp();selI=comp?0:-1;renderGhost();drawSugg()}catch(e){if(!(e&&e.name==='AbortError')){sLoad=false;drawSugg()}}
}
$('#sugg').addEventListener('click',e=>{
  const fi=e.target.closest('[data-fi]');if(fi){const f=FLIST[+fi.dataset.fi];if(f)openFilm(f);return}
  const ru=e.target.closest('[data-ru]');if(ru){const u=ru.dataset.ru;if(/^https?:/i.test(u))leave().then(()=>openSite(u));return}
  const i=e.target.closest('[data-ins]');
  if(i){q.value=QP()+i.dataset.ins+' ';q.dispatchEvent(new Event('input'));q.focus();return}
  const mi=e.target.closest('[data-mi]');if(mi){if(Date.now()-lpAt<900)return;const s=(QV().trim()?msugs:TOPS)[+mi.dataset.mi];if(s)openSong(s);return}
  const b=e.target.closest('[data-sq]');if(!b)return;if(Date.now()-lpAt<900)return;q.value=QP()+b.dataset.sq;onType();run(mode)});
$('#sugg').addEventListener('mousedown',e=>{if(!e.target.closest('.note,.tlc select'))e.preventDefault()});

async function copyText(s){
  try{await navigator.clipboard.writeText(s);return true}catch(_){}
  try{const ta=document.createElement('textarea');ta.value=s;ta.style.cssText='position:fixed;left:-99px;opacity:0';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,s.length);const ok=document.execCommand('copy');ta.remove();return ok}catch(_){return false}
}
const wmo=c=>c===0?['Açık','☀️']:c<=2?['Parçalı bulutlu','⛅']:c===3?['Kapalı','☁️']:c<50?['Sisli','🌫️']:c<60?['Çiseleme','🌦️']:c<70?['Yağmurlu','🌧️']:c<80?['Karlı','🌨️']:c<90?['Sağanak','🌦️']:['Gök gürültülü','⛈️'];
let wxT,wxN=0;
function wxCheck(t){clearTimeout(wxT);const m=/^(?:(.+?)\s+)?hava(?:\s*durumu)?(?:\s+(.+))?$/i.exec(t);
  if(!m||(m[1]&&m[2])){WX=null;return}
  const city=((m[1]||m[2]||'')).trim()||(S.profile&&(S.profile.district||S.profile.city))||'İstanbul',pc=(!(m[1]||m[2])&&S.profile&&S.profile.district)?S.profile.city:'',n=++wxN;
  WX={t,html:''};wxT=setTimeout(async()=>{try{
   const g=(await(await fetch('https://geocoding-api.open-meteo.com/v1/search?count=5&language=tr&countryCode=TR&name='+encodeURIComponent(city))).json()).results||[];
   const p=g.find(x=>pc&&(x.admin1||'').toLocaleLowerCase('tr').includes(pc.toLocaleLowerCase('tr')))||g[0];if(!p)throw 0;
   const w=await(await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`)).json();
   if(n!==wxN)return;const c=w.current,[d,e]=wmo(c.weather_code),days=w.daily.time.map((x,i)=>`<span>${i?new Date(x).toLocaleDateString('tr',{weekday:'short'}):'Bugün'}<i>${wmo(w.daily.weather_code[i])[1]}</i>${Math.round(w.daily.temperature_2m_max[i])}° <small>${Math.round(w.daily.temperature_2m_min[i])}°</small></span>`).join('');
   WX={t,html:`<div class="wx"><div class="wxh"><span>${esc(p.name)}${p.admin1&&p.admin1!==p.name?', '+esc(p.admin1):''}</span><small>Hava Durumu</small></div><div class="wxm"><span class="wxi">${e}</span><b>${Math.round(c.temperature_2m)}°</b><small>${d}<br>Hissedilen ${Math.round(c.apparent_temperature)}° · Nem %${c.relative_humidity_2m}<br>Rüzgâr ${Math.round(c.wind_speed_10m)} km/sa</small></div><div class="wxd">${days}</div></div>`}}
  catch(e){if(n!==wxN)return;WX={t,html:'<div class="wx"><div class="wxh"><span>Hava durumu alınamadı</span></div></div>'}}
  drawSugg()},200)}
const curEng=m=>S.same?S.sameEngine:S[m];
let lvT;function leave(){home.classList.add('leaving');clearTimeout(lvT);lvT=setTimeout(softBack,4000);return sleep(matchMedia('(prefers-reduced-motion:reduce)').matches?0:620)}
let rtT;function softBack(){if(!home.classList.contains('leaving'))return;home.classList.add('returning');home.classList.remove('leaving');clearTimeout(rtT);rtT=setTimeout(()=>home.classList.remove('returning'),1800)}
addEventListener('pageshow',softBack);document.addEventListener('visibilitychange',()=>{if(!document.hidden)softBack()});
async function doSearch(kind,t){
  if(kind==='web'||kind==='image'||kind==='video'||kind==='duck'||kind==='music'){const t0=t,fi=fixInfo(t);if(fi.text&&fi.sure){t=fi.text;toast('“'+t+'” için sonuçlar gösteriliyor')}if(!(fi.text&&!fi.sure)){try{learnQ(kind,t0,t)}catch(e){}}}
  const e=encodeURIComponent(t);await leave();
  if(kind==='url'){recordH('url',t);openSite(toURL(t));return}
  if(kind==='duck'){recordH('web',t);openSite(URLS.web.duckduckgo(e));return}
  if(kind==='music'){recordH('music',t);openSite(MUSURL[S.music](e));return}
  if(kind==='film'){recordH('film',t);openSite('https://www.imdb.com/find/?s=tt&q='+e);return}
  if(kind==='ai'){
    const [n,f,clip]=AI[S.ai];
    if(t){if(await copyText(t))toast('Metin kopyalandı');recordH('ai',t);await sleep(clip?900:600)}
    openSite(f(e));return;
  }
  recordH(kind,t);
  openSite(URLS[kind][curEng(kind)](e));
}
function shortUrl(t){const m=/^w\/([a-z0-9]+)$/i.exec(t.trim());if(!m)return'';const k=m[1].toLowerCase();
  return[...dbUrl(),...TRTOP,...TOP].find(d=>{const n=d.split('.')[0];return k===n||k===n[0]+n.slice(1).replace(/[aeıioöuü0-9]/g,'')})||''}
async function run(kind){
  if(kind==='ai')return doSearch('ai',QV().trim());
  if(kind==='image'&&pic)return imageSearch();
  if(kind==='tl'){tlCopy();return}
  if(kind==='web'&&noteOn()){const ta=$('#noteTa');if(ta)ta.focus();return}
  const t=(QV()+comp).trim();
  if(!t){q.focus();return}
  if(kind==='web'){const d=shortUrl(QV());if(d){recordH('url',d);await leave();openSite('https://'+d);return}}
  if(kind==='music'&&selI>=0&&msugs[selI])return openSong(msugs[selI]);
  return doSearch(kind,t);
}
/* görselle arama */
let pic=null;
const PHOTO='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="3.2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M4 17.5l5-5 3.5 3.5 3-3L21 17"/></svg>';
const imgBtn=$('#imgBtn'),picker=document.createElement('input');picker.type='file';picker.accept='image/*';
function updClr(){$('#clr').classList.toggle('show',!!q.value||!!pic)}
function setPic(p){
  if(pic)URL.revokeObjectURL(pic.url);pic=p;
  imgBtn.classList.toggle('has',!!p);
  imgBtn.innerHTML=p?`<img src="${p.url}" alt=""><i></i>`:PHOTO;
  imgBtn.setAttribute('aria-label',p?'Görseli kaldır':'Görsel ekle');
  updClr();
}
imgBtn.addEventListener('mousedown',e=>e.preventDefault());
imgBtn.addEventListener('click',async()=>{if(pic){setPic(null);return}
  await leave();const eng=S.same?S.sameEngine:S.image,U={google:'https://lens.google.com/?hl=tr',bing:'https://www.bing.com/visualsearch',yandex:'https://yandex.com/images/'};
  if(!U[eng]){toast('Bu motor görselle aramayı desteklemiyor, Google Lens açıldı');await sleep(900)}
  openSite(U[eng]||U.google)});
picker.addEventListener('change',async()=>{const f=picker.files[0];picker.value='';if(!f)return;const r=await shrink(f);r?openCrop(r):toast('Görsel okunamadı')});
function shrink(file){return new Promise(res=>{const u=URL.createObjectURL(file),im=new Image();
  im.onerror=()=>{URL.revokeObjectURL(u);res(null)};
  im.onload=()=>{const s=Math.min(1,1280/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
    c.getContext('2d').drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);
    c.toBlob(b=>res(b?{blob:b,url:URL.createObjectURL(b)}:null),'image/jpeg',.88)};
  im.src=u})}
function b64(blob){return new Promise(r=>{const f=new FileReader();f.onload=()=>r(String(f.result).split(',')[1]||'');f.readAsDataURL(blob)})}
async function imageSearch(){
  await leave();
  const eng=S.same?S.sameEngine:S.image,f=document.createElement('form');
  f.method='post';f.enctype='multipart/form-data';f.style.display='none';
  const file=new File([pic.blob],'image.jpg',{type:'image/jpeg'});
  const addFile=n=>{const i=document.createElement('input');i.type='file';i.name=n;const dt=new DataTransfer();dt.items.add(file);i.files=dt.files;f.appendChild(i)};
  if(eng==='yandex'){f.action='https://yandex.com/images/search?rpt=imageview';addFile('upfile')}
  else if(eng==='bing'){f.action='https://www.bing.com/images/search?view=detailv2&iss=sbiupload&FORM=SBIHMP&sbisrc=ImgDropper';
    const i=document.createElement('input');i.type='hidden';i.name='imageBin';i.value=await b64(pic.blob);f.appendChild(i)}
  else{f.action='https://lens.google.com/upload?hl=tr';addFile('encoded_image');
    if(eng!=='google'){toast('Bu motor görselle aramayı desteklemiyor, Google Lens kullanıldı');await sleep(900)}}
  document.body.appendChild(f);f.submit();
}
function host(u){try{return new URL(/^https?:\/\//i.test(u)?u:'https://'+u).hostname.replace(/^www\./,'')}catch(e){return ''}}
function tile(f,big){
  const h=host(f.url),l=esc((f.name||h||'?').trim().charAt(0).toUpperCase()||'?');
  let img='';
  if(f.cover)img=`<img src="${f.cover}" alt="" data-l="${l}" onerror="this.parentNode.textContent=this.dataset.l">`;
  else if(h)img=`<img class="ic" src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(h)}&sz=256" alt="" data-l="${l}" onerror="this.parentNode.textContent=this.dataset.l">`;
  return `<span class="tile${big?' big':''}">${img||l}</span>`;
}
function renderFavs(){
  $('#favs').innerHTML=S.favs.map(f=>`<button class="fav" data-open="${esc(f.id)}" aria-label="${esc(f.name||host(f.url))}">${tile(f)}<small>${esc(f.name||host(f.url))}</small></button>`).join('');
}
$('#favs').addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(!b)return;const f=S.favs.find(x=>x.id===b.dataset.open);if(f)openSite(f.url)});

/* viewport / klavye */
const vv=window.visualViewport;
function fit(){const h=vv?vv.height:innerHeight,kb=!!vv&&innerHeight-vv.height>120,hs=kb?h+'px':'',ts=kb?vv.offsetTop+'px':'0px';home.style.height=hs;home.style.top=ts;const c=document.getElementById('chat');if(c){c.style.height=hs;c.style.top=ts}if(vv&&vv.offsetTop)scrollTo(0,0)}
if(vv){vv.addEventListener('resize',fit);vv.addEventListener('scroll',fit)}addEventListener('resize',fit);

/* ---------- Menü ---------- */
function menu(open){$('#menu').classList.toggle('open',open);$('#menuScrim').classList.toggle('open',open);$('#moreBtn').setAttribute('aria-expanded',open)}
$('#moreBtn').addEventListener('click',()=>menu(!$('#menu').classList.contains('open')));
$('#menuScrim').addEventListener('click',()=>menu(false));

/* ---------- Sayfalar ---------- */
const sico=(a,b,p)=>`<i class="si" style="--a:${a};--b:${b}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg></i>`;
const SI={
 appearance:sico('#4DA3FF','#007AFF','<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 010 16z" fill="currentColor"/>'),
 search:sico('#FFB550','#FF9500','<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>'),
 ai:sico('#C58BFF','#A15CFF','<path d="M10 3l1.9 5.1L17 10l-5.1 1.9L10 17l-1.9-5.1L3 10l5.1-1.9z" fill="currentColor" stroke="none"/><path d="M18.5 3l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" fill="currentColor" stroke="none"/>'),
 data:sico('#46D6A0','#22C082','<ellipse cx="12" cy="6.5" rx="7" ry="2.8"/><path d="M5 6.5v11c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-11M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8"/>'),
 about:sico('#B0B3BE','#8E919D','<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r=".7" fill="currentColor"/>'),
 exp:sico('#58C1FF','#2AA0F5','<path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 12v6.5A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5V12"/>'),
 imp:sico('#6BD38A','#34C759','<path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 12v6.5A1.5 1.5 0 006.5 20h11a1.5 1.5 0 001.5-1.5V12"/>'),
 rst:sico('#FF7A70','#FF453A','<path d="M5 12a7 7 0 107-7H8"/><path d="M10 2.5L7.5 5 10 7.5"/>'),
 hist:sico('#7C8CFF','#5B63F0','<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>'),
 ret:sico('#FFC857','#FF9F0A','<rect x="4" y="5.5" width="16" height="14.5" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>'),
 same:sico('#4FD6D0','#14B8B0','<path d="M5 9h13l-3-3M19 15H6l3 3"/>')};
SI.music=sico('#FF7A93','#FF2D55','<circle cx="8" cy="17" r="3"/><path d="M11 17V4.5l8 2v3.5"/>');
SI.luna=sico('#5AC8FA','#007AFF','<path d="M20 13.2A8.5 8.5 0 1 1 10.8 4 6.6 6.6 0 0 0 20 13.2z" fill="currentColor" stroke="none"/>');
SI.chat=sico('#6BD38A','#34C759','<path d="M12 4C7.6 4 4 6.9 4 10.5c0 1.9 1 3.6 2.7 4.8-.1 1-.6 2-1.4 2.7 1.5-.1 2.8-.6 3.8-1.4.8.2 1.8.4 2.9.4 4.4 0 8-2.9 8-6.5S16.4 4 12 4z" fill="currentColor" stroke="none"/>');
SI.app=sico('#64D2FF','#32ADE6','<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 014 18.5v-11A1.5 1.5 0 015.5 6H10"/>');
SI.mem=sico('#FFC857','#FF9F0A','<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/>');
const trow=(ic,l,k)=>`<label class="row hasi">${ic}<span class="grow">${l}</span><input type="checkbox" class="sw" data-tog="${k}" ${S[k]?'checked':''} aria-label="${l}"></label>`;
const segRow=(k,opts)=>`<div class="seg" role="radiogroup">${opts.map(([v,l])=>`<button role="radio" aria-checked="${S[k]===v}" class="${S[k]===v?'on':''}" data-set="${k}" data-val="${v}">${l}</button>`).join('')}</div>`;
const fmtB=v=>{try{return new Date(v+'T00:00:00').toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'})}catch(e){return v}};
const nav=(l,id,d='',ic='')=>`<button class="row${ic?' hasi':''}" data-go="${id}">${ic}<span class="grow">${l}</span>${d?`<span class="det">${d}</span>`:''}${chev}</button>`;
const opt=(l,k,v,cur)=>`<button class="row" role="radio" aria-checked="${cur===v}" data-set="${k}" data-val="${v}"><span class="grow">${l}</span>${cur===v?tick:''}</button>`;
const grp=(h,r,f='')=>`${h?`<h3 class="sh">${h}</h3>`:''}<div class="grp">${r}</div>${f?`<p class="foot">${f}</p>`:''}`;
const list=(k,key)=>OPT[k].map(e=>opt(ENG[e],key,e,S[key])).join('');
const KI={tl:ICON.tl,film:ICON.film,music:ICON.music,url:ICON.url,web:ICON.web,image:ICON.image,video:ICON.video,ai:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 3l1.9 5.1L17 10l-5.1 1.9L10 17l-1.9-5.1L3 10l5.1-1.9z"/></svg>'};
const TITLE={modesEd:'Arama Düğmeleri',profile:'Profil',settings:'Ayarlar',appearance:'Görünüm Ayarları',search:'Arama Yönetimi',ai:'Varsayılan AI',data:'Veri Yönetimi',history:'Arama Geçmişi',retention:'Saklama Süresi',about:'Hakkında'};
const PAGES={
 settings:()=>{const p=S.profile;
  return `<div class="grp"><button class="row profc" data-go="profile">${avatar(p)}<span class="grow"><b>${esc(p.name||'Profil')}</b><small>${esc(p.email||'Bilgilerini ekle')}</small></span>${chev}</button></div><div style="height:1.1rem"></div>`
  +grp('',nav('Görünüm Ayarları','appearance','',SI.appearance)+nav('Arama Yönetimi','search','',SI.search)+nav('Varsayılan AI','ai',AI[S.ai][0],SI.ai)+nav('Veri Yönetimi','data','',SI.data)+nav('Hakkında','about','',SI.about))},
 appearance:()=>grp('Mod',`<div class="seg" role="radiogroup">${[['light','Açık'],['dark','Koyu'],['auto','Otomatik']].map(([v,l])=>`<button role="radio" aria-checked="${S.theme===v}" class="${S.theme===v?'on':''}" data-set="theme" data-val="${v}">${l}</button>`).join('')}</div>`)
  +grp('Vurgu Rengi',`<div class="swg" role="radiogroup">${Object.entries(ACC).map(([k,a])=>`<button role="radio" aria-checked="${S.accent===k}" aria-label="${a[3]}" class="${S.accent===k?'on':''}" data-set="accent" data-val="${k}" style="--c:${isDark()?a[1]:a[0]};--on2:${a[2]?'#000':'#fff'}"><i>${S.accent===k?tickW:''}</i></button>`).join('')}</div>`)
  +grp('Uygulama İkonu',`<div class="icg" role="radiogroup">${Object.entries(ICN).map(([k,a])=>`<button role="radio" aria-checked="${S.appIcon===k}" aria-label="${a[0]}" class="${S.appIcon===k?'on':''}" data-set="appIcon" data-val="${k}"><i style="background:linear-gradient(180deg,${a[1]},${a[2]})"><svg viewBox="0 0 100 100" aria-hidden="true"><g fill="${a[3]||'#fff'}" transform="translate(50 50)">${ASTR}</g></svg></i><span>${a[0]}</span></button>`).join('')}</div>`,'Ana ekrana ya da Dock’a eklediğin uygulamanın ikonu. Daha önce eklediysen yeni rengi görmek için kaldırıp yeniden ekle.')
+grp('Ekran Ölçeklendirme',`<div class="row"><span class="grow">Ölçek</span><span class="det">%${S.scale}</span><div class="step"><button data-act="sc-" aria-label="Küçült" ${S.scale<=80?'disabled':''}>−</button><button data-act="sc+" aria-label="Büyüt" ${S.scale>=125?'disabled':''}>+</button></div></div>`,'Varsayılan %100. %80 ile %125 arasında 5’in katları.')
  +grp('Ana Ekran',nav('Arama Düğmeleri','modesEd','',SI.appearance)+trow(SI.search,'Popüler aramaları gizle','hidePop')+trow(SI.search,'Aramaları otomatik tamamla','autoComp')+trow(SI.same,'Favorileri gizle','hideFav')+trow(SI.appearance,'Logo animasyonlarını kapat','noAnim'))
   +`<div class="gap">`+grp('',`<button class="row hasi red" data-act="rst-app">${SI.rst}<span>Görünümü Sıfırla</span></button>`)+`</div>`,
  modesEd:()=>{const N=Object.fromEntries(MODES);
   const pv=`<div class="box" style="margin-bottom:.4rem"><div class="bar"><div class="modes" style="overflow:visible">${S.modes.filter(m=>m.on).map((m,i)=>`<button class="m${i?'':' on'}" tabindex="-1">${ICON[m.k]}<span>${N[m.k]}</span></button>`).join('')}</div></div></div>`;
   return grp('Önizleme',pv)+grp('Düğmeler',S.modes.map((m,i)=>`<div class="row"><span class="grow">${N[m.k]}</span><button class="pill2" data-act="mv" data-i="${i}" data-d="-1" ${i?'':'disabled'} aria-label="Yukarı taşı">↑</button><button class="pill2" data-act="mv" data-i="${i}" data-d="1" ${i<S.modes.length-1?'':'disabled'} aria-label="Aşağı taşı">↓</button><input type="checkbox" class="sw" data-mon="${m.k}" ${m.on?'checked':''} aria-label="${N[m.k]}"></div>`).join(''),'Düğmeleri aç/kapat, ↑↓ ile sırasını değiştir. Hepsi kapalıyken ana ekran tek satıra iner ve web araması yapar. Önekler: i/ görsel, u/ URL, v/ video, m/ müzik, d/ DuckDuckGo, ai/ yapay zeka.')},

 search:()=>grp('',trow(SI.search,'Yetişkin içerikli önerileri filtrele','adult'),'Açıkken yetişkin içerikli öneriler ve tamamlamalar gösterilmez.')+`<div style="height:1.1rem"></div>`+grp('',`<button class="row hasi" data-act="unblock" ${S.blocked.length?'':'disabled'}>${SI.rst}<span class="grow">Gizlenen önerileri geri getir</span><span class="det">${S.blocked.length}</span></button>`,'Önerilere basılı tutup “Bir Daha Önerme” dediklerin burada sayılır.')+`<div style="height:1.1rem"></div>`+grp('',trow(SI.app,'Site yerine uygulamasına git','openApp'),'Açıkken siteler (YouTube, Spotify, Apple Müzik, Pinterest gibi) yüklü uygulamalarında açılır. Kapalıyken hepsi neurun içinde açılır.')+`<div style="height:1.1rem"></div>`+grp('Film ve Dizi platformları',PLATS.map(p=>`<label class="row hasi"><i class="si" style="--a:${p[2]};--b:${p[2]}"><b>${p[4]}</b></i><span class="grow">${p[1]}</span><input type="checkbox" class="sw" data-fp="${p[0]}" ${S.fp[p[0]]!==false?'checked':''} aria-label="${p[1]}"></label>`).join(''),'Türkiye’de kullanılabilen platformlar. Seçtiklerin, film ve dizi sonuçlarında “nerede izlenir” olarak gösterilir. Bilgi JustWatch’tan Worker üzerinden gelir.')+`<div style="height:1.1rem"></div>`+grp('',`<label class="row hasi">${SI.same}<span class="grow">Hepsine aynı motoru kullan</span><input type="checkbox" class="sw" data-tog="same" ${S.same?'checked':''} aria-label="Hepsine aynı motoru kullan"></label>`)
  +(S.same?grp('Ortak Motor',list('same','sameEngine')):'')
  +`<div class="${S.same?'dis':''}" ${S.same?'aria-disabled="true"':''}>`+grp('Web Arama',list('web','web'))+grp('Görsel Arama',list('image','image'))+grp('Video Arama',list('video','video'))+`</div>`
  +grp('Müzik',MUSP.map(([k,l])=>opt(l,'music',k,S.music)).join(''),'Müzik modunda bir şarkıya dokunduğunda seçtiğin platformda açılır.')
   +`<div class="gap">`+grp('',`<button class="row hasi red" data-act="rst-search">${SI.rst}<span>Arama Yönetimini Sıfırla</span></button>`)+`</div>`,
 ai:()=>grp('',Object.entries(AI).map(([k,v])=>opt(v[0],'ai',k,S.ai)).join(''),'AI düğmesine basınca seçili uygulamada yeni sohbet açılır ve yazdığınız metin sohbet kutusuna aktarılır.'),
 data:()=>grp('',`<button class="row hasi" data-act="exp">${SI.exp}<span>Tüm ayarları dışa aktar</span></button><button class="row hasi" data-act="imp">${SI.imp}<span>Tüm ayarları içe aktar</span></button>`)
  +`<div class="gap">`+grp('',`<button class="row hasi red" data-act="rst-all">${SI.rst}<span>Sıfırla</span></button>`,'Tüm ayarlar, profil, favori siteler, arama geçmişi, sohbetler ve hafıza silinir.')+`</div>`
  +`<div class="gap">`+grp('',`<label class="row hasi">${SI.hist}<span class="grow">Geçmiş</span><input type="checkbox" class="sw" data-tog="hist" ${S.hist?'checked':''} aria-label="Geçmiş"></label>`,'Açıkken aramalar bu cihazda saklanır ve ana ekranda son aramalar olarak gösterilir.')+`</div>`
  +`<div class="${S.hist?'':'dis'}" style="margin-top:1.4rem" ${S.hist?'':'aria-disabled="true"'}>`+grp('',nav('Arama Geçmişi','history',H.length?String(H.length):'',SI.hist)+nav('Saklama Süresi','retention',(RET.find(r=>r[0]===S.histDays)||RET[0])[1],SI.ret))+`</div>`,
 retention:()=>grp('',RET.map(([d,l])=>opt(l,'histDays',String(d),String(S.histDays))).join(''),'Süresi dolan aramalar otomatik silinir.'),
 history:()=>{
  if(!H.length)return `<p class="empty">Henüz arama geçmişi yok.</p>`;
  const day=ts=>{const d=new Date(ts),n=new Date(),a=new Date(d.getFullYear(),d.getMonth(),d.getDate()),b=new Date(n.getFullYear(),n.getMonth(),n.getDate()),diff=Math.round((b-a)/864e5);
    return diff===0?'Bugün':diff===1?'Dün':d.toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:d.getFullYear()===n.getFullYear()?undefined:'numeric'})};
  const g=[];for(const h of H){const l=day(h.t),last=g[g.length-1];if(last&&last[0]===l)last[1].push(h);else g.push([l,[h]])}
  const X='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  return g.map(([l,a])=>grp(l,a.map(h=>`<div class="row srow"><button class="main" data-hq="${esc(h.id)}">${h.m==='url'?favIcon(host(h.q)):KI[h.m]}<span>${esc(h.q)}</span><em>${new Date(h.t).toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'})}</em></button><button class="ins" data-hdel="${esc(h.id)}" aria-label="Sil">${X}</button></div>`).join(''))).join('')
   +`<div class="gap">`+grp('',`<button class="row hasi red" data-act="rst-hist">${SI.rst}<span>Geçmişi Temizle</span></button>`,'Saklama süresi: '+(RET.find(r=>r[0]===S.histDays)||RET[0])[1]+'.')+`</div>`;
 },
 profile:()=>{
  const p=profEdit?pdraft:S.profile;if(!p)return'';
  const head=`<div class="pav">${avatar(p,1)}${profEdit?`<div class="pavb"><button class="pill2" data-act="ppick">${p.photo?'Fotoğrafı Değiştir':'Fotoğraf Ekle'}</button>${p.photo?'<button class="pill2" data-act="pclr">Kaldır</button>':''}</div>`:`<h3>${esc(p.name||'Adınız')}</h3>`}</div>`;
  const F=[['name','Ad Soyad','text','name','Ad Soyad'],['email','E-posta','email','email','ad@ornek.com'],['phone','Telefon','tel','tel','05xx xxx xx xx']];
  const rows=F.map(([k,l,ty,ac,ph])=>profEdit?`<label class="row field"><span>${l}</span><input data-pf="${k}" type="${ty}" ${ac?`autocomplete="${ac}"`:''} ${ty==='email'?'inputmode="email" autocapitalize="none"':''} ${ty==='tel'?'inputmode="tel"':''} placeholder="${ph}" value="${esc(p[k]||'')}"></label>`
    :`<div class="row"><span class="lbl">${l}</span><span class="rv">${esc(k==='birth'&&p[k]?fmtB(p[k]):(p[k]||'—'))}</span></div>`).join('');
  const birthRow=profEdit?`<label class="row field"><span>Doğum Tarihi</span><input data-pb type="text" inputmode="numeric" autocomplete="bday" placeholder="gg.aa.yyyy" maxlength="10" value="${esc(p.birth?fmtBIn(p.birth):'')}"></label>`:`<div class="row"><span class="lbl">Doğum Tarihi</span><span class="rv">${esc(p.birth?fmtB(p.birth):'—')}</span></div>`;
   const loc=profEdit?`<label class="row field"><span>İl</span><input data-pf="city" data-city list="dlCity" autocomplete="off" autocapitalize="words" placeholder="İl" value="${esc(p.city||'')}"><datalist id="dlCity">${PROV.map(n=>`<option value="${n}">`).join('')}</datalist></label><label class="row field"><span>İlçe</span><input data-pf="district" data-dist list="dlDist" autocomplete="off" autocapitalize="words" placeholder="İlçe" value="${esc(p.district||'')}"><datalist id="dlDist">${distOpts(p.city)}</datalist></label>`
    :`<div class="row"><span class="lbl">İl</span><span class="rv">${esc(p.city||'—')}</span></div><div class="row"><span class="lbl">İlçe</span><span class="rv">${esc(p.district||'—')}</span></div>`;
      return head+grp('',rows+birthRow+loc,profEdit?'':'Bilgilerin yalnızca bu cihazda saklanır.');
 },
 about:()=>`<div class="about"><span class="ico"><img src="${document.querySelector('link[rel=apple-touch-icon]:not([media])').href}" alt=""></span><h3>neurun</h3><p>Sürüm 1.0.0 Beta</p></div>`
  +grp('',`<div class="row"><span class="grow">Geliştirici</span><span class="det">Onur Bekir Çalgın</span></div><div class="row"><span class="grow">Şirket</span><span class="det">Elnavic</span></div><div class="elv" role="img" aria-label="Elnavic"><i></i></div>`)
};
const app=$('#app'),stack=[];
const cur=()=>stack[stack.length-1];
const PLUSB='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
const NAVR={
  profile:()=>`<button class="pill" data-act="pedit">${profEdit?'Bitti':'Düzenle'}</button>`
};
function fill(el){
  const id=el.dataset.id;el.querySelector('.body').innerHTML=PAGES[id](el.dataset.arg);
  const nr=el.querySelector('.navr');if(nr)nr.innerHTML=NAVR[id]?NAVR[id]():'';
}
function push(id,arg=''){
  const below=cur()||home;
  const el=document.createElement('section');el.className='page';el.dataset.id=id;el.dataset.arg=arg;
  el.innerHTML=`<header class="nav"><button class="glass circle" data-act="back" aria-label="Geri">${back}</button><h2>${TITLE[id]}</h2><span class="navr"></span></header><div class="body"></div>`;
  app.appendChild(el);stack.push(el);fill(el);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{el.classList.add('in');below.classList.add('under')}));
  home.setAttribute('aria-hidden','true');
}
function pop(){
  const el=stack.pop();if(!el)return;
  if(el.dataset.id==='profile'){profEdit=false;pdraft=null}
  const below=cur()||home;below.classList.remove('under');el.classList.remove('in');
  if(!stack.length)home.removeAttribute('aria-hidden');else refreshTop();
  setTimeout(()=>el.remove(),520);
}
function refreshTop(){const el=cur();if(!el)return;const b=el.querySelector('.body'),y=b.scrollTop;fill(el);b.scrollTop=y}
function commit(){save();apply();{const m0=mode;drawModes();if(mode!==m0)setMode(mode)}refreshTop();renderFavs();drawSugg();loadPop(mode)}

/* kenardan kaydırarak geri */
let sx=null,sy=0,sw=false;
document.addEventListener('touchstart',e=>{const t=e.touches[0];if(stack.length&&!$('#sheet').classList.contains('open')&&t.clientX<24){sx=t.clientX;sy=t.clientY;sw=false}else sx=null},{passive:true});
document.addEventListener('touchmove',e=>{if(sx==null)return;const t=e.touches[0],dx=t.clientX-sx;
  if(!sw&&dx>10&&dx>Math.abs(t.clientY-sy)){sw=true;cur().style.transition='none';const b=stack[stack.length-2]||home;b.style.transition='none'}
  if(sw){const b=stack[stack.length-2]||home;cur().style.transform=`translateX(${Math.max(0,dx)}px)`;b.style.transform=`translateX(${-25*(1-Math.min(1,Math.max(0,dx)/innerWidth))}%)`}},{passive:true});
document.addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx,el=cur(),was=sw;sx=null;sw=false;
  if(!was||!el)return;const b=stack[stack.length-2]||home;
  el.style.transition='';el.style.transform='';b.style.transition='';b.style.transform='';
  if(dx>innerWidth*.33)pop()},{passive:true});

/* ---------- Yardımcılar: uyarı / toast ---------- */
function ask(title,msg,ok){return new Promise(r=>{const d=$('#alert');
  d.innerHTML=`<div class="al glass" role="alertdialog" aria-label="${esc(title)}"><h4>${title}</h4><p>${msg}</p><div><button data-v="0">İptal</button><button data-v="1" class="red">${ok}</button></div></div>`;
  d.classList.add('open');
  d.onclick=ev=>{const b=ev.target.closest('button');if(!b&&ev.target!==d)return;d.classList.remove('open');r(!!b&&b.dataset.v==='1')}})}
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2400)}

/* ---------- Düzenle sayfası (sheet) ---------- */
let sh={view:'list'};
function openSheet(){sh={view:'list'};drawSheet();const s=$('#sheet');s.classList.add('open');s.setAttribute('aria-hidden','false');q.blur()}
function closeSheet(){const s=$('#sheet');s.classList.remove('open');s.setAttribute('aria-hidden','true');renderFavs()}
function drawSheet(){
  const p=$('#sheetBody');
  if(sh.view==='list'){
    p.innerHTML=`<div class="sh-head"><h2>Favori Siteler</h2><button class="glass circle" data-act="fadd" aria-label="Site ekle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button><button class="pill" data-act="sclose">Bitti</button></div>
    <div class="sh-scroll">${S.favs.length?`<div class="grp">${S.favs.map(f=>`<button class="row" data-act="fedit" data-id="${esc(f.id)}">${tile(f)}<span class="grow"><b>${esc(f.name||host(f.url))}</b><small>${esc(host(f.url))}</small></span>${chev}</button>`).join('')}</div>`
      :`<p class="empty">Henüz favori site yok.<br>Eklemek için + düğmesine dokunun.</p>`}</div>`;
  }else{
    const d=sh.draft;
    p.innerHTML=`<div class="sh-head"><button class="glass circle" data-act="fback" aria-label="Geri">${back}</button><h2>${d.isNew?'Yeni Site':'Siteyi Düzenle'}</h2></div>
    <div class="sh-scroll"><div class="cover-ed">${tile(d,1)}<div><button class="pill2" data-act="fpick">Kapak Seç</button>${d.cover?'<button class="pill2" data-act="fclr">Kapağı Kaldır</button>':''}</div></div>
    <div class="grp"><label class="row field"><span>Ad</span><input id="fName" value="${esc(d.name)}" placeholder="Ad" autocapitalize="words"></label>
    <label class="row field"><span>Adres</span><input id="fUrl" value="${esc(d.url)}" placeholder="ornek.com" inputmode="url" autocapitalize="none" autocorrect="off" spellcheck="false"></label></div>
    <button class="prim" data-act="fsave">Kaydet</button>${d.isNew?'':'<button class="prim danger" data-act="fdel">Siteyi Sil</button>'}</div>
    <input type="file" id="fFile" accept="image/*" hidden>`;
  }
}
$('#sheetBody').addEventListener('input',e=>{if(e.target.id==='fName')sh.draft.name=e.target.value;if(e.target.id==='fUrl')sh.draft.url=e.target.value});
$('#sheetBody').addEventListener('change',async e=>{if(e.target.id!=='fFile'||!e.target.files[0])return;
  const c=await readCover(e.target.files[0]);if(c){sh.draft.cover=c;drawSheet()}else toast('Görsel okunamadı')});
function readCover(file){return new Promise(res=>{const r=new FileReader();r.onerror=()=>res('');
  r.onload=()=>{const im=new Image();im.onerror=()=>res('');im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=160;
    const s=Math.min(im.width,im.height);c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,160,160);res(c.toDataURL('image/jpeg',.85))};im.src=r.result};
  r.readAsDataURL(file)})}

/* ---------- Eylemler ---------- */
async function act(n,b){
  switch(n){
    case'back':pop();break;
    case'tl-copy':tlCopy();break;
    case'tl-say':tlSay();break;
    case'tl-swap':{const from=S.tlFrom==='auto'?(TLS.det||'').split('-')[0]||'en':S.tlFrom;const nf=S.tlTo,nt=TLL.some(l=>l[0]===from)?from:'en';S.tlFrom=nf;S.tlTo=nt;save();TLS={t:'',out:'',det:'',to:'',err:''};drawSugg();runTL(QV().trim());break}
    case'note-copy':{const v=($('#noteTa')||{}).value||'';if(!v.trim()){toast('Not boş');break}toast(await copyText(v)?'Not kopyalandı':'Kopyalanamadı');break}
    case'note-save':{const v=($('#noteTa')||{}).value||'';if(!v.trim()){toast('Not boş');break}const ok=await copyText(v);toast(ok?'Kopyalandı · Notlar açılıyor':'Notlar açılıyor');setTimeout(()=>{location.href='mobilenotes://'},400);break}
    case'mv':{const i=+b.dataset.i,j=i+ +b.dataset.d;if(S.modes[j]){[S.modes[i],S.modes[j]]=[S.modes[j],S.modes[i]];commit()}break}
    case'pedit':
      if(!profEdit){pdraft={...S.profile};profEdit=true;refreshTop();break}
      {const em=(pdraft.email||'').trim();
        if((pdraft._b||'').trim()&&!pdraft.birth){toast('Doğum tarihini gg.aa.yyyy olarak yazın');break}
       if(em&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){toast('Geçerli bir e-posta girin');break}
       S.profile={name:(pdraft.name||'').trim().slice(0,60),email:em.slice(0,80),phone:(pdraft.phone||'').trim().slice(0,30),birth:/^\d{4}-\d{2}-\d{2}$/.test(pdraft.birth||'')?pdraft.birth:'',photo:pdraft.photo||'',city:pdraft.city||'',district:pdraft.district||''};
       profEdit=false;pdraft=null;commit();toast('Profil kaydedildi')}
      break;
    case'ppick':pPick.click();break;
    case'pclr':if(pdraft){pdraft.photo='';refreshTop()}break;
    case'm-set':menu(false);push('settings');break;
    case'm-edit':menu(false);openSheet();break;
    case'sc-':S.scale=Math.max(80,S.scale-5);commit();break;
    case'sc+':S.scale=Math.min(125,S.scale+5);commit();break;
    case'rst-app':if(await ask('Görünüm sıfırlansın mı?','Mod, vurgu rengi ve ölçek varsayılana döner.','Sıfırla')){S.theme=DEF.theme;S.accent=DEF.accent;S.scale=DEF.scale;S.hidePop=S.hideFav=S.noAnim=false;S.autoComp=true;S.modes=sane({}).modes;commit()}break;
    case'rst-search':if(await ask('Arama yönetimi sıfırlansın mı?','Tüm arama motorları varsayılana döner.','Sıfırla')){for(const k of['same','sameEngine','web','image','video','openApp','adult'])S[k]=DEF[k];S.fp={...DEF.fp};S.blocked=[];commit()}break;
    case'unblock':S.blocked=[];commit();toast('Gizlenen öneriler geri getirildi');break;
    case'rst-all':if(await ask('Her şey sıfırlansın mı?','Ayarlar, profil, favori siteler, arama geçmişi, sohbetler ve hafıza silinecek.','Sıfırla')){S=sane({});H=[];saveH();LRN=[];saveL();rebuildL();commit();toast('Sıfırlandı')}break;
    case'rst-hist':if(await ask('Geçmiş temizlensin mi?','Tüm arama geçmişi silinecek.','Temizle')){H=[];saveH();commit()}break;
    case'exp':{const bl=new Blob([JSON.stringify({app:'neurun',version:'1.0.0',settings:S,history:H},null,2)],{type:'application/json'});
      const a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='neurun-ayarlar.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);toast('Dışa aktarıldı');break}
    case'imp':$('#impFile').click();break;
    case'sclose':closeSheet();break;
    case'fadd':sh={view:'form',draft:{id:rnd(),name:'',url:'',cover:'',isNew:true}};drawSheet();break;
    case'fedit':{const f=S.favs.find(x=>x.id===b.dataset.id);if(f){sh={view:'form',draft:{...f,isNew:false}};drawSheet()}break}
    case'fback':sh={view:'list'};drawSheet();break;
    case'fpick':$('#fFile').click();break;
    case'fclr':sh.draft.cover='';drawSheet();break;
    case'fsave':{const d=sh.draft;let url=d.url.trim();
      if(!url){toast('Adres gerekli');return}
      if(!/^https?:\/\//i.test(url))url='https://'+url;
      try{const u=new URL(url);if(!u.hostname.includes('.'))throw 0}catch(_){toast('Geçersiz adres');return}
      const item={id:d.id,name:d.name.trim().slice(0,40),url,cover:d.cover||''};
      const i=S.favs.findIndex(x=>x.id===d.id);if(i>=0)S.favs[i]=item;else S.favs.push(item);
      save();renderFavs();sh={view:'list'};drawSheet();break}
    case'fdel':if(await ask('Site silinsin mi?','Bu favori ana ekrandan kaldırılır.','Sil')){S.favs=S.favs.filter(x=>x.id!==sh.draft.id);save();renderFavs();sh={view:'list'};drawSheet()}break;
  }
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-go],[data-set],[data-act],[data-hq],[data-hdel]');if(!b)return;
  if(b.dataset.hq){const h=H.find(x=>x.id===b.dataset.hq);if(h)doSearch(h.m,h.q);return}
  if(b.dataset.hdel){H=H.filter(x=>x.id!==b.dataset.hdel);saveH();commit();return}
  if(b.dataset.go){push(b.dataset.go,b.dataset.arg||'');return}
  if(b.dataset.set){const k=b.dataset.set;S[k]=(k==='scale'||k==='histDays')?+b.dataset.val:b.dataset.val;if(k==='histDays')pruneH();commit();return}
  act(b.dataset.act,b);
});
let swT;const later=()=>{clearTimeout(swT);swT=setTimeout(commit,480)};
document.addEventListener('change',e=>{const t=e.target;if(t.dataset&&t.dataset.tl){S[t.dataset.tl==='from'?'tlFrom':'tlTo']=t.value;save();TLS={t:'',out:'',det:'',to:'',err:''};drawSugg();runTL(QV().trim());return}
  if(t.dataset&&t.dataset.mon){const m=S.modes.find(x=>x.k===t.dataset.mon);m.on=t.checked;save();later();return}
  if(t.dataset&&t.dataset.fp){S.fp[t.dataset.fp]=t.checked;save();later();return}
  if(t.dataset&&t.dataset.tog){S[t.dataset.tog]=t.checked;save();later()}});
$('#impFile').addEventListener('change',async e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  try{const o=JSON.parse(await f.text());S=sane(o.settings||o);if(Array.isArray(o.history))H=cleanH(o.history);pruneH();commit();toast('İçe aktarıldı')}catch(_){toast('Dosya geçersiz')}
});

/* ---------- Duck yanıtı (DuckDuckGo Instant Answer) ---------- */
let lans=null,acA=null;
const ansVisible=()=>!$('#lans').hidden;
function hideAns(){if(acA)acA.abort();lans=null;const el=$('#lans');if(!el.hidden){el.hidden=true;drawSugg()}}

const fileToJpeg=(file,max,sq)=>new Promise(res=>{
  const u=URL.createObjectURL(file),im=new Image();
  im.onerror=()=>{URL.revokeObjectURL(u);res('')};
  im.onload=()=>{let sx=0,sy=0,sw2=im.width,sh=im.height;
    if(sq){const s=Math.min(im.width,im.height);sx=(im.width-s)/2;sy=(im.height-s)/2;sw2=sh=s}
    const k=Math.min(1,max/Math.max(sw2,sh)),c=document.createElement('canvas');c.width=Math.round(sw2*k);c.height=Math.round(sh*k);
    c.getContext('2d').drawImage(im,sx,sy,sw2,sh,0,0,c.width,c.height);URL.revokeObjectURL(u);res(c.toDataURL('image/jpeg',.86))};
  im.src=u});

/* ---------- profil / hafıza durumları ---------- */
const PROV='Adana,Adıyaman,Afyonkarahisar,Ağrı,Aksaray,Amasya,Ankara,Antalya,Ardahan,Artvin,Aydın,Balıkesir,Bartın,Batman,Bayburt,Bilecik,Bingöl,Bitlis,Bolu,Burdur,Bursa,Çanakkale,Çankırı,Çorum,Denizli,Diyarbakır,Düzce,Edirne,Elazığ,Erzincan,Erzurum,Eskişehir,Gaziantep,Giresun,Gümüşhane,Hakkâri,Hatay,Iğdır,Isparta,İstanbul,İzmir,Kahramanmaraş,Karabük,Karaman,Kars,Kastamonu,Kayseri,Kırıkkale,Kırklareli,Kırşehir,Kilis,Kocaeli,Konya,Kütahya,Malatya,Manisa,Mardin,Mersin,Muğla,Muş,Nevşehir,Niğde,Ordu,Osmaniye,Rize,Sakarya,Samsun,Siirt,Sinop,Sivas,Şanlıurfa,Şırnak,Tekirdağ,Tokat,Trabzon,Tunceli,Uşak,Van,Yalova,Yozgat,Zonguldak'.split(',');
async function distOf(city){return DIST[city]||[]}
async function fillDist(city,cur){const sel=$('#distSel');if(!sel)return;if(!city){sel.innerHTML='<option value="">Önce il seçin</option>';return}
  sel.innerHTML='<option value="">Yükleniyor…</option>';const l=await distOf(city);if(!$('#distSel'))return;
  sel.innerHTML='<option value="">'+(l.length?'Seçin':'İlçeler yüklenemedi')+'</option>'+l.map(n=>`<option ${n===cur?'selected':''}>${esc(n)}</option>`).join('')}
const fmtBIn=v=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v);return m?`${m[3]}.${m[2]}.${m[1]}`:''};
function parseBIn(t){const m=/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec((t||'').trim());if(!m)return'';const d=+m[1],mo=+m[2],y=+m[3],dt=new Date(y,mo-1,d);if(dt.getFullYear()!==y||dt.getMonth()!==mo-1||dt.getDate()!==d||y<1900||dt>new Date())return'';return `${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`}
const canonProv=t=>PROV.find(n=>fold(n)===fold(t||''))||'';
const distOpts=c=>(DIST[canonProv(c)]||[]).map(n=>`<option value="${esc(n)}">`).join('');
document.addEventListener('input',e=>{const t=e.target;if(!t||!t.dataset||!pdraft)return;
  if(t.dataset.pb!==undefined){if(e.inputType!=='deleteContentBackward'){const d=t.value.replace(/\D/g,'').slice(0,8);let o=d.slice(0,2);if(d.length>2)o+='.'+d.slice(2,4);if(d.length>4)o+='.'+d.slice(4);t.value=o}
    pdraft._b=t.value;pdraft.birth=parseBIn(t.value)}
  if(t.dataset.city!==undefined){const dl=$('#dlDist');if(dl)dl.innerHTML=distOpts(t.value)}});
document.addEventListener('focusout',e=>{const t=e.target;if(!t||!t.dataset||!pdraft)return;
  if(t.dataset.city!==undefined){const c=canonProv(t.value);if(c){t.value=c;pdraft.city=c;const dl=$('#dlDist');if(dl)dl.innerHTML=distOpts(c)}}
  if(t.dataset.dist!==undefined){const l=DIST[canonProv(pdraft.city)]||[],d=l.find(n=>fold(n)===fold(t.value));if(d){t.value=d;pdraft.district=d}}});
let profEdit=false,pdraft=null,medit=null;
const initials=n=>(n||'').trim().split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0].toLocaleUpperCase('tr-TR')).join('');
const PERSON='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4.2"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></svg>';
const avatar=(p,big)=>`<span class="av${big?' lg2':''}">${p.photo?`<img src="${p.photo}" alt="">`:(initials(p.name)||PERSON)}</span>`;
const pPick=document.createElement('input');pPick.type='file';pPick.accept='image/*';
pPick.addEventListener('change',async()=>{const f=pPick.files[0];pPick.value='';if(!f||!pdraft)return;const r=await shrink(f);if(r)openCrop(r,d=>{pdraft.photo=d;refreshTop()});else toast('Görsel okunamadı')});
document.addEventListener('input',e=>{
  const t=e.target;if(!t||!t.dataset)return;
  if(t.dataset.bind){S[t.dataset.bind]=t.value.slice(0,40);save()}
  if(t.dataset.pf!==undefined&&pdraft)pdraft[t.dataset.pf]=t.value;
  if(t.dataset.mbind&&medit)medit[t.dataset.mbind]=t.value;
});

/* ---------- müzik ---------- */
async function openSong(s){
  const t=(s.q||`${s.title} ${s.artist}`).trim(),e=encodeURIComponent(t);recordH('music',t);const lv=leave();let u='';
  try{if(s.q){}else if(S.music==='apple'){u=s.url||'';if(!u){const r=(await(await fetch('https://itunes.apple.com/search?country=TR&media=music&entity=song&limit=5&term='+e)).json()).results||[];const x=r.find(x=>norm(x.trackName)===norm(s.title))||r[0];u=(x&&x.trackViewUrl)||''}}
   else if(S.music==='deezer'){u=s.dz||'';if(!u){const l=await deezer(t),x=l.find(x=>norm(x.title)===norm(s.title))||l[0];u=(x&&x.dz)||''}}else if(S.music==='soundcloud'){u=s.sc||''}}catch(_){}
  await lv;openSite(u||MUSURL[S.music](e));
}
addEventListener('pagehide',()=>{msugs=[];document.querySelectorAll('img.cv').forEach(i=>{i.src=''})});


/* metin seçme / bağlam menüsü engeli (arama kutusu ve form alanları hariç) */
const okSel=e=>{const el=e.target.nodeType===1?e.target:e.target.parentElement;return !!(el&&el.closest('input,textarea'))};
document.addEventListener('selectstart',e=>{if(!okSel(e))e.preventDefault()});
document.addEventListener('contextmenu',e=>{if(!okSel(e))e.preventDefault()});
/* ---------- Kırpma ---------- */
let cr=null,cdrag=null;
const clamp=(v,a,b)=>Math.min(Math.max(v,a),b);
function openCrop(r,cb){
  cr={src:r,cb};const im=$('#cimg');
  im.onload=layoutCrop;im.src=r.url;
  const c=$('#crop');c.hidden=false;requestAnimationFrame(()=>requestAnimationFrame(()=>{c.classList.add('open');layoutCrop()}));
}
function layoutCrop(){
  if(!cr)return;const st=$('#cstage'),im=$('#cimg'),W=st.clientWidth,H2=st.clientHeight;
  if(!im.naturalWidth||!W)return;
  const s=Math.min(W/im.naturalWidth,H2/im.naturalHeight);
  cr.s=s;cr.r={x:(W-im.naturalWidth*s)/2,y:(H2-im.naturalHeight*s)/2,w:im.naturalWidth*s,h:im.naturalHeight*s};
  im.style.cssText=`left:${cr.r.x}px;top:${cr.r.y}px;width:${cr.r.w}px;height:${cr.r.h}px`;
  if(!cr.f){cr.f={...cr.r};if(cr.cb){const m=Math.min(cr.r.w,cr.r.h);cr.f={x:cr.r.x+(cr.r.w-m)/2,y:cr.r.y+(cr.r.h-m)/2,w:m,h:m}}}drawCrop();
}
function drawCrop(){const f=cr.f;$('#cf').style.cssText=`left:${f.x}px;top:${f.y}px;width:${f.w}px;height:${f.h}px`}
function closeCrop(){const c=$('#crop');c.classList.remove('open');const s=cr&&cr.src;cr=null;setTimeout(()=>{c.hidden=true;if(s)URL.revokeObjectURL(s.url)},350)}
const cf=$('#cf');
cf.addEventListener('pointerdown',e=>{if(!cr)return;cdrag={h:e.target.dataset.h||'move',x:e.clientX,y:e.clientY,f:{...cr.f}};cf.setPointerCapture(e.pointerId);e.preventDefault()});
cf.addEventListener('pointermove',e=>{
  if(!cdrag||!cr)return;const dx=e.clientX-cdrag.x,dy=e.clientY-cdrag.y,R0=cr.r,o=cdrag.f,M=48;
  if(cdrag.h==='move'){cr.f={x:clamp(o.x+dx,R0.x,R0.x+R0.w-o.w),y:clamp(o.y+dy,R0.y,R0.y+R0.h-o.h),w:o.w,h:o.h}}
  else if(cr.cb){const h=cdrag.h,sx=h.includes('l')?-1:1,sy=h.includes('t')?-1:1,ax=sx>0?o.x:o.x+o.w,ay=sy>0?o.y:o.y+o.h,mx=sx>0?R0.x+R0.w-ax:ax-R0.x,my=sy>0?R0.y+R0.h-ay:ay-R0.y;let d=(o.w+sx*dx+o.h+sy*dy)/2;d=clamp(d,M,Math.max(M,Math.min(mx,my)));cr.f={x:sx>0?ax:ax-d,y:sy>0?ay:ay-d,w:d,h:d}}
  else{let l=o.x,tp=o.y,r=o.x+o.w,b=o.y+o.h;const h=cdrag.h;
    if(h.includes('l'))l=clamp(l+dx,R0.x,r-M);
    if(h.includes('r'))r=clamp(r+dx,l+M,R0.x+R0.w);
    if(h.includes('t'))tp=clamp(tp+dy,R0.y,b-M);
    if(h.includes('b'))b=clamp(b+dy,tp+M,R0.y+R0.h);
    cr.f={x:l,y:tp,w:r-l,h:b-tp}}
  drawCrop();
});
cf.addEventListener('pointerup',()=>{cdrag=null});cf.addEventListener('pointercancel',()=>{cdrag=null});
$('#crop').addEventListener('click',e=>{
  const b=e.target.closest('[data-c]');if(!b||!cr)return;const a=b.dataset.c;
  if(a==='cancel')closeCrop();
  else if(a==='reset'){cr.f={...cr.r};if(cr.cb){const m=Math.min(cr.r.w,cr.r.h);cr.f={x:cr.r.x+(cr.r.w-m)/2,y:cr.r.y+(cr.r.h-m)/2,w:m,h:m}}drawCrop()}
  else if(a==='done'){
    const f=cr.f,R0=cr.r,s=cr.s,im=$('#cimg'),c=document.createElement('canvas');
    const sx=(f.x-R0.x)/s,sy=(f.y-R0.y)/s,sw2=f.w/s,sh=f.h/s;
    c.width=Math.max(1,Math.round(sw2));c.height=Math.max(1,Math.round(sh));
    c.getContext('2d').drawImage(im,sx,sy,sw2,sh,0,0,c.width,c.height);
    if(cr.cb){const cb=cr.cb,k=Math.min(1,480/Math.max(c.width,c.height)),o=document.createElement('canvas');o.width=Math.round(c.width*k);o.height=Math.round(c.height*k);o.getContext('2d').drawImage(c,0,0,o.width,o.height);cb(o.toDataURL('image/jpeg',.88));closeCrop();return}
    c.toBlob(bl=>{if(bl)setPic({blob:bl,url:URL.createObjectURL(bl)});else toast('Görsel kırpılamadı');closeCrop()},'image/jpeg',.9);
  }
});
addEventListener('resize',()=>{if(cr){cr.f=null;layoutCrop()}});
/* ---------- Ana ekran dokunma / kaydırma ---------- */
{let touching=false,drag=false,lastEnd=0,sx0=0,sy0=0,prevY=home.scrollTop,sawTop=false;
 const free=()=>!stack.length&&!home.classList.contains('splash')&&!home.classList.contains('chat')&&!$('#sheet').classList.contains('open')&&!$('#menu').classList.contains('open')&&$('#intro').hidden&&$('#crop').hidden;
 const user=()=>drag&&(touching||Date.now()-lastEnd<900);
 const focusQ=()=>{try{q.focus({preventScroll:true})}catch(_){}};
 home.addEventListener('touchstart',e=>{const t=e.touches[0];touching=true;drag=false;sx0=t.clientX;sy0=t.clientY;sawTop=false},{passive:true});
 home.addEventListener('touchmove',e=>{const t=e.touches[0];if(Math.abs(t.clientY-sy0)>8||Math.abs(t.clientX-sx0)>8)drag=true},{passive:true});
 home.addEventListener('touchend',()=>{touching=false;lastEnd=Date.now();if(sawTop&&free()&&home.scrollTop<=1&&document.activeElement!==q){sawTop=false;focusQ()}},{passive:true});
 home.addEventListener('touchcancel',()=>{touching=false;lastEnd=Date.now()},{passive:true});
 home.addEventListener('scroll',()=>{const y=home.scrollTop,d=y-prevY;prevY=y;if(!free()||!user())return;
   if(d>4&&y>12&&document.activeElement===q)q.blur();
   if(y<=1&&d<0&&document.activeElement!==q){sawTop=true;if(!touching)focusQ()}},{passive:true});
 home.addEventListener('click',e=>{if(drag)return;if(e.target.closest('.box,.sugg,.favs,#lans,button,a,input,textarea,select'))return;if(document.activeElement===q)q.blur()});
}

/* ---------- Akıllı kartlar: saat, gün, ay, yılbaşı, doğum, yaş, burç, hesap, not ---------- */
const TRMONTH=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],TRDAY=['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
const dStart=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate()),dBetween=(a,b)=>Math.round((dStart(b)-dStart(a))/864e5);
const dLong=d=>d.toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric',weekday:'long'});
const ZOD=[['Oğlak','♑',[12,22],[1,19]],['Kova','♒',[1,20],[2,18]],['Balık','♓',[2,19],[3,20]],['Koç','♈',[3,21],[4,19]],['Boğa','♉',[4,20],[5,20]],['İkizler','♊',[5,21],[6,20]],['Yengeç','♋',[6,21],[7,22]],['Aslan','♌',[7,23],[8,22]],['Başak','♍',[8,23],[9,22]],['Terazi','♎',[9,23],[10,22]],['Akrep','♏',[10,23],[11,21]],['Yay','♐',[11,22],[12,21]]];
function zodOf(m,d){const v=m*100+d;if(v>=1222||v<=119)return ZOD[0];for(const z of ZOD.slice(1)){if(v>=z[2][0]*100+z[2][1]&&v<=z[3][0]*100+z[3][1])return z}return ZOD[0]}
const bParts=()=>{const b=S.profile&&S.profile.birth,m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(b||'');return m?{y:+m[1],m:+m[2],d:+m[3]}:null};
const noBirth=t=>`<div class="wx sm"><div class="wxh"><span>${t}</span><small>Profil</small></div><div class="sms">Doğum tarihin kayıtlı değil. Profilinden ekleyebilirsin.</div><button class="pill2" data-go="profile">Profile git</button></div>`;
const card=(h,sm,big,sub)=>`<div class="wx sm"><div class="wxh"><span>${h}</span><small>${sm||''}</small></div><div class="smb"${big[1]||''}>${big[0]}</div>${sub?`<div class="sms">${sub}</div>`:''}</div>`;
const TRN={sifir:0,bir:1,iki:2,uc:3,dort:4,bes:5,alti:6,yedi:7,sekiz:8,dokuz:9,on:10,yirmi:20,otuz:30,kirk:40,elli:50,altmis:60,yetmis:70,seksen:80,doksan:90};
const TROP={arti:'+',topla:'+',toplam:'+',eksi:'-',cikar:'-',carpi:'*',kere:'*',carp:'*',bolu:'/',bol:'/',uzeri:'^',ussu:'^'};
const FILL=new Set(['kac','eder','kactir','nedir','esittir','sonucu','sonuc','hesapla','islem','ne','kaca']);
function mathToks(raw){
  if(/^\+?\d[\d\s-]{8,}$/.test(raw.trim())||/^\d{1,2}[-./]\d{1,2}[-./]\d{2,4}$/.test(raw.trim()))return null;
  let f=fold(raw).replace(/(\d),(\d)/g,'$1.$2').replace(/(\d)\s*[x×]\s*(?=[\d(])/g,'$1*').replace(/÷/g,'/').replace(/\*\*/g,'^');
  const ws=f.match(/\d+(?:\.\d+)?|[a-z]+|[-+*\/^()]/g);if(!ws)return null;
  let cur=0,tot=0,inN=false;const out=[];const flush=()=>{if(inN){out.push(tot+cur);cur=tot=0;inN=false}};
  for(const w of ws){
    if(/^\d/.test(w)){flush();out.push(parseFloat(w));continue}
    if(w in TRN){cur+=TRN[w];inN=true;continue}
    if(w==='yuz'){cur=(cur||1)*100;inN=true;continue}
    if(w==='bin'){tot+=(cur||1)*1e3;cur=0;inN=true;continue}
    if(w==='milyon'){tot+=(cur||1)*1e6;cur=0;inN=true;continue}
    if(w==='milyar'){tot+=(cur||1)*1e9;cur=0;inN=true;continue}
    if(TROP[w]){flush();out.push(TROP[w]);continue}
    if(w==='x'){flush();out.push('*');continue}
    if(/^[-+*\/^()]$/.test(w)){flush();out.push(w);continue}
    if(FILL.has(w)){flush();continue}
    return null}
  flush();
  const nums=out.filter(x=>typeof x==='number').length,ops=out.filter(x=>'+-*/^'.includes(x)&&typeof x==='string').length;
  return nums>=2&&ops>=1?out:null}
function mathEval(tk){let i=0;const pe=()=>tk[i],nx=()=>tk[i++];
  const prim=()=>{const t=nx();if(t===undefined)throw 0;if(typeof t==='number')return t;if(t==='('){const v=add();if(nx()!==')')throw 0;return v}if(t==='-')return -pow();if(t==='+')return pow();throw 0};
  const pow=()=>{const b=prim();if(pe()==='^'){nx();return Math.pow(b,pow())}return b};
  const mul=()=>{let v=pow();while(pe()==='*'||pe()==='/'){const o=nx(),r=pow();v=o==='*'?v*r:v/r}return v};
  const add=()=>{let v=mul();while(pe()==='+'||pe()==='-'){const o=nx(),r=mul();v=o==='+'?v+r:v-r}return v};
  const v=add();if(i<tk.length)throw 0;return v}
const fmtN=v=>{if(!isFinite(v))return'Tanımsız';const r=(Math.abs(v)>=1e15||(v!==0&&Math.abs(v)<1e-9))?v.toExponential(6):parseFloat(v.toPrecision(12));return typeof r==='string'?r:r.toLocaleString('tr-TR',{maximumFractionDigits:10})};
function smartCard(t){
  if(!t)return null;const f=fold(t),n=new Date(),H=(x)=>({t,html:x});
  if(/^(saat|saat kac|su an saat kac|simdi saat kac|saat kac oldu)$/.test(f))return H(card('Saat',esc(Intl.DateTimeFormat().resolvedOptions().timeZone||''),[n.toLocaleTimeString('tr-TR')," data-clock"],dLong(n)));
  if(/^(gun|bugun|bugun gunlerden ne|gunlerden ne|bugun hangi gun|hangi gundeyiz|bugun ne gunu)$/.test(f)){const doy=dBetween(new Date(n.getFullYear(),0,1),n)+1;return H(card('Gün','Bugün',[TRDAY[n.getDay()]],`${n.getDate()} ${TRMONTH[n.getMonth()]} ${n.getFullYear()} · Yılın ${doy}. günü`))}
  if(/^(ay|bu ay|hangi ay|hangi aydayiz|su an hangi ay|simdi hangi ay)$/.test(f)){const dim=new Date(n.getFullYear(),n.getMonth()+1,0).getDate();return H(card('Ay',n.getFullYear(),[TRMONTH[n.getMonth()]],`Yılın ${n.getMonth()+1}. ayı · ${dim} gün · ayın bitmesine ${dim-n.getDate()} gün`))}
  if(/^(yilbasi|yilbasina (kac gun kaldi|ne kadar kaldi|kac gun var)|yilbasi (kac gun kaldi|geri sayim))$/.test(f)){
    if(n.getMonth()===0&&n.getDate()===1)return H(card('Yılbaşı','',['Mutlu yıllar! 🎉'],''));
    const nx=new Date(n.getFullYear()+1,0,1),d=dBetween(n,nx);return H(card('Yılbaşı',nx.getFullYear(),[d+' gün'],`1 Ocak ${nx.getFullYear()} ${TRDAY[nx.getDay()]} gününe kaldı`))}
  if(/^(dogum|dogum gunu|dogum gunum|dogum gunume (kac gun kaldi|ne kadar kaldi)|dogum gunum ne zaman)$/.test(f)){
    const b=bParts();if(!b)return H(noBirth('Doğum günü'));
    let nx=new Date(n.getFullYear(),b.m-1,b.d);if(dStart(nx)<dStart(n))nx=new Date(n.getFullYear()+1,b.m-1,b.d);
    const d=dBetween(n,nx),age=nx.getFullYear()-b.y;
    return H(d===0?card('Doğum günü','',['Doğum günün kutlu olsun! 🎂'],`${age} yaşına girdin`):card('Doğum günü',`${b.d} ${TRMONTH[b.m-1]}`,[d+' gün'],`${age} yaşına girmene kaldı · ${dLong(nx)}`))}
  if(/^(yas|yasim|yasim kac|kac yasindayim|yasim ne|yas hesapla)$/.test(f)){
    const b=bParts();if(!b)return H(noBirth('Yaş'));
    let y=n.getFullYear()-b.y,m=n.getMonth()+1-b.m,d=n.getDate()-b.d;
    if(d<0){m--;d+=new Date(n.getFullYear(),n.getMonth(),0).getDate()}if(m<0){y--;m+=12}
    const tot=dBetween(new Date(b.y,b.m-1,b.d),n);
    return H(card('Yaş','',[y+' yaş'],`${m} ay ${d} gün · toplam ${tot.toLocaleString('tr-TR')} gün`))}
  if(/^(burc|burcum|burcum ne|burcum nedir|hangi burcum)$/.test(f)){
    const b=bParts();if(!b)return H(noBirth('Burç'));
    const z=zodOf(b.m,b.d);return H(card('Burç',z[1],[z[0]],`${z[2][1]} ${TRMONTH[z[2][0]-1]} – ${z[3][1]} ${TRMONTH[z[3][0]-1]}`))}
  const tk=mathToks(t);
  if(tk){try{const v=mathEval(tk);const ex=tk.map(x=>x==='*'?'×':x==='/'?'÷':typeof x==='number'?x.toLocaleString('tr-TR',{maximumFractionDigits:10}):x).join(' ');
    return H(card('Hesap Makinesi',esc(ex),['= '+fmtN(v)],''))}catch(e){}}
  return null}
setInterval(()=>{const l=document.querySelectorAll('[data-clock]');if(l.length){const s=new Date().toLocaleTimeString('tr-TR');l.forEach(e=>e.textContent=s)}},1000);
/* not defteri */
let noteDraft='';try{noteDraft=localStorage.getItem('luna_note')||''}catch(e){}
function noteOn(){return mode==='web'&&q.value.toLowerCase()==='not'}
const COPYIC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6.5A2.5 2.5 0 017.5 4H15"/></svg>';
function noteHTML(){return `<div class="note"><button class="nbtn nc" data-act="note-copy" aria-label="Kopyala">${COPYIC}Kopyala</button><textarea id="noteTa" placeholder="Notunu yaz…" aria-label="Not" autocapitalize="sentences">${esc(noteDraft)}</textarea><button class="nbtn ns" data-act="note-save">Kaydet</button></div>`}
document.addEventListener('input',e=>{if(e.target&&e.target.id==='noteTa'){noteDraft=e.target.value;try{localStorage.setItem('luna_note',noteDraft)}catch(_){}}});
const DISTBLOB='Adana:Aladağ,Ceyhan,Çukurova,Feke,İmamoğlu,Karaisalı,Karataş,Kozan,Pozantı,Saimbeyli,Sarıçam,Seyhan,Tufanbeyli,Yumurtalık,Yüreğir;Adıyaman:Besni,Çelikhan,Gerger,Gölbaşı,Kahta,Merkez,Samsat,Sincik,Tut;Afyonkarahisar:Başmakçı,Bayat,Bolvadin,Çay,Çobanlar,Dazkırı,Dinar,Emirdağ,Evciler,Hocalar,İhsaniye,İscehisar,Kızılören,Merkez,Sandıklı,Sinanpaşa,Sultandağı,Şuhut;Ağrı:Diyadin,Doğubayazıt,Eleşkirt,Hamur,Merkez,Patnos,Taşlıçay,Tutak;Amasya:Göynücek,Gümüşhacıköy,Hamamözü,Merkez,Merzifon,Suluova,Taşova;Ankara:Akyurt,Altındağ,Ayaş,Bala,Beypazarı,Çamlıdere,Çankaya,Çubuk,Elmadağ,Etimesgut,Evren,Gölbaşı,Güdül,Haymana,Kahramankazan,Kalecik,Keçiören,Kızılcahamam,Mamak,Nallıhan,Polatlı,Pursaklar,Sincan,Şereflikoçhisar,Yenimahalle;Antalya:Akseki,Aksu,Alanya,Demre,Döşemealtı,Elmalı,Finike,Gazipaşa,Gündoğmuş,İbradı,Kaş,Kemer,Kepez,Konyaaltı,Korkuteli,Kumluca,Manavgat,Muratpaşa,Serik;Artvin:Ardanuç,Arhavi,Borçka,Hopa,Kemalpaşa,Merkez,Murgul,Şavşat,Yusufeli;Aydın:Bozdoğan,Buharkent,Çine,Didim,Efeler,Germencik,İncirliova,Karacasu,Karpuzlu,Koçarlı,Köşk,Kuşadası,Kuyucak,Nazilli,Söke,Sultanhisar,Yenipazar;Balıkesir:Altıeylül,Ayvalık,Balya,Bandırma,Bigadiç,Burhaniye,Dursunbey,Edremit,Erdek,Gömeç,Gönen,Havran,İvrindi,Karesi,Kepsut,Manyas,Marmara,Savaştepe,Sındırgı,Susurluk;Bilecik:Bozüyük,Gölpazarı,İnhisar,Merkez,Osmaneli,Pazaryeri,Söğüt,Yenipazar;Bingöl:Adaklı,Genç,Karlıova,Kiğı,Merkez,Solhan,Yayladere,Yedisu;Bitlis:Adilcevaz,Ahlat,Güroymak,Hizan,Merkez,Mutki,Tatvan;Bolu:Dörtdivan,Gerede,Göynük,Kıbrıscık,Mengen,Merkez,Mudurnu,Seben,Yeniçağa;Burdur:Ağlasun,Altınyayla,Bucak,Çavdır,Çeltikçi,Gölhisar,Karamanlı,Kemer,Merkez,Tefenni,Yeşilova;Bursa:Büyükorhan,Gemlik,Gürsu,Harmancık,İnegöl,İznik,Karacabey,Keles,Kestel,Mudanya,Mustafakemalpaşa,Nilüfer,Orhaneli,Orhangazi,Osmangazi,Yenişehir,Yıldırım;Çanakkale:Ayvacık,Bayramiç,Biga,Bozcaada,Çan,Eceabat,Ezine,Gelibolu,Gökçeada,Lapseki,Merkez,Yenice;Çankırı:Atkaracalar,Bayramören,Çerkeş,Eldivan,Ilgaz,Kızılırmak,Korgun,Kurşunlu,Merkez,Orta,Şabanözü,Yapraklı;Çorum:Alaca,Bayat,Boğazkale,Dodurga,İskilip,Kargı,Laçin,Mecitözü,Merkez,Oğuzlar,Ortaköy,Osmancık,Sungurlu,Uğurludağ;Denizli:Acıpayam,Babadağ,Baklan,Bekilli,Beyağaç,Bozkurt,Buldan,Çal,Çameli,Çardak,Çivril,Güney,Honaz,Kale,Merkezefendi,Pamukkale,Sarayköy,Serinhisar,Tavas;Diyarbakır:Bağlar,Bismil,Çermik,Çınar,Çüngüş,Dicle,Eğil,Ergani,Hani,Hazro,Kayapınar,Kocaköy,Kulp,Lice,Silvan,Sur,Yenişehir;Edirne:Enez,Havsa,İpsala,Keşan,Lalapaşa,Meriç,Merkez,Süloğlu,Uzunköprü;Elazığ:Ağın,Alacakaya,Arıcak,Baskil,Karakoçan,Keban,Kovancılar,Maden,Merkez,Palu,Sivrice;Erzincan:Çayırlı,İliç,Kemah,Kemaliye,Merkez,Otlukbeli,Refahiye,Tercan,Üzümlü;Erzurum:Aşkale,Aziziye,Çat,Hınıs,Horasan,İspir,Karaçoban,Karayazı,Köprüköy,Narman,Oltu,Olur,Palandöken,Pasinler,Pazaryolu,Şenkaya,Tekman,Tortum,Uzundere,Yakutiye;Eskişehir:Alpu,Beylikova,Çifteler,Günyüzü,Han,İnönü,Mahmudiye,Mihalgazi,Mihalıççık,Odunpazarı,Sarıcakaya,Seyitgazi,Sivrihisar,Tepebaşı;Gaziantep:Araban,İslahiye,Karkamış,Nizip,Nurdağı,Oğuzeli,Şahinbey,Şehitkamil,Yavuzeli;Giresun:Alucra,Bulancak,Çamoluk,Çanakçı,Dereli,Doğankent,Espiye,Eynesil,Görele,Güce,Keşap,Merkez,Piraziz,Şebinkarahisar,Tirebolu,Yağlıdere;Gümüşhane:Kelkit,Köse,Kürtün,Merkez,Şiran,Torul;Hakkâri:Çukurca,Derecik,Merkez,Şemdinli,Yüksekova;Hatay:Altınözü,Antakya,Arsuz,Belen,Defne,Dörtyol,Erzin,Hassa,İskenderun,Kırıkhan,Kumlu,Payas,Reyhanlı,Samandağ,Yayladağı;Isparta:Aksu,Atabey,Eğirdir,Gelendost,Gönen,Keçiborlu,Merkez,Senirkent,Sütçüler,Şarkikaraağaç,Uluborlu,Yalvaç,Yenişarbademli;Mersin:Akdeniz,Anamur,Aydıncık,Bozyazı,Çamlıyayla,Erdemli,Gülnar,Mezitli,Mut,Silifke,Tarsus,Toroslar,Yenişehir;İstanbul:Adalar,Arnavutköy,Ataşehir,Avcılar,Bağcılar,Bahçelievler,Bakırköy,Başakşehir,Bayrampaşa,Beşiktaş,Beykoz,Beylikdüzü,Beyoğlu,Büyükçekmece,Çatalca,Çekmeköy,Esenler,Esenyurt,Eyüpsultan,Fatih,Gaziosmanpaşa,Güngören,Kadıköy,Kağıthane,Kartal,Küçükçekmece,Maltepe,Pendik,Sancaktepe,Sarıyer,Silivri,Sultanbeyli,Sultangazi,Şile,Şişli,Tuzla,Ümraniye,Üsküdar,Zeytinburnu;İzmir:Aliağa,Balçova,Bayındır,Bayraklı,Bergama,Beydağ,Bornova,Buca,Çeşme,Çiğli,Dikili,Foça,Gaziemir,Güzelbahçe,Karabağlar,Karaburun,Karşıyaka,Kemalpaşa,Kınık,Kiraz,Konak,Menderes,Menemen,Narlıdere,Ödemiş,Seferihisar,Selçuk,Tire,Torbalı,Urla;Kars:Akyaka,Arpaçay,Digor,Kağızman,Merkez,Sarıkamış,Selim,Susuz;Kastamonu:Abana,Ağlı,Araç,Azdavay,Bozkurt,Cide,Çatalzeytin,Daday,Devrekani,Doğanyurt,Hanönü,İhsangazi,İnebolu,Küre,Merkez,Pınarbaşı,Seydiler,Şenpazar,Taşköprü,Tosya;Kayseri:Akkışla,Bünyan,Develi,Felahiye,Hacılar,İncesu,Kocasinan,Melikgazi,Özvatan,Pınarbaşı,Sarıoğlan,Sarız,Talas,Tomarza,Yahyalı,Yeşilhisar;Kırklareli:Babaeski,Demirköy,Kofçaz,Lüleburgaz,Merkez,Pehlivanköy,Pınarhisar,Vize;Kırşehir:Akçakent,Akpınar,Boztepe,Çiçekdağı,Kaman,Merkez,Mucur;Kocaeli:Başiskele,Çayırova,Darıca,Derince,Dilovası,Gebze,Gölcük,İzmit,Kandıra,Karamürsel,Kartepe,Körfez;Konya:Ahırlı,Akören,Akşehir,Altınekin,Beyşehir,Bozkır,Cihanbeyli,Çeltik,Çumra,Derbent,Derebucak,Doğanhisar,Emirgazi,Ereğli,Güneysınır,Hadim,Halkapınar,Hüyük,Ilgın,Kadınhanı,Karapınar,Karatay,Kulu,Meram,Sarayönü,Selçuklu,Seydişehir,Taşkent,Tuzlukçu,Yalıhüyük,Yunak;Kütahya:Altıntaş,Aslanapa,Çavdarhisar,Domaniç,Dumlupınar,Emet,Gediz,Hisarcık,Merkez,Pazarlar,Simav,Şaphane,Tavşanlı;Malatya:Akçadağ,Arapgir,Arguvan,Battalgazi,Darende,Doğanşehir,Doğanyol,Hekimhan,Kale,Kuluncak,Pütürge,Yazıhan,Yeşilyurt;Manisa:Ahmetli,Akhisar,Alaşehir,Demirci,Gölmarmara,Gördes,Kırkağaç,Köprübaşı,Kula,Salihli,Sarıgöl,Saruhanlı,Selendi,Soma,Şehzadeler,Turgutlu,Yunusemre;Kahramanmaraş:Afşin,Andırın,Çağlayancerit,Dulkadiroğlu,Ekinözü,Elbistan,Göksun,Nurhak,Onikişubat,Pazarcık,Türkoğlu;Mardin:Artuklu,Dargeçit,Derik,Kızıltepe,Mazıdağı,Midyat,Nusaybin,Ömerli,Savur,Yeşilli;Muğla:Bodrum,Dalaman,Datça,Fethiye,Kavaklıdere,Köyceğiz,Marmaris,Menteşe,Milas,Ortaca,Seydikemer,Ula,Yatağan;Muş:Bulanık,Hasköy,Korkut,Malazgirt,Merkez,Varto;Nevşehir:Acıgöl,Avanos,Derinkuyu,Gülşehir,Hacıbektaş,Kozaklı,Merkez,Ürgüp;Niğde:Altunhisar,Bor,Çamardı,Çiftlik,Merkez,Ulukışla;Ordu:Akkuş,Altınordu,Aybastı,Çamaş,Çatalpınar,Çaybaşı,Fatsa,Gölköy,Gülyalı,Gürgentepe,İkizce,Kabadüz,Kabataş,Korgan,Kumru,Mesudiye,Perşembe,Ulubey,Ünye;Rize:Ardeşen,Çamlıhemşin,Çayeli,Derepazarı,Fındıklı,Güneysu,Hemşin,İkizdere,İyidere,Kalkandere,Merkez,Pazar;Sakarya:Adapazarı,Akyazı,Arifiye,Erenler,Ferizli,Geyve,Hendek,Karapürçek,Karasu,Kaynarca,Kocaali,Pamukova,Sapanca,Serdivan,Söğütlü,Taraklı;Samsun:Alaçam,Asarcık,Atakum,Ayvacık,Bafra,Canik,Çarşamba,Havza,İlkadım,Kavak,Ladik,Salıpazarı,Tekkeköy,Terme,Vezirköprü,Yakakent,19 Mayıs;Siirt:Baykan,Eruh,Kurtalan,Merkez,Pervari,Şirvan,Tillo;Sinop:Ayancık,Boyabat,Dikmen,Durağan,Erfelek,Gerze,Merkez,Saraydüzü,Türkeli;Sivas:Akıncılar,Altınyayla,Divriği,Doğanşar,Gemerek,Gölova,Gürün,Hafik,İmranlı,Kangal,Koyulhisar,Merkez,Suşehri,Şarkışla,Ulaş,Yıldızeli,Zara;Tekirdağ:Çerkezköy,Çorlu,Ergene,Hayrabolu,Kapaklı,Malkara,Marmaraereğlisi,Muratlı,Saray,Süleymanpaşa,Şarköy;Tokat:Almus,Artova,Başçiftlik,Erbaa,Merkez,Niksar,Pazar,Reşadiye,Sulusaray,Turhal,Yeşilyurt,Zile;Trabzon:Akçaabat,Araklı,Arsin,Beşikdüzü,Çarşıbaşı,Çaykara,Dernekpazarı,Düzköy,Hayrat,Köprübaşı,Maçka,Of,Ortahisar,Sürmene,Şalpazarı,Tonya,Vakfıkebir,Yomra;Tunceli:Çemişgezek,Hozat,Mazgirt,Merkez,Nazımiye,Ovacık,Pertek,Pülümür;Şanlıurfa:Akçakale,Birecik,Bozova,Ceylanpınar,Eyyübiye,Halfeti,Haliliye,Harran,Hilvan,Karaköprü,Siverek,Suruç,Viranşehir;Uşak:Banaz,Eşme,Karahallı,Merkez,Sivaslı,Ulubey;Van:Bahçesaray,Başkale,Çaldıran,Çatak,Edremit,Erciş,Gevaş,Gürpınar,İpekyolu,Muradiye,Özalp,Saray,Tuşba;Yozgat:Akdağmadeni,Aydıncık,Boğazlıyan,Çandır,Çayıralan,Çekerek,Kadışehri,Merkez,Saraykent,Sarıkaya,Sorgun,Şefaatli,Yenifakılı,Yerköy;Zonguldak:Alaplı,Çaycuma,Devrek,Ereğli,Gökçebey,Kilimli,Kozlu,Merkez;Aksaray:Ağaçören,Eskil,Gülağaç,Güzelyurt,Merkez,Ortaköy,Sarıyahşi,Sultanhanı;Bayburt:Aydıntepe,Demirözü,Merkez;Karaman:Ayrancı,Başyayla,Ermenek,Kazımkarabekir,Merkez,Sarıveliler;Kırıkkale:Bahşılı,Balışeyh,Çelebi,Delice,Karakeçili,Keskin,Merkez,Sulakyurt,Yahşihan;Batman:Beşiri,Gercüş,Hasankeyf,Kozluk,Merkez,Sason;Şırnak:Beytüşşebap,Cizre,Güçlükonak,İdil,Merkez,Silopi,Uludere;Bartın:Amasra,Kurucaşile,Merkez,Ulus;Ardahan:Çıldır,Damal,Göle,Hanak,Merkez,Posof;Iğdır:Aralık,Karakoyunlu,Merkez,Tuzluca;Yalova:Altınova,Armutlu,Çınarcık,Çiftlikköy,Merkez,Termal;Karabük:Eflani,Eskipazar,Merkez,Ovacık,Safranbolu,Yenice;Kilis:Elbeyli,Merkez,Musabeyli,Polateli;Osmaniye:Bahçe,Düziçi,Hasanbeyli,Kadirli,Merkez,Sumbas,Toprakkale;Düzce:Akçakoca,Cumayeri,Çilimli,Gölyaka,Gümüşova,Kaynaşlı,Merkez,Yığılca';const DIST={};DISTBLOB.split(';').forEach(x=>{const i=x.indexOf(':');DIST[x.slice(0,i)]=x.slice(i+1).split(',')});

/* ---------- Siteyi uygulamasında aç ---------- */
function appURL(u){try{const x=new URL(u),h=x.hostname.replace(/^www\./,''),p=x.pathname,s=x.search;
  if(h==='music.youtube.com')return'youtubemusic://music.youtube.com'+p+s;
  if(h==='youtube.com'||h==='m.youtube.com')return'youtube://www.youtube.com'+p+s;
  if(h==='youtu.be')return'youtube://www.youtube.com/watch?v='+p.slice(1);
  if(h==='open.spotify.com'){const m=/^\/search\/(.+)/.exec(p);return m?'spotify:search:'+m[1]:'spotify://'+p.slice(1)}
  if(h==='music.apple.com')return'music://music.apple.com'+p+s;
  if(h==='pinterest.com'||h.endsWith('.pinterest.com')){const t=x.searchParams.get('q');return t?'pinterest://search/pins?q='+encodeURIComponent(t):''}
  if(h==='listen.tidal.com')return'tidal://'+p.slice(1)+s;
  if(h==='deezer.com')return'deezer://www.deezer.com'+p;
  if(h==='x.com'||h==='twitter.com')return'twitter://'+p.slice(1)+s;
  if(h==='imdb.com'||h==='m.imdb.com'){const m=/\/title\/(tt\d+)/.exec(p);if(m)return'imdb://title/'+m[1]}
  if(h==='instagram.com')return'instagram://'+(p==='/'?'app':'user?username='+p.split('/')[1]);
}catch(e){}return''}
function openSite(u){
  if(!S.openApp){location.href=u;return}
  const a=appURL(u);
  if(a){const t=Date.now();location.href=a;setTimeout(()=>{if(!document.hidden&&Date.now()-t<3000)location.href=u},1500);return}
  const el=document.createElement('a');el.href=u;el.target='_blank';el.rel='noopener';document.body.appendChild(el);el.click();el.remove()}

/* ---------- Film / Dizi + sonuç blokları ---------- */
const MFF=ICON.film.replace('<svg','<svg class="cvf"');
const trType=q=>({feature:'Film','TV movie':'TV filmi','TV series':'Dizi','TV mini-series':'Mini dizi',short:'Kısa film','TV special':'TV özel'}[q]||'');
const fmtVotes=n=>n>=1e6?(n/1e6).toFixed(1).replace('.',',')+' Mn':n>=1e3?Math.round(n/1e3)+' B':String(n);
/* ---------- Türkçe film adları (Wikidata, anahtarsız) ---------- */
let TRC={};try{TRC=JSON.parse(localStorage.getItem('neurun_trt')||'{}')}catch(e){}
let FDBMAP=null,trBusy=false;const TRS=new Map();
const saveTRC=()=>{try{const k=Object.keys(TRC);if(k.length>4000)for(const x of k.slice(0,k.length-4000))delete TRC[x];localStorage.setItem('neurun_trt',JSON.stringify(TRC))}catch(e){}};
const dbById=id=>{if(!FDB)return null;if(!FDBMAP)FDBMAP=new Map(FDB.map(x=>[x.id,x]));return FDBMAP.get(id)||null};
async function wdq(q,signal){return(await fetch('https://query.wikidata.org/sparql?format=json&query='+encodeURIComponent(q),{signal})).json()}
function trInfo(f){const c=TRC[f.id],orig=f.orig||f.title;
  if(c&&c.k)return{title:c.t||f.title,sub:''};
  if(c&&c.t&&fold(c.t)!==fold(orig))return{title:c.t,sub:orig};
  return{title:f.title,sub:''}}
async function enrichTR(list){
  if(trBusy)return;const ids=[...new Set((list||[]).map(f=>f&&f.id).filter(id=>/^tt\d+$/.test(id||'')&&!(id in TRC)))].slice(0,30);if(!ids.length)return;
  trBusy=true;
  try{const q=`SELECT ?imdb ?tr (COUNT(?c) AS ?k) WHERE{VALUES ?imdb{${ids.map(i=>`"${i}"`).join(' ')}}?f wdt:P345 ?imdb.OPTIONAL{?f rdfs:label ?tr FILTER(LANG(?tr)="tr")}OPTIONAL{?f wdt:P495 ?c FILTER(?c=wd:Q43)}}GROUP BY ?imdb ?tr`;
    const j=await wdq(q),seen=new Set();
    for(const b of j.results.bindings){const id=b.imdb.value;seen.add(id);const k=+(b.k&&b.k.value)>0?1:0,t=(b.tr&&b.tr.value)||'';if(!TRC[id]||t||k)TRC[id]={t,k}}
    for(const id of ids)if(!seen.has(id))TRC[id]={t:'',k:0};
    saveTRC();if(mode==='film')drawSugg()}
  catch(e){}finally{trBusy=false}}
async function trSearch(t,signal){
  if(TRS.has(t))return TRS.get(t);
  const q=`SELECT ?imdb ?tr ?en ?d (COUNT(?c) AS ?k) WHERE{SERVICE wikibase:mwapi{bd:serviceParam wikibase:endpoint "www.wikidata.org";wikibase:api "EntitySearch";mwapi:search ${JSON.stringify(t.slice(0,80))};mwapi:language "tr";mwapi:limit "30".?item wikibase:apiOutputItem mwapi:item.}VALUES ?cl{wd:Q11424 wd:Q5398426}?item wdt:P31/wdt:P279* ?cl;wdt:P345 ?imdb.FILTER(STRSTARTS(?imdb,"tt"))OPTIONAL{?item rdfs:label ?tr FILTER(LANG(?tr)="tr")}OPTIONAL{?item rdfs:label ?en FILTER(LANG(?en)="en")}OPTIONAL{?item wdt:P577 ?d}OPTIONAL{?item wdt:P495 ?c FILTER(?c=wd:Q43)}}GROUP BY ?imdb ?tr ?en ?d`;
  const j=await wdq(q,signal),m=new Map();
  for(const b of j.results.bindings){const id=b.imdb.value,y=b.d?String(b.d.value).slice(0,4):'',e=m.get(id);
    if(e){if(y&&(!e.year||y<e.year))e.year=y;continue}
    const tr=b.tr&&b.tr.value,en=b.en&&b.en.value,k=+(b.k&&b.k.value)>0?1:0;if(!(tr||en))continue;
    TRC[id]={t:tr||'',k};m.set(id,{id,title:tr||en,orig:en||tr,year:y,type:'',cast:'',poster:'',rating:null,votes:0,url:'https://www.imdb.com/title/'+id+'/'})}
  saveTRC();const r=[...m.values()];TRS.set(t,r);return r}
function filmRow(f,i){
  const T=trInfo(f);
  const cov=f.poster?`<img class="cv" src="${esc(f.poster)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML=MFF">`:MFF;
  const sub=[f.year,f.type,T.sub,f.cast].filter(Boolean).join(' · ');
  return `<div class="row srow frow"><button class="main" data-fi="${i}">${cov}<span class="two"><b>${esc(T.title)}</b><small>${esc(sub)}</small>${f.rating?`<small class="pl">★ ${esc(String(f.rating))}${f.votes?' · '+esc(fmtVotes(f.votes)):''}</small>`:''}</span></button><div class="plts" data-pk="${esc(avKey(f))}">${chipsHTML(f)}</div></div>`}
const AV=new Map(),AVP=new Set(),AVF=new Map();
const avKey=f=>f.id||f.title;
function chipsHTML(f){const a=AV.get(avKey(f));if(!a)return'';
  const sel=a.filter(x=>S.fp[x.p]!==false&&PLM[x.p]);
  if(!sel.length)return a.length?'<span class="plt0">Seçili platformlarda yok</span>':'<span class="plt0">Türkiye’de platform bulunamadı</span>';
  return sel.map(x=>{const p=PLM[x.p],lab=esc(p[1])+(x.k==='rent'||x.k==='buy'?' · kirala/satın al':'');
    return /^https?:/i.test(x.u||'')?`<button class="plt" style="--c:${p[2]};--t:${p[3]}" data-ru="${esc(x.u)}">${lab}</button>`:`<span class="plt" style="--c:${p[2]};--t:${p[3]}">${lab}</span>`}).join('')}
function paintChips(){for(const el of document.querySelectorAll('#sugg .plts')){const f=FLIST.find(x=>avKey(x)===el.dataset.pk);if(f)el.innerHTML=chipsHTML(f)}}
async function fillAvail(){
  if(!PROXY||mode!=='film')return;
  const todo=FLIST.slice(0,14).filter(f=>!AV.has(avKey(f))&&!AVP.has(avKey(f))&&!(AVF.get(avKey(f))>Date.now()));
  let n=0;const run=async()=>{while(n<todo.length){const f=todo[n++],k=avKey(f);AVP.add(k);
    try{const j=await(await fetch(PROXY+'/?mode=avail&q='+encodeURIComponent(f.title)+'&id='+encodeURIComponent(/^tt/.test(f.id||'')?f.id:'')+'&year='+encodeURIComponent(f.year||''))).json();
      if(j.errors&&j.errors.length&&!(j.results||[]).length)AVF.set(k,Date.now()+60000);else{AV.set(k,(j.results||[]).filter(x=>x&&x.p));paintChips()}}
    catch(e){AVF.set(k,Date.now()+60000)}finally{AVP.delete(k)}}};
  await Promise.all([run(),run(),run()])}
function openFilm(f){const u=f.url||('https://www.imdb.com/title/'+f.id+'/');recordH('film',f.title);leave().then(()=>openSite(u))}
let FDB=null,FDBP=null,FLOADING=false,_dbL=null,_dbT=null;
function loadFilmDB(){if(FDBP)return FDBP;
  FDBP=fetch('filmler.txt').then(r=>{if(!r.ok)throw 0;return r.text()}).then(t=>{const a=[];
    for(const l of t.split('\n')){if(!l)continue;try{const o=JSON.parse(l);if(o&&o.title)a.push({t:o.title,f:fold(o.title),y:o.year||'',r:o.rating,v:o.votes||0,id:String(o.source_id||'')})}catch(e){}}
    FDB=a;if(mode==='film')drawSugg()}).catch(()=>{FDBP=null});return FDBP}
const dbItem=x=>({id:x.id,title:x.t,year:x.y,type:'Film',rating:x.r,votes:x.v,poster:'',cast:'',url:/^tt\d+$/.test(x.id)?'https://www.imdb.com/title/'+x.id+'/':x.id.startsWith('tmdb_')?'https://www.themoviedb.org/movie/'+x.id.slice(5):'https://www.imdb.com/find/?s=tt&q='+encodeURIComponent(x.t)});
function dbLatest(){if(!FDB)return[];return _dbL||(_dbL=(()=>{const a=FDB.filter(x=>x.y>=2018).sort((p,q)=>q.y-p.y||(q.v||0)-(p.v||0)),b=FDB.filter(x=>x.y&&x.y<2018&&x.r>=6&&x.v>=100).sort((p,q)=>q.y-p.y||q.v-p.v);return[...a,...b].slice(0,20).map(dbItem)})())}
function dbTop(){if(!FDB)return[];return _dbT||(_dbT=FDB.filter(x=>x.v>=5000&&x.r).sort((a,b)=>b.r-a.r||b.v-a.v).slice(0,20).map(dbItem))}
function localFilms(t,n){const q=fold(t).trim();if(!q)return[];const tk=q.split(/\s+/),out=[],seen=new Set();
  const sc=f=>f===q?4:f.startsWith(q)?3:(' '+f).includes(' '+q)?2:tk.every(w=>f.includes(w))?1:0;
  if(FDB)for(const x of FDB){const s=sc(x.f);if(s){out.push([s,x]);seen.add(x.id)}}
  for(const id in TRC){const c=TRC[id];if(!c||!c.t||seen.has(id))continue;const s=sc(fold(c.t));if(s){const x=dbById(id);if(x)out.push([s,x])}}
  out.sort((a,b)=>b[0]-a[0]||b[1].v-a[1].v);return out.slice(0,n).map(a=>dbItem(a[1]))}
async function wdLatest(){
  const to=new Date(),from=new Date(to.getTime()-365*864e5),f=d=>d.toISOString().slice(0,10);
  const q=`SELECT ?imdb ?label ?date WHERE{?f wdt:P31 wd:Q11424;wdt:P577 ?date;wdt:P345 ?imdb;wikibase:sitelinks ?sl.FILTER(?date>="${f(from)}T00:00:00Z"^^xsd:dateTime&&?date<="${f(to)}T23:59:59Z"^^xsd:dateTime&&?sl>=15)SERVICE wikibase:label{bd:serviceParam wikibase:language "tr,en".?f rdfs:label ?label}}ORDER BY DESC(?date) LIMIT 60`;
  const ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),9000);
  try{const j=await(await fetch('https://query.wikidata.org/sparql?format=json&query='+encodeURIComponent(q),{signal:ctl.signal})).json(),seen=new Set();
    return(j.results.bindings||[]).map(b=>({id:b.imdb.value,title:b.label.value,year:(b.date.value||'').slice(0,4),type:'Film',rating:null,votes:0,poster:'',cast:'',url:'https://www.imdb.com/title/'+b.imdb.value+'/'})).filter(x=>/^tt\d+$/.test(x.id)&&!/^Q\d+$/.test(x.title)&&!seen.has(x.id)&&seen.add(x.id)).slice(0,25)}
  catch(e){return[]}finally{clearTimeout(tm)}}
async function loadFilms(){
  loadFilmDB();if(!FILM)FILM={new:[],top:[],wd:[]};
  if(!FILM.wd.length){try{const c=JSON.parse(localStorage.getItem('luna_filmwd')||'null');if(c&&Date.now()-c.t<432e5)FILM.wd=c.items}catch(e){}}
  if(mode==='film'&&!QV().trim())drawSugg();
  if(FLOADING||(FILM.new.length&&FILM.top.length))return;FLOADING=true;const jobs=[];
  if(PROXY){const get=async l=>{try{const j=await(await fetch(PROXY+'/?mode=film&n=20&list='+l)).json();return(j.results||[]).filter(x=>x&&x.title)}catch(e){return[]}};
    jobs.push(get('new').then(a=>{if(a.length)FILM.new=a}),get('top').then(b=>{if(b.length)FILM.top=b}))}
  if(!FILM.wd.length)jobs.push(wdLatest().then(a=>{if(a.length){FILM.wd=a;try{localStorage.setItem('luna_filmwd',JSON.stringify({t:Date.now(),items:a}))}catch(e){}}}));
  await Promise.all(jobs);FLOADING=false;if(mode==='film'&&!QV().trim())drawSugg()}
async function fetchFilmQ(t){
  if(fAbort)fAbort.abort();fAbort=new AbortController();const sig=fAbort.signal;sLoad=true;drawSugg();let items=[];
  const trp=trSearch(t,sig).catch(e=>[]);
  try{const k=/[a-z0-9]/i.test(t[0])?t[0].toLowerCase():'x';
    const j=await(await fetch('https://v2.sg.media-imdb.com/suggestion/'+k+'/'+encodeURIComponent(t.toLowerCase().replace(/\s+/g,'_'))+'.json',{signal:sig})).json();
    items=(j.d||[]).filter(x=>x&&/^tt/.test(x.id)&&x.l).map(x=>({id:x.id,title:x.l,year:x.y||'',type:trType(x.q),cast:x.s||'',poster:(x.i&&x.i.imageUrl)||'',rating:null,votes:0,url:'https://www.imdb.com/title/'+x.id+'/'}))}
  catch(e){if(e&&e.name==='AbortError')return}
  if(!items.length&&PROXY){try{const j=await(await fetch(PROXY+'/?mode=film&n=20&q='+encodeURIComponent(t),{signal:sig})).json();items=j.results||[]}catch(e){if(e&&e.name==='AbortError')return}}
  const tr=await trp;
  if(QV().trim()!==t||sig.aborted)return;
  sLoad=false;FQ={t,items,tr};drawSugg()}
const RESC=new Map();
function fetchRes(t){
  if(!PROXY||!['web','image','video'].includes(mode)||!t)return;
  const m=mode,key=m+'|'+t;
  if(RESC.has(key)){RES={m,t,...RESC.get(key)};drawSugg();return}
  fetch(PROXY+'/?mode='+m+'&n=24&q='+encodeURIComponent(fixQuery(t)||t)).then(r=>r.json()).then(j=>{
    if(QV().trim()!==t||mode!==m)return;
    const d={items:(j.results||[]).filter(x=>x&&/^https?:/i.test(x.url||x.image||'')),src:j.source||''};
    RESC.set(key,d);if(RESC.size>40)RESC.delete(RESC.keys().next().value);
    RES={m,t,...d};drawSugg()}).catch(()=>{})}
function resHTML(R,stale){
  const it=R.items;if(!it.length)return'';let b='';
  const head=`<div class="rhd"><span>Sonuçlar</span>${R.src?`<small>${esc(R.src)}</small>`:''}</div>`;
  if(R.m==='image')b='<div class="rgd">'+it.map(x=>`<button class="rgi" data-ru="${esc(x.url||x.image)}" aria-label="${esc(x.title||'')}"><img src="${esc(x.thumb||x.image)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"></button>`).join('')+'</div>';
  else if(R.m==='video')b='<div class="grp rsl">'+it.map(x=>`<button class="rvd" data-ru="${esc(x.url)}"><span class="rtm"><img src="${esc(x.thumb||'')}" alt="" loading="lazy" referrerpolicy="no-referrer">${x.duration?`<i>${esc(x.duration)}</i>`:''}</span><span class="two"><b>${esc(x.title)}</b><small>${esc([x.channel,x.views,x.published].filter(Boolean).join(' · '))}</small></span></button>`).join('')+'</div>';
  else b='<div class="grp rsl">'+it.map(x=>`<button class="rwb" data-ru="${esc(x.url)}"><span><b>${esc(x.title)}</b><small>${esc(x.host||host(x.url))}</small>${x.snippet?`<p>${esc(x.snippet)}</p>`:''}</span></button>`).join('')+'</div>';
  return `<div${stale?' class="rstale"':''}>${head}${b}</div>`}

/* ---------- Çeviri ---------- */
const lbase=c=>String(c||'').split('-')[0].toLowerCase();
async function gtx(t,sl,tl,signal){const j=await(await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl='+encodeURIComponent(sl)+'&tl='+encodeURIComponent(tl)+'&q='+encodeURIComponent(t),{signal})).json();return{out:(j[0]||[]).map(x=>(x&&x[0])||'').join(''),det:j[2]||sl}}
async function wtl(t,sl,tl,signal){const j=await(await fetch(PROXY+'/?mode=translate&from='+encodeURIComponent(sl)+'&to='+encodeURIComponent(tl)+'&q='+encodeURIComponent(t),{signal})).json(),r=(j.results||[])[0];if(!r||!r.text)throw 0;return{out:r.text,det:r.det||sl}}
async function mmt(t,sl,tl,signal){const s2=sl==='auto'?'en':sl,j=await(await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(t)+'&langpair='+s2+'|'+tl,{signal})).json(),o=j&&j.responseData&&j.responseData.translatedText;if(!o)throw 0;return{out:o,det:s2}}
async function translateText(t,sl,tl,signal){
  const chain=[()=>gtx(t,sl,tl,signal)];if(PROXY)chain.push(()=>wtl(t,sl,tl,signal));chain.push(()=>mmt(t,sl,tl,signal));
  for(const f of chain){try{const r=await f();if(r&&r.out)return r}catch(e){if(e&&e.name==='AbortError')throw e}}
  throw new Error('Çeviri şu an alınamadı. Biraz sonra tekrar dene.')}
async function runTL(t){
  if(mode!=='tl')return;if(tAbort)tAbort.abort();
  if(!t){TLS={t:'',out:'',det:'',to:'',err:''};drawSugg();return}
  tAbort=new AbortController();const sig=tAbort.signal,txt=t.slice(0,1800);
  try{let to=S.tlTo,r=await translateText(txt,S.tlFrom,to,sig);
    if(S.tlFrom==='auto'&&r.det&&lbase(r.det)===lbase(to)){to=lbase(to)==='tr'?'en':'tr';r=await translateText(txt,'auto',to,sig)}
    if(sig.aborted||QV().trim()!==t)return;TLS={t,out:r.out,det:r.det||'',to,err:''}}
  catch(e){if(e&&e.name==='AbortError')return;if(QV().trim()!==t)return;TLS={t,out:'',det:'',to:'',err:(e&&e.message)||'Çeviri alınamadı'}}
  drawSugg()}
function tlHTML(){
  const opts=(sel,auto)=>TLL.filter(l=>auto||l[0]!=='auto').map(l=>`<option value="${l[0]}"${l[0]===sel?' selected':''}>${l[1]}</option>`).join('');
  const bar=`<div class="tlbar"><select data-tl="from" aria-label="Kaynak dil">${opts(S.tlFrom,true)}</select><button class="tlsw" data-act="tl-swap" aria-label="Dilleri değiştir">⇄</button><select data-tl="to" aria-label="Hedef dil">${opts(S.tlTo,false)}</select></div>`;
  const t=QV().trim();let body;
  if(!t)body='<div class="tlhint">Çevirmek istediğin metni yukarıya yaz.</div>';
  else if(TLS.t===t&&TLS.err)body=`<div class="tlhint">${esc(TLS.err)}</div>`;
  else if(TLS.t!==t||!TLS.out)body='<div class="tlhint">Çevriliyor…</div>';
  else body=`<div class="tlout" dir="auto" lang="${esc(TLS.to)}">${esc(TLS.out)}</div><div class="tlmeta">${esc((TLN[S.tlFrom==='auto'?(TLL.some(l=>l[0]===lbase(TLS.det))?lbase(TLS.det):TLS.det):S.tlFrom]||TLS.det||'')+' → '+(TLN[TLS.to]||TLS.to))}</div><div class="tlbtns"><button data-act="tl-copy">Kopyala</button><button data-act="tl-say">Dinle</button></div>`;
  return `<div class="tlc">${bar}${body}</div>`}
async function tlCopy(){if(!TLS.out||TLS.t!==QV().trim()){toast('Önce çeviri bekleniyor');return}toast(await copyText(TLS.out)?'Çeviri kopyalandı':'Kopyalanamadı')}
function tlSay(){const o=TLS.out;if(!o||!('speechSynthesis' in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(o);u.lang=TLS.to||S.tlTo;speechSynthesis.speak(u)}catch(e){}}

/* ---------- Başlat ---------- */
home.dataset.lg='ara';setPic(null);apply();renderFavs();drawSugg();loadPop('web');fit();


/* ---------- Bağlam menüsü: basılı tut / sağ tık ---------- */
const CXI={copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2.6"/><path d="M5 15V6.6A1.6 1.6 0 0 1 6.6 5H15"/></svg>',
 block:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/></svg>',
 del:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 1.8h6a2 2 0 0 0 2-1.8l1-12M9 7V4.8A.8.8 0 0 1 9.8 4h4.4a.8.8 0 0 1 .8.8V7"/></svg>'};
let ctxOpen=false;
function ctxInfo(row){const sq=row.querySelector('[data-sq]');if(sq)return{text:sq.dataset.sq,copy:sq.dataset.sq};
  const mi=row.querySelector('[data-mi]');if(mi){const s=(QV().trim()?msugs:TOPS)[+mi.dataset.mi];if(s)return{text:(s.q||(s.title+' '+s.artist)).trim(),copy:(s.title+(s.artist?' – '+s.artist:'')).trim()}}return null}
function ctxForget(text,block){const f=fold(text);
  if(block&&!S.blocked.includes(f)){S.blocked.unshift(f);S.blocked=S.blocked.slice(0,500);save()}
  H=H.filter(h=>fold(h.q)!==f);saveH();LRN=LRN.filter(x=>fold(x.t)!==f);rebuildL();saveL();
  sugs=sugs.filter(x=>fold(x)!==f);
  msugs=msugs.filter(x=>fold(x.title+' '+x.artist)!==f&&fold(x.q||'')!==f);
  for(let i=TOPS.length-1;i>=0;i--){const x=TOPS[i];if(fold(x.title+' '+x.artist)===f)TOPS.splice(i,1)}
  for(const k in PQ)if(PQ[k]&&PQ[k].list)PQ[k].list=PQ[k].list.filter(x=>fold(x)!==f);
  SGC.forEach(v=>{if(v&&v.list)v.list=v.list.filter(x=>fold(x)!==f)});
  selI=-1;comp=computeComp();renderGhost();drawSugg()}
function ctxClose(){const el=$('#ctx');if(!el)return;ctxOpen=false;el.classList.remove('in');const r=el._row;if(r)r.style.visibility='';setTimeout(()=>el.remove(),320)}
function ctxShow(row,x,y){if(ctxOpen)return;const info=ctxInfo(row);if(!info)return;ctxOpen=true;
  const el=document.createElement('div');el.id='ctx';el._row=row;
  el.innerHTML=`<div class="cx-scrim"></div><div class="cx-prev"></div><div class="cx-menu glass" role="menu"><button role="menuitem" data-cx="copy">Kopyala${CXI.copy}</button><button role="menuitem" data-cx="block">Bir Daha Önerme${CXI.block}</button><button role="menuitem" data-cx="del" class="red">Sil${CXI.del}</button></div>`;
  const r=row.getBoundingClientRect(),pv=el.querySelector('.cx-prev');
  pv.style.cssText=`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;pv.appendChild(row.cloneNode(true));
  document.body.appendChild(el);row.style.visibility='hidden';
  const m=el.querySelector('.cx-menu'),mw=m.offsetWidth,mh=m.offsetHeight,vh=innerHeight,vw=innerWidth;
  let top=r.bottom+10,oy='top';if(top+mh>vh-12){top=r.top-mh-10;oy='bottom'}if(top<12){top=Math.max(12,vh-mh-12)}
  const left=Math.min(Math.max(12,(x||r.left)-mw*.3),vw-mw-12);
  m.style.cssText=`left:${left}px;top:${top}px;transform-origin:${Math.min(Math.max(0,(x||r.left)-left),mw)}px ${oy}`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));
  el.addEventListener('click',async e=>{const b=e.target.closest('[data-cx]');
    if(!b){ctxClose();return}
    const a=b.dataset.cx;ctxClose();
    if(a==='copy'){toast(await copyText(info.copy)?'Kopyalandı':'Kopyalanamadı')}
    else if(a==='block'){ctxForget(info.text,true);toast('Bir daha önerilmeyecek')}
    else{ctxForget(info.text,false);toast('Silindi')}});
}
{const sg=$('#sugg');let lpT=0,lx=0,ly=0,lr=null;
 const stopLp=()=>{clearTimeout(lpT);if(lr)lr.classList.remove('lp');lr=null};
 sg.addEventListener('touchstart',e=>{const row=e.target.closest('.srow');if(!row||ctxOpen)return;const t=e.touches[0];lx=t.clientX;ly=t.clientY;lr=row;row.classList.add('lp');
   clearTimeout(lpT);lpT=setTimeout(()=>{lpAt=Date.now();const r=lr;stopLp();if(navigator.vibrate)navigator.vibrate(12);ctxShow(r,lx,ly)},430)},{passive:true});
 sg.addEventListener('touchmove',e=>{const t=e.touches[0];if(Math.abs(t.clientX-lx)>8||Math.abs(t.clientY-ly)>8)stopLp()},{passive:true});
 sg.addEventListener('touchend',e=>{stopLp();if(Date.now()-lpAt<900&&ctxOpen)e.preventDefault()},{passive:false});
 sg.addEventListener('touchcancel',stopLp,{passive:true});
 sg.addEventListener('contextmenu',e=>{const row=e.target.closest('.srow');if(!row)return;e.preventDefault();if(ctxOpen)return;lpAt=Date.now();ctxShow(row,e.clientX,e.clientY)})}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ctxOpen)ctxClose()});
addEventListener('scroll',()=>{if(ctxOpen)ctxClose()},true);
/* ---------- Komut + ← / → ile arama modları arasında geçiş ---------- */
document.addEventListener('keydown',e=>{
  if(!e.metaKey||e.altKey||e.shiftKey||e.ctrlKey||(e.key!=='ArrowLeft'&&e.key!=='ArrowRight'))return;
  if(CMP||ctxOpen||stack.length||home.classList.contains('splash')||home.classList.contains('chat')||$('#sheet').classList.contains('open')||!$('#intro').hidden||!$('#crop').hidden)return;
  const v=S.modes.filter(m=>m.on).map(m=>m.k);if(v.length<2)return;
  e.preventDefault();const i=Math.max(0,v.indexOf(mode));setMode(v[(i+(e.key==='ArrowRight'?1:-1)+v.length)%v.length])},true);

/* ---------- Uygulamayı cihaza kaydet: yalnızca 1 kez, tarayıcıya göre yönlendirme ---------- */
{
 const KEY='lunai_inst_seen',UA=navigator.userAgent;
 const seen=()=>{try{return localStorage.getItem(KEY)==='1'}catch(e){return false}};
 const mark=()=>{try{localStorage.setItem(KEY,'1')}catch(e){}};
 const standalone=()=>navigator.standalone===true||['standalone','window-controls-overlay','minimal-ui'].some(m=>matchMedia(`(display-mode: ${m})`).matches);
 const ipad=/iPad/.test(UA)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 const ios=/iPhone|iPod/.test(UA)||ipad,mac=!ios&&/Macintosh|Mac OS X/.test(UA);
 const inapp=/FBAN|FBAV|Instagram|Line\/|Twitter|Snapchat|MicroMessenger|GSA\//.test(UA);
 const br=/EdgiOS|EdgA|Edg\//.test(UA)?'edge':/CriOS|Chrome\//.test(UA)&&!/OPR\//.test(UA)?'chrome':/FxiOS|Firefox\//.test(UA)?'firefox':/OPiOS|OPR\//.test(UA)?'opera':/SamsungBrowser/.test(UA)?'samsung':/Safari\//.test(UA)?'safari':'other';
 const SHARE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5.5A1.5 1.5 0 0 0 4 12.5v6A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H18"/></svg>';
 const DOTS='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>';
 const ARR='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v14M6 13l6 6 6-6"/></svg>';
 let bip=null;
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();bip=e});
 /* tarayıcıya özel adımlar: [başlık, açıklama, adımlar, ok konumu] */
 function guide(){
  if(ios&&inapp)return['Safari’de aç','Bu uygulama içi tarayıcıda ana ekrana ekleme yok.',['Sağ üstteki <b>•••</b> ya da Paylaş menüsünden <b>Safari’de Aç</b>’ı seç','Safari’de açılınca <b>Paylaş</b> '+SHARE+' → <b>Ana Ekrana Ekle</b>’ye dokun'],''];
  if(ios&&br==='safari')return['Ana Ekrana Ekle','Safari’de iki dokunuşla uygulama gibi kullan.',['Alt çubuktaki <b>Paylaş</b> '+SHARE+' düğmesine dokun (yoksa <b>Diğer</b> '+DOTS+' → <b>Paylaş</b>)','Listeyi yukarı kaydırıp <b>Ana Ekrana Ekle</b>’ye dokun','Sağ üstte <b>Ekle</b>’ye dokun'],ipad?'':'bottom'];
  if(ios&&br==='chrome')return['Ana Ekrana Ekle','Chrome’da Paylaş menüsünden ekleyebilirsin.',['Adres çubuğunun sağındaki <b>Paylaş</b> '+SHARE+' düğmesine dokun','<b>Ana Ekrana Ekle</b>’ye dokun','<b>Ekle</b>’ye dokun'],''];
  if(ios&&br==='edge')return['Ana Ekrana Ekle','Edge’de menüden ekleyebilirsin.',['Alt çubuktaki <b>Diğer</b> '+DOTS+' düğmesine dokun','<b>Paylaş</b> → <b>Ana Ekrana Ekle</b>’ye dokun','<b>Ekle</b>’ye dokun'],''];
  if(ios)return['Safari’de aç','Ana ekrana ekleme en iyi Safari’de çalışır.',['Bu sayfanın adresini kopyalayıp <b>Safari</b>’de aç','<b>Paylaş</b> '+SHARE+' → <b>Ana Ekrana Ekle</b>’ye dokun'],''];
  if(mac&&br==='safari')return['Dock’a Ekle','Safari 17 ve üstünde neurun’u uygulama olarak ekleyebilirsin.',['Menü çubuğunda <b>Dosya</b> → <b>Dock’a Ekle…</b> seçeneğine tıkla','(Ya da araç çubuğundaki <b>Paylaş</b> '+SHARE+' → <b>Dock’a Ekle</b>)','<b>Ekle</b>’ye tıkla; neurun Dock’ta ve Launchpad’de görünür'],''];
  if(mac&&br==='chrome')return['Uygulamayı yükle','Chrome’da neurun’u ayrı bir pencerede açılan uygulama olarak yükle.',['Adres çubuğunun sağındaki <b>yükle</b> simgesine tıkla','Görünmüyorsa <b>⋮</b> → <b>Yayınla, kaydet ve paylaş</b> → <b>neurun’u uygulama olarak yükle</b>','<b>Yükle</b>’ye tıkla'],''];
  if(mac&&br==='edge')return['Uygulamayı yükle','Edge’de siteyi uygulama olarak yükleyebilirsin.',['<b>Diğer</b> '+DOTS+' → <b>Uygulamalar</b> → <b>Bu siteyi uygulama olarak yükle</b>','<b>Yükle</b>’ye tıkla'],''];
  if(mac&&br==='firefox')return['Safari veya Chrome’da aç','Firefox masaüstünde siteyi uygulama olarak kaydetme yok.',['Bu sayfayı <b>Safari</b> ya da <b>Chrome</b>’da aç','Safari’de <b>Dosya → Dock’a Ekle…</b> seç'],''];
  if(br==='firefox')return['Ana ekrana ekle','',['Menüden <b>Yükle</b> ya da <b>Ana ekrana ekle</b>’ye dokun'],''];
  return['Uygulamayı kaydet','Tarayıcı menüsünden ekleyebilirsin.',['Tarayıcı menüsünü aç ('+DOTS+')','<b>Ana ekrana ekle</b> ya da <b>Uygulamayı yükle</b>’ye dokun','Onayla'],''];
 }
 let gEl=null,arr=null;
 function closeGuide(){if(!gEl)return;gEl.classList.remove('open');if(arr)arr.classList.remove('show');const g=gEl;gEl=null;setTimeout(()=>{g.remove();if(arr){arr.remove();arr=null}},350)}
 function openGuide(){
  const [t,sub,steps,pos]=guide();
  const el=document.createElement('div');el.id='ig';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',t);
  el.innerHTML=`<div class="gc glass"><h3>${t}</h3>${sub?`<p class="gs">${sub}</p>`:''}<ol>${steps.map(x=>`<li><span>${x}</span></li>`).join('')}</ol><button class="prim" data-ig="ok">Tamam</button></div>`;
  document.body.appendChild(el);gEl=el;
  if(pos==='bottom'){el.style.paddingBottom='calc(var(--sab) + 70px)';arr=document.createElement('div');arr.id='igarr';arr.style.bottom='calc(var(--sab) + 4px)';arr.innerHTML=ARR;document.body.appendChild(arr);setTimeout(()=>arr&&arr.classList.add('show'),500)}
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('open')));
  el.addEventListener('click',e=>{if(e.target===el||e.target.closest('[data-ig=ok]'))closeGuide()});
 }
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&gEl)closeGuide()});
 async function install(){
  hide();
  if(bip){const b=bip;bip=null;try{await b.prompt();await b.userChoice}catch(e){}return}
  openGuide();
 }
 let bn=null;
 function hide(){if(!bn)return;const b=bn;bn=null;b.classList.remove('show');setTimeout(()=>b.remove(),900)}
 function show(){
  if(bn||seen()||standalone()||!/^https?:$/.test(location.protocol)||!$('#intro').hidden)return;
  if(!ios&&!mac&&!bip&&br!=='chrome'&&br!=='edge'&&br!=='samsung')return;
  if(mac&&br==='firefox')return;
  mark();
  const sub=ios?'Ana ekrana ekle':(mac&&br==='safari')?'Dock’a ekle':'Uygulama olarak yükle';
  const el=document.createElement('div');el.id='inst';el.className='glass';
    el.innerHTML=`<button class="ib" aria-label="neurun’u cihaza kaydet"><span class="ii"><svg viewBox="0 0 100 100" aria-hidden="true"><g transform="translate(50 50)">${ASTR}</g></svg></span><span class="it"><b>neurun’u kaydet</b><small>${sub}</small></span></button><button class="ix" aria-label="Kapat"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 2l10 10M12 2L2 12"/></svg></button>`;
  el.querySelector('.ib').addEventListener('click',install);
  el.querySelector('.ix').addEventListener('click',hide);
  home.appendChild(el);bn=el;requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));
 }
 const tryShow=()=>{if(!home.classList.contains('splash'))setTimeout(show,1600)};
 new MutationObserver(()=>{if(!home.classList.contains('splash'))tryShow()}).observe(home,{attributes:true,attributeFilter:['class']});
 if(!home.classList.contains('splash'))tryShow();
}
/* ---------- Açılış: tanıtım / logo animasyonu ---------- */
let splashT=null;
function playSplash(){
  clearTimeout(splashT);
  if(home.classList.contains('noanim')){home.dataset.st='c';splashT=setTimeout(()=>{splashT=null;openHome()},700);return}
  home.dataset.st='a';                                            /* rozet belirir, yıldız döner */
  let go=false;
  const start=()=>{if(go)return;go=true;
    setTimeout(()=>{home.dataset.st='b'},1500);                    /* yıldız durur, rozet oturur */
    setTimeout(()=>{home.dataset.st='c'},1900);                    /* logo sağa kayar, neurun yazısı açılır */
    splashT=setTimeout(()=>{splashT=null;openHome()},3900)};       /* yazı tamamlanıp bir an görünür, sonra arama ekranı */
  const im=new Image();im.onload=im.onerror=start;im.src='neurun-logo.png';   /* yazı görseli hazır olmadan başlama */
  if(im.complete)start();setTimeout(start,1500);
}
function openHome(){
  if(!home.classList.contains('splash'))return;clearTimeout(splashT);
  home.classList.remove('splash');
  setTimeout(()=>{try{q.focus()}catch(e){}},700);
}
let first=false;try{first=!localStorage.getItem('lunai_intro')}catch(e){}
if(first){
  const intro=$('#intro'),sl=[...intro.querySelectorAll('.sl')],dots=[...intro.querySelectorAll('.dots i')],ms=[...document.querySelectorAll('#dm .m')];
  const names=['Google','Yandex','YouTube'];let si=0,mi=0;
  intro.hidden=false;
  function go(i){si=i;sl.forEach((s,k)=>{s.classList.toggle('on',k===i);s.classList.toggle('past',k<i)});
    dots.forEach((d,k)=>d.classList.toggle('on',k===i));$('#next').textContent=i===2?'Başla':'Devam'}
  setInterval(()=>{if(si!==1)return;mi=(mi+1)%3;ms.forEach((m,k)=>m.classList.toggle('on',k===mi));
    const c=$('#cap');c.style.opacity=0;setTimeout(()=>{c.textContent=names[mi];c.style.opacity=1},220)},1500);
  function done(){try{localStorage.setItem('lunai_intro','1')}catch(e){}
    intro.classList.add('out');setTimeout(()=>{intro.hidden=true},650);setTimeout(playSplash,450)}
  $('#next').addEventListener('click',()=>si<2?go(si+1):done());
  $('#skip').addEventListener('click',done);
  dots.forEach((d,k)=>d.addEventListener('click',()=>go(k)));
}else{
  playSplash();
}
