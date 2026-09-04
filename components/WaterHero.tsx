"use client";

import { useEffect, useRef } from "react";

/**
 * Interaktiver Wasser-/Seifenblasen-Hintergrund für den Startseiten-Hero.
 *
 * Bewusst Canvas 2D statt WebGL: kein Shader-Kompilierschritt, der auf
 * unbekannter Kundenhardware (Firmenlaptop mit gesperrter GPU o. Ä.)
 * scheitern könnte – Canvas 2D läuft überall gleich. Für die Tiefenwirkung
 * sorgen drei Ebenen (Verlauf, Kaustik-Flecken, Blasen) mit
 * unterschiedlicher Geschwindigkeit (Parallaxe) statt echter 3D-Geometrie.
 *
 * - Blasen steigen auf, driften sinusförmig und weichen dem Zeiger sanft aus.
 * - Klick/Tap erzeugt einen auslaufenden Ring.
 * - Pausiert ausserhalb des Bildschirms, im Hintergrund-Tab und bei
 *   `prefers-reduced-motion` (dann: ein statisches Bild, kein Loop).
 */

type Bubble = {
  x: number;
  y: number;
  r: number;
  baseX: number;
  speed: number;
  driftAmp: number;
  driftFreq: number;
  phase: number;
  opacity: number;
  sprite: 0 | 1;
};

type Ripple = { x: number; y: number; start: number };

const RIPPLE_LIFE = 1100; // ms

function makeSprite(tint: string): HTMLCanvasElement {
  const size = 160;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;

  const g = ctx.createRadialGradient(
    cx - r * 0.35,
    cy - r * 0.4,
    r * 0.05,
    cx,
    cy,
    r,
  );
  g.addColorStop(0, "rgba(255,255,255,0.95)");
  g.addColorStop(0.25, "rgba(255,255,255,0.35)");
  g.addColorStop(0.55, `${tint}22`);
  g.addColorStop(0.82, `${tint}55`);
  g.addColorStop(1, `${tint}00`);

  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `${tint}88`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 1.5, 0, Math.PI * 2);
  ctx.stroke();

  // kleines Glanzlicht oben links
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.42, cy - r * 0.48, r * 0.16, r * 0.09, -0.6, 0, Math.PI * 2);
  ctx.fill();

  return c;
}

