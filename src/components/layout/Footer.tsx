"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  XTwitterIcon,
  GithubIcon,
  YoutubeIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/ui/BrandIcons";

const SOCIAL_LINKS = [
  { icon: XTwitterIcon, href: "#", label: "Twitter" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
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
                  sizes="40px"
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
