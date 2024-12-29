

## Email untuk login

email: user1@gmail.com
password: password123

## Rest API Raja ongkir
https://rajaongkir.com/dokumentasi/starter

API_KEY= 7e4b5225a5a6c4f4093a5ba75e9162ac
API_URL= https://api.rajaongkir.com/starter/


### Menjalankan Aplikasi
```bash
# Jalankan aplikasi dalam mode development
$ npm run dev
# atau
$ yarn dev

# Aplikasi akan berjalan di http://localhost:3000
```
# Aplikasi Sederhana Menggunakan Next.js

## Fitur Utama

1. **Pencarian Ongkos Kirim:** Masukkan kota asal dan tujuan untuk mendapatkan informasi biaya pengiriman.
2. **Pilihan Kurir:** Mendukung beberapa pilihan kurir untuk fleksibilitas.
3. **Autentikasi:** Sistem login sederhana
4. **Responsif:** Desain responsif untuk pengalaman pengguna yang optimal di perangkat desktop dan mobile.
5. **Pengelolaan State Reaktif:** Menggunakan state reaktif untuk pembaruan data secara real-time.

## Deskripsi
Aplikasi ini adalah proyek sederhana yang dibuat menggunakan **React.js** dengan framework **Next.js 15**. Aplikasi ini memanfaatkan data dari API eksternal **Rajaongkir API** dan menerapkan beberapa fitur seperti:
- Conditional Rendering (Loading state, condition error)
- Reusable Components
- Reactivity (use effect)
- Routing (Auth sederhana menggunakan local storage untuk menyimpan sesi)

Aplikasi ini juga menggunakan **TypeScript**, **ESLint**, dan di-styling menggunakan **CSS Modules**.


## Teknologi yang Digunakan
- **Next.js**: Framework React untuk rendering sisi server.
- **TypeScript**: Menambahkan dukungan tipe statis ke JavaScript.
- **CSS**: Css murni.
- **ESLint**: Untuk memastikan kualitas kode.
- **RajaOngkir API**: Untuk fetching data pengiriman.





