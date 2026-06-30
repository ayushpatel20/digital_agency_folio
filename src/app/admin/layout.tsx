import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Startup of the Future",
  description: "Secure admin panel for managing website content",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
