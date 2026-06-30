"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_ITEMS.map((n) => n.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 glass-strong border-b border-white/8"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="Startup of the Future"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span
                className="font-space-grotesk font-bold text-lg text-white hidden sm:block"
                style={{ letterSpacing: "-0.02em" }}
              >
                Startup of the{" "}
                <span className="gradient-text">Future</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-white/8 border border-white/10" />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick("#contact")}
                className="btn-primary hidden sm:flex text-sm px-6 py-3"
              >
                <span>Let&apos;s Talk</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl glass border border-white/10 text-white"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-80 glass-strong border-l border-white/8 transition-transform duration-500 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-10">
              <span className="gradient-text font-bold text-lg">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl glass border border-white/10 text-white"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 text-base font-medium"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => handleNavClick("#contact")}
                className="btn-primary w-full justify-center"
              >
                <span>Let&apos;s Talk</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
