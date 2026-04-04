//  M O D E L  —  จัดการ Firebase Authentication
//  ไม่รู้จัก React / UI ทั้งนั้น
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const UserModel = {

  // ── Listen: detect auth state change (login/logout/refresh) ──
  onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
  },

  // ── Login with Google popup ──
  async loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  },

  // ── Logout ──
  async logout() {
    return signOut(auth);
  },
};

export default UserModel;
