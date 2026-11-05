# neurun

Web, görsel, video, müzik ve yapay zeka aramalarını tek kutudan yapan Türkçe başlangıç sayfası.
Derleme yok; tüm dosyalar depo kökünde, klasörsüz ve okunabilir durumda.

## GitHub Pages ile yayınlama
1. Bu klasördeki **tüm dosyaları** deponun köküne yükle (klasör açma).
2. Depoda **Settings → Pages → Build and deployment → Deploy from a branch** de `main` dalını ve `/ (root)` klasörünü seç.
3. Birkaç dakika sonra `https://kullanici.github.io/depo/` adresinde açılır.

## Dosyalar
| Dosya | Görevi |
|---|---|
| `index.html` | Sayfa iskeleti |
| `style.css` | Tüm tasarım |
| `app.js` | Uygulama mantığı |
| `config.js` | Proxy adresi ve SoundCloud client_id ayarları |
| `db-*.js`, `big-*.js` | Yerel öneri veri tabanları (web, url, görsel, video, şarkı) |
| `manifest.webmanifest` | Uygulama olarak kaydetme bilgileri |
| `sw.js` | Önbellek ve çevrimdışı çalışma |
| `icon-*.png`, `apple-touch-icon*.png` | Uygulama ikonları |
| *(gömülü)* | neurun yazısı ve Elnavic logosu `style.css` içine gömülüdür; ayrı PNG yüklemek gerekmez |
| `filmler.txt` | Yerel film veri tabanı (JSON Lines) |
| `worker.js` | Cloudflare Worker proxy (isteğe bağlı) |

## Proxy (isteğe bağlı ama önerilir)
Sözlük, Genius, Yahoo, Yandex, Pinterest ve SoundCloud önerileri bazı tarayıcılarda doğrudan okunamaz.
1. Cloudflare'de **Workers & Pages → Create Worker** aç, `worker.js` içeriğini yapıştırıp **Deploy** de.
2. Verilen adresi `config.js` içindeki `LUNAI_PROXY` alanına yaz.

## SoundCloud
Müzik önerileri SoundCloud'dan gelir. `config.js` içindeki `LUNAI_SC_ID` alanına bir client_id yazabilirsin.
Boş bırakırsan ve proxy tanımlıysa sayfa client_id'yi kendisi bulmaya çalışır. SoundCloud yanıt vermezse
öneriler Genius, Apple ve Deezer'dan gelir.

## Güncelleme
Dosyaları değiştirdikten sonra `sw.js` içindeki `VERSION` değerini bir artır (ör. `luna-v2`), böylece
eski önbellek silinir ve herkes yeni sürümü alır.

## Uygulama olarak kaydetme
iPhone/iPad Safari: Paylaş → Ana Ekrana Ekle. Mac Safari: Dosya → Dock'a Ekle. Chrome ve Edge: adres çubuğundaki yükle simgesi.
İkon rengi Görünüm Ayarları → Uygulama İkonu bölümünden seçilir.
