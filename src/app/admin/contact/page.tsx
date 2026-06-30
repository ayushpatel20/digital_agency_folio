"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Save, CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import {
  XTwitterIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/ui/BrandIcons";

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
    { icon: XTwitterIcon, field: "twitterUrl", label: "Twitter URL", type: "url" },
    { icon: LinkedinIcon, field: "linkedinUrl", label: "LinkedIn URL", type: "url" },
    { icon: GithubIcon, field: "githubUrl", label: "GitHub URL", type: "url" },
    { icon: InstagramIcon, field: "instagramUrl", label: "Instagram URL", type: "url" },
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
