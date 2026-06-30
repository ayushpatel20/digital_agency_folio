"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Save, RefreshCw, Plus, Trash2, GripVertical, Edit2, CheckCircle, Eye, EyeOff } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  features: string[];
  order: number;
  active: boolean;
}

const ICON_OPTIONS = ["Brain", "Globe", "Smartphone", "Layers", "Cloud", "TrendingUp", "Zap", "Shield", "Code", "BarChart3"];

const DEFAULT_SERVICES: Service[] = [
  { id: "1", title: "AI & Machine Learning", description: "We architect intelligent systems that learn, adapt, and evolve.", icon: "Brain", features: ["Predictive Analytics", "NLP & Chatbots", "Computer Vision"], order: 1, active: true },
  { id: "2", title: "Web Development", description: "We craft high-performance web applications.", icon: "Globe", features: ["Next.js & React", "Node.js APIs", "Database Design"], order: 2, active: true },
  { id: "3", title: "Mobile Applications", description: "We design and build native and cross-platform mobile experiences.", icon: "Smartphone", features: ["iOS & Android", "React Native", "Flutter"], order: 3, active: true },
];

export default function ServicesAdminPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Service description here.",
      icon: "Zap",
      features: ["Feature 1", "Feature 2"],
      order: services.length + 1,
      active: true,
    };
    setServices([...services, newService]);
    setEditing(newService);
  };

  const deleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const toggleActive = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  const updateEditing = (field: keyof Service, value: any) => {
    if (!editing) return;
    const updated = { ...editing, [field]: value };
    setEditing(updated);
    setServices(services.map((s) => (s.id === editing.id ? updated : s)));
  };

  return (
    <AdminShell title="Services Manager">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/50 text-sm">Manage your service offerings displayed on the homepage.</p>
        <div className="flex gap-3">
          <button onClick={addService} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/70 hover:text-white text-sm transition-all">
            <Plus size={14} /> Add Service
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service list */}
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setEditing(service)}
              className={`glass-card p-5 cursor-pointer transition-all ${editing?.id === service.id ? "border-primary/30 bg-primary/5" : ""}`}
            >
              <div className="flex items-center gap-3">
                <GripVertical size={16} className="text-white/20 cursor-grab" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium text-sm">{service.title}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleActive(service.id); }}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${service.active ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" : "border-white/10 text-white/30"}`}
                      >
                        {service.active ? "Active" : "Hidden"}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteService(service.id); }} className="text-white/30 hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs mt-1 line-clamp-1">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit panel */}
        {editing && (
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold mb-4">Edit Service</h3>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Title</label>
              <input
                value={editing.title}
                onChange={(e) => updateEditing("title", e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Description</label>
              <textarea
                value={editing.description}
                onChange={(e) => updateEditing("description", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Icon</label>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => updateEditing("icon", icon)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${editing.icon === icon ? "bg-primary text-white" : "glass border border-white/8 text-white/50 hover:text-white"}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Features (one per line)</label>
              <textarea
                value={editing.features.join("\n")}
                onChange={(e) => updateEditing("features", e.target.value.split("\n").filter(Boolean))}
                rows={4}
                className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