export default function WaterHero({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spriteA = makeSprite("#628fff"); // sky
    const spriteB = makeSprite("#17c9aa"); // mint

    let bubbles: Bubble[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    function bubbleCount() {
      // weniger Blasen auf schmalen/kleinen Flächen (Handy) – spart Leistung.
      const area = width * height;
      return Math.max(10, Math.min(34, Math.round(area / 26000)));
    }

    function makeBubble(spawnAtBottom: boolean): Bubble {
      const r = 5 + Math.random() * 22;
      return {
        x: Math.random() * width,
        y: spawnAtBottom ? height + r + Math.random() * height * 0.4 : Math.random() * height,
        r,
        baseX: 0,
        speed: 12 + Math.random() * 26,
        driftAmp: 10 + Math.random() * 26,
        driftFreq: 0.25 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.35 + Math.random() * 0.5,
        sprite: Math.random() > 0.5 ? 1 : 0,
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const newWidth = Math.max(1, rect.width);
      const newHeight = Math.max(1, rect.height);
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);
      // Setzen von canvas.width/height löscht den Inhalt – auch wenn der Wert
      // gleich bleibt. ResizeObserver feuert aber beim ersten `observe()`
      // garantiert einmal zusätzlich, oft mitten im Layout (z. B. wenn eine
      // Web-Font nachlädt). Ohne diese Wächter wischt dieser überflüssige
      // Aufruf einen bereits gezeichneten Frame weg und der Canvas bliebe bis
      // zum nächsten rAF-Tick schwarz (das war ein echter Bug, kein Test-Artefakt).
      const unchanged =
        newWidth === width && newHeight === height && newDpr === dpr;

      width = newWidth;
      height = newHeight;
      dpr = newDpr;

      if (!unchanged) {
        canvas!.width = Math.round(width * dpr);
        canvas!.height = Math.round(height * dpr);
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const target = bubbleCount();
      if (bubbles.length === 0) {
        bubbles = Array.from({ length: target }, () => makeBubble(false));
      } else if (bubbles.length < target) {
        bubbles.push(
          ...Array.from({ length: target - bubbles.length }, () => makeBubble(true)),
        );
      } else if (bubbles.length > target) {
        bubbles.length = target;
      }

      // Sofort neu zeichnen: nach einer echten Grössenänderung ist der Canvas
      // sonst bis zum nächsten rAF-Tick leer/schwarz.
      if (!unchanged) step(performance.now());
    }

    function drawBackground(t: number) {
      const g = ctx!.createLinearGradient(0, 0, width * 0.3, height);
      const shift = Math.sin(t / 9000) * 0.06;
      g.addColorStop(0, "#0a1f52");
      g.addColorStop(Math.max(0, 0.42 + shift), "#0132af");
      g.addColorStop(1, "#2f5fe0");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, width, height);

      // Kaustik-Flecken: weiche, langsam wandernde Lichtinseln.
      ctx!.globalCompositeOperation = "screen";
      const blobs = 4;
      for (let i = 0; i < blobs; i++) {
        const bx = width * (0.15 + 0.22 * i) + Math.sin(t / 6000 + i * 2) * width * 0.08;
        const by = height * 0.3 + Math.cos(t / 7000 + i) * height * 0.25;
        const br = Math.min(width, height) * (0.28 + 0.05 * i);
        const rg = ctx!.createRadialGradient(bx, by, 0, bx, by, br);
        rg.addColorStop(0, "rgba(98,143,255,0.16)");
        rg.addColorStop(1, "rgba(98,143,255,0)");
        ctx!.fillStyle = rg;
        ctx!.fillRect(0, 0, width, height);
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    function drawRipples(t: number) {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const age = t - ripples[i].start;
        if (age > RIPPLE_LIFE) {
          ripples.splice(i, 1);
          continue;
        }
        const p = age / RIPPLE_LIFE;
        const radius = 6 + p * 70;
        ctx!.strokeStyle = `rgba(255,255,255,${0.4 * (1 - p)})`;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.arc(ripples[i].x, ripples[i].y, radius, 0, Math.PI * 2);
        ctx!.stroke();
      }
    }

    function step(t: number) {
      drawBackground(t);

      for (const b of bubbles) {
        b.y -= (b.speed * 16) / 1000;
        const drift = Math.sin(t / 1000 * b.driftFreq + b.phase) * b.driftAmp;
        let x = b.x + drift;

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = b.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const reach = 90;
          if (dist < reach && dist > 0.01) {
            const force = (1 - dist / reach) * 26;
            x += (dx / dist) * force * (16 / 1000) * 10;
          }
        }

        if (b.y < -b.r * 2) {
          Object.assign(b, makeBubble(true));
          continue;
        }

        const sprite = b.sprite === 0 ? spriteA : spriteB;
        ctx!.globalAlpha = b.opacity;
        ctx!.drawImage(sprite, x - b.r, b.y - b.r, b.r * 2, b.r * 2);
        ctx!.globalAlpha = 1;
      }

      drawRipples(t);
    }

    let raf = 0;
    function loop(t: number) {
      step(t);
      raf = requestAnimationFrame(loop);
    }

    // resize() zeichnet den ersten Frame bereits synchron (s. oben) – bei
    // reduzierter Bewegung bleibt es dabei, sonst übernimmt ab hier rAF.
    resize();

    if (!reduceMotion) {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!reduceMotion) {
          if (visible && !raf) raf = requestAnimationFrame(loop);
          if (!visible && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        }
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    function onVisibility() {
      if (reduceMotion) return;
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!document.hidden && visible && !raf) {
        raf = requestAnimationFrame(loop);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    function toLocal(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function onPointerMove(e: PointerEvent) {
      const { x, y } = toLocal(e.clientX, e.clientY);
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }
    function onPointerDown(e: PointerEvent) {
      const { x, y } = toLocal(e.clientX, e.clientY);
      ripples.push({ x, y, start: performance.now() });
      if (reduceMotion) step(performance.now());
    }

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerup", onPointerLeave);
    canvas.addEventListener("pointercancel", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointerup", onPointerLeave);
      canvas.removeEventListener("pointercancel", onPointerLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // pan-y statt touch-none: der Hero ist die erste Bildschirmhöhe der
      // Seite, ein Finger-Swipe muss dort trotzdem nach unten scrollen
      // können. Ein Tap (keine Bewegung) löst trotzdem pointerdown aus.
      style={{ touchAction: "pan-y" }}
      className={`block h-full w-full ${className}`}
    />
  );
}
