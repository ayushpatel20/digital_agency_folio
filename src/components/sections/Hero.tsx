"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Play, Sparkles, Zap, Star } from "lucide-react";

interface HeroProps {
  heading?: string;
  subHeading?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  backgroundImage?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  badge1Text?: string;
  badge2Text?: string;
  badge3Text?: string;
}

const TYPING_WORDS = ["Digital", "AI-Powered", "Scalable", "Innovative"];

export default function HeroSection({
  heading = "We Build the\nFuture of Digital",
  subHeading = "A next-generation startup delivering AI-powered products, stunning web experiences, and scalable mobile solutions.",
  ctaPrimaryText = "Explore Our Work",
  ctaPrimaryLink = "#portfolio",
  ctaSecondaryText = "Let's Talk",
  ctaSecondaryLink = "#contact",
  backgroundImage = "/images/hero-bg.png",
  stat1Value = "150+",
  stat1Label = "Projects Delivered",
  stat2Value = "98%",
  stat2Label = "Client Satisfaction",
  stat3Value = "$50M+",
  stat3Label = "Revenue Generated",
  badge1Text = "🤖 AI-Powered",
  badge2Text = "🏆 Award Winning",
  badge3Text = "⭐ Top Rated",
}: HeroProps) {
  const [typingText, setTypingText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const speed = isDeleting ? 60 : 120;

    const timeout = setTimeout(() => {
      if (!isDeleting && typingText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
      if (isDeleting && typingText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        return;
      }
      setTypingText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, wordIndex]);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const headingLines = heading.split("\n");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020408] via-[#020408]/85 to-[#020408]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-[#020408]/40" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40 animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge row */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[badge1Text, badge2Text, badge3Text].map((badge, i) => (
              <div
                key={i}
                className="badge animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {badge}
              </div>
            ))}
          </div>

          {/* Main Heading */}
          <div className="mb-6 overflow-hidden">
            {headingLines.map((line, i) => (
              <div
                key={i}
                className="overflow-hidden"
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-[-0.03em] animate-fade-up"
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  {i === 1 ? (
                    <>
                      <span className="gradient-text">{typingText}</span>
                      <span className="inline-block w-0.5 h-[0.8em] bg-primary ml-1 align-middle animate-pulse" />
                    </>
                  ) : (
                    line
                  )}
                </h1>
              </div>
            ))}
          </div>

          {/* Sub heading */}
          <p
            className="text-white/55 text-lg md:text-xl leading-relaxed max-w-xl mb-10 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            {subHeading}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            <button
              onClick={() => scrollTo(ctaPrimaryLink)}
              className="btn-primary group text-base px-8 py-4"
            >
              <span>{ctaPrimaryText}</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => scrollTo(ctaSecondaryLink)}
              className="btn-secondary group text-base px-8 py-4"
            >
              <span className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                  <Play size={10} fill="currentColor" />
                </span>
                {ctaSecondaryText}
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 sm:gap-10 animate-fade-up"
            style={{ animationDelay: "700ms" }}
          >
            {[
              { value: stat1Value, label: stat1Label },
              { value: stat2Value, label: stat2Label },
              { value: stat3Value, label: stat3Label },
            ].map((stat, i) => (
              <div key={i} className="relative">
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/10" />
                )}
                <div className={i > 0 ? "pl-6 sm:pl-10" : ""}>
                  <p className="text-2xl sm:text-3xl font-bold text-white font-space-grotesk tracking-[-0.02em]">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-xs sm:text-sm mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating glass cards — right side */}
      <div className="absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 pointer-events-none">
        {/* Card 1 */}
        <div className="glass-card px-5 py-4 animate-float" style={{ width: 220 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Zap size={14} className="text-primary" />
            </div>
            <span className="text-white/80 text-sm font-medium">AI Processing</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-white/30 text-xs">Performance</span>
            <span className="text-primary text-xs font-semibold">98.7%</span>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="glass-card px-5 py-4 animate-float-delayed"
          style={{ width: 220 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <Star size={14} className="text-accent" />
            </div>
            <span className="text-white/80 text-sm font-medium">Client Rating</span>
          </div>
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="text-accent fill-accent" />
            ))}
          </div>
          <span className="text-white/30 text-xs">Based on 150+ reviews</span>
        </div>

        {/* Card 3 */}
        <div className="glass-card px-5 py-4 animate-float" style={{ width: 220, animationDelay: "1s" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Sparkles size={14} className="text-secondary" />
            </div>
            <span className="text-white/80 text-sm font-medium">Projects Live</span>
          </div>
          <p className="text-3xl font-bold text-white font-space-grotesk">150+</p>
          <p className="text-white/30 text-xs mt-1">Worldwide deployments</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
