"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  images: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

interface PortfolioProps {
  projects?: Project[];
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "NexaAI Platform",
    slug: "nexa-ai-platform",
    description: "An AI-powered SaaS platform for enterprise analytics with real-time data processing and predictive modeling.",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "React", "AWS"],
    images: ["/images/portfolio-1.png"],
    featured: true,
  },
  {
    id: "2",
    title: "FluxCommerce",
    slug: "flux-commerce",
    description: "A premium e-commerce platform with AI-powered recommendations and seamless multi-currency support.",
    category: "E-Commerce",
    technologies: ["Next.js", "Shopify", "Stripe", "Redis"],
    images: ["/images/portfolio-2.png"],
    featured: true,
  },
  {
    id: "3",
    title: "HealthSync App",
    slug: "health-sync-app",
    description: "A comprehensive health app connecting patients with doctors through real-time video consultations.",
    category: "Mobile App",
    technologies: ["React Native", "Node.js", "WebRTC"],
    images: ["/images/portfolio-3.png"],
    featured: true,
  },
  {
    id: "4",
    title: "FinanceFlow Dashboard",
    slug: "finance-flow-dashboard",
    description: "Enterprise financial analytics dashboard with real-time market data and AI-driven investment insights.",
    category: "FinTech",
    technologies: ["Vue.js", "Python", "D3.js"],
    images: ["/images/portfolio-4.png"],
    featured: false,
  },
];

const CATEGORIES = ["All", "AI/ML", "E-Commerce", "Mobile App", "FinTech", "Web Dev"];

export default function PortfolioSection({ projects = DEFAULT_PROJECTS }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding relative">
      {/* Background */}
      <div className="absolute left-0 top-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14">
          <div>
            <div className="section-label mb-4">Our Work</div>
            <h2 className="section-heading text-white">
              Recent{" "}
              <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
          >
            See all projects
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                  : "glass border border-white/8 text-white/50 hover:text-white hover:border-white/16"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-3xl glass-card cursor-pointer ${
                index === 0 ? "md:col-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "aspect-[16/7]" : "aspect-[4/3]"
                }`}
              >
                {project.images[0] && (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-primary/10 transition-opacity duration-300 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Top badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="badge text-xs">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="badge text-xs bg-accent/15 border-accent/25 text-accent">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Top right action */}
                <div
                  className={`absolute top-4 right-4 transition-all duration-300 ${
                    hoveredId === project.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white hover:bg-primary/40 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-space-grotesk mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      hoveredId === project.id
                        ? "bg-primary text-white"
                        : "glass border border-white/10 text-white/40"
                    }`}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs text-white/40 bg-white/4 border border-white/6"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
