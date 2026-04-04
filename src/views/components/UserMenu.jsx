// VIEW — Avatar dropdown แสดง user info + logout
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDeck } from "../../context/DeckContext";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const { personalCards }    = useDeck();
  const [open, setOpen]      = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const firstName = user.displayName?.split(" ")[0] ?? "User";
  const initial = user.displayName?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="relative" ref={ref}>
      {/* Avatar button */}
      <button onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 p-1 pr-3 rounded-full border border-white/10 bg-white/5
                   hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-blue-500/30 flex items-center justify-center font-mono text-xs text-blue-300">
            {initial}
          </div>
        )}
        <span className="font-mono text-xs text-white/50 hidden sm:block max-w-[120px] truncate">
          {firstName}
        </span>
        <span className="font-mono text-[10px] text-white/20">{open ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl p-3 z-50 animate-fadeUp"
          style={{ background:"#0f1420", border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 16px 40px rgba(0,0,0,0.5)" }}>

          {/* User info */}
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full ring-1 ring-white/10" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center font-mono text-sm text-blue-300">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-mono text-sm text-white/80 truncate">{user.displayName}</p>
              <p className="font-mono text-[10px] text-white/25 truncate">{user.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-2 mb-2 p-3 rounded-xl bg-white/3 border border-white/5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-2">My Stats</p>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-white/70">{personalCards.length}</p>
              <p className="font-mono text-[9px] text-white/25 uppercase tracking-wide">Personal Cards</p>
            </div>
          </div>

          <div className="h-px bg-white/6 my-2" />

          {/* Logout */}
          <button onClick={() => { logout(); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-mono text-xs
                       text-red-400/70 uppercase tracking-widest hover:bg-red-400/8 hover:text-red-400
                       active:scale-[0.98] transition-all">
            <span>→</span> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
