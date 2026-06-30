"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, LogIn, Shield, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@startup.com");
  const [password, setPassword] = useState("Admin@123456");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Direct credential check for simplicity (NextAuth will handle in production)
      if (email === "admin@startup.com" && password === "Admin@123456") {
        // Store in sessionStorage as a simple auth token
        sessionStorage.setItem("admin_authenticated", "true");
        sessionStorage.setItem("admin_email", email);
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Use admin@startup.com / Admin@123456");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020408]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md mx-4">
        <div className="glass-strong rounded-3xl p-10 border border-white/8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative w-14 h-14 mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <h1 className="text-white font-bold text-2xl font-space-grotesk text-center">
              Admin Panel
            </h1>
            <p className="text-white/40 text-sm mt-1">Startup of the Future</p>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-2 justify-center mb-8">
            <Shield size={12} className="text-primary" />
            <span className="text-white/30 text-xs">Secured & Encrypted Access</span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="admin-email"
                placeholder="admin@startup.com"
                required
                className="w-full px-4 py-3.5 rounded-xl glass border border-white/8 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors bg-transparent"
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="admin-password"
                  placeholder="••••••••••"
                  required
                  className="w-full px-4 py-3.5 pr-12 rounded-xl glass border border-white/8 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="admin-login-btn"
              className="btn-primary w-full justify-center py-4 text-base mt-2"
            >
              <span>{loading ? "Signing in..." : "Sign In"}</span>
              <LogIn size={16} />
            </button>
          </form>

          {/* Credentials hint */}
          <div className="mt-6 p-4 rounded-xl bg-white/2 border border-white/5">
            <p className="text-white/30 text-xs text-center">
              Default: <span className="text-white/50">admin@startup.com</span> /{" "}
              <span className="text-white/50">Admin@123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
