//  C O N T R O L L E R  —  Business Logic ของ Auth
//  เป็น bridge ระหว่าง View ↔ UserModel

import UserModel from "../models/UserModel";

const AuthController = {

  // ── Listen auth state (ส่งต่อจาก Model) ──
  onAuthChange(callback) {
    return UserModel.onAuthChange(callback);
  },

  // ── Login ──
  async login() {
    try {
      await UserModel.loginWithGoogle();
    } catch (err) {
      // ผู้ใช้ปิด popup ถือว่า cancel ไม่ใช่ error จริง
      if (err.code !== "auth/popup-closed-by-user") {
        throw new Error("เข้าสู่ระบบไม่สำเร็จ: " + err.message);
      }
    }
  },

  // ── Logout ──
  async logout() {
    try {
      await UserModel.logout();
    } catch (err) {
      throw new Error("ออกจากระบบไม่สำเร็จ: " + err.message);
    }
  },

  // ── Helper: ดึงชื่อย่อ ──
  getFirstName(user) {
    return user?.displayName?.split(" ")[0] ?? "";
  },
};

export default AuthController;
