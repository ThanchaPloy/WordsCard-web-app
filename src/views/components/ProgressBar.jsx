// VIEW — แค่รับ props มาแสดงผล ไม่มี logic
export default function ProgressBar({ current, total, correct }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="w-full max-w-lg space-y-2">
      <div className="flex justify-between items-center font-mono text-xs text-white/25">
        <span className="uppercase tracking-widest">Progress</span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400/60">✓ {correct}</span>
          <span>{current} / {total}</span>
        </div>
      </div>
      <div className="h-1 bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg,#3b82f6,#8b5cf6)" }}
        />
      </div>
    </div>
  );
}
