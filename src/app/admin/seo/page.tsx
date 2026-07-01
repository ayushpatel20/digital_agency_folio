"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle, Search } from "lucide-react";

export default function SeoAdminPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    metaTitle: "Startup of the Future | Innovation Redefined",
    metaDesc: "We are a next-generation digital startup delivering cutting-edge AI, Web, and Mobile solutions that transform businesses worldwide.",
    keywords: "startup, digital agency, AI, web development, mobile apps, innovation",
    ogImage: "",
    canonical: "",
    robots: "index, follow",
    googleAnalytics: "",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const charCount = form.metaDesc.length;
  const titleCount = form.metaTitle.length;

  return (
    <AdminShell title="SEO Settings">
      <div className="max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/50 text-sm">Configure SEO metadata for search engine optimization.</p>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>

        <div className="space-y-6">
          {/* Preview */}
          <div className="glass-card p-6">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Search size={12} /> Google Search Preview
            </h3>
            <div className="bg-white/3 rounded-2xl p-5 border border-white/5">
              <p className="text-blue-400 text-base font-medium truncate">{form.metaTitle || "Page Title"}</p>
              <p className="text-emerald-600 text-xs mt-0.5 truncate">https://startupofthefuture.com</p>
              <p className="text-white/50 text-sm mt-1 leading-relaxed line-clamp-2">{form.metaDesc}</p>
            </div>
          </div>

          {/* Meta Tags */}
          <div className="glass-card p-6 space-y-5">
            <h3 className="text-white font-semibold">Meta Tags</h3>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-white/50 text-xs font-medium">Meta Title</label>
                <span className={`text-xs ${titleCount > 60 ? "text-red-400" : "text-white/30"}`}>{titleCount}/60</span>
              </div>
              <input value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-white/50 text-xs font-medium">Meta Description</label>
                <span className={`text-xs ${charCount > 160 ? "text-red-400" : charCount > 140 ? "text-yellow-400" : "text-white/30"}`}>{charCount}/160</span>
              </div>
              <textarea value={form.metaDesc} onChange={(e) => update("metaDesc", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none" />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Keywords (comma separated)</label>
              <input value={form.keywords} onChange={(e) => update("keywords", e.target.value)} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">OG Image URL</label>
              <input value={form.ogImage} onChange={(e) => update("ogImage", e.target.value)} placeholder="https://..." className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent placeholder:text-white/20" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Canonical URL</label>
                <input value={form.canonical} onChange={(e) => update("canonical", e.target.value)} placeholder="https://..." className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent placeholder:text-white/20" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Robots</label>
                <select value={form.robots} onChange={(e) => update("robots", e.target.value)} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none bg-[#020408]">
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                  <option value="index, nofollow">index, nofollow</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Google Analytics ID</label>
              <input value={form.googleAnalytics} onChange={(e) => update("googleAnalytics", e.target.value)} placeholder="G-XXXXXXXXXX" className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent placeholder:text-white/20" />
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
