const admin = require("firebase-admin");
const serviceAccount = require("./path-to-serviceAccountKey.json"); // ไฟล์กุญแจความปลอดภัยของ Firebase
const fs = require("fs");

// 1. เชื่อมต่อ Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://v-smart-kp70-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();

// 2. อ่านไฟล์ JSON ที่เตรียมไว้
fs.readFile("v-smart-khuangpao-database.json", "utf8", async (err, data) => {
  if (err) {
    console.error("เกิดข้อผิดพลาดในการอ่านไฟล์:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    // 3. อัปโหลดข้อมูลทั้งหมดขึ้นที่ Root ของ Database
    await db.ref("/").set(jsonData);
    console.log("อัปโหลดข้อมูลขึ้น Firebase สำเร็จเรียบร้อยแล้ว!");
    process.exit();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการอัปโหลดข้อมูล:", error);
  }
});