"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle, Plus, Trash2, GripVertical } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  active: boolean;
}

const DEFAULT_TEAM: TeamMember[] = [
  { id: "1", name: "Alex Rivera", role: "CEO & Co-Founder", bio: "15+ years building transformative digital products across 3 continents.", twitterUrl: "", linkedinUrl: "", githubUrl: "", active: true },
  { id: "2", name: "Zara Kim", role: "CTO & Lead Engineer", bio: "MIT graduate. Former Google engineer. Building the future one commit at a time.", twitterUrl: "", linkedinUrl: "", githubUrl: "", active: true },
  { id: "3", name: "Devon Hart", role: "Creative Director", bio: "Award-winning designer with 200+ projects shaping digital brand identities.", twitterUrl: "", linkedinUrl: "", githubUrl: "", active: true },
  { id: "4", name: "Mia Thompson", role: "Head of Growth", bio: "Growth hacker turned strategist. Helped 50+ startups achieve product-market fit.", twitterUrl: "", linkedinUrl: "", githubUrl: "", active: true },
];

export default function TeamAdminPage() {
  const router = useRouter();
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const addMember = () => {
    const m: TeamMember = { id: Date.now().toString(), name: "New Member", role: "Role", bio: "Bio here.", active: true };
    setTeam([...team, m]);
    setEditing(m);
  };

  const deleteMember = (id: string) => {
    setTeam(team.filter((m) => m.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const updateEditing = (field: keyof TeamMember, value: any) => {
    if (!editing) return;
    const updated = { ...editing, [field]: value };
    setEditing(updated);
    setTeam(team.map((m) => m.id === editing.id ? updated : m));
  };

  return (
    <AdminShell title="Team Manager">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/50 text-sm">Manage team members displayed on the website.</p>
        <div className="flex gap-3">
          <button onClick={addMember} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/70 hover:text-white text-sm">
            <Plus size={14} /> Add Member
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member list */}
        <div className="space-y-3">
          {team.map((member) => (
            <div key={member.id} onClick={() => setEditing(member)} className={`glass-card p-5 cursor-pointer ${editing?.id === member.id ? "border-primary/30 bg-primary/5" : ""}`}>
              <div className="flex items-center gap-3">
                <GripVertical size={15} className="text-white/20 cursor-grab" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium text-sm">{member.name}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); setTeam(team.map(m => m.id === member.id ? { ...m, active: !m.active } : m)); }} className={`text-xs px-2 py-0.5 rounded-full border ${member.active ? "border-emerald-500/30 text-emerald-400" : "border-white/10 text-white/30"}`}>
                        {member.active ? "Active" : "Hidden"}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteMember(member.id); }} className="text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit */}
        {editing && (
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold">Edit Member</h3>
            {[
              { field: "name" as const, label: "Full Name" },
              { field: "role" as const, label: "Role / Title" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="text-white/50 text-xs font-medium block mb-1.5">{label}</label>
                <input value={editing[field] as string} onChange={(e) => updateEditing(field, e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
              </div>
            ))}
            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Bio</label>
              <textarea value={editing.bio} onChange={(e) => updateEditing("bio", e.target.value)} rows={3} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none" />
            </div>
            <div className="space-y-3">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Social Links</p>
              {[
                { field: "twitterUrl" as const, label: "Twitter URL" },
                { field: "linkedinUrl" as const, label: "LinkedIn URL" },
                { field: "githubUrl" as const, label: "GitHub URL" },
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="text-white/40 text-xs block mb-1">{label}</label>
                  <input value={(editing[field] as string) || ""} onChange={(e) => updateEditing(field, e.target.value)} placeholder="https://..." className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent placeholder:text-white/20" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
