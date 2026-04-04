
//  C O N T R O L L E R  —  Business Logic ของ Deck
//  รับคำสั่งจาก View → ตรวจสอบ → เรียก Model
//  ไม่มี JSX / UI เด็ดขาด

import CardModel from "../models/CardModel";

const DeckController = {

  // ── Subscribe shared cards ──
  subscribeShared(onUpdate, onError) {
    return CardModel.subscribeShared(onUpdate, onError);
  },

  // ── Subscribe personal cards ──
  subscribePersonal(uid, onUpdate, onError) {
    if (!uid) return () => {};
    return CardModel.subscribePersonal(uid, onUpdate, onError);
  },

  // ── Validate input ก่อน add/edit ──
  validate(data) {
    const errors = [];
    if (!data.word?.trim())    errors.push("กรุณากรอกคำศัพท์");
    if (!data.meaning?.trim()) errors.push("กรุณากรอกคำแปล");
    return errors; // [] = ผ่าน, มีค่า = error
  },

  // ── CREATE ──
  async addCard(uid, data) {
    if (!uid) throw new Error("กรุณาเข้าสู่ระบบก่อนเพิ่มการ์ด");
    const errors = DeckController.validate(data);
    if (errors.length) throw new Error(errors.join(", "));
    return CardModel.create(uid, data);
  },

  // ── UPDATE ──
  async editCard(uid, cardId, data) {
    if (!uid)   throw new Error("กรุณาเข้าสู่ระบบ");
    if (!cardId) throw new Error("ไม่พบ ID การ์ด");
    const errors = DeckController.validate(data);
    if (errors.length) throw new Error(errors.join(", "));
    return CardModel.update(uid, cardId, data);
  },

  // ── DELETE ──
  async removeCard(uid, cardId) {
    if (!uid) throw new Error("กรุณาเข้าสู่ระบบ");
    return CardModel.delete(uid, cardId);
  },

  // ── Filter by category + level ──
  filterDeck(deck, { category = "all", level = "all" } = {}) {
    return deck.filter((card) => {
      const catOk   = category === "all" || card.category === category;
      const levelOk = level    === "all" || card.level    === level;
      return catOk && levelOk;
    });
  },

  // ── Count cards per category (for home screen stats) ──
  countByCategory(deck) {
    return deck.reduce((acc, card) => {
      acc[card.category] = (acc[card.category] || 0) + 1;
      return acc;
    }, {});
  },

  // ── Search cards by keyword ──
  searchCards(deck, keyword) {
    if (!keyword?.trim()) return deck;
    const kw = keyword.toLowerCase();
    return deck.filter(
      (c) =>
        c.word?.toLowerCase().includes(kw) ||
        c.meaning?.toLowerCase().includes(kw)
    );
  },
};

export default DeckController;
