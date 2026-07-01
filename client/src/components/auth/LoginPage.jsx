import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm">
          <img
            src="/brandax-banner.png"
            alt="Brandax branding"
            className="w-full h-auto rounded-2xl"
          />
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-zinc-700 bg-zinc-950 flex items-center justify-center overflow-hidden">
              <img
                src="/brandax-mark.png"
                alt="Brandax mark"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Private workspace</p>
              <span className="text-lg font-medium text-zinc-100 tracking-tight">backfolder</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-medium text-zinc-100 mb-1">Welcome back</h1>
        <p className="text-sm text-zinc-500 mb-8">Sign in to your workspace</p>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm mb-4 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2.5">
            <FiAlertCircle size={14} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <FiMail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors"
            />
          </div>

          <div className="relative">
            <FiLock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-dark text-white font-medium rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-zinc-600 text-center mt-8">
          backfolder — private workspace for the team
        </p>
      </div>
    </div>
  );
}
