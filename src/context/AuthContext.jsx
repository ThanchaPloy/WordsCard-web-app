//  React Context: แค่ bridge ส่ง auth state ไปทั้งแอป
//  Logic ทั้งหมดอยู่ใน AuthController + UserModel

import { createContext, useContext, useState, useEffect } from "react";
import AuthController from "../controllers/AuthController";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Controller เป็นคนเรียก Model — Context แค่รับ callback
    const unsub = AuthController.onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login            = () => AuthController.login();
  const logout           = () => AuthController.logout();
  const loginWithGoogle  = () => AuthController.login(); // Alias for direct use

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
