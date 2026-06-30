"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Users,
  TrendingUp,
  ArrowUpRight,
  Eye,
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
    <div className="glass-card p-6 group hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center ${color}`}
        >
          <Icon size={20} />
        </div>
        {change && (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              positive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {positive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-white font-space-grotesk tracking-tight mb-1">
        {value}
      </p>
      <p className="text-white/40 text-sm">{title}</p>
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
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_authenticated");
    if (!auth) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <AdminShell title="Dashboard">
      {/* Welcome */}
      <div className="glass-card p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-white/40 text-sm mb-1">Good morning 👋</p>
          <h2 className="text-2xl font-bold text-white font-space-grotesk mb-2">
            Welcome back, Admin
          </h2>
          <p className="text-white/50 text-sm">
            Here's what's happening with your website today.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="/"
              target="_blank"
              className="btn-primary text-sm px-5 py-2.5"
            >
              <span>View Live Site</span>
              <Globe size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex flex-col gap-3 p-4 rounded-2xl glass border border-white/6 hover:border-white/12 hover:bg-white/3 transition-all group"
              >
                <action.icon size={18} className={action.color} />
                <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Site Status */}
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4">Site Status</h3>
          <div className="space-y-3">
            {[
              { label: "Homepage", status: "Live", ok: true },
              { label: "Admin Panel", status: "Active", ok: true },
              { label: "Database", status: "Connected", ok: true },
              { label: "API Routes", status: "Healthy", ok: true },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2.5 border-b border-white/4 last:border-0"
              >
                <span className="text-white/60 text-sm">{item.label}</span>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    item.ok ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-emerald-400" : "bg-red-400"} animate-pulse`} />
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={13} className="text-primary" />
              <span className="text-white/60 text-xs font-medium">Last Updated</span>
            </div>
            <p className="text-white/40 text-xs">
              {new Date().toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
