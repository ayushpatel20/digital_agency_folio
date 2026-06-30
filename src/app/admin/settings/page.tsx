"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle, Palette, Type, Globe, ToggleLeft, ToggleRight } from "lucide-react";

export default function SiteSettingsAdminPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Startup of the Future",
    logoUrl: "/images/logo.png",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#06b6d4",
    fontHeading: "Space Grotesk",
    fontBody: "Inter",
    cursorEffect: true,
    scrollIndicator: true,
    loaderEnabled: true,
    copyright: "© 2025 Startup of the Future. All Rights Reserved.",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const update = (field: string, value: any) => setSettings((s) => ({ ...s, [field]: value }));

  const FONT_OPTIONS = ["Inter", "Space Grotesk", "Poppins", "Outfit", "DM Sans", "Sora"];

  return (
    <AdminShell title="Site Settings">
      <div className="max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/50 text-sm">Configure global site settings and design tokens.</p>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>

        <div className="space-y-6">
          {/* Branding */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2"><Globe size={16} className="text-primary" /> Branding</h3>
            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Site Name</label>
              <input value={settings.siteName} onChange={(e) => update("siteName", e.target.value)} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>
            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Logo Path / URL</label>
              <input value={settings.logoUrl} onChange={(e) => update("logoUrl", e.target.value)} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>
            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Copyright Text</label>
              <input value={settings.copyright} onChange={(e) => update("copyright", e.target.value)} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>
          </div>

          {/* Colors */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><Palette size={16} className="text-primary" /> Color Palette</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { field: "primaryColor", label: "Primary" },
                { field: "secondaryColor", label: "Secondary" },
                { field: "accentColor", label: "Accent" },
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="text-white/50 text-xs font-medium block mb-2">{label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={(settings as any)[field]}
                      onChange={(e) => update(field, e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      value={(settings as any)[field]}
                      onChange={(e) => update(field, e.target.value)}
                      className="flex-1 px-3 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold flex items-center gap-2 mb-4"><Type size={16} className="text-primary" /> Typography</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { field: "fontHeading", label: "Heading Font" },
                { field: "fontBody", label: "Body Font" },
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="text-white/50 text-xs font-medium block mb-1.5">{label}</label>
                  <select value={(settings as any)[field]} onChange={(e) => update(field, e.target.value)} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none bg-[#020408]">
                    {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">UI Features</h3>
            <div className="space-y-3">
              {[
                { field: "cursorEffect", label: "Custom Cursor Effect", desc: "Animated cursor dot and ring on desktop" },
                { field: "scrollIndicator", label: "Scroll Progress Bar", desc: "Colored progress bar at top of page" },
                { field: "loaderEnabled", label: "Page Loader Animation", desc: "Animated loader screen on first visit" },
              ].map(({ field, label, desc }) => (
                <div key={field} className="flex items-center justify-between p-4 rounded-2xl glass border border-white/5">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{label}</p>
                    <p className="text-white/30 text-xs mt-0.5">{desc}</p>
                  </div>
                  <button onClick={() => update(field, !(settings as any)[field])} className="flex-shrink-0">
                    {(settings as any)[field] ? (
                      <ToggleRight size={28} className="text-primary" />
                    ) : (
                      <ToggleLeft size={28} className="text-white/20" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
