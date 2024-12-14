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

### Frontend
```bash
cd note-app-client
npm install
npm start