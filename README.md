# Luna

Tek sayfalık, Apple tarzı arama başlangıç ekranı. Sunucu gerektirmez; GitHub Pages'te çalışır. Tüm dosyalar depo kökünde, klasör yok.

## Dosyalar
| Dosya | Görevi |
|---|---|
| `index.html` | Uygulamanın tamamı |
| `config.js` | Proxy adresi ayarı |
| `big-web.js`, `big-image.js`, `big-video.js`, `big-url.js` | Süzülmüş öneri listeleri (gzip + base64). Sırasıyla web, görsel, video ve URL modunda gösterilir; tarayıcıda açılır ve ilk iki harfe göre indekslenir |
| `db-songs.js` | Şarkı/sanatçı listesi (müzik modu önerisi ve tamamlama). Satır: `S|ağırlık|şarkı|sanatçı` veya `A|ağırlık|sanatçı|tür` |
| `db-web.js`, `db-url.js`, `db-image.js`, `db-video.js` | Yerel arama veri tabanı: web, görsel (Pinterest + Google), video (YouTube + Google), URL. Yazarken anında öneri verir (web ≈16 bin, görsel ≈6,6 bin, video ≈3,8 bin, URL 247 satır); satır biçimi dosyanın başında |
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

## Türkçe kelime tamamlama
Uygulama ilk açılışta TDK'nın kelime listesini (`sozluk.gov.tr/autocomplete.json`) çeker ve tarayıcıda saklar; yazdığın son kelime için tamamlama önerir. Tarayıcı doğrudan okuyamazsa `config.js` içindeki proxy kullanılır, bu yüzden `worker.js` Cloudflare'e güncel haliyle yüklenmelidir. Liste hiç alınamazsa yalnızca veri tabanındaki kelimeler kullanılır.

## Büyük öneri listeleri
`big-*.js` dosyaları, yüklenen ~450 bin satırlık txt dosyalarının anlamsız kombinasyonlardan arındırılmış halidir (web ≈6,3 bin, görsel ≈4,5 bin, video ≈2,8 bin, URL ≈0,8 bin satır). Satır sırası öncelik demektir. Tarayıcı `DecompressionStream` destekliyorsa çalışır (güncel Chrome, Edge, Safari 16.4+, Firefox 113+). Liste ilk kullanılan modda açılır; yazılan ilk iki harfe göre hızlıca taranır. Yeni liste için txt'yi aynı biçimde (her satır bir öneri) gzip + base64 yapıp `window.LUNAI_BIG.web="..."` gibi bir dosyaya yazman yeterli.
