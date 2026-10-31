LunAI GitHub Pages kurulumu

1. GitHub deposu oluşturun ve index.html dosyasını kök dizine yükleyin.
2. Settings > Pages > Deploy from a branch > main / (root) > Save.
3. lunai-worker.js dosyasını Cloudflare Workers üzerinde ayrı dağıtın.
4. Cloudflare Worker ayarlarında GEMINI_API_KEY adlı secret tanımlayın.
5. index.html içindeki LUNAI_ENDPOINT değişkenine https://...workers.dev adresinizi girin, GitHub’a yeniden yükleyin.
6. Pages adresinizi açın.

ÖNEMLİ: API anahtarını index.html veya GitHub dosyalarına yazmayın. Worker herkese açık kalırsa başkaları da API kotanızı tüketebilir; üretimde erişim kontrolü ve hız sınırı ekleyin.
