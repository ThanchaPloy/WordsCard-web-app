// src/context/DeckContext.jsx
// Cards are stored in two collections:
//   /cards              → shared seed vocabulary (read-only for users)
//   /users/{uid}/cards  → personal cards per user (full CRUD)
// The deck shown = shared cards + user's personal cards combined.

import { createContext, useContext, useState, useEffect } from "react";
import {
  collection, addDoc, deleteDoc, updateDoc,
  doc, onSnapshot, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const DeckContext = createContext();

export function DeckProvider({ children }) {
  const { user } = useAuth();
  const [sharedCards,   setSharedCards]   = useState([]);
  const [personalCards, setPersonalCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Listen to shared (seed) cards ──
  useEffect(() => {
    const q = query(collection(db, "cards"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q,
      (snap) => {
        setSharedCards(snap.docs.map((d) => ({ id: d.id, ...d.data(), _source: "shared" })));
        setLoading(false);
      },
      (err) => { setError("โหลดข้อมูลไม่ได้: " + err.message); setLoading(false); }
    );
    return () => unsub();
  }, []);

  // ── Listen to personal cards (only when logged in) ──
  useEffect(() => {
    if (!user) { setPersonalCards([]); return; }
    const q = query(
      collection(db, "users", user.uid, "cards"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q,
      (snap) => setPersonalCards(snap.docs.map((d) => ({ id: d.id, ...d.data(), _source: "personal" }))),
      (err) => setError("โหลดการ์ดส่วนตัวไม่ได้: " + err.message)
    );
    return () => unsub();
  }, [user]);

  // Combined deck: shared first, then personal
  const deck = [...sharedCards, ...personalCards];

  // ── CREATE personal card ──
  const addCard = async (data) => {
    if (!user) { setError("กรุณาเข้าสู่ระบบก่อนเพิ่มการ์ด"); return; }
    try {
      await addDoc(collection(db, "users", user.uid, "cards"), {
        word:     data.word?.trim()     || "",
        phonetic: data.phonetic?.trim() || "",
        meaning:  data.meaning?.trim()  || "",
        example:  data.example?.trim()  || "",
        category: data.category         || "daily",
        level:    data.level            || "B1",
        createdAt: serverTimestamp(),
        source: "personal",
      });
    } catch (err) { setError("เพิ่มการ์ดไม่สำเร็จ: " + err.message); }
  };

  // ── UPDATE ──
  const updateCard = async (id, data, isPersonal = true) => {
    if (!user) return;
    try {
      const ref = isPersonal
        ? doc(db, "users", user.uid, "cards", id)
        : doc(db, "cards", id); // admin only
      await updateDoc(ref, data);
    } catch (err) { setError("แก้ไขไม่สำเร็จ: " + err.message); }
  };

  // ── DELETE personal card only ──
  const removeCard = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "cards", id));
    } catch (err) { setError("ลบไม่สำเร็จ: " + err.message); }
  };

  return (
    <DeckContext.Provider value={{
      deck, sharedCards, personalCards,
      loading, error, setError,
      addCard, updateCard, removeCard,
    }}>
      {children}
    </DeckContext.Provider>
  );
}

export const useDeck = () => useContext(DeckContext);
