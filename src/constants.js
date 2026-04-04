// src/constants.js

export const CATEGORIES = [
  { value: "all",         label: "All",          emoji: "📚" },
  { value: "daily",       label: "Daily Life",   emoji: "☀️" },
  { value: "business",    label: "Business",     emoji: "💼" },
  { value: "academic",    label: "Academic",     emoji: "🎓" },
  { value: "travel",      label: "Travel",       emoji: "✈️" },
  { value: "tech",        label: "Technology",   emoji: "💻" },
  { value: "medical",     label: "Medical",      emoji: "🏥" },
  { value: "idiom",       label: "Idioms",       emoji: "💬" },
  { value: "science",     label: "Science",      emoji: "🔬" },
  { value: "environment", label: "Environment",  emoji: "🌿" },
];

export const LEVELS = [
  { value: "all", label: "All Levels",         color: "text-white/50" },
  { value: "A1",  label: "A1 — Beginner",      color: "text-green-400" },
  { value: "A2",  label: "A2 — Elementary",    color: "text-lime-400" },
  { value: "B1",  label: "B1 — Intermediate",  color: "text-yellow-400" },
  { value: "B2",  label: "B2 — Upper-Inter",   color: "text-orange-400" },
  { value: "C1",  label: "C1 — Advanced",      color: "text-red-400" },
  { value: "C2",  label: "C2 — Mastery",       color: "text-purple-400" },
];

export const LEVEL_BADGE = {
  A1: "bg-green-500/20 text-green-400 border-green-500/30",
  A2: "bg-lime-500/20 text-lime-400 border-lime-500/30",
  B1: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  B2: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  C1: "bg-red-500/20 text-red-400 border-red-500/30",
  C2: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};
