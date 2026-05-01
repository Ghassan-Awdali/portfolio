import React, { useEffect, useId, useMemo } from "react";
import {
  motion,
  useAnimationControls,
  useScroll,
  useTransform,
} from "framer-motion";

function getLayout(finalTopPx, finalRightPx) {
  if (typeof window === "undefined") {
    return {
      startTop: 420,
      startRight: 18,
      endTop: finalTopPx,
      endRight: finalRightPx,
    };
  }
  const h = window.innerHeight;
  const w = window.innerWidth;
  return {
    startTop: Math.round(Math.min(h * 0.56, h - 140)),
    startRight: Math.max(12, Math.round(w * 0.028)),
    endTop: finalTopPx,
    endRight: finalRightPx,
  };
}

function useCelestialIntro(reduceMotion, layout, controls, onIntroComplete) {
  useEffect(() => {
    if (reduceMotion) {
      void controls.set({
        top: layout.endTop,
        right: layout.endRight,
        rotate: 0,
      });
      onIntroComplete?.();
      return;
    }

    const { startTop, startRight, endTop, endRight } = layout;

    let active = true;
    const run = async () => {
      await controls.set({ top: startTop, right: startRight, rotate: 0 });
      if (!active) return;

      await controls.start({
        rotate: 720,
        transition: { duration: 1.25, ease: [0.22, 0.88, 0.18, 1] },
      });
      if (!active) return;

      await controls.start({
        rotate: [720, 710, 726, 714, 722, 720],
        transition: { duration: 0.82, ease: [0.42, 0, 0.58, 1] },
      });
      if (!active) return;

      await controls.start({
        top: endTop,
        right: endRight,
        rotate: 720,
        transition: { duration: 1.15, ease: [0.34, 1, 0.36, 1] },
      });
      if (active) onIntroComplete?.();
    };

    void run();
    return () => {
      active = false;
    };
  }, [controls, reduceMotion, layout, onIntroComplete]);
}

export function NightMoon({ reduceMotion, onIntroComplete }) {
  const uid = useId().replace(/:/g, "");
  const finalTop = 76;
  const finalRight = 14;
  const layout = useMemo(() => getLayout(finalTop, finalRight), [finalTop, finalRight]);
  const controls = useAnimationControls();
  useCelestialIntro(reduceMotion, layout, controls, onIntroComplete);

  const { scrollYProgress } = useScroll();
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 0.4, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.72]);

  const initial = reduceMotion
    ? { top: layout.endTop, right: layout.endRight, rotate: 0 }
    : { top: layout.startTop, right: layout.startRight, rotate: 0 };

  return (
    <motion.div
      className="pointer-events-none fixed z-[12] h-36 w-36 sm:h-40 sm:w-40 md:h-44 md:w-44"
      style={{ opacity: scrollOpacity, scale: scrollScale }}
      initial={initial}
      animate={controls}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(248,250,252,0.55) 0%, rgba(226,232,240,0.28) 22%, rgba(148,163,184,0.12) 48%, transparent 68%)",
          filter: "blur(22px)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[155%] w-[155%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(226,232,240,0.4) 0%, rgba(100,116,139,0.08) 40%, transparent 62%)",
          filter: "blur(12px)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(203,213,225,0.06) 55%, transparent 72%)",
          filter: "blur(6px)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full overflow-visible"
        role="img"
        aria-label="Moon"
      >
        <defs>
          <radialGradient id={`moonBody-${uid}`} cx="28%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="38%" stopColor="#e2e8f0" />
            <stop offset="68%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
          <radialGradient id={`moonLimb-${uid}`} cx="78%" cy="62%" r="62%">
            <stop offset="0%" stopColor="rgba(15,23,42,0)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0.48)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="47" fill={`url(#moonBody-${uid})`} />
        <circle cx="50" cy="50" r="47" fill={`url(#moonLimb-${uid})`} />
        <ellipse cx="26" cy="32" rx="14" ry="9" fill="rgba(51,65,85,0.14)" />
        <ellipse cx="68" cy="44" rx="17" ry="11" fill="rgba(51,65,85,0.11)" />
        <ellipse cx="44" cy="74" rx="12" ry="8" fill="rgba(51,65,85,0.09)" />
        <ellipse cx="72" cy="68" rx="10" ry="7" fill="rgba(30,41,59,0.08)" />
        <circle cx="78" cy="26" r="6" fill="none" stroke="rgba(71,85,105,0.2)" strokeWidth="0.85" />
        <circle cx="22" cy="58" r="5" fill="none" stroke="rgba(71,85,105,0.16)" strokeWidth="0.65" />
        <circle cx="58" cy="22" r="4.2" fill="rgba(100,116,139,0.12)" />
        <circle cx="36" cy="82" r="3.8" fill="rgba(71,85,105,0.11)" />
        <circle cx="86" cy="52" r="3.2" fill="none" stroke="rgba(100,116,139,0.14)" strokeWidth="0.55" />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="rgba(248,250,252,0.2)"
          strokeWidth="0.35"
        />
      </svg>
    </motion.div>
  );
}

