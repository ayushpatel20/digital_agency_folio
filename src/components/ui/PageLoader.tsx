"use client";

import { useEffect, useState } from "react";

const LETTERS = "LOADING".split("");

export default function PageLoader() {
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHiding(true);
      setTimeout(() => setHidden(true), 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`page-loader transition-opacity duration-600 ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-accent/10 animate-spin-slow" style={{ animationDirection: "reverse" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[80px]" />
      </div>

      {/* Logo mark */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="loader-text">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className="gradient-text"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            style={{
              animation: "shimmer 2s ease forwards",
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
