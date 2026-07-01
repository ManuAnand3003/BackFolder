import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";
import AppShell from "./components/layout/AppShell";
import LoginPage from "./components/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected — all logged-in users */}
        <Route
          element={
            <RequireAuth>
              <AppShell />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="mine"    element={<PlaceholderPage title="My projects" />} />
          <Route path="explore" element={<PlaceholderPage title="Explore" />} />
          <Route path="pinned"  element={<PlaceholderPage title="Pinned" />} />
          <Route path="tags"    element={<PlaceholderPage title="Tags" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />

          {/* Admin only */}
          <Route
            path="admin"
            element={
              <RequireAuth adminOnly>
                <PlaceholderPage title="Admin panel" />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
