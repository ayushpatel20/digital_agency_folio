"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqProps {
  faqs?: Faq[];
}

const DEFAULT_FAQS: Faq[] = [
  { id: "1", question: "What technologies do you specialize in?", answer: "We specialize in Next.js, React, Node.js, Python, React Native, Flutter, and cutting-edge AI/ML frameworks including TensorFlow and PyTorch. Our team stays current with the latest innovations." },
  { id: "2", question: "How long does a typical project take?", answer: "Project timelines vary based on scope. A landing page takes 1-2 weeks, a full web application 4-12 weeks, and enterprise solutions 3-6 months. We provide detailed timelines during our discovery phase." },
  { id: "3", question: "Do you work with startups at pre-seed stage?", answer: "Absolutely! We love working with early-stage startups. We offer flexible payment terms, equity partnerships for exceptional projects, and dedicated support to help you ship your MVP fast." },
  { id: "4", question: "How do you ensure project quality?", answer: "We maintain quality through rigorous code reviews, automated testing, continuous integration, and dedicated QA processes. Every project goes through multiple review cycles before delivery." },
  { id: "5", question: "Do you provide post-launch support?", answer: "Yes! All our projects include a support period (30-90 days depending on the package). We also offer ongoing maintenance retainers for long-term support and feature development." },
  { id: "6", question: "Can you work with our existing team?", answer: "Absolutely. We're experienced at integrating with existing teams, adopting their processes and tools. We can work as an extension of your team or as a standalone development partner." },
];

export default function FaqSection({ faqs = DEFAULT_FAQS }: FaqProps) {
  const [openId, setOpenId] = useState<string | null>("1");

  return (
    <section id="faq" className="section-padding relative">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <div className="section-label mb-4">FAQ</div>
            <h2 className="section-heading text-white mb-6">
              Frequently{" "}
              <span className="gradient-text">Asked Questions</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Got questions? We&apos;ve got answers. If you don&apos;t find what
              you&apos;re looking for, reach out and we&apos;ll be happy to
              help.
            </p>
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-secondary"
            >
              Ask Us Anything
            </button>
          </div>

          {/* Right - Accordion */}
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`glass-card overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-primary/20" : ""
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                  >
                    <span
                      className={`font-semibold text-base transition-colors ${
                        isOpen ? "text-white" : "text-white/70"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-primary text-white rotate-45"
                          : "glass border border-white/10 text-white/40"
                      }`}
                    >
                      <Plus size={16} />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      isOpen ? "max-h-64" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 pb-6 text-white/50 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
