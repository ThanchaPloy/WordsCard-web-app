// src/views/pages/StudyPage.jsx
// VIEW — หน้าหลักของแอป
// ไม่มี business logic เอง — ทุกอย่างเรียกผ่าน Context → Controller
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDeck } from "../../context/DeckContext";
import StudyController from "../../controllers/StudyController";
import FlashCard   from "../components/FlashCard";
import ProgressBar from "../components/ProgressBar";
import DoneScreen  from "../components/DoneScreen";
import FilterBar   from "../components/FilterBar";
import DeckEditor  from "../components/DeckEditor";
import UserMenu    from "../components/UserMenu";
import { CATEGORIES } from "../../constants";

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.2 30.2 0 24 0 14.6 0 6.5 5.5 2.6 13.5l7.9 6.1C12.4 13.2 17.7 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.2-10.1 7.2-17z"/>
    <path fill="#FBBC05" d="M10.5 28.4c-.6-1.8-1-3.8-1-5.9s.4-4.1 1-5.9l-7.9-6.1C.9 13.8 0 18.8 0 24s.9 10.2 2.6 14.5l7.9-6.1z"/>
    <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.7 2.3-6.3 0-11.6-3.7-13.5-9.1l-7.9 6.1C6.5 42.5 14.6 48 24 48z"/>
  </svg>
);

