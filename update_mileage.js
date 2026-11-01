const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const fs = require('fs');
const path = require('path');

// 1. ตรวจสอบไฟล์กุญแจ serviceAccountKey.json
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ ไม่พบไฟล์ serviceAccountKey.json ในโฟลเดอร์โปรเจกต์');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// 2. เชื่อมต่อ Firebase แอปพลิเคชัน
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://v-smart-kp70-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = getDatabase();

async function updateVehicleMileage() {
  try {
    console.log('🔄 กำลังเชื่อมต่อ Firebase และดึงข้อมูลยานพาหนะ...');
    const vehiclesRef = db.ref('vehicles');
    const snapshot = await vehiclesRef.once('value');
    const vehicles = snapshot.val();

    if (!vehicles) {
      console.log('❌ ไม่พบข้อมูลยานพาหนะในระบบ');
      return;
    }

    const updates = {};
    let count = 0;

    Object.keys(vehicles).forEach((key) => {
      const car = vehicles[key];
      const currentMile = Number(car.mileage) || 0;
      
      // สำรองเลขไมล์เดิมเข้า original_mileage
      const origMile = car.original_mileage !== undefined ? car.original_mileage : currentMile;

      updates[`${key}/original_mileage`] = origMile;
      updates[`${key}/mileage`] = 0; // ตั้งค่าไมล์ควบคุม 90 วันเป็น 0 กม.
      count++;
    });

    await vehiclesRef.update(updates);
    console.log(`\n✅ ปรับปรุงข้อมูลสำเร็จทั้งหมด ${count} คัน!`);
    console.log('--------------------------------------------------');
    console.log('📌 ผลลัพธ์:');
    console.log('- สำรองเลขไมล์เดิมลงฟิลด์ original_mileage เรียบร้อย');
    console.log('- ปรับเลขไมล์ปัจจุบัน (mileage) เป็น 0 กม. ทุกคันสำหรับช่วงควบคุม 90 วัน');
    console.log('--------------------------------------------------\n');

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error.message);
  } finally {
    process.exit();
  }
}

updateVehicleMileage();