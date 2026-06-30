"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle, Plus, Trash2, GripVertical } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  ctaText: string;
  active: boolean;
}

const DEFAULT_PLANS: Plan[] = [
  { id: "1", name: "Starter", price: "$2,999", period: "project", features: ["Up to 5 pages", "Responsive Design", "Basic SEO Setup", "Contact Form", "3 Revisions", "30-day Support"], popular: false, ctaText: "Get Started", active: true },
  { id: "2", name: "Growth", price: "$7,999", period: "project", features: ["Up to 15 pages", "Custom Animations", "Full SEO Optimization", "CMS Integration", "E-Commerce Ready", "Unlimited Revisions", "90-day Support", "Performance Analytics"], popular: true, ctaText: "Most Popular", active: true },
  { id: "3", name: "Enterprise", price: "Custom", period: "project", features: ["Unlimited Pages", "AI Integration", "Custom Backend", "Mobile App Included", "24/7 Priority Support", "Dedicated Team", "SLA Guarantee", "White-label Option"], popular: false, ctaText: "Contact Us", active: true },
];

export default function PricingAdminPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const addPlan = () => {
    const p: Plan = { id: Date.now().toString(), name: "New Plan", price: "$999", period: "project", features: ["Feature 1"], popular: false, ctaText: "Get Started", active: true };
    setPlans([...plans, p]);
    setEditing(p);
  };

  const deletePlan = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const updateEditing = (field: keyof Plan, value: any) => {
    if (!editing) return;
    const updated = { ...editing, [field]: value };
    setEditing(updated);
    setPlans(plans.map((p) => p.id === editing.id ? updated : p));
  };

  return (
    <AdminShell title="Pricing Plans">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/50 text-sm">Manage pricing plans displayed on the homepage.</p>
        <div className="flex gap-3">
          <button onClick={addPlan} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/70 hover:text-white text-sm">
            <Plus size={14} /> Add Plan
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan list */}
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setEditing(plan)}
              className={`glass-card p-5 cursor-pointer ${editing?.id === plan.id ? "border-primary/30 bg-primary/5" : ""}`}
            >
              <div className="flex items-center gap-3">
                <GripVertical size={15} className="text-white/20 cursor-grab" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium text-sm">{plan.name}</h3>
                      {plan.popular && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">Popular</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/50 text-sm font-semibold">{plan.price}</span>
                      <button onClick={(e) => { e.stopPropagation(); deletePlan(plan.id); }} className="text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white/30 text-xs mt-1">{plan.features.length} features · per {plan.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit panel */}
        {editing && (
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold">Edit Plan</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Plan Name</label>
                <input value={editing.name} onChange={(e) => updateEditing("name", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Price</label>
                <input value={editing.price} onChange={(e) => updateEditing("price", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" placeholder="$999 or Custom" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Period</label>
                <input value={editing.period} onChange={(e) => updateEditing("period", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" placeholder="month / project" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">CTA Button Text</label>
                <input value={editing.ctaText} onChange={(e) => updateEditing("ctaText", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
              </div>
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Features (one per line)</label>
              <textarea
                value={editing.features.join("\n")}
                onChange={(e) => updateEditing("features", e.target.value.split("\n").filter(Boolean))}
                rows={6}
                className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.popular} onChange={(e) => updateEditing("popular", e.target.checked)} className="w-4 h-4 rounded accent-primary" />
                <span className="text-white/60 text-sm">Mark as Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.active} onChange={(e) => updateEditing("active", e.target.checked)} className="w-4 h-4 rounded accent-primary" />
                <span className="text-white/60 text-sm">Active</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
