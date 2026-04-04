// src/pages/LoginPage.jsx
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at 20% 40%, rgba(59,130,246,0.1) 0%, transparent 60%)," +
          "radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 60%)," +
          "#07090f",
      }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm p-8 rounded-3xl flex flex-col items-center gap-6 animate-fadeUp"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl">📚</div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            WordCards
          </h1>
          <p className="font-mono text-xs text-white/30 tracking-[0.2em] uppercase">
            English Vocabulary
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/6" />

        {/* Features list */}
        <ul className="w-full space-y-2.5">
          {[
            ["📖", "คำศัพท์สำเร็จรูป 290+ คำ"],
            ["🗂️", "9 หมวดหมู่ · 6 ระดับ A1–C2"],
            ["✏️", "เพิ่มการ์ดส่วนตัวได้ไม่จำกัด"],
            ["📊", "บันทึกความคืบหน้าของคุณ"],
          ].map(([icon, text]) => (
            <li key={text} className="flex items-center gap-3">
              <span className="text-base">{icon}</span>
              <span className="font-mono text-xs text-white/40">{text}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="w-full h-px bg-white/6" />

        {/* Google login button */}
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-2xl
                     font-mono text-sm text-white uppercase tracking-widest
                     border border-white/12 bg-white/5
                     hover:bg-white/10 hover:border-white/20
                     active:scale-[0.98] transition-all duration-200"
        >
          {/* Google icon SVG */}
          <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.2 30.2 0 24 0 14.6 0 6.5 5.5 2.6 13.5l7.9 6.1C12.4 13.2 17.7 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.2-10.1 7.2-17z"/>
            <path fill="#FBBC05" d="M10.5 28.4c-.6-1.8-1-3.8-1-5.9s.4-4.1 1-5.9l-7.9-6.1C.9 13.8 0 18.8 0 24s.9 10.2 2.6 14.5l7.9-6.1z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.7 2.3-6.3 0-11.6-3.7-13.5-9.1l-7.9 6.1C6.5 42.5 14.6 48 24 48z"/>
          </svg>
          Sign in with Google
        </button>

        <p className="font-mono text-[10px] text-white/15 text-center leading-relaxed">
          ข้อมูลของคุณจะถูกบันทึกในบัญชี Google ของคุณ
        </p>
      </div>
    </div>
  );
}
