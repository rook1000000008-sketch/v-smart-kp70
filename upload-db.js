const admin = require("firebase-admin");
const fs = require("fs");

// เชื่อมต่อกับ Firebase Realtime Database ของโปรเจกต์ v-smart-kp70
admin.initializeApp({
  databaseURL: "https://v-smart-kp70-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();
const ref = db.ref("/"); // อัปโหลดข้อมูลทับที่ Root ของ Database

// อ่านไฟล์ available.json
const rawData = fs.readFileSync("available.json", "utf8");
const jsonData = JSON.parse(rawData);

ref.set(jsonData)
  .then(() => {
    console.log("✅ อัปโหลดไฟล์ available.json ขึ้น Firebase สำเร็จเรียบร้อยแล้ว!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ เกิดข้อผิดพลาดในการอัปโหลด: ", error);
    process.exit(1);
  });