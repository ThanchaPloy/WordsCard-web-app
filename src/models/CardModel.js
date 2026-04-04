//  M O D E L  —  จัดการข้อมูลกับ Firestore โดยตรง
//  ไม่รู้จัก React / UI ทั้งนั้น

import {
  collection, addDoc, deleteDoc, updateDoc,
  doc, onSnapshot, serverTimestamp, query, orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const CardModel = {

  // ── READ: real-time listener — shared seed cards ──
  subscribeShared(onChange, onError) {
    const q = query(collection(db, "cards"), orderBy("createdAt", "asc"));
    return onSnapshot(
      q,
      (snap) =>
        onChange(snap.docs.map((d) => ({ id: d.id, ...d.data(), _source: "shared" }))),
      onError
    );
  },

  // ── READ: real-time listener — personal cards ──
  subscribePersonal(uid, onChange, onError) {
    const q = query(
      collection(db, "users", uid, "cards"),
      orderBy("createdAt", "asc")
    );
    return onSnapshot(
      q,
      (snap) =>
        onChange(snap.docs.map((d) => ({ id: d.id, ...d.data(), _source: "personal" }))),
      onError
    );
  },

  // ── CREATE ──
  async create(uid, data) {
    return addDoc(collection(db, "users", uid, "cards"), {
      word:      data.word?.trim()     || "",
      phonetic:  data.phonetic?.trim() || "",
      meaning:   data.meaning?.trim()  || "",
      example:   data.example?.trim()  || "",
      category:  data.category         || "daily",
      level:     data.level            || "B1",
      source:    "personal",
      createdAt: serverTimestamp(),
    });
  },

  // ── UPDATE ──
  async update(uid, cardId, data) {
    return updateDoc(doc(db, "users", uid, "cards", cardId), data);
  },

  // ── DELETE ──
  async delete(uid, cardId) {
    return deleteDoc(doc(db, "users", uid, "cards", cardId));
  },
};

export default CardModel;
