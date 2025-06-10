[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/w8H8oomW)
**<ins>Note</ins>: Students must update this `README.md` file to be an installation manual or a README file for their own CS403 projects.**

**รหัสโครงงาน:**  67-1_21_pkp-s1

**ชื่อโครงงาน (ไทย):**  เว็บไซต์รับเลี้ยงสุนัขจรจัด

**Project Title (Eng):**  StayDog

**อาจารย์ที่ปรึกษาโครงงาน:**  อ.ดร.ภัคพร เสาร์ฝั้น

**ผู้จัดทำโครงงาน:** 
1. นาย ก้องภพ ตรีเนตรไพบูลย์  6309650288 kongpob.tre@dome.tu.ac.th


# อธิบายโครงสร้างโฟลเดอร์ย่อย (directory tree) ของโปรแกรม
STAYDOG-PROJECT/
1. Prisma/
- Schema.prisma # Schema และการตั้งค่า Prisma
- seed.js # เตรียมข้อมูลเพื่อนำมาแสดงหน้าเว็ป
2. Public/
2.1 upload # Folder สำหรับเก็บรูปภาพที่ผู้ใช้อัพโหลด <br/>
- dogimages # เก็บรูปภาพสุนัข
- images # เก็บโปรไฟล์ผู้ใช้งาน
3.1 app/ <br/>
- page.js # หน้าแรกที่ยังไม่ได้ login
- layout.js # กำหนด css
- Home/ # หน้าแรกที่มีการ login
- LoginFrom/ # หน้าเข้าสู่ระบบ
- RegisterFrom/ # หน้า register ของ user
- register-shelter/ # หน้าregister ของ shelter
- AllDogs/ # หน้ารวมสุนัขทั้งหมด
- DogDetail/[id]/ # หน้ารายละเอียดของสุนัขตัวนั้น
- ArticlesPage/[id]/ # หน้าบทความ
- Profile # หน้าโปรไฟล์
- UserProfile/[id]/ # หน้าดูโปรไฟล์ของผู้ใช้งานคนนั้น
- ShelterDetailPage/[id]/ # หน้าดูโปรไฟล์สถานสงเคราะห์นั้น
- questionsFrom/ # หน้าแบบสอบถามประเมิน
- AddDogFrom/ # หน้าเพิ่มสุนัขเข้าสู่ระบบของสถานสงเคราะห์
- AllShelterDog/ # หน้าดูสุนัขทั้งหมดที่สถานสงเคราะห์เพิ่มเข้ามา
- DogMenagement/ # หน้าดูคำขอเลี้ยงทั้งหมดที่ผู้ใช้ส่งมา
- requestDetail/[id]/ # หน้าดูรายละเอียดของคำขออันนั้น
- StatusTracking/[id]/ # หน้าติดตามสถานะการรับเลี้ยงสุนัขของผู้ใช้งาน
3.2 api/auth <br/>
- [...nextauth]/ # Api สำหรับ login
- register-user/ # Api สำหรับ register ของ user
- register-shelter/ # Api สำหรับ register ของ 
- articles/[id]/  # Api สำหรับหน้าบทความ
- adoptionRequest/ # Api สำหรับคำขอรับเลี้ยงทั้งหมด
- Adddog/ # Api สำหรับหน้าเพิ่มสุนัข
- alldog/ # Api สำหรับหน้าดูสุนัขทั้งหมด
- dogs/[id]/ # Api สำหรับหน้าดูรายละเอียดของสุนัขตัวนั้น
- questions/ # Api สำหรับดึงคำถามมาแสดง
- shelterdetail/[id]/ # Api สำหรับดูโปรไฟล์สถานสงเคราะห์นั้นๆ
- shelterdog/ # Api สำหรับดูสุนัขที่สถานสงเคราะห์เพิ่่มเข้ามาในระบบ
- singleRequest/[id]/ # Api สำหรับดูรายละเอียดคำขอรับเลี้ยงของสุนัขตัวนั้น
- status/[id]/ # Api สำหรับอัพเดท status การรับเลี้ยงสุนัขให้กับผู้ใช้งาน
- trackingDog/[id]/ # Api สำหรับติดตามสุนัขตัวนั้นที่ถูกรับเลี้ยง
- userdetail/[id]/ # Api สำหรับดูโปรไฟล์ของผู้ใช้งานคนนั้น
3.3 components <br/>
- Navbar.jsx # แถบบนสุดของเว็ปเซต์ทุกหน้า
- HeroBanner.jsx # ป้ายโฆษณาในหน้าแรกของเว็บไซต์
- SessionProvider.jsx #  ให้ข้อมูล session (การล็อกอินของผู้ใช้) แก่ทุก component ภายในแอป
- Footer.jsx # แถบด้านล่างสุดของเว็ปเซต์ทุกหน้า(ไม่ได้นำมาใช้งาน)
4. .env # ตัวแปรสิ่งแวดล้อม
5. .gitignore
6. package.json
7. tailwind.config.js # Tailwind config
8. next.config.js 
# ชุดโปรแกรมที่จําเป็นต้องติดตั้งเพื่อให้โปรแกรมทํางานได้

1. Node.js
- ใช้รัน Next.js และติดตั้งแพ็กเกจ npm
- เวอร์ชันแนะนำ ≥ 18.x
- ดาวน์โหลดจาก https://nodejs.org
2. npm
- ตัวจัดการแพ็กเกจ JavaScript
- เวอร์ชันแนะนำ ≥ 9.x   
- มาพร้อมกับ Node.js
3. PostgreSQL
- ใช้เป็นฐานข้อมูลของระบบ
- เวอร์ชันแนะนำ ≥ 14.x 
- ดาวน์โหลดจาก https://www.postgresql.org 
4. seed
- seed script สำหรับใส่ข้อมูลเริ่มต้น
- ใช้คำสั่ง `npx prisma db seed`
  
# วิธีการติดตั้งโปรแกรมและวิธีการใช้งานโปรแกรม

**ต้องมี Git	สำหรับโคลนโปรเจกต์จาก GitHub** 
1. โคลนโปรเจกต์จาก GitHub
```
git clone https://github.com/yourusername/staydog-project.git
cd staydog-project
```
2. ติดตั้ง dependencies ที่จำเป็น
`npm install`

**ตั้งค่า .env ไฟล์สำหรับฐานข้อมูล** 
1. สร้างไฟล์ .env ใน root directory
2. ใส่ค่าเชื่อมต่อฐานข้อมูล PostgreSQL แบบนี้:
```
 DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/postgres?schema=public"
 NEXTAUTH_SECRET="B4rsJTUbv5TUmIKCE/TnJa6pP1JyuMp+3bwqwmavIm5bbnoHEX27Tj5lcMs="
```
3. สร้างตารางในฐานข้อมูลโดยรันคำสั่ง:
```
npx prisma generate
npx prisma migrate dev --name init
```
**เริ่มรันโปรเจกต์** 
1. รันคำสั่ง `npm run dev`
2. แล้วเปิดเว็บเบราว์เซอร์ที่: http://localhost:3000
