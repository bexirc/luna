# LunAI

Tek sayfalık, Apple tarzı arama başlangıç ekranı. Sunucu gerektirmez; GitHub Pages'te çalışır. Tüm dosyalar depo kökünde, klasör yok.

## Dosyalar
| Dosya | Görevi |
|---|---|
| `index.html` | Uygulamanın tamamı |
| `config.js` | Proxy adresi ayarı |
| `db-web.js`, `db-url.js`, `db-image.js`, `db-video.js` | Yerel arama veri tabanı: web 1000, görsel 1000 (Pinterest + Google), video 1000 (YouTube + Google), URL 247 site. Yazarken anında öneri verir; satır biçimi dosyanın başında |
| `manifest.webmanifest`, `icon-180.png`, `sw.js` | Ana ekrana ekleme (PWA) ve çevrimdışı önbellek |
| `worker.js`, `wrangler.toml` | Tarayıcı kısıtlarını aşan küçük CORS proxy (Cloudflare Workers). Siteye ait değildir, Cloudflare'e yüklenir |
| `.nojekyll` | Pages'in dosyaları olduğu gibi sunması için |

## Kurulum
1. Yeni bir GitHub deposu aç ve tüm dosyaları kök dizine yükle.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)`** seç ve kaydet. Site birkaç dakika sonra yayında olur.
3. (Önerilir) Proxy: Cloudflare → Workers & Pages → Create Worker → `worker.js` içeriğini yapıştır → Deploy. Ya da bilgisayarında `npx wrangler deploy`.
4. `config.js` içindeki `window.LUNAI_PROXY` değerine Worker adresini yaz (sonunda `/` olmadan) ve dosyayı depoya yükle.

## Proxy olmadan / proxy ile
- Proxy gerekmeden çalışanlar: Google ve YouTube önerileri, hava durumu (Open-Meteo), il/ilçe (turkiyeapi.dev), Apple Music ve Deezer araması, Türkiye top 10, Vikipedi gündemi, tüm arama yönlendirmeleri.
- Proxy gerektirenler: Genius (şarkı sözü araması), Yandex / Yahoo / Bing / DuckDuckGo / Pinterest arama önerileri. Proxy yoksa o motor için öneri boş görünür.
- Spotify, YT Music ve Tidal için anahtarsız arama servisi yoktur; bu platformlar seçiliyse şarkı araması Genius/Apple/Deezer'dan yapılır, şarkı seçilen platformun arama sayfasında açılır.

## Veri tabanı
Dosyalar `window.LUNAI_DB` altına metin olarak yüklenir. Satır biçimi: web/url için `ağırlık|metin`, görsel/video için `motor|ağırlık|metin` (görselde `p` Pinterest, `g` Google; videoda `y` YouTube, `g` Google). Ağırlık 1–9 arasıdır; yüksek olan öneride önce gelir. Kendi verini eklemek için satır ekleyip kaydetmen yeterli. Veriler Google'dan çekilmiş ölçüm değil, Türkiye'de sık aranan konular ve kombinasyonlarından derlenmiş tahmini bir listedir.
