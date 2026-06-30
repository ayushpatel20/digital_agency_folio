"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.15;
      ringY += (dotY - ringY) * 0.15;

      if (dot) {
        dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      if (ring) {
        ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ring) {
        ring.style.width = "60px";
        ring.style.height = "60px";
        ring.style.opacity = "0.6";
      }
      if (dot) dot.style.opacity = "0";
    };

    const onLeaveLink = () => {
      if (ring) {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.opacity = "1";
      }
      if (dot) dot.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(animate);

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    // Hide default cursor on desktop
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      document.body.style.cursor = "";
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden lg:block"
        style={{ top: 0, left: 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden lg:block"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
