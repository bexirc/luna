// Luna CORS proxy (Cloudflare Workers). Yalnızca izin verilen sitelere GET isteği iletir.
const ALLOW=['sozluk.gov.tr','genius.com','search.yahoo.com','duckduckgo.com','suggest.yandex.com','www.pinterest.com','api.bing.com'];
const CORS={'access-control-allow-origin':'*','access-control-allow-methods':'GET,OPTIONS','access-control-allow-headers':'*'};
export default{async fetch(req){
  if(req.method==='OPTIONS')return new Response(null,{headers:CORS});
  const t=new URL(req.url).searchParams.get('u');let u;
  try{u=new URL(t)}catch{return new Response('u parametresi gerekli',{status:400,headers:CORS})}
  if(u.protocol!=='https:'||!ALLOW.includes(u.hostname))return new Response('izin verilmeyen adres',{status:403,headers:CORS});
  const r=await fetch(u,{headers:{'user-agent':'Mozilla/5.0 (compatible; Luna)','accept':'application/json,*/*','accept-language':'tr-TR,tr;q=0.9'},cf:{cacheTtl:60,cacheEverything:true}});
  const h=new Headers(CORS);h.set('content-type',r.headers.get('content-type')||'application/json');h.set('cache-control','public,max-age=60');
  return new Response(r.body,{status:r.status,headers:h});
}};