export default function StudyPage() {
  const { user, loginWithGoogle } = useAuth();
  const { deck, loading, filterDeck, countByCategory } = useDeck();

  // Filter state
  const [filterCat,   setFilterCat]   = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");

  // Study session state — managed via StudyController (pure functions)
  const [session, setSession] = useState(null);
  const [phase,   setPhase]   = useState("home"); // "home" | "studying" | "done"

  // Filtered deck via Controller (called through Context)
  const filtered = filterDeck({ category: filterCat, level: filterLevel });

  // Start a new session — delegate to StudyController
  const startSession = (cards) => {
    try {
      const s = StudyController.createSession(cards);
      setSession(s);
      setPhase("studying");
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle "Know it" — StudyController returns new immutable session state
  const handleKnow = () => {
    const next = StudyController.markKnow(session);
    setSession(next);
    if (next.phase === "done") setPhase("done");
  };

  // Handle "Again" — same pattern
  const handleAgain = () => {
    const next = StudyController.markAgain(session);
    setSession(next);
    if (next.phase === "done") setPhase("done");
  };

  const restartAll   = () => startSession(filtered);
  const restartWrong = () => {
    const next = StudyController.restartMissed(session, filtered);
    setSession(next);
    setPhase("studying");
  };
  const goHome = () => { setSession(null); setPhase("home"); };

  // Category stats for home screen
  const catCounts = countByCategory();
  const catStats  = CATEGORIES.filter((c) => c.value !== "all").map((c) => ({
    ...c, count: catCounts[c.value] || 0,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center"
      style={{ background:"radial-gradient(ellipse at 15% 50%,rgba(59,130,246,0.07) 0%,transparent 55%),radial-gradient(ellipse at 85% 20%,rgba(139,92,246,0.05) 0%,transparent 55%),#07090f" }}>

      {/* ── Header ── */}
      <header className="w-full max-w-2xl flex items-center justify-between px-4 sm:px-6 pt-6 pb-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">WordCards</h1>
          <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mt-0.5">English Vocabulary · MVC</p>
        </div>
        <div className="flex items-center gap-3">
          {phase === "studying" && (
            <button onClick={goHome} className="font-mono text-xs text-white/25 hover:text-white/50 transition-colors uppercase tracking-widest">
              ✕ Exit
            </button>
          )}
          {user ? (
            <UserMenu />
          ) : (
            <button onClick={loginWithGoogle}
              className="flex items-center gap-2 px-3 py-2 rounded-xl font-mono text-xs uppercase tracking-widest
                         text-white/50 border border-white/10 hover:bg-white/8 hover:border-white/20
                         active:scale-95 transition-all">
              <GoogleIcon /> Sign in
            </button>
          )}
        </div>
      </header>

      <main className="w-full max-w-2xl flex-1 flex flex-col items-center gap-6 px-4 sm:px-6 pb-12">

        {/* ── Loading ── */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="font-mono text-sm text-white/25 animate-pulse tracking-widest uppercase">Loading vocabulary…</p>
          </div>

        ) : phase === "done" ? (
          /* ── Done Screen ── */
          <DoneScreen
            correct={session.correct}
            total={session.total}
            missed={session.missed}
            onRestartAll={restartAll}
            onRestartWrong={restartWrong}
            onGoHome={goHome}
          />

        ) : phase === "studying" ? (
          /* ── Study Session ── */
          <>
            <ProgressBar current={session.current} total={session.queue.length} correct={session.correct} />
            <FlashCard
              card={StudyController.currentCard(session)}
              onKnow={handleKnow}
              onAgain={handleAgain}
            />
            <p className="font-mono text-[10px] text-white/12 tracking-widest uppercase hidden sm:block">
              Space = flip · → know · ← again
            </p>
          </>

        ) : (
          /* ── Home Screen ── */
          <div className="w-full space-y-6 animate-fadeUp">

            {/* Login banner */}
            {!user && (
              <div className="w-full p-4 rounded-2xl flex items-center justify-between gap-4"
                style={{ background:"rgba(59,130,246,0.07)", border:"1px solid rgba(59,130,246,0.15)" }}>
                <div>
                  <p className="font-mono text-xs text-blue-300/80">เข้าสู่ระบบเพื่อบันทึกการ์ดส่วนตัว</p>
                  <p className="font-mono text-[10px] text-white/25 mt-0.5">ท่องคำศัพท์ได้โดยไม่ต้อง login</p>
                </div>
                <button onClick={loginWithGoogle}
                  className="flex-shrink-0 px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-widest
                             bg-blue-500/20 border border-blue-400/30 text-blue-400
                             hover:bg-blue-500/30 active:scale-95 transition-all">
                  Sign in
                </button>
              </div>
            )}

            {/* Category quick-start grid */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-3">Study by Category</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {/* All cards */}
                <button onClick={() => startSession(deck)}
                  className="col-span-2 sm:col-span-3 flex items-center justify-between px-5 py-4
                             rounded-2xl border border-blue-400/20 bg-blue-400/6
                             hover:bg-blue-400/12 hover:border-blue-400/35
                             active:scale-[0.98] transition-all group">
                  <div className="text-left">
                    <p className="font-display text-base font-bold text-white">📚 All Categories</p>
                    <p className="font-mono text-xs text-white/30 mt-0.5">{deck.length} cards</p>
                  </div>
                  <span className="font-mono text-xs text-blue-400/60 group-hover:text-blue-400 transition-colors">▶ Start</span>
                </button>

                {/* Per category */}
                {catStats.filter((c) => c.count > 0).map((cat) => (
                  <button key={cat.value}
                    onClick={() => startSession(deck.filter((c) => c.category === cat.value))}
                    className="flex flex-col gap-1.5 px-4 py-3.5 rounded-2xl border border-white/6
                               bg-white/3 hover:bg-white/7 hover:border-white/12
                               active:scale-[0.98] transition-all text-left">
                    <span className="text-xl">{cat.emoji}</span>
                    <p className="font-mono text-xs text-white/70 uppercase tracking-wide">{cat.label}</p>
                    <p className="font-mono text-[10px] text-white/25">{cat.count} cards</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom filter */}
            <div className="p-4 rounded-2xl border border-white/6 bg-white/2 space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">Custom Filter</p>
              <FilterBar
                filterCat={filterCat} filterLevel={filterLevel}
                onCatChange={setFilterCat} onLevelChange={setFilterLevel}
                count={filtered.length}
              />
              <button onClick={() => startSession(filtered)} disabled={filtered.length === 0}
                className="w-full py-3 rounded-xl font-mono text-sm uppercase tracking-widest
                           border border-white/10 text-white/60 bg-white/4
                           hover:bg-white/10 hover:border-white/20
                           disabled:opacity-25 disabled:cursor-not-allowed
                           active:scale-[0.98] transition-all">
                {filtered.length === 0 ? "No cards match" : `▶ Start — ${filtered.length} cards`}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label:"Total Cards",   value: deck.length },
                { label:"Categories",    value: Object.keys(catCounts).length },
                { label:"My Cards",      value: user ? deck.filter((c) => c._source === "personal").length : "—" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-2xl border border-white/6 bg-white/2 text-center">
                  <p className="font-display text-2xl font-bold text-white/70">{s.value}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/20 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Deck Editor */}
            <DeckEditor />
          </div>
        )}
      </main>
    </div>
  );
}
