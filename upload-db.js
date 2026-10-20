const firebase = require("firebase/compat/app");
require("firebase/compat/database");
const fs = require("fs");

const firebaseConfig = {
    apiKey: "AIzaSyABcM4oDg7Go9JO8SlZHq-MSkvgv9oIMeA",
    authDomain: "v-smart-kp70.firebaseapp.com",
    databaseURL: "https://v-smart-kp70-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "v-smart-kp70",
    storageBucket: "v-smart-kp70.firebasestorage.app",
    messagingSenderId: "952805921944",
    appId: "1:952805921944:web:d6050895b96aaf507a2ced",
    measurementId: "G-0NWF05EL7S"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

async function uploadJsonToFirebase() {
    try {
        let rawData = fs.readFileSync('available.json', 'utf8');
        let jsonData = JSON.parse(rawData);
        await db.ref('/').set(jsonData);
        console.log("อัปเดตข้อมูลขึ้น Firebase สำเร็จ!");
        process.exit(0);
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        process.exit(1);
    }
}

uploadJsonToFirebase();