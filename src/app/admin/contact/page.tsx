"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle, Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function ContactAdminPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    email: "hello@startupofthefuture.com",
    phone: "+1 (415) 555-0127",
    address: "100 Innovation Drive, San Francisco, CA 94102, USA",
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "",
  });

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) router.push("/admin/login");
  }, [router]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const FIELDS = [
    { icon: Mail, field: "email", label: "Email Address", type: "email" },
    { icon: Phone, field: "phone", label: "Phone Number", type: "tel" },
    { icon: MapPin, field: "address", label: "Office Address", type: "text" },
    { icon: TwitterIcon, field: "twitterUrl", label: "Twitter URL", type: "url" },
    { icon: Linkedin, field: "linkedinUrl", label: "LinkedIn URL", type: "url" },
    { icon: GithubIcon, field: "githubUrl", label: "GitHub URL", type: "url" },
    { icon: Instagram, field: "instagramUrl", label: "Instagram URL", type: "url" },
  ];

  return (
    <AdminShell title="Contact Info">
      <div className="max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-white/50 text-sm">Update contact information displayed on the website.</p>
          <button onClick={handleSave} className="btn-primary text-sm px-5 py-2.5">
            <span>{saved ? "Saved!" : "Save Changes"}</span>
            {saved ? <CheckCircle size={14} /> : <Save size={14} />}
          </button>
        </div>

        <div className="glass-card p-8 space-y-5">
          {FIELDS.map(({ icon: Icon, field, label, type }) => (
            <div key={field}>
              <label className="flex items-center gap-2 text-white/50 text-xs font-medium mb-2">
                <Icon size={12} className="text-primary" />
                {label}
              </label>
              <input
                type={type}
                value={(form as any)[field]}
                onChange={(e) => update(field, e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass border border-white/8 text-white text-sm focus:outline-none focus:border-primary/50 bg-transparent"
              />
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
