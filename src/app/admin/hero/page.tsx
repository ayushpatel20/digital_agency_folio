"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle } from "lucide-react";

export default function HeroAdminPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    heading: "We Build the\nFuture of Digital",
    subHeading: "A next-generation startup delivering AI-powered products, stunning web experiences, and scalable mobile solutions.",
    ctaPrimaryText: "Explore Our Work",
    ctaPrimaryLink: "#portfolio",
    ctaSecondaryText: "Let's Talk",
    ctaSecondaryLink: "#contact",
    stat1Value: "150+",
    stat1Label: "Projects Delivered",
    stat2Value: "98%",
    stat2Label: "Client Satisfaction",
    stat3Value: "$50M+",
    stat3Label: "Revenue Generated",
    badge1Text: "🤖 AI-Powered",
    badge2Text: "🏆 Award Winning",
    badge3Text: "⭐ Top Rated",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminShell title="Hero Section Editor">
      <div className="max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/50 text-sm">Edit the hero section displayed at the top of the homepage.</p>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>

        <div className="space-y-6">
          {/* Heading */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">Heading & Copy</h3>
            <div className="space-y-4">
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Main Heading (use \n for line breaks)</label>
                <textarea value={form.heading} onChange={(e) => update("heading", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Sub Heading</label>
                <textarea value={form.subHeading} onChange={(e) => update("subHeading", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none" />
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">Call-to-Action Buttons</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { field: "ctaPrimaryText", label: "Primary Button Text" },
                { field: "ctaPrimaryLink", label: "Primary Button Link" },
                { field: "ctaSecondaryText", label: "Secondary Button Text" },
                { field: "ctaSecondaryLink", label: "Secondary Button Link" },
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="text-white/50 text-xs font-medium block mb-1.5">{label}</label>
                  <input value={(form as any)[field]} onChange={(e) => update(field, e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="space-y-3">
                  <div>
                    <label className="text-white/50 text-xs font-medium block mb-1.5">Stat {n} Value</label>
                    <input value={(form as any)[`stat${n}Value`]} onChange={(e) => update(`stat${n}Value`, e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-medium block mb-1.5">Stat {n} Label</label>
                    <input value={(form as any)[`stat${n}Label`]} onChange={(e) => update(`stat${n}Label`, e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">Floating Badges</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n}>
                  <label className="text-white/50 text-xs font-medium block mb-1.5">Badge {n}</label>
                  <input value={(form as any)[`badge${n}Text`]} onChange={(e) => update(`badge${n}Text`, e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
