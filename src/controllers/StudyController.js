//  C O N T R O L L E R  —  Business Logic ของ Session
//  shuffle, mark, score, restart ทั้งหมดอยู่ที่นี่
//  ไม่มี JSX / UI เด็ดขาด


const StudyController = {

  // ── Fisher-Yates shuffle ──
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // ── สร้าง session ใหม่ ──
  createSession(cards) {
    if (!cards || cards.length === 0) {
      throw new Error("ไม่มีการ์ดในหมวดนี้");
    }
    return {
      queue:   StudyController.shuffle(cards),
      current: 0,
      correct: 0,
      total:   0,
      missed:  [],
      phase:   "studying", // "studying" | "done"
    };
  },

  // ── ตอบว่าจำได้ → คืน session state ใหม่ ──
  markKnow(session) {
    const next = session.current + 1;
    return {
      ...session,
      current: next,
      correct: session.correct + 1,
      total:   session.total + 1,
      phase:   next >= session.queue.length ? "done" : "studying",
    };
  },

  // ── ตอบว่าจำไม่ได้ → เพิ่มใน missed ──
  markAgain(session) {
    const next = session.current + 1;
    return {
      ...session,
      current: next,
      total:   session.total + 1,
      missed:  [...session.missed, session.queue[session.current]],
      phase:   next >= session.queue.length ? "done" : "studying",
    };
  },

  // ── Restart ทั้งหมด ──
  restartAll(cards) {
    return StudyController.createSession(cards);
  },

  // ── Restart เฉพาะที่ตอบผิด ──
  restartMissed(session, fallbackCards) {
    const cards = session.missed.length > 0 ? session.missed : fallbackCards;
    return StudyController.createSession(cards);
  },

  // ── คำนวณ score % ──
  calcScore(correct, total) {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  },

  // ── ดึงการ์ดปัจจุบัน ──
  currentCard(session) {
    return session?.queue?.[session.current] ?? null;
  },

  // ── grade label จาก score ──
  getGrade(pct) {
    if (pct >= 80) return { label: "Excellent! 🎉", color: "text-emerald-400" };
    if (pct >= 60) return { label: "Good job! 👍",  color: "text-blue-400"    };
    if (pct >= 40) return { label: "Keep going! 💪", color: "text-amber-400"  };
    return               { label: "Try again! 🔄",  color: "text-red-400"    };
  },
};

export default StudyController;
