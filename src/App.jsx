// src/App.jsx
// เชื่อม Router + AuthProvider + DeckProvider + Pages
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DeckProvider } from "./context/DeckContext";
import StudyPage from "./views/pages/StudyPage";
import LoginPage from "./views/pages/LoginPage";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:"#07090f" }}>
      <div className="flex flex-col items-center gap-3">
        <p className="text-3xl">📚</p>
        <p className="font-mono text-xs text-white/20 tracking-widest uppercase animate-pulse">Loading…</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/"
        element={
          <DeckProvider>
            <StudyPage />
          </DeckProvider>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
