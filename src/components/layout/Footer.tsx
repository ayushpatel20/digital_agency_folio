"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Linkedin,
  Instagram,
  ArrowUpRight,
  ExternalLink,
  Code2,
  Play,
} from "lucide-react";

// Inline SVG icons for brands not in lucide-react v1.x
const TwitterX = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const YoutubeIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: TwitterX, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];


const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const MARQUEE_WORDS = ["Build", "the", "Future", "·", "Innovate", "·", "Scale", "·"];

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <footer className="relative overflow-hidden pt-0 pb-12 border-t border-white/5">
      {/* Marquee CTA */}
      <div className="relative overflow-hidden py-16 border-b border-white/5">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        
        <div className="flex overflow-hidden">
          <div
            className="flex gap-8 whitespace-nowrap animate-marquee flex-shrink-0"
            aria-hidden="true"
          >
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
              <span
                key={i}
                className="text-6xl md:text-8xl font-bold font-space-grotesk text-white/5"
                style={{ letterSpacing: "-0.03em" }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative flex items-center gap-3 px-10 py-5 rounded-full glass-strong border border-white/15 text-white font-bold text-lg hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
          >
            Start a Project
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-colors">
              <ArrowUpRight size={16} />
            </span>
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-wide pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="Startup of the Future"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-space-grotesk font-bold text-xl text-white">
                Startup of the <span className="gradient-text">Future</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              A next-generation digital startup delivering AI-powered products,
              stunning web experiences, and scalable mobile solutions that
              transform businesses worldwide.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl glass border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      const el = document.getElementById(link.href.replace("#", ""));
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@startupofthefuture.com"
                  className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                >
                  hello@startupofthefuture.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+14155550127"
                  className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                >
                  +1 (415) 555-0127
                </a>
              </li>
              <li className="text-white/40 text-sm">
                100 Innovation Drive,
                <br />
                San Francisco, CA 94102
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2025 Startup of the Future. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
