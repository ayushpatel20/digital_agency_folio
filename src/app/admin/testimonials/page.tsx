"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Trash2, Save, CheckCircle, GripVertical, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  designation: string;
  rating: number;
  text: string;
  visible: boolean;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "Sarah Chen", company: "TechVenture Capital", designation: "CEO & Founder", rating: 5, text: "Startup of the Future transformed our entire product vision into a stunning reality.", visible: true },
  { id: "2", name: "Marcus Rodriguez", company: "Apex Digital", designation: "CTO", rating: 5, text: "The team's ability to create high-quality, scalable products is extraordinary.", visible: true },
  { id: "3", name: "Priya Sharma", company: "HealthBridge", designation: "Product Director", rating: 5, text: "Our mobile app went from concept to 100k users in 6 months thanks to Startup of the Future.", visible: true },
  { id: "4", name: "James Wilson", company: "CloudMatrix Inc", designation: "VP Engineering", rating: 5, text: "Best technical team I've worked with in 15 years.", visible: true },
];

export default function TestimonialsAdminPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addTestimonial = () => {
    const t: Testimonial = {
      id: Date.now().toString(),
      name: "New Client",
      company: "Company Name",
      designation: "CEO",
      rating: 5,
      text: "Add testimonial text here...",
      visible: true,
    };
    setTestimonials([...testimonials, t]);
    setEditing(t);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const updateEditing = (field: keyof Testimonial, value: any) => {
    if (!editing) return;
    const updated = { ...editing, [field]: value };
    setEditing(updated);
    setTestimonials(testimonials.map((t) => t.id === editing.id ? updated : t));
  };

  return (
    <AdminShell title="Testimonials Manager">
      <div className="flex justify-between mb-6">
        <p className="text-white/50 text-sm">Manage client testimonials shown on the homepage.</p>
        <div className="flex gap-3">
          <button onClick={addTestimonial} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/70 hover:text-white text-sm transition-all">
            <Plus size={14} /> Add Testimonial
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              onClick={() => setEditing(t)}
              className={`glass-card p-5 cursor-pointer ${editing?.id === t.id ? "border-primary/30 bg-primary/5" : ""}`}
            >
              <div className="flex items-start gap-3">
                <GripVertical size={15} className="text-white/20 mt-0.5 cursor-grab flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); setTestimonials(testimonials.map(x => x.id === t.id ? { ...x, visible: !x.visible } : x)); }}
                        className={`text-xs px-2 py-0.5 rounded-full border ${t.visible ? "border-emerald-500/30 text-emerald-400" : "border-white/10 text-white/30"}`}
                      >
                        {t.visible ? "Visible" : "Hidden"}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteTestimonial(t.id); }} className="text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs">{t.designation}, {t.company}</p>
                  <div className="flex gap-0.5 mt-2">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={10} className="text-accent fill-accent" />)}
                  </div>
                  <p className="text-white/30 text-xs mt-2 line-clamp-2">{t.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit */}
        {editing && (
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold">Edit Testimonial</h3>

            {[
              { field: "name" as const, label: "Name" },
              { field: "company" as const, label: "Company" },
              { field: "designation" as const, label: "Designation" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="text-white/50 text-xs font-medium block mb-1.5">{label}</label>
                <input value={editing[field] as string} onChange={(e) => updateEditing(field, e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
              </div>
            ))}

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Rating (1-5)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => updateEditing("rating", r)} className={`w-9 h-9 rounded-xl transition-all ${editing.rating >= r ? "bg-accent/20 text-accent" : "glass border border-white/8 text-white/30"}`}>
                    <Star size={14} className="mx-auto" fill={editing.rating >= r ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Testimonial Text</label>
              <textarea value={editing.text} onChange={(e) => updateEditing("text", e.target.value)} rows={5} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none" />
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
