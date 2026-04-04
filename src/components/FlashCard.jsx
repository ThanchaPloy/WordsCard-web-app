// src/components/FlashCard.jsx
import { useState, useEffect } from "react";
import { LEVEL_BADGE, CATEGORIES } from "../constants";

export default function FlashCard({ card, onKnow, onAgain, current, total }) {
  const [flipped, setFlipped] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => { setFlipped(false); }, [card?.id]);

  const handleMark = (knew) => {
    if (!flipped) return;
    setLeaving(true);
    setTimeout(() => {
      setLeaving(false);
      knew ? onKnow() : onAgain();
    }, 280);
  };

  if (!card) return null;

  const catObj = CATEGORIES.find((c) => c.value === card.category);
  const levelCls = LEVEL_BADGE[card.level] || "bg-white/10 text-white/40 border-white/10";

  return (
    <div className="flex flex-col items-center gap-5 w-full">

      {/* Card */}
      <div
        className={`w-full max-w-lg cursor-pointer select-none transition-all duration-300
                    ${leaving ? "opacity-0 scale-95 -translate-y-2" : "opacity-100 scale-100 translate-y-0"}`}
        style={{ perspective: "1200px", height: "300px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ── Front ── */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8"
            style={{
              backfaceVisibility: "hidden",
              background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/25">
                {catObj?.emoji} {catObj?.label}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${levelCls}`}>
                {card.level}
              </span>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300/50 mb-4">Word</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white text-center leading-tight">
              {card.word}
            </h2>
            {card.phonetic && (
              <p className="mt-2 font-mono text-sm text-blue-300/40">{card.phonetic}</p>
            )}
            <p className="absolute bottom-4 font-mono text-[10px] text-white/15 tracking-widest uppercase">
              tap to reveal →
            </p>
          </div>

          {/* ── Back ── */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg,#e8c47a 0%,#d4a843 60%,#b8892a 100%)",
              boxShadow: "0 24px 60px rgba(212,168,67,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-900/40">
                {catObj?.emoji} {catObj?.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-900/40">
                {card.level}
              </span>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-900/50 mb-4">Meaning</p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-amber-900 text-center leading-snug">
              {card.meaning}
            </p>
            {card.example && (
              <div className="mt-5 px-4 py-3 rounded-xl bg-amber-900/10 border border-amber-900/15 max-w-xs">
                <p className="font-mono text-xs text-amber-800/70 text-center italic leading-relaxed">
                  "{card.example}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons — appear after flip */}
      <div className={`flex gap-3 w-full max-w-lg transition-all duration-400
                       ${flipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
        <button onClick={() => handleMark(false)}
          className="flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-widest
                     border border-red-400/25 text-red-400 bg-red-400/5
                     hover:bg-red-400/15 hover:border-red-400/50 active:scale-95 transition-all">
          ✗ Again
        </button>
        <button onClick={() => handleMark(true)}
          className="flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-widest
                     border border-emerald-400/25 text-emerald-400 bg-emerald-400/5
                     hover:bg-emerald-400/15 hover:border-emerald-400/50 active:scale-95 transition-all">
          ✓ Know it
        </button>
      </div>

      {!flipped && (
        <p className="font-mono text-[10px] text-white/15 tracking-widest uppercase">
          tap card to flip
        </p>
      )}
    </div>
  );
}
