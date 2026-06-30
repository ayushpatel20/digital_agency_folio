import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin user
  const hashedPassword = await bcrypt.hash("Admin@123456", 12);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@startup.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@startup.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Startup of the Future",
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      accentColor: "#06b6d4",
      metaTitle: "Startup of the Future | Innovation Redefined",
      metaDescription: "We are a next-generation digital startup delivering cutting-edge AI, Web, and Mobile solutions that transform businesses worldwide.",
      keywords: "startup, digital agency, AI, web development, mobile apps, innovation",
    },
  });
  console.log("✅ Site settings created");

  // Hero Section
  await prisma.heroSection.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heading: "We Build the\nFuture of Digital",
      subHeading: "A next-generation startup delivering AI-powered products, stunning web experiences, and scalable mobile solutions that transform industries.",
      ctaPrimaryText: "Explore Our Work",
      ctaPrimaryLink: "#portfolio",
      ctaSecondaryText: "Let's Talk",
      ctaSecondaryLink: "#contact",
      stat1Value: "150+",
      stat1Label: "Projects Delivered",
      stat2Value: "98%",
      stat2Label: "Client Satisfaction",
      stat3Value: "$50M+",
      stat3Label: "Revenue Generated",
      badge1Text: "🤖 AI-Powered",
      badge2Text: "🏆 Award Winning",
      badge3Text: "⭐ Top Rated",
    },
  });
  console.log("✅ Hero section created");

  // About Section
  await prisma.aboutSection.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heading: "We Provide Brilliant Ideas to Grow Your Startup",
      subHeading: "Who We Are",
      description: "We are a team of passionate innovators, designers, and engineers dedicated to building products that make a real difference. With a proven track record across 150+ projects globally, we transform ambitious ideas into impactful digital realities that drive growth.",
      stat1Value: "150+",
      stat1Label: "Projects Done",
      stat2Value: "98%",
      stat2Label: "Success Rate",
      stat3Value: "$50M+",
      stat3Label: "Revenue Generated",
      stat4Value: "10+",
      stat4Label: "Years Experience",
      fundingAmount: "$15M+",
      fundingDesc: "We helped clients secure over $15M in funding through our growth strategies, product development, and market positioning.",
    },
  });
  console.log("✅ About section created");

  // Services
  const services = [
    {
      title: "AI & Machine Learning",
      slug: "ai-machine-learning",
      description: "We architect intelligent systems that learn, adapt, and evolve. From predictive analytics to natural language processing, we bring AI to the forefront of your business.",
      icon: "Brain",
      features: JSON.stringify(["Predictive Analytics", "NLP & Chatbots", "Computer Vision", "MLOps", "Data Engineering"]),
      order: 1,
    },
    {
      title: "Web Development",
      slug: "web-development",
      description: "We craft high-performance web applications using cutting-edge technologies. Our solutions are scalable, secure, and built for the modern web.",
      icon: "Globe",
      features: JSON.stringify(["Next.js & React", "Node.js APIs", "Database Design", "Cloud Deployment", "Performance Optimization"]),
      order: 2,
    },
    {
      title: "Mobile Applications",
      slug: "mobile-applications",
      description: "We design and build native and cross-platform mobile experiences that users love. From iOS to Android, we deliver exceptional mobile products.",
      icon: "Smartphone",
      features: JSON.stringify(["iOS & Android", "React Native", "Flutter", "App Store Optimization", "Push Notifications"]),
      order: 3,
    },
    {
      title: "UI/UX Design",
      slug: "ui-ux-design",
      description: "We create intuitive, beautiful user experiences that convert visitors into loyal customers. Our design process is research-driven and user-centric.",
      icon: "Layers",
      features: JSON.stringify(["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"]),
      order: 4,
    },
    {
      title: "Cloud & DevOps",
      slug: "cloud-devops",
      description: "We build robust cloud infrastructure and automate deployment pipelines. Scale confidently with our cloud-native architecture expertise.",
      icon: "Cloud",
      features: JSON.stringify(["AWS / GCP / Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring & Alerting", "Security Hardening"]),
      order: 5,
    },
    {
      title: "Digital Strategy",
      slug: "digital-strategy",
      description: "We help startups and enterprises navigate digital transformation. Our strategic consulting turns vision into executable roadmaps.",
      icon: "TrendingUp",
      features: JSON.stringify(["Market Analysis", "Product Roadmap", "Growth Hacking", "Brand Strategy", "Competitive Research"]),
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log("✅ Services created");

  // Projects
  const projects = [
    {
      title: "NexaAI Platform",
      slug: "nexa-ai-platform",
      description: "A cutting-edge AI-powered SaaS platform for enterprise analytics. Features real-time data processing, predictive modeling, and automated reporting.",
      category: "AI/ML",
      technologies: JSON.stringify(["Python", "TensorFlow", "React", "AWS", "PostgreSQL"]),
      featured: true,
      status: "PUBLISHED" as const,
      order: 1,
    },
    {
      title: "FluxCommerce",
      slug: "flux-commerce",
      description: "A premium e-commerce platform with AI-powered recommendations, real-time inventory management, and seamless multi-currency support.",
      category: "E-Commerce",
      technologies: JSON.stringify(["Next.js", "Shopify API", "Stripe", "Redis", "MongoDB"]),
      featured: true,
      status: "PUBLISHED" as const,
      order: 2,
    },
    {
      title: "HealthSync App",
      slug: "health-sync-app",
      description: "A comprehensive health and wellness mobile app connecting patients with doctors, featuring real-time video consultations and health monitoring.",
      category: "Mobile App",
      technologies: JSON.stringify(["React Native", "Node.js", "WebRTC", "Firebase", "ML Kit"]),
      featured: true,
      status: "PUBLISHED" as const,
      order: 3,
    },
    {
      title: "FinanceFlow Dashboard",
      slug: "finance-flow-dashboard",
      description: "An enterprise financial analytics dashboard with real-time market data, portfolio management, and AI-driven investment insights.",
      category: "FinTech",
      technologies: JSON.stringify(["Vue.js", "Python", "FastAPI", "WebSocket", "D3.js"]),
      featured: false,
      status: "PUBLISHED" as const,
      order: 4,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
  console.log("✅ Projects created");

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechVenture Capital",
      designation: "CEO & Founder",
      rating: 5,
      text: "Startup of the Future transformed our entire product vision into a stunning reality. Their AI expertise and design sensibility are unparalleled. We raised $5M after launching the product they built for us.",
      order: 1,
    },
    {
      name: "Marcus Rodriguez",
      company: "Apex Digital",
      designation: "CTO",
      rating: 5,
      text: "The team's ability to create high-quality, scalable products is extraordinary. They delivered our platform 2 weeks ahead of schedule with zero compromises on quality. Absolutely recommend.",
      order: 2,
    },
    {
      name: "Priya Sharma",
      company: "HealthBridge",
      designation: "Product Director",
      rating: 5,
      text: "Our mobile app went from concept to 100k users in 6 months thanks to Startup of the Future. Their mobile development and UX expertise created an experience our users absolutely love.",
      order: 3,
    },
    {
      name: "James Wilson",
      company: "CloudMatrix Inc",
      designation: "VP Engineering",
      rating: 5,
      text: "Best technical team I've worked with in 15 years. They built our entire cloud infrastructure from scratch, optimized our costs by 60%, and delivered a system that scales beautifully.",
      order: 4,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.name.toLowerCase().replace(/\s/g, "-") },
      update: {},
      create: { id: t.name.toLowerCase().replace(/\s/g, "-"), ...t },
    });
  }
  console.log("✅ Testimonials created");

  // Team Members
  const team = [
    { name: "Alex Rivera", role: "CEO & Co-Founder", bio: "Visionary entrepreneur with 12+ years in tech startups.", socialLinks: JSON.stringify({ twitter: "#", linkedin: "#" }), order: 1 },
    { name: "Zara Kim", role: "CTO & Co-Founder", bio: "Full-stack engineer and AI researcher.", socialLinks: JSON.stringify({ twitter: "#", github: "#" }), order: 2 },
    { name: "Devon Hart", role: "Head of Design", bio: "Award-winning UX designer with a passion for delightful experiences.", socialLinks: JSON.stringify({ instagram: "#", dribbble: "#" }), order: 3 },
    { name: "Mia Thompson", role: "Head of Growth", bio: "Growth strategist who has scaled multiple startups to $100M+ ARR.", socialLinks: JSON.stringify({ twitter: "#", linkedin: "#" }), order: 4 },
  ];

  for (const member of team) {
    await prisma.teamMember.upsert({
      where: { id: member.name.toLowerCase().replace(/\s/g, "-") },
      update: {},
      create: { id: member.name.toLowerCase().replace(/\s/g, "-"), ...member },
    });
  }
  console.log("✅ Team created");

  // Blog Posts
  const blogs = [
    {
      title: "The Future of AI in Product Development",
      slug: "future-of-ai-product-development",
      excerpt: "How artificial intelligence is revolutionizing the way we build, test, and ship software products in 2025.",
      content: "<h2>Introduction</h2><p>Artificial intelligence is no longer a futuristic concept — it's the engine driving the most innovative products of our time. In this article, we explore how AI is fundamentally changing the product development lifecycle.</p>",
      category: "AI/ML",
      tags: JSON.stringify(["AI", "Product", "Innovation", "Technology"]),
      status: "PUBLISHED" as const,
      author: "Alex Rivera",
    },
    {
      title: "Building Scalable Startups: A Technical Blueprint",
      slug: "building-scalable-startups-technical-blueprint",
      excerpt: "A deep dive into the architectural decisions, tech stack choices, and engineering practices that allow startups to scale from 0 to millions of users.",
      content: "<h2>The Foundation</h2><p>Every great startup begins with a solid technical foundation. The decisions you make in the early days of your product will echo throughout its lifetime.</p>",
      category: "Engineering",
      tags: JSON.stringify(["Startups", "Architecture", "Scalability", "Engineering"]),
      status: "PUBLISHED" as const,
      author: "Zara Kim",
    },
    {
      title: "Dark Mode Design Systems: A Complete Guide",
      slug: "dark-mode-design-systems-complete-guide",
      excerpt: "Everything you need to know about creating beautiful, accessible dark mode design systems that users actually love.",
      content: "<h2>Why Dark Mode Matters</h2><p>Dark mode has evolved from a preference to an expectation. Modern users demand it, and companies that deliver it well see measurable improvements in engagement and satisfaction.</p>",
      category: "Design",
      tags: JSON.stringify(["Design", "UI/UX", "Dark Mode", "CSS"]),
      status: "PUBLISHED" as const,
      author: "Devon Hart",
    },
    {
      title: "Growth Hacking in 2025: Strategies That Actually Work",
      slug: "growth-hacking-2025-strategies",
      excerpt: "Data-driven growth strategies for startups looking to achieve exponential growth without burning through their runway.",
      content: "<h2>The New Growth Playbook</h2><p>The growth hacking playbook of 2015 is obsolete. In 2025, growth requires a sophisticated blend of data science, product intuition, and creative experimentation.</p>",
      category: "Growth",
      tags: JSON.stringify(["Growth", "Marketing", "Startups", "Strategy"]),
      status: "PUBLISHED" as const,
      author: "Mia Thompson",
    },
  ];

  for (const blog of blogs) {
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: {},
      create: { ...blog, publishedAt: new Date() },
    });
  }
  console.log("✅ Blog posts created");

  // Pricing Plans
  const plans = [
    {
      name: "Starter",
      price: "$2,500",
      period: "project",
      features: JSON.stringify(["Landing Page", "Mobile Responsive", "Basic SEO", "3 Revisions", "30-Day Support"]),
      popular: false,
      order: 1,
    },
    {
      name: "Growth",
      price: "$7,500",
      period: "project",
      features: JSON.stringify(["Full Web App", "CMS Integration", "Advanced SEO", "API Integration", "10 Revisions", "90-Day Support", "Analytics Dashboard"]),
      popular: true,
      order: 2,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "project",
      features: JSON.stringify(["Custom Solution", "AI Integration", "Dedicated Team", "Unlimited Revisions", "12-Month Support", "Priority Delivery", "SLA Guarantee"]),
      popular: false,
      order: 3,
    },
  ];

  for (const plan of plans) {
    await prisma.pricingPlan.upsert({
      where: { id: plan.name.toLowerCase() },
      update: {},
      create: { id: plan.name.toLowerCase(), ...plan },
    });
  }
  console.log("✅ Pricing plans created");

  // FAQ
  const faqs = [
    { question: "What technologies do you specialize in?", answer: "We specialize in Next.js, React, Node.js, Python, React Native, Flutter, and cutting-edge AI/ML frameworks including TensorFlow and PyTorch. Our team stays current with the latest innovations.", order: 1 },
    { question: "How long does a typical project take?", answer: "Project timelines vary based on scope. A landing page takes 1-2 weeks, a full web application 4-12 weeks, and enterprise solutions 3-6 months. We provide detailed timelines during our discovery phase.", order: 2 },
    { question: "Do you work with startups at pre-seed stage?", answer: "Absolutely! We love working with early-stage startups. We offer flexible payment terms, equity partnerships for exceptional projects, and dedicated support to help you ship your MVP fast.", order: 3 },
    { question: "How do you ensure project quality?", answer: "We maintain quality through rigorous code reviews, automated testing, continuous integration, and dedicated QA processes. Every project goes through multiple review cycles before delivery.", order: 4 },
    { question: "Do you provide post-launch support?", answer: "Yes! All our projects include a support period (30-90 days depending on the package). We also offer ongoing maintenance retainers for long-term support and feature development.", order: 5 },
    { question: "Can you work with our existing team?", answer: "Absolutely. We're experienced at integrating with existing teams, adopting their processes and tools. We can work as an extension of your team or as a standalone development partner.", order: 6 },
  ];

  for (const faq of faqs) {
    await prisma.faq.upsert({
      where: { id: `faq-${faq.order}` },
      update: {},
      create: { id: `faq-${faq.order}`, ...faq },
    });
  }
  console.log("✅ FAQs created");

  // Contact Info
  await prisma.contactInfo.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      email: "hello@startupofthefuture.com",
      phone: "+1 (415) 555-0127",
      address: "100 Innovation Drive, San Francisco, CA 94102, USA",
      twitterUrl: "https://twitter.com",
      linkedinUrl: "https://linkedin.com",
      githubUrl: "https://github.com",
      instagramUrl: "https://instagram.com",
    },
  });
  console.log("✅ Contact info created");

  // Footer Settings
  await prisma.footerSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      copyright: "© 2025 Startup of the Future. All Rights Reserved.",
      quickLinks: JSON.stringify([
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Blog", href: "#blog" },
        { label: "Contact", href: "#contact" },
      ]),
    },
  });
  console.log("✅ Footer settings created");

  console.log("\n🎉 Seeding complete!");
  console.log("Admin credentials:");
  console.log("  Email: admin@startup.com");
  console.log("  Password: Admin@123456");
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
