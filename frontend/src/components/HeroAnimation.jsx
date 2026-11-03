import React, { useEffect, useId, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const EQUATIONS = katex.renderToString(String.raw`\begin{aligned}
  s &= i/235, \qquad e = s/7 - 13 \\
  k &= \bigl(4 + \cos(i/9 - 2t)\bigr)\cos(i/35) \\
  d &= \sqrt{k^2 + e^2} + \sin(e/9 + t/2) - 4 \\
  q &= 2\sin(3k) - \frac{sk}{35}\bigl[9 \\
    &\qquad {}+ k\sin\bigl(9\cos(e) - 2d + t\bigr)\bigr] \\
  x &= q + 40\cos(d-t) + 200 \\
  y &= q\sin(d-t) + 35d
\end{aligned}`, { displayMode: true, throwOnError: true });

// Crop the empty margins of the original 400 × 400 sketch.
const WIDTH = 240;
const HEIGHT = 360;
const LOOP_DURATION = 160 * 33;
const FRAME_INTERVAL = 1000 / 30;
const POINTS = Array.from({ length: 10000 }, (_, index) => {
  const i = 9999 - index;
  const y = i / 235;
  const e = y / 7 - 13;
  return { phase: i / 9, wave: Math.cos(i / 35), y, e, bend: Math.cos(e) * 9 };
});

const HeroAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const dismissOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
        setIsPinned(false);
      }
    };
    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, [isOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const pixels = context.createImageData(WIDTH, HEIGHT);
    const counts = new Uint16Array(WIDTH * HEIGHT);
    const opacity = Uint8Array.from({ length: POINTS.length + 1 }, (_, count) =>
      Math.round(255 * (1 - (1 - 96 / 255) ** count))
    );
    for (let offset = 0; offset < pixels.data.length; offset += 4) {
      pixels.data[offset] = 255;
      pixels.data[offset + 1] = 255;
      pixels.data[offset + 2] = 255;
    }

    const draw = (t) => {
      counts.fill(0);
      for (const { phase, wave, y, e, bend } of POINTS) {
        const k = (4 + Math.cos(phase - t * 2)) * wave;
        const d = Math.hypot(k, e) + Math.sin(e / 9 + t / 2) - 4;
        const q = 2 * Math.sin(k * 3) - y / 35 * k * (9 + k * Math.sin(bend - d * 2 + t));
        const c = d - t;
        const x = Math.round(q + 40 * Math.cos(c) + 200) - 80;
        const py = Math.round(q * Math.sin(c) + d * 35) - 40;
        if (x >= 0 && x < WIDTH && py >= 0 && py < HEIGHT) {
          counts[py * WIDTH + x] += 1;
        }
      }
      for (let index = 0; index < counts.length; index += 1) {
        pixels.data[index * 4 + 3] = opacity[counts[index]];
      }
      context.putImageData(pixels, 0, 0);
    };

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationId;
    let inView = true;
    let elapsed = 0;
    let previousTime;
    let lastDraw = 0;

    const animate = (now) => {
      if (previousTime !== undefined) elapsed += now - previousTime;
      previousTime = now;
      if (now - lastDraw >= FRAME_INTERVAL) {
        draw(Math.PI / 80 + (elapsed % LOOP_DURATION) / LOOP_DURATION * Math.PI * 4);
        lastDraw = now;
      }
      animationId = window.requestAnimationFrame(animate);
    };

    const syncPlayback = () => {
      window.cancelAnimationFrame(animationId);
      previousTime = undefined;
      if (!reducedMotion.matches && inView && !document.hidden) {
        animationId = window.requestAnimationFrame(animate);
      }
    };

    draw(Math.PI / 80);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(canvas);
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-animation-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => { if (!isPinned) setIsOpen(false); }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
          setIsPinned(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          setIsPinned(false);
          event.stopPropagation();
        }
      }}
    >
      <button
        type="button"
        className="hero-animation-trigger"
        aria-label="Explore the math behind Coki"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onFocus={() => setIsOpen(true)}
        onClick={() => {
          setIsPinned(!isPinned);
          setIsOpen(!isPinned);
        }}
      >
        <canvas ref={canvasRef} className="hero-animation" width={WIDTH} height={HEIGHT} aria-hidden="true" />
      </button>
      <div className="hero-math-popover" id={panelId} hidden={!isOpen}>
        <section className="hero-math-card" aria-label="Coki equations">
          <h2 className="hero-math-title">Coki</h2>
          <div className="hero-math-equations" dangerouslySetInnerHTML={{ __html: EQUATIONS }} />
        </section>
      </div>
    </div>
  );
};

export default HeroAnimation;
