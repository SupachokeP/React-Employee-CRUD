# Step to run project
## 1.Restore Dabase
Database ที่ผมใช้คือ SQL Server สามารถ restore Database ได้ผ่าน ssms เลยครับ โดยไฟล์จะอยู่ในโฟลเดอร์ DB ครับ
## 2.Run Api
ก่อนจะรัน api ให้แก้ connection string ใน app `setting.json` ในโฟลเดอร์ publish api ให้ตรงกับ instance ของ SQL Server ก่อนจึงจะสามารถรัน Api ได้ โดยสามารถรัน `Ang-test.exe` ได้เลย Api จะรันที่ default port 5000 หรือสามารถรัน solution ได้ผ่าน visual studio
## 3.Run React
สามารถ CD เข้าไปยัง path ของ front-react/react-frontend และรันคำสั่ง `npm install`และ`npm run dev` ได้เลย กรณีตัว api ไม่ได้รันที่ port 5000 สามารถเข้าไปแก้ endpoint ของ api ได้ที่ src/app.jsx ครับ
