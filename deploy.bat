@echo off
chcp 65001 > nul
echo ========================================================
echo   กำลังอัปโหลดโปรเจกต์ V-SMART ขึ้นสู่ GitHub...
echo ========================================================

git status

set /p commit_msg="กรุณากรอกข้อความบันทึกการอัปเดต (Commit Message): "
if "%commit_msg%"=="" set commit_msg="อัปเดตระบบ V-SMART ล่าสุด"

git add .
git commit -m "%commit_msg%"
git push origin main

echo.
echo ========================================================
echo   อัปโหลดสำเร็จเรียบร้อยแล้วครับ!
echo ========================================================
pause