const SUN_RAY_COUNT = 20;

export function DaySunOrb({ reduceMotion, onIntroComplete }) {
  const uid = useId().replace(/:/g, "");
  const finalTop = 72;
  const finalRight = 10;
  const layout = useMemo(() => getLayout(finalTop, finalRight), [finalTop, finalRight]);
  const controls = useAnimationControls();
  useCelestialIntro(reduceMotion, layout, controls, onIntroComplete);

  const { scrollYProgress } = useScroll();
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 0.4, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const rays = useMemo(
    () =>
      Array.from({ length: SUN_RAY_COUNT }, (_, i) => {
        const a = (i / SUN_RAY_COUNT) * Math.PI * 2;
        const r = 46;
        return { i, x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r };
      }),
    []
  );

  const initial = reduceMotion
    ? { top: layout.endTop, right: layout.endRight, rotate: 0 }
    : { top: layout.startTop, right: layout.startRight, rotate: 0 };

  return (
    <motion.div
      className="pointer-events-none fixed z-[12] h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-64 lg:w-64"
      style={{ opacity: scrollOpacity, scale: scrollScale }}
      initial={initial}
      animate={controls}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,251,235,0.55) 0%, rgba(253,224,71,0.22) 28%, rgba(251,191,36,0.08) 48%, transparent 62%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[165%] w-[165%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(254,243,199,0.45) 0%, rgba(251,191,36,0.15) 38%, transparent 58%)",
          filter: "blur(16px)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(253,224,71,0.35) 35%, transparent 55%)",
          filter: "blur(8px)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <radialGradient id={`sunCore-${uid}`} cx="30%" cy="30%" r="58%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fffbeb" />
            <stop offset="55%" stopColor="#fde047" />
            <stop offset="85%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#eab308" />
          </radialGradient>
          <radialGradient id={`sunLimb-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="rgba(251,146,60,0)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0.35)" />
          </radialGradient>
        </defs>

        <motion.g
          style={{ transformOrigin: "50px 50px" }}
          animate={reduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {rays.map((r) => (
            <line
              key={r.i}
              x1="50"
              y1="50"
              x2={r.x}
              y2={r.y}
              stroke="rgba(255,250,220,0.4)"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          ))}
        </motion.g>

        <circle cx="50" cy="50" r="31" fill={`url(#sunCore-${uid})`} />
        <circle cx="50" cy="50" r="31" fill={`url(#sunLimb-${uid})`} />
        <circle
          cx="50"
          cy="50"
          r="31"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="0.5"
        />
      </svg>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.65) 0%, rgba(255,251,235,0.2) 45%, transparent 70%)",
        }}
        animate={reduceMotion ? {} : { opacity: [0.75, 1, 0.75], scale: [1, 1.04, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
