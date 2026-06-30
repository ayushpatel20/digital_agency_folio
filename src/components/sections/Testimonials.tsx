"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  designation: string;
  rating: number;
  text: string;
  imageUrl?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    company: "TechVenture Capital",
    designation: "CEO & Founder",
    rating: 5,
    text: "Startup of the Future transformed our entire product vision into a stunning reality. Their AI expertise and design sensibility are unparalleled. We raised $5M after launching the product they built for us.",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    company: "Apex Digital",
    designation: "CTO",
    rating: 5,
    text: "The team's ability to create high-quality, scalable products is extraordinary. They delivered our platform 2 weeks ahead of schedule with zero compromises on quality. Absolutely recommend.",
  },
  {
    id: "3",
    name: "Priya Sharma",
    company: "HealthBridge",
    designation: "Product Director",
    rating: 5,
    text: "Our mobile app went from concept to 100k users in 6 months thanks to Startup of the Future. Their mobile development and UX expertise created an experience our users absolutely love.",
  },
  {
    id: "4",
    name: "James Wilson",
    company: "CloudMatrix Inc",
    designation: "VP Engineering",
    rating: 5,
    text: "Best technical team I've worked with in 15 years. They built our entire cloud infrastructure, optimized our costs by 60%, and delivered a system that scales beautifully under load.",
  },
];

const PARTNERS = [
  "TechVenture", "Apex Digital", "HealthBridge", "CloudMatrix", "FutureScale"
];

export default function TestimonialsSection({ testimonials = DEFAULT_TESTIMONIALS }: TestimonialsProps) {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length]);

  const prev = () => {
    setAutoPlay(false);
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setAutoPlay(false);
    setActive((p) => (p + 1) % testimonials.length);
  };

  const current = testimonials[active];

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-4 justify-center">Testimonials</div>
          <h2 className="section-heading text-white">
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        {/* Main testimonial card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="glass-card p-10 md:p-14 relative overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote size={80} className="text-primary" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={18} className="text-accent fill-accent" />
              ))}
            </div>

            {/* Text */}
            <blockquote className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-10 relative z-10">
              &ldquo;{current.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                {current.imageUrl ? (
                  <Image
                    src={current.imageUrl}
                    alt={current.name}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">
                    {current.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white font-semibold">{current.name}</p>
                <p className="text-white/40 text-sm">
                  {current.designation}, {current.company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoPlay(false); setActive(i); }}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? "w-8 bg-primary" : "w-4 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-xl glass border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/40 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-xl glass border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/40 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Partners marquee */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <p className="text-center text-white/25 text-xs tracking-[0.2em] uppercase mb-10">
            Trusted by 150+ innovative companies worldwide
          </p>
          <div className="flex overflow-hidden">
            <div className="flex gap-16 whitespace-nowrap animate-marquee flex-shrink-0">
              {[...PARTNERS, ...PARTNERS].map((name, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <span className="text-white/20 text-sm font-medium tracking-wider uppercase">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
