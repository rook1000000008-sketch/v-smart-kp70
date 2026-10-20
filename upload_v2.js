const fs = require("fs");

async function uploadData() {
  const databaseURL = "https://v-smart-kp70-default-rtdb.asia-southeast1.firebasedatabase.app/.json";
  
  try {
    // อ่านไฟล์ available_2.json
    const rawData = fs.readFileSync("available_2.json", "utf8");
    const jsonData = JSON.parse(rawData);

    console.log("กำลังส่งข้อมูลขึ้น Firebase...");

    // ส่งข้อมูลแบบ PUT ตรงไปยัง Firebase Realtime Database REST API
    const response = await fetch(databaseURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
    });

    if (response.ok) {
      console.log("✅ อัปโหลดไฟล์ available_2.json ขึ้น Firebase สำเร็จเรียบร้อยแล้ว!");
    } else {
      const errorText = await response.text();
      console.error("❌ อัปโหลดไม่สำเร็จ:", errorText);
    }
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด:", error);
  }
}

uploadData();