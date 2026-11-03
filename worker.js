// Luna Worker (Cloudflare Workers). API anahtarı gerektirmez.
//
// 1) Arama sonuçları  GET /?mode=web|image|video|music|film&q=SORGU[&n=20]
//      -> { mode, q, source, count, results:[...], errors:[...] }
//    web   : { title, url, snippet, host }
//    image : { title, url, image, thumb, w, h, source }
//    video : { title, url, thumb, channel, duration, views, published, source }
//    music : { title, artist, cover, url, preview, source }
//    Her mod sırayla birden çok kaynağı dener, ilk dolu yanıtı döndürür (music hepsini birleştirir).
//    film  : { id, title, year, type, rating, votes, poster, cast, plot, url }   (q yoksa &list=new|top ile liste)
// 2) CORS proxy       GET /?u=https://...   (yalnızca izin listesindeki siteler)
// 3) SoundCloud       GET /?sc=SORGU  |  /?sc=charts   (ham SoundCloud JSON)

const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
const ALLOW=['sozluk.gov.tr','genius.com','search.yahoo.com','duckduckgo.com','suggest.yandex.com','www.pinterest.com','api.bing.com'];
const CORS={'access-control-allow-origin':'*','access-control-allow-methods':'GET,OPTIONS','access-control-allow-headers':'*'};
const JSONH={...CORS,'content-type':'application/json;charset=utf-8'};
const J=(o,s=200,ttl=120)=>new Response(JSON.stringify(o),{status:s,headers:{...JSONH,'cache-control':'public,max-age='+ttl}});

const ENT={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' '};
const dec=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/&(#x?[0-9a-f]+|[a-z]+);/gi,(m,e)=>{
  if(e[0]==='#'){const c=e[1]==='x'||e[1]==='X'?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return c?String.fromCodePoint(c):m}
  return ENT[e.toLowerCase()]??m}).replace(/\s+/g,' ').trim();
const hostOf=u=>{try{return new URL(u).hostname.replace(/^www\./,'')}catch{return''}};
const mmss=s=>{s=Math.round(+s||0);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60,p=n=>String(n).padStart(2,'0');return h?`${h}:${p(m)}:${p(x)}`:`${m}:${p(x)}`};
const get=(url,o={})=>fetch(url,{...o,headers:{'user-agent':UA,'accept-language':'tr-TR,tr;q=0.9,en;q=0.7',...(o.headers||{})},signal:AbortSignal.timeout(7000),cf:{cacheTtl:120,cacheEverything:true}});
const getJ=async(url,o)=>{const r=await get(url,o);if(!r.ok)throw new Error('HTTP '+r.status);return r.json()};
const getT=async(url,o)=>{const r=await get(url,o);if(!r.ok)throw new Error('HTTP '+r.status);return r.text()};
const E=encodeURIComponent;

