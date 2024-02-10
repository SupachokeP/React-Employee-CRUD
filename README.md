# Step to run project
## English
### 1. Restore Database
The database used is SQL Server. You can restore the database using SSMS. The file is located in the DB folder.
### 2. Run API
Before running the API, edit the connection string in the `appsetting.json` file in the publish api folder to match the SQL Server instance. Then, you can run the API by running `Ang-test.exe`. The API will run on the default port 5000. You can also run the solution through Visual Studio.
### 3. Run React
You can navigate to the path of `front-react/react-frontend` and run the commands `npm install` and `npm run dev`. If the API is not running on port 5000, you can edit the API endpoint in `src/app.jsx`.
## Thai
### 1.Restore Dabase
Database ที่ผมใช้คือ SQL Server สามารถ restore Database ได้ผ่าน ssms เลยครับ โดยไฟล์จะอยู่ในโฟลเดอร์ DB ครับ
### 2.Run Api
ก่อนจะรัน api ให้แก้ connection string ใน app `setting.json` ในโฟลเดอร์ publish api ให้ตรงกับ instance ของ SQL Server ก่อนจึงจะสามารถรัน Api ได้ โดยสามารถรัน `Ang-test.exe` ได้เลย Api จะรันที่ default port 5000 หรือสามารถรัน solution ได้ผ่าน visual studio
### 3.Run React
สามารถ CD เข้าไปยัง path ของ `front-react/react-frontend` และรันคำสั่ง `npm install`และ`npm run dev` ได้เลย กรณีตัว api ไม่ได้รันที่ port 5000 สามารถเข้าไปแก้ endpoint ของ api ได้ที่ `src/app.jsx` ครับ
