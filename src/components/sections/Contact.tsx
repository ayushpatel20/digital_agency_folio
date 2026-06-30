"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface ContactProps {
  contactInfo?: ContactInfo;
}

export default function ContactSection({
  contactInfo = {
    email: "hello@startupofthefuture.com",
    phone: "+1 (415) 555-0127",
    address: "100 Innovation Drive, San Francisco, CA 94102",
  },
}: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const INFO_ITEMS = [
    { icon: Mail, label: "Email Us", value: contactInfo.email || "" },
    { icon: Phone, label: "Call Us", value: contactInfo.phone || "" },
    { icon: MapPin, label: "Find Us", value: contactInfo.address || "" },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/6 rounded-full blur-[100px]" />
      </div>

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mb-4 justify-center">Get In Touch</div>
          <h2 className="section-heading text-white">
            Ready to{" "}
            <span className="gradient-text">Start Your Project?</span>
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-lg mx-auto">
            Tell us about your vision and we&apos;ll help you build something
            extraordinary. Free consultation, no commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            {INFO_ITEMS.map((item) => (
              <div key={item.label} className="glass-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Quote box */}
            <div className="glass-card p-8 mt-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <p className="text-white/60 text-sm leading-relaxed italic">
                &ldquo;We typically respond within 2 hours during business days.
                For urgent inquiries, call us directly.&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                  <CheckCircle size={14} className="text-primary" />
                </div>
                <p className="text-white/40 text-xs">Free initial consultation</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <CheckCircle size={28} className="text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/50 text-sm">
                    Thank you! We&apos;ll get back to you within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-secondary text-sm px-6 py-3"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Alex Johnson"
                        className={`w-full px-4 py-3.5 rounded-xl glass border ${
                          errors.name ? "border-red-500/50" : "border-white/8"
                        } text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors bg-transparent`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3.5 rounded-xl glass border ${
                          errors.email ? "border-red-500/50" : "border-white/8"
                        } text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors bg-transparent`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-2">
                      Subject
                    </label>
                    <input
                      {...register("subject")}
                      placeholder="I want to build an AI product..."
                      className={`w-full px-4 py-3.5 rounded-xl glass border ${
                        errors.subject ? "border-red-500/50" : "border-white/8"
                      } text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors bg-transparent`}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className={`w-full px-4 py-3.5 rounded-xl glass border ${
                        errors.message ? "border-red-500/50" : "border-white/8"
                      } text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-primary/50 transition-colors bg-transparent resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-base"
                  >
                    <span>{loading ? "Sending..." : "Send Message"}</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
