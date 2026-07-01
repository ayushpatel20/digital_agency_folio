"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Trash2, Edit2, Eye, EyeOff, CheckCircle, Save, Star } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  featured: boolean;
  status: "DRAFT" | "PUBLISHED";
}

const DEFAULT_PROJECTS: Project[] = [
  { id: "1", title: "NexaAI Platform", slug: "nexa-ai-platform", description: "AI-powered SaaS platform for enterprise analytics.", category: "AI/ML", technologies: ["Python", "TensorFlow", "React", "AWS"], featured: true, status: "PUBLISHED" },
  { id: "2", title: "FluxCommerce", slug: "flux-commerce", description: "Premium e-commerce platform with AI recommendations.", category: "E-Commerce", technologies: ["Next.js", "Shopify", "Stripe"], featured: true, status: "PUBLISHED" },
  { id: "3", title: "HealthSync App", slug: "health-sync-app", description: "Health app connecting patients with doctors.", category: "Mobile App", technologies: ["React Native", "Node.js", "WebRTC"], featured: true, status: "PUBLISHED" },
  { id: "4", title: "FinanceFlow Dashboard", slug: "finance-flow-dashboard", description: "Enterprise financial analytics dashboard.", category: "FinTech", technologies: ["Vue.js", "Python", "D3.js"], featured: false, status: "PUBLISHED" },
];

const CATEGORIES = ["AI/ML", "E-Commerce", "Mobile App", "FinTech", "Web Dev", "SaaS"];

export default function PortfolioAdminPage() {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addProject = () => {
    const p: Project = {
      id: Date.now().toString(),
      title: "New Project",
      slug: "new-project-" + Date.now(),
      description: "Project description.",
      category: "Web Dev",
      technologies: [],
      featured: false,
      status: "DRAFT",
    };
    setProjects([...projects, p]);
    setEditing(p);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const toggleStatus = (id: string) => {
    setProjects(projects.map((p) => p.id === id ? { ...p, status: p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" } : p));
  };

  const toggleFeatured = (id: string) => {
    setProjects(projects.map((p) => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const updateEditing = (field: keyof Project, value: any) => {
    if (!editing) return;
    const updated = { ...editing, [field]: value };
    setEditing(updated);
    setProjects(projects.map((p) => p.id === editing.id ? updated : p));
  };

  const filtered = filter === "ALL" ? projects : projects.filter((p) => p.status === filter);

  return (
    <AdminShell title="Portfolio Manager">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {(["ALL", "PUBLISHED", "DRAFT"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? "bg-primary text-white" : "glass border border-white/8 text-white/50 hover:text-white"}`}>
              {f === "ALL" ? `All (${projects.length})` : `${f} (${projects.filter(p => p.status === f).length})`}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={addProject} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/70 hover:text-white text-sm transition-all">
            <Plus size={14} /> Add Project
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Projects Table */}
        <div className="lg:col-span-3">
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-medium uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-medium uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="text-right px-5 py-3.5 text-white/40 text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => setEditing(project)}
                    className={`border-b border-white/3 cursor-pointer transition-colors hover:bg-white/2 ${editing?.id === project.id ? "bg-primary/5" : ""}`}
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-white text-sm font-medium">{project.title}</p>
                        <p className="text-white/30 text-xs">{project.slug}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="badge text-xs">{project.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleStatus(project.id); }}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${project.status === "PUBLISHED" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" : "border-white/10 text-white/30"}`}
                      >
                        {project.status}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFeatured(project.id); }}
                          className={`${project.featured ? "text-accent" : "text-white/20 hover:text-accent"} transition-colors`}
                          title="Toggle featured"
                        >
                          <Star size={14} fill={project.featured ? "currentColor" : "none"} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="text-white/20 hover:text-red-400 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Panel */}
        {editing && (
          <div className="lg:col-span-2 glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold">Edit Project</h3>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Title</label>
              <input value={editing.title} onChange={(e) => updateEditing("title", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Slug</label>
              <input value={editing.slug} onChange={(e) => updateEditing("slug", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Description</label>
              <textarea value={editing.description} onChange={(e) => updateEditing("description", e.target.value)} rows={3} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none" />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Category</label>
              <select value={editing.category} onChange={(e) => updateEditing("category", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-[#020408]">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Technologies (comma separated)</label>
              <input value={editing.technologies.join(", ")} onChange={(e) => updateEditing("technologies", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" placeholder="React, Node.js, AWS" />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.featured} onChange={(e) => updateEditing("featured", e.target.checked)} className="w-4 h-4 rounded accent-primary" />
                <span className="text-white/60 text-sm">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.status === "PUBLISHED"} onChange={(e) => updateEditing("status", e.target.checked ? "PUBLISHED" : "DRAFT")} className="w-4 h-4 rounded accent-primary" />
                <span className="text-white/60 text-sm">Published</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
