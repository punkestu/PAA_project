# PAA PROJECT
Projek merupakan back-end dari projek API mata kuliah Pemrograman Antarmuka Aplikasi program studi Teknologi Informasi Universitas Jember tahun 2023.

Untuk projek front-end untuk aplikasi ini dapat diakses pada [Projek front-end](https://github.com/cikoedofebrian/locad-in).

Projek ini menggunakan bahasa pemrograman JavaScript dengan framework:

* NodeJS
* Express
* Prisma

## Inisiasi projek
Lakukan install dependencies npm.
```
npm install
```
Buat file .env dari file example.
```
npm run gen:env
```
Buat JWT_PRIVATE_KEY.
```
npm run gen:key
```
Buat salt.
```
npm run gen:salt
```
Ubah data &lt;username&gt; dan &lt;password&gt; pada DATABASE_URL dalam file .env.
```
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/paa_project?schema=public"
```
Jalan migrasi database lalu masukan nama migrasi.
```
npx migrate dev
```
Jalankan aplikasi
* dev
```
npm run dev
```
* start
```
npm run start
```