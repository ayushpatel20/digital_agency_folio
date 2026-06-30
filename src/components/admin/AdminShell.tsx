"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Image as ImageIcon,
  FileText,
  Briefcase,
  MessageSquare,
  Users,
  Settings,
  Mail,
  HelpCircle,
  DollarSign,
  Globe,
  Search,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Star,
  BarChart3,
  Home,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Hero Section", href: "/admin/hero", icon: Home },
      { label: "About Section", href: "/admin/about", icon: Users },
      { label: "Services", href: "/admin/services", icon: Sparkles },
      { label: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
      { label: "Blog Posts", href: "/admin/blog", icon: FileText },
      { label: "Testimonials", href: "/admin/testimonials", icon: Star },
      { label: "Team", href: "/admin/team", icon: Users },
      { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
      { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
    ],
  },
  {
    label: "Media & Forms",
    items: [
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
      { label: "Contact Info", href: "/admin/contact", icon: Mail },
      { label: "Messages", href: "/admin/messages", icon: MessageSquare },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Navigation", href: "/admin/navigation", icon: Globe },
      { label: "SEO Settings", href: "/admin/seo", icon: Search },
      { label: "Site Settings", href: "/admin/settings", icon: Settings },
      { label: "Users", href: "/admin/users", icon: Users },
    ],
  },
];

interface AdminShellProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminShell({ children, title = "Dashboard" }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    router.push("/admin/login");
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-white/5">
        <div className="relative w-8 h-8">
          <Image src="/images/logo.png" alt="Logo" fill className="object-contain" sizes="32px" />
        </div>
        <div>
          <p className="text-white font-bold text-sm font-space-grotesk">Admin Panel</p>
          <p className="text-white/30 text-xs">Startup of the Future</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-white/25 text-[10px] font-semibold uppercase tracking-[0.15em] px-3 mb-2">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-primary/15 text-primary border border-primary/20"
                          : "text-white/50 hover:text-white hover:bg-white/4"
                      }`}
                    >
                      <item.icon size={15} />
                      <span>{item.label}</span>
                      {isActive && (
                        <ChevronRight size={12} className="ml-auto opacity-60" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/4 transition-all"
        >
          <Globe size={15} />
          <span>View Website</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#020408]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 flex-shrink-0 glass border-r border-white/5">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-72 glass-strong border-r border-white/8 flex flex-col">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 glass border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl glass border border-white/8 text-white/60"
            >
              <Menu size={16} />
            </button>
            <h1 className="text-white font-bold text-lg font-space-grotesk">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
