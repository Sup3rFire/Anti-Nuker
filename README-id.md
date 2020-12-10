# Bot Dasar discord.js

*Read this in [English](README.md)*

Bot dasar ini dibuat sebagai cara yang gampang untuk memulai membuat bot di discord menggunakan discord.js. Bot ini memiliki hal-hal yang dasar yang kemungkinan akan perlu dibuat.

## Peringatan

Bot dasar ini sedang dalam proses dikembangkan dan bisa mengandung kesalahan 

## Keperluan

- Node.js 12.0.0 atau lebih baru
- npm (biasa diunduh with node.js)
- *Bot Application* Discord
- Program untuk mengedit teks
- Koneksi internet (yang kamu kemungkinan ada)

Berikut adalah bantuan untuk:
- [Meninstalasi node.js](https://discordjs.guide/preparations/#installing-node-js)
- [Membuat *Bot Application* Discord](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

## Cara Menginstalasi

Ungguh *packages* yang diperlukan menggunakan *npm* di direktori dasar ini

```bash
npm install
```

Lalu, gunakan program kesukaanmu untuk membuat file yang bernama `.env` dan suatu folder yang dinamakan `db` di dalam direktori dasar bot tersebut

Akhirnya, tambahkan yang berikut ini ke dalam file `.env`:

```
TOKEN=TokenKamu
```

Tentunya, gantikan `TokenKamu` dengan token kamu yang asli

## Konfigurasi

Baris-baris kode dalam file berolit ini dapat ditukar dengan apa yang Anda inginkan!
Hanya perlu menggantikan teks pengganti.

server.js
```javascript
client.color = "Warna Dalam Hex"; // Ini adalah warna utama yang akan diggunakan bot kamu. Gunakanlah hex untuk memilih warnanya. Contoh warna hex adalah #FF6464
client.prefix = ['.', ',']; // Ini adalah prefix yang akan diggunakan bot kamu
client.developers = ['Developer ID', 'Developer ID yang lain']; // Ini adalah ID yang dimiliki developer bot kamu 
```

ready.js
```javascript
let Statuses = [
    {text: "suatu game", type: "PLAYING"},
    {text: "suatu film", type: "WATCHING"},
    {text: "suatu music", type: "LISTENING"},
    {text: "suatu live stream", type: "STREAMING", url: "URL Twitch"}
];
```

## Lisensi
[MIT](https://github.com/Sup3rFire/djs-template/blob/master/LICENSE)
