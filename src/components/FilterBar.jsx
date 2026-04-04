// src/components/FilterBar.jsx
import { CATEGORIES, LEVELS } from "../constants";

export default function FilterBar({ filterCat, filterLevel, onCatChange, onLevelChange, count }) {
  return (
    <div className="w-full max-w-lg space-y-3 animate-fadeUp">
      {/* Category pills */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/25 mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => onCatChange(c.value)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wide
                          border transition-all duration-200 active:scale-95
                          ${filterCat === c.value
                            ? "bg-blue-500/25 border-blue-400/50 text-blue-300"
                            : "border-white/8 text-white/30 hover:border-white/20 hover:text-white/50"
                          }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Level pills */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/25 mb-2">Level</p>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.value}
              onClick={() => onLevelChange(l.value)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wide
                          border transition-all duration-200 active:scale-95
                          ${filterLevel === l.value
                            ? "bg-purple-500/20 border-purple-400/40 text-purple-300"
                            : "border-white/8 text-white/30 hover:border-white/20 hover:text-white/50"
                          }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="font-mono text-xs text-white/20">
        {count} card{count !== 1 ? "s" : ""} in this selection
      </p>
    </div>
  );
}
