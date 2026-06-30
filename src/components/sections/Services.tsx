"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  features: string[];
  order: number;
}

interface ServicesSectionProps {
  services?: Service[];
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "1",
    title: "AI & Machine Learning",
    description: "We architect intelligent systems that learn, adapt, and evolve. From predictive analytics to natural language processing, we bring AI to the forefront of your business.",
    icon: "Brain",
    imageUrl: "/images/service-branding.png",
    features: ["Predictive Analytics", "NLP & Chatbots", "Computer Vision", "MLOps", "Data Engineering"],
    order: 1,
  },
  {
    id: "2",
    title: "Web Development",
    description: "We craft high-performance web applications using cutting-edge technologies. Our solutions are scalable, secure, and built for the modern web.",
    icon: "Globe",
    imageUrl: "/images/service-development.png",
    features: ["Next.js & React", "Node.js APIs", "Database Design", "Cloud Deployment", "Performance Optimization"],
    order: 2,
  },
  {
    id: "3",
    title: "Mobile Applications",
    description: "We design and build native and cross-platform mobile experiences that users love. From iOS to Android, we deliver exceptional mobile products.",
    icon: "Smartphone",
    imageUrl: "/images/service-design.png",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization", "Push Notifications"],
    order: 3,
  },
];

function getIcon(name: string) {
  const icons = LucideIcons as any;
  const Icon = icons[name] || icons.Zap;
  return Icon;
}

export default function ServicesSection({ services = DEFAULT_SERVICES }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-wide relative">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <div className="section-label mb-4 justify-center">
            What We Do
          </div>
          <h2 className="section-heading text-white mb-5">
            Let&apos;s Make{" "}
            <span className="gradient-text">Something Extraordinary</span>{" "}
            Together
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            We combine cutting-edge technology with deep creative expertise to
            deliver solutions that drive real business results.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            const isActive = activeIndex === index;

            return (
              <div
                key={service.id}
                className={`group border-t border-white/6 transition-all duration-500 cursor-pointer ${
                  isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="py-10">
                  <div className="grid grid-cols-12 gap-6 items-start">
                    {/* Number */}
                    <div className="col-span-1 hidden md:block">
                      <span className="text-sm text-white/20 font-mono">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="col-span-12 md:col-span-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                              : "bg-white/5 text-white/40 group-hover:bg-primary/10 group-hover:text-primary"
                          }`}
                        >
                          <Icon size={22} />
                        </div>
                        <h3 className="text-xl font-bold text-white font-space-grotesk">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="col-span-12 md:col-span-3">
                      <div
                        className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${
                          isActive ? "opacity-100 h-44" : "opacity-0 h-0 md:opacity-50 md:h-32"
                        }`}
                      >
                        {service.imageUrl && (
                          <Image
                            src={service.imageUrl}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    </div>

                    {/* Description + Features */}
                    <div className="col-span-12 md:col-span-4">
                      <p className="text-white/50 text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-white/40"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Active indicator line */}
                <div
                  className={`h-px bg-gradient-to-r from-primary via-accent to-transparent transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* All services link */}
        <div className="flex justify-center mt-12">
          <a
            href="#contact"
            className="group flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors duration-300"
          >
            View all capabilities
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
