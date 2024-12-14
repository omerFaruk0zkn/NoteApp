# Not Tutma Uygulaması

## Hakkında
Basit bir not tutma uygulaması. Kullanıcıların notlarını kaydedebileceği, düzenleyebileceği ve silebileceği bir sistem.

## Özellikler
- Kullanıcı girişi ve kayıt olma (JWT ile güvenli).
- CRUD işlemleri:
  - Not ekleme
  - Not güncelleme
  - Not silme
  - Not listeleme
- Notlara renk seçme ve favori işaretleme özelliği.
- Responsive ve kullanıcı dostu arayüz (Bootstrap ile).

## Teknolojiler
- **Backend:** ASP.NET Web API
- **Frontend:** React
- **Veritabanı:** MSSQL

## Kurulum
### Backend 
```bash 
cd NoteAppAPI
dotnet restore
dotnet run
```     
### Frontend
```bash
cd note-app-client
npm install
npm start
```
## Açıklamalar
Bu içerikleri appsettings.json dosyasına ekleyin.
### 1. ConnectionStrings
- MSSQL bağlanma dizesini **"DefaultConnection"** adıyla ekleyin.
- Örnek bağlantı dizesi:
  ```json
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=DATABASE_NAME;Trusted_Connection=True;TrustServerCertificate=True;"
  }
  ```
### 2. Jwt
- Key: Uygulamanın JWT (JSON Web Token) oluşturmak için kullandığı gizli anahtardır. Bu değeri güvenli tutmalısınız. Bu nedenle kendinize özel bir anahtar oluşturabilirsiniz.
  - Not: En az 32 karakter uzunluğunda olmalı.
- Issuer ve Audience: Uygulamanın kimlik doğrulama ve yetkilendirme sırasında kullandığı bilgiler.
  - İsterseniz özelleştirebilirsiniz
- Örnek içerik: 
  ```json
    "Jwt": {
    "Key": "YOUR_SECRET_KEY",
    "Issuer": "NoteAppAPI",
    "Audience": "NoteAppAPI"
  }
  ```
     
