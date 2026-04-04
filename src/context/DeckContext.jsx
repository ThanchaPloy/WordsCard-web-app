
//  React Context: แค่ bridge ส่ง deck state ไปทั้งแอป
//  Logic ทั้งหมดอยู่ใน DeckController + CardModel


import { createContext, useContext, useState, useEffect } from "react";
import DeckController from "../controllers/DeckController";
import { useAuth } from "./AuthContext";

const DeckContext = createContext(null);

export function DeckProvider({ children }) {
  const { user } = useAuth();
  const [sharedCards,   setSharedCards]   = useState([]);
  const [personalCards, setPersonalCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Subscribe shared cards (ทุกคน) ──
  useEffect(() => {
    const unsub = DeckController.subscribeShared(
      (cards) => { setSharedCards(cards); setLoading(false); },
      (err)   => { setError(err.message); setLoading(false); }
    );
    return () => unsub();
  }, []);

  // ── Subscribe personal cards (เฉพาะ user ที่ login) ──
  useEffect(() => {
    if (!user) { setPersonalCards([]); return; }
    const unsub = DeckController.subscribePersonal(
      user.uid,
      (cards) => setPersonalCards(cards),
      (err)   => setError(err.message)
    );
    return () => unsub();
  }, [user]);

  // รวม deck = shared + personal
  const deck = [...sharedCards, ...personalCards];

  // ── CRUD wrappers — View เรียกผ่านนี้ ──
  const addCard = (data) =>
    DeckController.addCard(user?.uid, data).catch((e) => setError(e.message));

  const editCard = (cardId, data) =>
    DeckController.editCard(user?.uid, cardId, data).catch((e) => setError(e.message));

  const removeCard = (cardId) =>
    DeckController.removeCard(user?.uid, cardId).catch((e) => setError(e.message));

  // ── Helper wrappers จาก Controller ──
  const filterDeck   = (opts) => DeckController.filterDeck(deck, opts);
  const searchCards  = (kw)   => DeckController.searchCards(deck, kw);
  const countByCategory = ()  => DeckController.countByCategory(deck);

  return (
    <DeckContext.Provider value={{
      deck, sharedCards, personalCards,
      loading, error, setError,
      addCard, editCard, removeCard,
      filterDeck, searchCards, countByCategory,
    }}>
      {children}
    </DeckContext.Provider>
  );
}

export const useDeck = () => useContext(DeckContext);
