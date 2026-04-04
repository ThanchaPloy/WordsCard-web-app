import StudyController from "../../controllers/StudyController";

export default function DoneScreen({ correct, total, missed, onRestartAll, onRestartWrong, onGoHome }) {
  const pct   = StudyController.calcScore(correct, total);
  const grade = StudyController.gradeLabel(pct);

  return (
    <div className="flex flex-col items-center text-center py-8 gap-5 animate-fadeUp w-full max-w-lg">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">Session Complete</p>
      <p className="font-display text-7xl font-bold text-white">{pct}%</p>
      <p className={`font-display text-2xl font-bold italic ${grade.color}`}>{grade.label}</p>
      <p className="font-mono text-sm text-white/30">{correct} of {total} correct</p>

      <div className="w-full max-w-xs bg-white/8 rounded-full h-1.5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 delay-300"
          style={{ width:`${pct}%`, background: pct >= 60 ? "linear-gradient(90deg,#10b981,#34d399)" : "linear-gradient(90deg,#f59e0b,#fbbf24)" }} />
      </div>

      {missed.length > 0 && (
        <div className="w-full p-4 rounded-2xl border border-white/8 bg-white/3 text-left space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/25">Review these ({missed.length})</p>
          <div className="flex flex-wrap gap-2">
            {missed.map((c) => (
              <span key={c.id} className="font-mono text-xs px-2.5 py-1 rounded-lg bg-red-400/10 border border-red-400/20 text-red-300">
                {c.word}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
        <button onClick={onGoHome}
          className="flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-widest
                     border border-white/10 text-white/30 hover:bg-white/5 active:scale-95 transition-all">
          ← Home
        </button>
        <button onClick={onRestartAll}
          className="flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-widest
                     border border-white/15 text-white/50 hover:bg-white/8 active:scale-95 transition-all">
          ↺ Restart
        </button>
        {missed.length > 0 && (
          <button onClick={onRestartWrong}
            className="flex-1 py-3 rounded-xl font-mono text-xs uppercase tracking-widest
                       border border-blue-400/35 text-blue-400 bg-blue-400/8
                       hover:bg-blue-400/15 active:scale-95 transition-all">
            ↻ Missed ({missed.length})
          </button>
        )}
      </div>
    </div>
  );
}
