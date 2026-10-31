/**
 * LunAI sunucu köprüsü (Cloudflare Worker)
 * ------------------------------------------------------------
 * API anahtarı BU DOSYADA YOKTUR. Yalnızca Cloudflare "secret" olarak saklanır:
 *   npx wrangler secret put GEMINI_API_KEY      (anahtarı sorulunca yapıştırın)
 *   npx wrangler deploy
 * Çıkan adresi (https://lunai.<hesap>.workers.dev) LunAI.html içindeki
 *   const LUNAI_ENDPOINT='';   satırına yazın.
 * LunAI kimliği (persona) ve davranış kuralları da burada, sunucu tarafında tutulur.
 */
const MODEL = 'gemini-2.5-flash';          // model adını yalnızca burada değiştirirsiniz
const ALLOW_ORIGIN = '*';                  // yayınladığınız alan adıyla sınırlamanız önerilir

const PERSONA = `Sen LunAI'sın; Onur Bekir Çalgın tarafından geliştirilen bir yapay zeka asistanısın.
Adın her zaman LunAI'dır; kendini asla başka bir adla tanıtma.
Hangi modelle veya hangi şirketin altyapısıyla çalıştığın sorulursa bu konuda bilgi veremeyeceğini söyle; Gemini, Google veya başka bir marka/şirketle bağlantın olduğunu söyleme ve ima etme.
Bir yapay zeka olduğunu gizleme. Kullanıcının yazdığı dilde yanıt ver (varsayılan Türkçe).
Bilmediğin şeyi uydurma; emin değilsen açıkça söyle.`;

const LEN = {
  kisa: 'Yanıtların çok kısa ve öz olsun (en fazla 2-3 cümle).',
  normal: 'Yanıtların dengeli uzunlukta olsun; gereksiz uzatma.',
  detay: 'Yanıtların ayrıntılı ve kapsamlı olsun; gerektiğinde adım adım açıkla.'
};
const TONE = {
  resmi: 'Resmi ve saygılı bir üslup kullan.',
  dengeli: 'Dengeli, net ve kibar bir üslup kullan.',
  samimi: 'Samimi, sıcak ve rahat bir üslup kullan.'
};

const clip = (s, n) => String(s ?? '').slice(0, n);

function buildSystem(p = {}) {
  const parts = [PERSONA];
  parts.push(LEN[p.len] || LEN.normal);
  parts.push(TONE[p.tone] || TONE.dengeli);
  const call = clip(p.call, 40).trim();
  if (call) parts.push(`Kullanıcıya "${call}" diye hitap et.`);
  if (p.quick) parts.push('Bu bir hızlı yanıt kutusu: en fazla birkaç cümleyle kısaca yanıtla.');
  const mem = clip(p.memory, 6000).trim();
  if (mem) parts.push(`Kullanıcı hakkında hatırladığın notlar (gerekmedikçe tekrar etme):\n${mem}`);
  return parts.join('\n');
}

function cleanContents(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(-40).map(m => ({
    role: m && m.role === 'model' ? 'model' : 'user',
    parts: (Array.isArray(m && m.parts) ? m.parts : []).slice(0, 6).map(x => {
      if (x && x.inline_data && x.inline_data.mime_type === 'image/jpeg' && typeof x.inline_data.data === 'string' && x.inline_data.data.length < 5_000_000)
        return { inline_data: { mime_type: 'image/jpeg', data: x.inline_data.data } };
      return { text: clip(x && x.text, 8000) };
    })
  })).filter(m => m.parts.length);
}

export default {
  async fetch(req, env) {
    const cors = {
      'access-control-allow-origin': ALLOW_ORIGIN,
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type'
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return new Response('LunAI', { status: 405, headers: cors });
    if (!env.GEMINI_API_KEY) return new Response('not configured', { status: 500, headers: cors });

    let body;
    try { body = await req.json(); } catch { return new Response('bad request', { status: 400, headers: cors }); }
    const base = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}`;
    const headers = { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY };

    // Hafıza için kalıcı bilgi çıkarma
    if (body.action === 'extract') {
      const sys = `Kullanıcının mesajından ileride hatırlanması faydalı KALICI kişisel bilgileri (ad, tercih, aile, iş, alışkanlık, sağlık dışı yaşam bilgileri vb.) çıkar. Geçici istekleri alma.
Yalnızca şu JSON'u döndür: {"facts":[{"title":"kısa başlık","text":"tek cümlelik not"}]}. Bilgi yoksa {"facts":[]}.`;
      const r = await fetch(`${base}:generateContent`, {
        method: 'POST', headers,
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: sys }] },
          contents: [{ role: 'user', parts: [{ text: clip(body.text, 800) }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0 }
        })
      });
      let facts = [];
      try {
        const j = await r.json();
        const txt = j.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '{}';
        facts = (JSON.parse(txt).facts || []).slice(0, 3);
      } catch {}
      return new Response(JSON.stringify({ facts }), { headers: { ...cors, 'content-type': 'application/json' } });
    }

    // Sohbet (akışlı)
    const up = await fetch(`${base}:streamGenerateContent?alt=sse`, {
      method: 'POST', headers,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: buildSystem(body.prefs) }] },
        contents: cleanContents(body.contents),
        generationConfig: { temperature: 0.8 }
      })
    });
    return new Response(up.body, {
      status: up.status,
      headers: { ...cors, 'content-type': 'text/event-stream', 'cache-control': 'no-store' }
    });
  }
};
