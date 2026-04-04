// src/components/DeckEditor.jsx
import { useState } from "react";
import { useDeck } from "../context/DeckContext";
import { useDictionary } from "../hooks/useDictionary";
import { CATEGORIES, LEVELS, LEVEL_BADGE } from "../constants";

const EMPTY = { word:"", phonetic:"", meaning:"", example:"", category:"daily", level:"B1" };

export default function DeckEditor() {
  const { deck, addCard, removeCard, updateCard, error, setError } = useDeck();
  const { fetchWord, fetching, fetchError, setFetchError } = useDictionary();
  const [open, setOpen]       = useState(false);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch]   = useState("");
  const [tab, setTab]         = useState("add"); // "add" | "list"

  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  const handleFetch = async () => {
    const r = await fetchWord(form.word);
    if (r) setForm(f => ({...f, word:r.word, phonetic:r.phonetic, meaning:r.meaning, example:r.example}));
  };

  const handleAdd = async () => {
    if (!form.word.trim() || !form.meaning.trim()) return;
    await addCard(form);
    setForm(EMPTY);
  };

  const startEdit = (card) => {
    setEditId(card.id);
    setEditData({ word:card.word, phonetic:card.phonetic||"", meaning:card.meaning, example:card.example||"", category:card.category||"daily", level:card.level||"B1" });
  };

  const saveEdit = async () => { await updateCard(editId, editData); setEditId(null); };

  const filtered = deck.filter(c =>
    c.word?.toLowerCase().includes(search.toLowerCase()) ||
    c.meaning?.toLowerCase().includes(search.toLowerCase())
  );

  const inputCls = "w-full bg-[#0d1117] border border-white/8 rounded-xl px-4 py-2.5 font-mono text-sm text-white placeholder-white/18 focus:outline-none focus:border-blue-400/40 transition-colors";
  const selectCls = "w-full bg-[#0d1117] border border-white/8 rounded-xl px-3 py-2.5 font-mono text-xs text-white/60 focus:outline-none focus:border-blue-400/40 transition-colors";

  return (
    <div className="w-full max-w-2xl">
      <button onClick={() => setOpen(o=>!o)}
        className="w-full py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-white/25
                   border border-white/8 rounded-xl hover:border-white/18 hover:text-white/40
                   transition-all flex items-center justify-center gap-2">
        {open ? "▲" : "▼"} Add / Manage Cards ({deck.length} total)
      </button>

      {open && (
        <div className="mt-4 space-y-4 animate-fadeUp">
          {(error||fetchError) && (
            <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/20 font-mono text-xs text-red-400 flex justify-between">
              <span>{error||fetchError}</span>
              <button onClick={() => { setError?.(null); setFetchError(null); }}>✕</button>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white/4 rounded-xl">
            {[["add","+ Add Card"],["list","📋 All Cards"]].map(([v,l]) => (
              <button key={v} onClick={() => setTab(v)}
                className={`flex-1 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all
                            ${tab===v ? "bg-white/10 text-white" : "text-white/30 hover:text-white/50"}`}>
                {l}
              </button>
            ))}
          </div>

          {tab === "add" && (
            <div className="p-5 rounded-2xl border border-white/8 bg-white/3 space-y-3">
              <div className="flex gap-2">
                <input value={form.word} onChange={e=>set("word",e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleFetch()}
                  placeholder="English word…" className={inputCls} />
                <button onClick={handleFetch} disabled={fetching||!form.word.trim()}
                  className="px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-widest whitespace-nowrap
                             bg-blue-500/15 border border-blue-400/25 text-blue-400
                             hover:bg-blue-500/25 disabled:opacity-30 active:scale-95 transition-all">
                  {fetching ? "…" : "🔍 Auto"}
                </button>
              </div>
              <input value={form.phonetic} onChange={e=>set("phonetic",e.target.value)} placeholder="/fəˈnetɪk/ (optional)" className={inputCls} />
              <input value={form.meaning} onChange={e=>set("meaning",e.target.value)} placeholder="Meaning / คำแปล…" className={inputCls} />
              <textarea value={form.example} onChange={e=>set("example",e.target.value)}
                placeholder="Example sentence… (optional)" rows={2}
                className={`${inputCls} resize-none`} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-1.5">Category</p>
                  <select value={form.category} onChange={e=>set("category",e.target.value)} className={selectCls}>
                    {CATEGORIES.filter(c=>c.value!=="all").map(c=><option key={c.value} value={c.value}>{c.emoji} {c.label}</option>)}
                  </select>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-1.5">Level</p>
                  <select value={form.level} onChange={e=>set("level",e.target.value)} className={selectCls}>
                    {LEVELS.filter(l=>l.value!=="all").map(l=><option key={l.value} value={l.value}>{l.label}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={handleAdd} disabled={!form.word.trim()||!form.meaning.trim()}
                className="w-full py-2.5 rounded-xl font-mono text-xs uppercase tracking-widest
                           bg-white/8 border border-white/15 text-white
                           hover:bg-white/15 disabled:opacity-25 active:scale-[0.98] transition-all">
                + Add Card
              </button>
            </div>
          )}

          {tab === "list" && (
            <div className="space-y-2">
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search cards…" className={inputCls} />
              <div className="max-h-96 overflow-y-auto space-y-1.5 pr-0.5">
                {filtered.length === 0 && (
                  <p className="text-center font-mono text-xs text-white/18 py-8">No cards found.</p>
                )}
                {filtered.map(card => editId===card.id ? (
                  <div key={card.id} className="p-4 rounded-xl border border-blue-400/25 bg-blue-400/4 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input value={editData.word} onChange={e=>setEditData({...editData,word:e.target.value})} placeholder="Word" className="bg-white/5 border border-white/8 rounded-lg px-3 py-2 font-mono text-sm text-white focus:outline-none" />
                      <input value={editData.phonetic} onChange={e=>setEditData({...editData,phonetic:e.target.value})} placeholder="Phonetic" className="bg-white/5 border border-white/8 rounded-lg px-3 py-2 font-mono text-sm text-white/60 focus:outline-none" />
                    </div>
                    <input value={editData.meaning} onChange={e=>setEditData({...editData,meaning:e.target.value})} placeholder="Meaning" className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2 font-mono text-sm text-white focus:outline-none" />
                    <textarea value={editData.example} onChange={e=>setEditData({...editData,example:e.target.value})} placeholder="Example" rows={2} className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2 font-mono text-sm text-white/60 resize-none focus:outline-none" />
                    <div className="flex gap-2">
                      <select value={editData.category} onChange={e=>setEditData({...editData,category:e.target.value})} className="flex-1 bg-[#0d1117] border border-white/8 rounded-lg px-3 py-2 font-mono text-xs text-white/60 focus:outline-none">
                        {CATEGORIES.filter(c=>c.value!=="all").map(c=><option key={c.value} value={c.value}>{c.emoji} {c.label}</option>)}
                      </select>
                      <select value={editData.level} onChange={e=>setEditData({...editData,level:e.target.value})} className="flex-1 bg-[#0d1117] border border-white/8 rounded-lg px-3 py-2 font-mono text-xs text-white/60 focus:outline-none">
                        {LEVELS.filter(l=>l.value!=="all").map(l=><option key={l.value} value={l.value}>{l.label}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="flex-1 py-2 rounded-lg font-mono text-xs uppercase tracking-widest bg-emerald-500/15 border border-emerald-400/25 text-emerald-400 hover:bg-emerald-500/25 active:scale-95 transition-all">Save</button>
                      <button onClick={()=>setEditId(null)} className="flex-1 py-2 rounded-lg font-mono text-xs uppercase tracking-widest border border-white/8 text-white/30 hover:bg-white/5 active:scale-95 transition-all">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div key={card.id} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/4 bg-white/2 hover:bg-white/5 transition-colors group">
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-bold text-white/90 text-sm">{card.word}</span>
                        {card.phonetic && <span className="font-mono text-[10px] text-white/25">{card.phonetic}</span>}
                        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border uppercase tracking-wide ${LEVEL_BADGE[card.level]||"bg-white/5 text-white/25 border-white/10"}`}>{card.level}</span>
                        {card.source==="seed" && <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-purple-400/20 text-purple-400/50">built-in</span>}
                      </div>
                      <p className="font-mono text-xs text-white/40 truncate">{card.meaning}</p>
                      {card.example && <p className="font-mono text-[10px] text-white/20 truncate italic">"{card.example}"</p>}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={()=>startEdit(card)} className="px-2.5 py-1.5 rounded-lg font-mono text-[10px] text-blue-400/60 hover:text-blue-400 hover:bg-blue-400/8 transition-all">edit</button>
                      <button onClick={()=>removeCard(card.id)} className="px-2.5 py-1.5 rounded-lg font-mono text-[10px] text-red-400/60 hover:text-red-400 hover:bg-red-400/8 transition-all">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
