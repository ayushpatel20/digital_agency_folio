"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Trash2, Save, CheckCircle } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  status: "DRAFT" | "PUBLISHED";
}

const DEFAULT_POSTS: BlogPost[] = [
  { id: "1", title: "The Future of AI in Product Development", slug: "future-of-ai", excerpt: "How AI is revolutionizing software products in 2025.", category: "AI/ML", author: "Alex Rivera", status: "PUBLISHED" },
  { id: "2", title: "Building Scalable Startups: A Technical Blueprint", slug: "scalable-startups", excerpt: "Architectural decisions for scaling startups.", category: "Engineering", author: "Zara Kim", status: "PUBLISHED" },
  { id: "3", title: "Dark Mode Design Systems: A Complete Guide", slug: "dark-mode-guide", excerpt: "Creating beautiful dark mode design systems.", category: "Design", author: "Devon Hart", status: "PUBLISHED" },
  { id: "4", title: "Growth Hacking in 2025", slug: "growth-hacking-2025", excerpt: "Data-driven growth strategies that work.", category: "Growth", author: "Mia Thompson", status: "DRAFT" },
];

const CATEGORIES = ["AI/ML", "Engineering", "Design", "Growth", "Business", "Technology"];

export default function BlogAdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_POSTS);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addPost = () => {
    const p: BlogPost = {
      id: Date.now().toString(),
      title: "New Blog Post",
      slug: "new-blog-post-" + Date.now(),
      excerpt: "Post excerpt here.",
      category: "Technology",
      author: "Admin",
      status: "DRAFT",
    };
    setPosts([...posts, p]);
    setEditing(p);
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const updateEditing = (field: keyof BlogPost, value: any) => {
    if (!editing) return;
    const updated = { ...editing, [field]: value };
    setEditing(updated);
    setPosts(posts.map((p) => p.id === editing.id ? updated : p));
  };

  const filtered = filter === "ALL" ? posts : posts.filter((p) => p.status === filter);

  return (
    <AdminShell title="Blog Manager">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {(["ALL", "PUBLISHED", "DRAFT"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? "bg-primary text-white" : "glass border border-white/8 text-white/50 hover:text-white"}`}>
              {f === "ALL" ? `All (${posts.length})` : `${f} (${posts.filter(p => p.status === f).length})`}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={addPost} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/70 hover:text-white text-sm transition-all">
            <Plus size={14} /> New Post
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Posts Table */}
        <div className="lg:col-span-3 glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3.5 text-white/40 text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3.5 text-white/40 text-xs font-medium uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 text-white/40 text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 text-white/40 text-xs font-medium uppercase tracking-wider">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} onClick={() => setEditing(post)} className={`border-b border-white/3 cursor-pointer hover:bg-white/2 transition-colors ${editing?.id === post.id ? "bg-primary/5" : ""}`}>
                  <td className="px-5 py-4">
                    <p className="text-white text-sm font-medium">{post.title}</p>
                    <p className="text-white/30 text-xs">By {post.author}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="badge text-xs">{post.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={(e) => { e.stopPropagation(); updateEditing("status", post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"); }} className={`text-xs px-2.5 py-1 rounded-full border transition-all ${post.status === "PUBLISHED" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" : "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"}`}>
                      {post.status}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={(e) => { e.stopPropagation(); deletePost(post.id); }} className="text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit */}
        {editing && (
          <div className="lg:col-span-2 glass-card p-6 space-y-4">
            <h3 className="text-white font-semibold">Edit Post</h3>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Title</label>
              <input value={editing.title} onChange={(e) => updateEditing("title", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Slug</label>
              <input value={editing.slug} onChange={(e) => updateEditing("slug", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
            </div>

            <div>
              <label className="text-white/50 text-xs font-medium block mb-1.5">Excerpt</label>
              <textarea value={editing.excerpt} onChange={(e) => updateEditing("excerpt", e.target.value)} rows={3} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Category</label>
                <select value={editing.category} onChange={(e) => updateEditing("category", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none bg-[#020408]">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5">Author</label>
                <input value={editing.author} onChange={(e) => updateEditing("author", e.target.value)} className="w-full px-3.5 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-white/40 text-xs">💡 Rich text content editor would be added here with Tiptap integration in the full production version.</p>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