/* ---------------- WEB ---------------- */
async function webDDG(q){
  const html=await getT('https://html.duckduckgo.com/html/?kl=tr-tr&q='+E(q));
  const A=[...html.matchAll(/<a[^>]+class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  const S=[...html.matchAll(/<a[^>]+class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>/g)];
  const out=[];
  A.forEach((m,i)=>{
    let href=dec(m[1]);if(href.startsWith('//'))href='https:'+href;
    try{const u=new URL(href,'https://duckduckgo.com');if(u.hostname.endsWith('duckduckgo.com')){if(u.pathname==='/y.js')return;const t=u.searchParams.get('uddg');if(t)href=t}}catch{}
    if(!/^https?:\/\//.test(href)||/duckduckgo\.com\/(y\.js|\?)/.test(href))return;
    const end=A[i+1]?A[i+1].index:Infinity,sn=S.find(s=>s.index>m.index&&s.index<end);
    out.push({title:dec(m[2]),url:href,snippet:sn?dec(sn[1]):'',host:hostOf(href)})});
  return out}
async function webWiki(q){
  for(const l of['tr','en']){
    const j=await getJ(`https://${l}.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=15&srsearch=${E(q)}`);
    const r=((j.query&&j.query.search)||[]).map(x=>({title:x.title,url:`https://${l}.wikipedia.org/wiki/${E(x.title.replace(/ /g,'_'))}`,snippet:dec(x.snippet),host:`${l}.wikipedia.org`}));
    if(r.length)return r}
  return[]}

/* ---------------- GÖRSEL ---------------- */
async function imgDDG(q){
  const page=await getT(`https://duckduckgo.com/?iax=images&ia=images&q=${E(q)}`);
  const m=/vqd=([\d-]+)&/.exec(page)||/vqd=["']([^"']+)["']/.exec(page);if(!m)throw new Error('vqd yok');
  const j=await getJ(`https://duckduckgo.com/i.js?l=tr-tr&o=json&q=${E(q)}&vqd=${m[1]}&f=,,,,,&p=1`,{headers:{referer:'https://duckduckgo.com/',accept:'application/json'}});
  return(j.results||[]).map(x=>({title:dec(x.title),url:x.url,image:x.image,thumb:x.thumbnail,w:x.width,h:x.height,source:hostOf(x.url)||'DuckDuckGo'}))}
async function imgOpenverse(q){
  const j=await getJ('https://api.openverse.org/v1/images/?page_size=24&q='+E(q));
  return(j.results||[]).map(x=>({title:dec(x.title),url:x.foreign_landing_url||x.url,image:x.url,thumb:x.thumbnail||x.url,w:x.width,h:x.height,source:'Openverse'}))}
async function imgCommons(q){
  const j=await getJ('https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=24&prop=imageinfo&iiprop=url|size&iiurlwidth=400&gsrsearch='+E(q));
  return Object.values((j.query&&j.query.pages)||{}).map(p=>{const i=(p.imageinfo||[])[0];return i&&{title:String(p.title||'').replace(/^File:/,'').replace(/\.\w+$/,''),url:i.descriptionurl,image:i.url,thumb:i.thumburl||i.url,w:i.width,h:i.height,source:'Wikimedia Commons'}}).filter(Boolean)}

/* ---------------- VİDEO ---------------- */
async function vidYT(q){
  const html=await getT(`https://www.youtube.com/results?hl=tr&gl=TR&search_query=${E(q)}`,{headers:{cookie:'CONSENT=YES+1; SOCS=CAI'}});
  const m=/ytInitialData\s*=\s*(\{[\s\S]*?\});\s*<\/script>/.exec(html);if(!m)throw new Error('veri yok');
  const data=JSON.parse(m[1]),out=[];
  (function walk(o){if(!o||typeof o!=='object')return;if(o.videoRenderer){out.push(o.videoRenderer);return}for(const k in o)walk(o[k])})(data);
  return out.filter(v=>v.videoId&&v.title).map(v=>({title:(v.title.runs||[]).map(r=>r.text).join('')||(v.title.simpleText||''),url:'https://www.youtube.com/watch?v='+v.videoId,thumb:`https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
    channel:(v.ownerText&&v.ownerText.runs&&v.ownerText.runs[0]&&v.ownerText.runs[0].text)||'',duration:(v.lengthText&&v.lengthText.simpleText)||'',views:(v.viewCountText&&(v.viewCountText.simpleText||''))||'',published:(v.publishedTimeText&&v.publishedTimeText.simpleText)||'',source:'YouTube'}))}
async function vidDaily(q){
  const j=await getJ('https://api.dailymotion.com/videos?limit=20&sort=relevance&fields=id,title,thumbnail_360_url,owner.screenname,duration,views_total,url&search='+E(q));
  return(j.list||[]).map(v=>({title:v.title,url:v.url,thumb:v.thumbnail_360_url,channel:v['owner.screenname']||'',duration:mmss(v.duration),views:v.views_total!=null?String(v.views_total):'',published:'',source:'Dailymotion'}))}
async function vidPiped(q){
  const j=await getJ('https://pipedapi.kavin.rocks/search?filter=videos&q='+E(q));
  return(j.items||[]).filter(v=>v.url&&v.title).map(v=>({title:v.title,url:'https://www.youtube.com'+v.url,thumb:v.thumbnail,channel:v.uploaderName||'',duration:mmss(v.duration),views:v.views!=null?String(v.views):'',published:v.uploadedDate||'',source:'YouTube'}))}

/* ---------------- MÜZİK ---------------- */
async function musItunes(q){
  const j=await getJ(`https://itunes.apple.com/search?media=music&entity=song&country=TR&limit=15&term=${E(q)}`);
  return(j.results||[]).filter(x=>x.trackName).map(x=>({title:x.trackName,artist:x.artistName||'',cover:String(x.artworkUrl100||'').replace('100x100bb','300x300bb'),url:x.trackViewUrl,preview:x.previewUrl||'',source:'Apple Music'}))}
async function musDeezer(q){
  const j=await getJ('https://api.deezer.com/search?limit=15&q='+E(q));
  return(j.data||[]).filter(x=>x.title).map(x=>({title:x.title,artist:(x.artist&&x.artist.name)||'',cover:(x.album&&(x.album.cover_medium||x.album.cover))||'',url:x.link,preview:x.preview||'',source:'Deezer'}))}
let SC_ID='',SC_T=0;
async function scId(force){
  if(!force&&SC_ID&&Date.now()-SC_T<6*3600e3)return SC_ID;
  const html=await getT('https://soundcloud.com/');
  const urls=[...html.matchAll(/<script[^>]+src="(https:\/\/a-v2\.sndcdn\.com\/assets\/[^"]+\.js)"/g)].map(m=>m[1]).reverse();
  for(const u of urls){const js=await getT(u);const m=/client_id:"([A-Za-z0-9]{32})"/.exec(js)||/[?&,]client_id=([A-Za-z0-9]{32})/.exec(js);if(m){SC_ID=m[1];SC_T=Date.now();return SC_ID}}
  throw new Error('client_id bulunamadı')}
async function scFetch(path){
  let r;for(let i=0;i<2;i++){const id=await scId(i>0);r=await get('https://api-v2.soundcloud.com/'+path+'&client_id='+id,{headers:{accept:'application/json'}});if(r.status!==401&&r.status!==403)break}
  return r}
async function musSC(q){
  const r=await scFetch('search/tracks?limit=15&app_locale=tr&q='+E(q));if(!r.ok)throw new Error('HTTP '+r.status);
  return((await r.json()).collection||[]).filter(x=>x&&x.title).map(x=>{let title=String(x.title).trim(),artist=(x.publisher_metadata&&x.publisher_metadata.artist)||'';
    const m=/^(.{2,45}?)\s[-–—]\s(.{2,})$/.exec(title);if(m){artist=m[1];title=m[2]}
    return{title,artist:artist||(x.user&&x.user.username)||'',cover:String(x.artwork_url||(x.user&&x.user.avatar_url)||'').replace('-large.','-t200x200.'),url:x.permalink_url,preview:'',source:'SoundCloud'}})}

/* ---------------- FİLM / DİZİ (IMDb, anahtarsız) ---------------- */
const GT={'Movie':'Film','TV Series':'Dizi','TV Mini Series':'Mini dizi','TV Movie':'TV filmi','Short':'Kısa film','TV Special':'TV özel','Video':'Video'};
const trType=q=>({feature:'Film','TV movie':'TV filmi','TV series':'Dizi','TV mini-series':'Mini dizi',short:'Kısa film','TV special':'TV özel'}[q]||'');
const smallImg=u=>u?String(u).replace(/\._V1_.*\.jpg$/,'._V1_UX240_.jpg'):'';
const imdbMap=(t,r)=>{if(!t||!t.id)return null;r=r||{};return{id:t.id,title:(t.titleText&&(t.titleText.text||t.titleText))||'',year:(t.releaseYear&&(t.releaseYear.year||t.releaseYear))||'',type:GT[t.titleType&&t.titleType.text]||'',rating:r.aggregateRating||null,votes:r.voteCount||0,poster:smallImg(t.primaryImage&&t.primaryImage.url),cast:'',plot:(t.plot&&t.plot.plotText&&t.plot.plotText.plainText)||'',url:'https://www.imdb.com/title/'+t.id+'/'}};
const iso=d=>d.toISOString().slice(0,10);
function filmWindow(list){const to=new Date(),from=new Date(to.getTime()-(list==='new'?120:365)*864e5);
  return list==='new'?{from:iso(from),to:iso(to),min:6.5,votes:2000,sort:'RELEASE_DATE'}:{from:iso(from),to:iso(to),min:7,votes:10000,sort:'USER_RATING'}}
async function filmGql(list){
  const w=filmWindow(list);
  const query=`query{advancedTitleSearch(first:40,constraints:{titleTypeConstraint:{anyTitleTypeIds:["movie"]},releaseDateConstraint:{releaseDateRange:{start:"${w.from}",end:"${w.to}"}},userRatingsConstraint:{aggregateRatingRange:{min:${w.min}},ratingsCountRange:{min:${w.votes}}}},sort:{sortBy:${w.sort},sortOrder:DESC}){edges{node{title{id titleText{text} releaseYear{year} ratingsSummary{aggregateRating voteCount} primaryImage{url} titleType{text} plot{plotText{plainText}}}}}}}`;
  const r=await fetch('https://caching.graphql.imdb.com/',{method:'POST',headers:{'content-type':'application/json','user-agent':UA,'x-imdb-client-name':'imdb-web-next','accept':'application/json','accept-language':'en-US,en;q=0.8'},body:JSON.stringify({query}),signal:AbortSignal.timeout(8000)});
  if(!r.ok)throw new Error('HTTP '+r.status);
  const j=await r.json();if(!j.data)throw new Error(String(j.errors&&j.errors[0]&&j.errors[0].message||'veri yok'));
  return(((j.data.advancedTitleSearch||{}).edges)||[]).map(e=>{const t=e&&e.node&&e.node.title;return imdbMap(t,t&&t.ratingsSummary)}).filter(Boolean)}
async function filmPage(list){
  const w=filmWindow(list);
  const html=await getT(`https://www.imdb.com/search/title/?title_type=feature&release_date=${w.from},${w.to}&user_rating=${w.min},&num_votes=${w.votes},&sort=${list==='new'?'release_date':'user_rating'},desc`,{headers:{'accept-language':'en-US,en;q=0.8'}});
  const m=/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/.exec(html);if(!m)throw new Error('veri yok');
  let arr=null;(function walk(o){if(arr||!o||typeof o!=='object')return;if(Array.isArray(o.titleListItems)){arr=o.titleListItems;return}for(const k in o)walk(o[k])})(JSON.parse(m[1]));
  return(arr||[]).map(x=>imdbMap({id:x.titleId||x.id,titleText:x.titleText,releaseYear:x.releaseYear,titleType:x.titleType,primaryImage:x.primaryImage,plot:x.plot&&{plotText:{plainText:typeof x.plot==='string'?x.plot:(x.plot.plotText&&x.plot.plotText.plainText)||''}}},x.ratingSummary||x.ratingsSummary)).filter(Boolean)}
async function filmSuggest(q){
  const k=/[a-z0-9]/i.test(q[0])?q[0].toLowerCase():'x';
  const j=await getJ(`https://v2.sg.media-imdb.com/suggestion/${k}/${E(q.toLowerCase().replace(/\s+/g,'_'))}.json`);
  return(j.d||[]).filter(x=>x&&/^tt/.test(x.id)&&x.l).map(x=>({id:x.id,title:x.l,year:x.y||'',type:trType(x.q),rating:null,votes:0,poster:(x.i&&x.i.imageUrl)||'',cast:x.s||'',plot:'',url:'https://www.imdb.com/title/'+x.id+'/'}))}
const film=(q,list)=>q?first([['IMDb',()=>filmSuggest(q)]]):first([['IMDb GraphQL',()=>filmGql(list)],['IMDb',()=>filmPage(list)]]);

/* ---------------- yönlendirme ---------------- */
async function first(list){const errors=[];for(const[name,f]of list){try{const r=await f();if(r&&r.length)return{source:name,results:r,errors}}catch(e){errors.push(name+': '+(e&&e.message||e))}}return{source:'',results:[],errors}}
const normK=s=>String(s||'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
async function music(q){
  const names=['Apple Music','Deezer','SoundCloud'],rs=await Promise.allSettled([musItunes(q),musDeezer(q),musSC(q)]),errors=[],lists=[];
  rs.forEach((r,i)=>{if(r.status==='fulfilled')lists.push(r.value);else{lists.push([]);errors.push(names[i]+': '+(r.reason&&r.reason.message||r.reason))}});
  const out=[],seen=new Set();
  for(let i=0;i<15;i++)for(const l of lists){const x=l[i];if(!x)continue;const k=normK(x.title+x.artist);if(seen.has(k))continue;seen.add(k);out.push(x)}
  return{source:names.filter((_,i)=>lists[i].length).join('+'),results:out,errors}}
const MODES={
  web:q=>first([['DuckDuckGo',()=>webDDG(q)],['Wikipedia',()=>webWiki(q)]]),
  image:q=>first([['DuckDuckGo',()=>imgDDG(q)],['Openverse',()=>imgOpenverse(q)],['Wikimedia Commons',()=>imgCommons(q)]]),
  video:q=>first([['YouTube',()=>vidYT(q)],['Dailymotion',()=>vidDaily(q)],['Piped',()=>vidPiped(q)]]),
  music,
  film:(q,list)=>film(q,list)};

export default{async fetch(req){
  if(req.method==='OPTIONS')return new Response(null,{headers:CORS});
  const sp=new URL(req.url).searchParams;
  const mode=sp.get('mode');
  if(mode){
    const q=(sp.get('q')||'').trim().slice(0,200);
    if(!MODES[mode])return J({error:'mode: web, image, video, music veya film olmalı',results:[]},400,0);
    if(!q&&mode!=='film')return J({error:'q gerekli',results:[]},400,0);
    const n=Math.min(Math.max(parseInt(sp.get('n'),10)||20,1),30);
    try{const lst=sp.get('list')==='top'?'top':'new',r=await MODES[mode](q,lst);const results=r.results.slice(0,n);return J({mode,q,source:r.source,count:results.length,results,errors:r.errors},200,results.length?120:10)}
    catch(e){return J({mode,q,source:'',count:0,results:[],errors:[String(e&&e.message||e)]},502,0)}}
  if(sp.get('sc')){
    try{const q=sp.get('sc'),r=await scFetch(q==='charts'?'charts?kind=top&genre=soundcloud%3Agenres%3Aall-music&region=soundcloud%3Aregions%3ATR&limit=10':'search/tracks?limit=15&app_locale=tr&q='+E(q));
      const h=new Headers(CORS);h.set('content-type','application/json');h.set('cache-control','public,max-age=120');return new Response(r.body,{status:r.status,headers:h})}
    catch(e){return new Response('[]',{status:502,headers:CORS})}}
  const t=sp.get('u');let u;
  try{u=new URL(t)}catch{return new Response('mode, sc veya u parametresi gerekli',{status:400,headers:CORS})}
  if(u.protocol!=='https:'||!ALLOW.includes(u.hostname))return new Response('izin verilmeyen adres',{status:403,headers:CORS});
  const r=await fetch(u,{headers:{'user-agent':'Mozilla/5.0 (compatible; Luna)','accept':'application/json,*/*','accept-language':'tr-TR,tr;q=0.9'},cf:{cacheTtl:60,cacheEverything:true}});
  const h=new Headers(CORS);h.set('content-type',r.headers.get('content-type')||'application/json');h.set('cache-control','public,max-age=60');
  return new Response(r.body,{status:r.status,headers:h});
}};
