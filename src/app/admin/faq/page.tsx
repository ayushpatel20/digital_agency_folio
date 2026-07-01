"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle, Plus, Trash2, GripVertical } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

const DEFAULT_FAQS: Faq[] = [
  { id: "1", question: "What technologies do you specialize in?", answer: "We specialize in Next.js, React, Node.js, Python, React Native, Flutter, and cutting-edge AI/ML frameworks including TensorFlow and PyTorch.", order: 1, active: true },
  { id: "2", question: "How long does a typical project take?", answer: "Project timelines vary based on scope. A landing page takes 1-2 weeks, a full web application 4-12 weeks, and enterprise solutions 3-6 months.", order: 2, active: true },
  { id: "3", question: "Do you work with startups at pre-seed stage?", answer: "Absolutely! We love working with early-stage startups. We offer flexible payment terms, equity partnerships for exceptional projects, and dedicated support.", order: 3, active: true },
  { id: "4", question: "How do you ensure project quality?", answer: "We maintain quality through rigorous code reviews, automated testing, continuous integration, and dedicated QA processes.", order: 4, active: true },
  { id: "5", question: "Do you provide post-launch support?", answer: "Yes! All our projects include a support period (30-90 days depending on the package). We also offer ongoing maintenance retainers.", order: 5, active: true },
  { id: "6", question: "Can you work with our existing team?", answer: "Absolutely. We're experienced at integrating with existing teams, adopting their processes and tools.", order: 6, active: true },
];

export default function FaqAdminPage() {
  const [faqs, setFaqs] = useState<Faq[]>(DEFAULT_FAQS);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const addFaq = () => {
    const f: Faq = { id: Date.now().toString(), question: "New Question?", answer: "Answer here.", order: faqs.length + 1, active: true };
    setFaqs([...faqs, f]);
    setEditing(f);
  };

  const deleteFaq = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const updateEditing = (field: keyof Faq, value: any) => {
    if (!editing) return;
    const updated = { ...editing, [field]: value };
    setEditing(updated);
    setFaqs(faqs.map((f) => f.id === editing.id ? updated : f));
  };

  return (
    <AdminShell title="FAQ Manager">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/50 text-sm">Manage frequently asked questions shown on the homepage.</p>
        <div className="flex gap-3">
          <button onClick={addFaq} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/70 hover:text-white text-sm">
            <Plus size={14} /> Add FAQ
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div key={faq.id} onClick={() => setEditing(faq)} className={`glass-card p-4 cursor-pointer ${editing?.id === faq.id ? "border-primary/30 bg-primary/5" : ""}`}>
              <div className="flex items-start gap-3">
                <GripVertical size={14} className="text-white/20 mt-0.5 cursor-grab flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-white/80 text-sm font-medium line-clamp-1">{faq.question}</p>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={(e) => { e.stopPropagation(); setFaqs(faqs.map(f => f.id === faq.id ? { ...f, active: !f.active } : f)); }} className={`text-xs px-2 py-0.5 rounded-full border ${faq.active ? "border-emerald-500/30 text-emerald-400" : "border-white/10 text-white/30"}`}>
                        {faq.active ? "Active" : "Off"}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteFaq(faq.id); }} className="text-white/20 hover:text-red-400">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white/30 text-xs mt-1 line-clamp-1">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit */}
        {editing && (
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold">Edit FAQ</h3>
            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Question</label>
              <input value={editing.question} onChange={(e) => updateEditing("question", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>
            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Answer</label>
              <textarea value={editing.answer} onChange={(e) => updateEditing("answer", e.target.value)} rows={6} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.active} onChange={(e) => updateEditing("active", e.target.checked)} className="w-4 h-4 rounded accent-primary" />
              <span className="text-white/60 text-sm">Active</span>
            </label>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
