"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle } from "lucide-react";

interface AboutProps {
  heading?: string;
  subHeading?: string;
  description?: string;
  profileImage?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  stat4Value?: string;
  stat4Label?: string;
  fundingAmount?: string;
  fundingDesc?: string;
}

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          // Extract numeric part
          const num = parseFloat(target.replace(/[^0-9.]/g, ""));
          const prefix = target.match(/^\D*/)?.[0] || "";
          const postfix = target.replace(/[0-9.]/g, "").replace(prefix, "");

          const duration = 2000;
          const steps = 60;
          const increment = num / steps;
          let current = 0;

          const timer = setInterval(() => {
            current = Math.min(current + increment, num);
            setCount(
              prefix +
                (Number.isInteger(num) ? Math.round(current) : current.toFixed(1)) +
                postfix
            );
            if (current >= num) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count || target}</span>;
}

export default function AboutSection({
  heading = "We Provide Brilliant Ideas to Grow Your Startup",
  subHeading = "Who We Are",
  description = "We are a team of passionate innovators, designers, and engineers dedicated to building products that make a real difference. With a proven track record across 150+ projects globally, we transform ambitious ideas into impactful digital realities.",
  profileImage = "/images/about.png",
  stat1Value = "150+",
  stat1Label = "Projects Done",
  stat2Value = "98%",
  stat2Label = "Success Rate",
  stat3Value = "$50M+",
  stat3Label = "Revenue Generated",
  stat4Value = "10+",
  stat4Label = "Years Experience",
  fundingAmount = "$15M+",
  fundingDesc = "We helped clients secure over $15M in funding through strategic product development and market positioning.",
}: AboutProps) {
  const capabilities = [
    "AI & Machine Learning Integration",
    "Full-Stack Web Development",
    "Mobile App Development",
    "UI/UX Design Systems",
    "Cloud Architecture & DevOps",
    "Digital Growth Strategy",
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide">
        {/* Top row - label and heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-3">
            <div className="section-label sticky top-32">{subHeading}</div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="section-heading text-white mb-8 leading-tight">
              We provide{" "}
              <span className="gradient-text">brilliant ideas</span> to grow
              the startup &amp; agency with{" "}
              <span className="inline-flex items-center gap-3">
                your sharp brand.
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/10 text-sm text-white/60 hover:text-white hover:border-primary/40 transition-all duration-300 font-normal"
                  style={{ fontSize: "14px" }}
                >
                  Get Started
                  <ArrowUpRight size={14} />
                </a>
              </span>
            </h2>
          </div>
        </div>

        {/* Big funding stat */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-9 lg:col-start-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-7xl md:text-9xl font-bold text-white font-space-grotesk tracking-tight leading-none mb-4">
                  <AnimatedCounter target="15" />
                  <span className="text-primary">M</span>
                </p>
                <p className="text-white/40 text-base">{fundingDesc}</p>
              </div>
              <div className="flex flex-col justify-between border-l border-white/8 pl-10">
                <p className="text-white/55 text-base leading-relaxed">{description}</p>
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Our Work <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: stat1Value, label: stat1Label },
            { value: stat2Value, label: stat2Label },
            { value: stat3Value, label: stat3Label },
            { value: stat4Value, label: stat4Label },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card p-8 text-center"
            >
              <p className="text-4xl font-bold text-white font-space-grotesk tracking-tight mb-2">
                <AnimatedCounter target={stat.value} />
              </p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom: Image + Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src={profileImage}
                alt="About"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl glass-strong border border-white/10 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-white font-space-grotesk">{stat4Value}</p>
              <p className="text-white/40 text-xs text-center mt-1">Years<br/>Experience</p>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white mb-6 font-space-grotesk">
              Our Core Capabilities
            </h3>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              We bring a holistic approach to every project — combining technical
              excellence with design thinking and business strategy.
            </p>
            <ul className="space-y-3">
              {capabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-primary flex-shrink-0" />
                  <span className="text-white/70 text-sm">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
