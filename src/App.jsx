// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DeckProvider } from "./context/DeckContext";
import StudyPage from "./pages/StudyPage";
import LoginPage from "./pages/LoginPage";

// Splash screen while Firebase restores auth session
function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#07090f" }}
    >
      <div className="flex flex-col items-center gap-3">
        <p className="text-3xl">📚</p>
        <p className="font-mono text-xs text-white/20 tracking-widest uppercase animate-pulse">
          Loading…
        </p>
      </div>
    </div>
  );
}

// Decides what to show based on auth state
function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      {/* Login page — only if not logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      {/* Main app — accessible with OR without login */}
      <Route
        path="/"
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
