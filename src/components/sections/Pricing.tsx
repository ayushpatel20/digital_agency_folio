"use client";

import { Check, Zap, Crown, Sparkles } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  ctaText: string;
}

interface PricingProps {
  plans?: PricingPlan[];
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: "1",
    name: "Starter",
    price: "$2,500",
    period: "project",
    features: ["Landing Page", "Mobile Responsive", "Basic SEO", "3 Revisions", "30-Day Support"],
    popular: false,
    ctaText: "Get Started",
  },
  {
    id: "2",
    name: "Growth",
    price: "$7,500",
    period: "project",
    features: ["Full Web App", "CMS Integration", "Advanced SEO", "API Integration", "10 Revisions", "90-Day Support", "Analytics Dashboard"],
    popular: true,
    ctaText: "Most Popular",
  },
  {
    id: "3",
    name: "Enterprise",
    price: "Custom",
    period: "project",
    features: ["Custom Solution", "AI Integration", "Dedicated Team", "Unlimited Revisions", "12-Month Support", "Priority Delivery", "SLA Guarantee"],
    popular: false,
    ctaText: "Contact Us",
  },
];

const ICONS = [Zap, Crown, Sparkles];

export default function PricingSection({ plans = DEFAULT_PLANS }: PricingProps) {
  return (
    <section id="pricing" className="section-padding relative">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide">
        <div className="text-center mb-16">
          <div className="section-label mb-4 justify-center">Pricing</div>
          <h2 className="section-heading text-white">
            Simple,{" "}
            <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-lg mx-auto">
            Choose the package that fits your needs. Every project includes our
            full quality commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const Icon = ICONS[i] || Zap;
            return (
              <div
                key={plan.id}
                className={`relative glass-card p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? "border-primary/40 shadow-[0_0_60px_rgba(99,102,241,0.15)]"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="badge bg-primary border-primary/50 text-white text-xs px-4">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.popular
                      ? "bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      : "bg-white/5 text-white/50"
                  }`}
                >
                  <Icon size={22} />
                </div>

                {/* Plan name */}
                <h3 className="text-white font-bold text-xl font-space-grotesk mb-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white font-space-grotesk tracking-tight">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-white/30 text-sm ml-2">/{plan.period}</span>
                  )}
                </div>

                {/* Divider */}
                <div className="divider mb-6" />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.popular ? "bg-primary/20" : "bg-white/5"
                        }`}
                      >
                        <Check
                          size={11}
                          className={plan.popular ? "text-primary" : "text-white/40"}
                        />
                      </div>
                      <span className="text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? "btn-primary"
                      : "glass border border-white/10 text-white/70 hover:text-white hover:border-primary/40 hover:bg-primary/10"
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
