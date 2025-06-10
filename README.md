[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/w8H8oomW)
**<ins>Note</ins>: Students must update this `README.md` file to be an installation manual or a README file for their own CS403 projects.**

**รหัสโครงงาน:**  67-1_21_pkp-s1

**ชื่อโครงงาน (ไทย):**  เว็บไซต์รับเลี้ยงสุนัขจรจัด

**Project Title (Eng):**  StayDog

**อาจารย์ที่ปรึกษาโครงงาน:**  อ.ดร.ภัคพร เสาร์ฝั้น

**ผู้จัดทำโครงงาน:** 
1. นาย ก้องภพ ตรีเนตรไพบูลย์  6309650288 kongpob.tre@dome.tu.ac.th


# อธิบายโครงสร้างโฟลเดอร์ย่อย (directory tree) ของโปรแกรม
STAYDOG-PROJECT/<br/>
├── Prisma/<br/>
│ ├── Schema.prisma # Schema และการตั้งค่า Prisma<br/>
│ ├── seed.js # เตรียมข้อมูลเพื่อนำมาแสดงหน้าเว็ป<br/>
├── Public/<br/>
│ ├── upload # Folder สำหรับเก็บรูปภาพที่ผู้ใช้อัพโหลด<br/>
&emsp;&emsp;└── dogimages # เก็บรูปภาพสุนัข<br/>
&emsp;&emsp;└── images # เก็บโปรไฟล์ผู้ใช้งาน<br/>
├── app/<br/>
│ ├── api/auth<br/>
    └── [...nextauth]/ # Api สำหรับ login<br/>
    └── register-user/ # Api สำหรับ register ของ user<br/>
    └── register-shelter/ # Api สำหรับ register ของ <br/>
    └── articles/[id]/  # Api สำหรับหน้าบทความ<br/>
    └── adoptionRequest/ # Api สำหรับคำขอรับเลี้ยงทั้งหมด<br/>
    └── Adddog/ # Api สำหรับหน้าเพิ่มสุนัข<br/>
    └── alldog/ # Api สำหรับหน้าดูสุนัขทั้งหมด<br/>
    └── dogs/[id]/ # Api สำหรับหน้าดูรายละเอียดของสุนัขตัวนั้น<br/>
    └── questions/ # Api สำหรับดึงคำถามมาแสดง<br/>
    └── shelterdetail/[id]/ # Api สำหรับดูโปรไฟล์สถานสงเคราะห์นั้นๆ<br/>
    └── shelterdog/ # Api สำหรับดูสุนัขที่สถานสงเคราะห์เพิ่่มเข้ามาในระบบ<br/>
    └── singleRequest/[id]/ # Api สำหรับดูรายละเอียดคำขอรับเลี้ยงของสุนัขตัวนั้น<br/>
        └── status/[id]/ # Api สำหรับอัพเดท status การรับเลี้ยงสุนัขให้กับผู้ใช้งาน<br/>
    └── trackingDog/[id]/ # Api สำหรับติดตามสุนัขตัวนั้นที่ถูกรับเลี้ยง<br/>
    └── userdetail/[id]/ # Api สำหรับดูโปรไฟล์ของผู้ใช้งานคนนั้น<br/>
│ ├── components<br/>
    └── Navbar.jsx # แถบบนสุดของเว็ปเซต์ทุกหน้า<br/>
    └── HeroBanner.jsx # ป้ายโฆษณาในหน้าแรกของเว็บไซต์<br/>
    └── SessionProvider.jsx #  ให้ข้อมูล session (การล็อกอินของผู้ใช้) แก่ทุก component ภายในแอป<br/>
    └── Footer.jsx # แถบด้านล่างสุดของเว็ปเซต์ทุกหน้า(ไม่ได้นำมาใช้งาน)<br/>
│ ├── page.js # หน้าแรกที่ยังไม่ได้ login<br/>
│ ├── layout.js # กำหนด css<br/>
│ ├── Home/ # หน้าแรกที่มีการ login<br/>
│ ├── LoginFrom/ # หน้าเข้าสู่ระบบ<br/>
│ ├── RegisterFrom/ # หน้า register ของ user<br/>
│ ├── register-shelter/ # หน้าregister ของ shelter<br/>
│ ├── AllDogs/ # หน้ารวมสุนัขทั้งหมด<br/>
│ ├── DogDetail/[id]/ # หน้ารายละเอียดของสุนัขตัวนั้น<br/>
│ ├── ArticlesPage/[id]/ # หน้าบทความ<br/>
│ ├── Profile # หน้าโปรไฟล์<br/>
│ ├── UserProfile/[id]/ # หน้าดูโปรไฟล์ของผู้ใช้งานคนนั้น<br/>
│ ├── ShelterDetailPage/[id]/ # หน้าดูโปรไฟล์สถานสงเคราะห์นั้น<br/>
│ ├── questionsFrom/ # หน้าแบบสอบถามประเมิน<br/>
│ ├── AddDogFrom/ # หน้าเพิ่มสุนัขเข้าสู่ระบบของสถานสงเคราะห์<br/>
│ ├── AllShelterDog/ # หน้าดูสุนัขทั้งหมดที่สถานสงเคราะห์เพิ่มเข้ามา<br/>
│ ├── DogMenagement/ # หน้าดูคำขอเลี้ยงทั้งหมดที่ผู้ใช้ส่งมา<br/>
      └── requestDetail/[id]/ # หน้าดูรายละเอียดของคำขออันนั้น<br/>
│ ├── StatusTracking/[id]/ # หน้าติดตามสถานะการรับเลี้ยงสุนัขของผู้ใช้งาน<br/>
├── styles/ # ไฟล์ CSS<br/> 
├── .env # ตัวแปรสิ่งแวดล้อม<br/>
├── .gitignore<br/>
├── package.json<br/>
├── tailwind.config.js # Tailwind config<br/>
├── next.config.j# ชุดโปรแกรมที่จําเป็นต้องติดตั้งเพื่อให้โปรแกรมทํางานได้<br/>

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
