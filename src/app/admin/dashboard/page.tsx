"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import {
  Briefcase,
  FileText,
  MessageSquare,
  Users,
  Star,
  Globe,
  Clock,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: React.ElementType;
  color: string;
}

function StatCard({ title, value, change, positive = true, icon: Icon, color }: StatCardProps) {
  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full group">
      <div>
        <div className="flex items-start justify-between mb-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} shadow-sm`}>
            <Icon size={22} className="flex-shrink-0" />
          </div>
          {change && (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all duration-300 ${
                positive
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                  : "bg-red-500/10 text-red-400 border-red-500/10"
              }`}
            >
              {positive ? "↑" : "↓"} {change}
            </span>
          )}
        </div>
        <p className="text-3xl lg:text-4xl font-bold text-white font-space-grotesk tracking-tight mb-2 leading-none">
          {value}
        </p>
      </div>
      <p className="text-white/40 text-sm font-medium">{title}</p>
    </div>
  );
}

const QUICK_ACTIONS = [
  { label: "Add Project", href: "/admin/portfolio", icon: Briefcase, color: "text-primary" },
  { label: "New Blog Post", href: "/admin/blog", icon: FileText, color: "text-accent" },
  { label: "Add Service", href: "/admin/services", icon: Star, color: "text-secondary" },
  { label: "View Messages", href: "/admin/messages", icon: MessageSquare, color: "text-emerald-400" },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AdminShell title="Dashboard">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-strong p-8 mb-8 border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white/40 text-sm mb-1.5">Good morning 👋</p>
          <h2 className="text-3xl font-bold text-white font-space-grotesk mb-2.5 tracking-tight">
            Welcome back, Admin
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xl">
            Here's what's happening with your website today.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="/"
              target="_blank"
              className="btn-primary text-sm px-6 py-3 rounded-xl"
            >
              <span>View Live Site</span>
              <Globe size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value="4"
          change="2 this month"
          positive={true}
          icon={Briefcase}
          color="bg-primary/10 text-primary"
        />
        <StatCard
          title="Blog Posts"
          value="4"
          change="1 new"
          positive={true}
          icon={FileText}
          color="bg-accent/10 text-accent"
        />
        <StatCard
          title="Messages"
          value="0"
          icon={MessageSquare}
          color="bg-secondary/10 text-secondary"
        />
        <StatCard
          title="Team Members"
          value="4"
          icon={Users}
          color="bg-emerald-500/10 text-emerald-400"
        />
      </div>

      {/* Quick Actions + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold text-lg mb-5 font-space-grotesk tracking-tight">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex flex-col gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-primary/20 hover:bg-primary/5 shadow-sm transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/3 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <action.icon size={18} className={`${action.color} group-hover:scale-110 transition-transform`} />
                </div>
                <span className="text-white/70 text-sm font-semibold group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Site Status */}
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold text-lg mb-5 font-space-grotesk tracking-tight">Site Status</h3>
          <div className="space-y-1">
            {[
              { label: "Homepage", status: "Live", ok: true },
              { label: "Admin Panel", status: "Active", ok: true },
              { label: "Database", status: "Connected", ok: true },
              { label: "API Routes", status: "Healthy", ok: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0"
              >
                <span className="text-white/60 text-sm font-medium">{item.label}</span>
                <span
                  className={`flex items-center gap-1.5 text-xs font-semibold ${
                    item.ok ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-emerald-400" : "bg-red-400"} animate-pulse`} />
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={13} className="text-primary" />
              <span className="text-white/60 text-xs font-semibold">Last Updated</span>
            </div>
            <p className="text-white/40 text-xs font-medium">
              {mounted
                ? new Date().toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
