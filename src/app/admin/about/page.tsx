"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle } from "lucide-react";

export default function AboutAdminPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    heading: "We Provide Brilliant Ideas to Grow Your Startup",
    subHeading: "Who We Are",
    description: "We are a team of passionate innovators, designers, and engineers dedicated to building products that make a difference. With a proven track record across 150+ projects, we transform ideas into impactful digital realities.\n\nOur approach combines cutting-edge technology with deep industry expertise, ensuring every solution we deliver is not just functional, but truly transformative.",
    stat1Value: "150+", stat1Label: "Projects Done",
    stat2Value: "98%", stat2Label: "Success Rate",
    stat3Value: "$50M+", stat3Label: "Revenue Generated",
    stat4Value: "10+", stat4Label: "Years Experience",
    fundingAmount: "$15M+",
    fundingDesc: "We helped clients secure over $15M in funding through our growth strategies and product development.",
    skills: "React & Next.js, Node.js & Python, AI/ML & LLMs, Mobile (RN & Flutter), Cloud & DevOps, UI/UX Design",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <AdminShell title="About Section Editor">
      <div className="max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/50 text-sm">Edit the About section content.</p>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold">Heading & Copy</h3>
            {[
              { field: "subHeading", label: "Sub Label", rows: 1 },
              { field: "heading", label: "Main Heading", rows: 2 },
              { field: "description", label: "Description", rows: 5 },
            ].map(({ field, label, rows }) => (
              <div key={field}>
                <label className="text-white/50 text-xs font-medium block mb-1.5">{label}</label>
                <textarea
                  value={(form as any)[field]}
                  onChange={(e) => update(field, e.target.value)}
                  rows={rows}
                  className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none"
                />
              </div>
            ))}
          </div>

          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-4">Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="space-y-2">
                  <div>
                    <label className="text-white/50 text-xs font-medium block mb-1">Stat {n} Value</label>
                    <input value={(form as any)[`stat${n}Value`]} onChange={(e) => update(`stat${n}Value`, e.target.value)} className="w-full px-3 py-2.5 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-medium block mb-1">Label</label>
                    <input value={(form as any)[`stat${n}Label`]} onChange={(e) => update(`stat${n}Label`, e.target.value)} className="w-full px-3 py-2.5 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold">Funding Highlight</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Amount</label>
                <input value={form.fundingAmount} onChange={(e) => update("fundingAmount", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
              </div>
              <div className="col-span-2">
                <label className="text-white/50 text-xs font-medium block mb-1.5">Description</label>
                <input value={form.fundingDesc} onChange={(e) => update("fundingDesc", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-white font-semibold mb-3">Skills / Tech Stack (comma separated)</h3>
            <textarea
              value={form.skills}
              onChange={(e) => update("skills", e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none"
            />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
