"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

/**
 * 3D-Tilt-Karte – reines CSS-Transform (perspective + rotateX/rotateY),
 * kein WebGL/Canvas. Reagiert auf die Mausposition über der Karte, bewegt
 * gleichzeitig ein Glanzlicht mit. Nur auf Geräten mit echtem Zeiger
 * (`pointer: fine`) aktiv – auf Touch bleibt die Karte flach, dort ersetzt
 * `:active` die Tiefenwirkung. Respektiert `prefers-reduced-motion`
 * (CSS-Query in globals.css deckt das global ab, hier zusätzlich per JS-Guard).
 */
export default function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      el.style.setProperty("--glow", "0.55");
    });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glow", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt-card ${className}`}
    >
      <div className="tilt-card-inner">{children}</div>
    </div>
  );
}
