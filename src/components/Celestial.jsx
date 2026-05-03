import React, { useEffect, useMemo, useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoonCanvas } from "./CelestialCanvas";

/** Scroll through the home hero only: subtle shrink, fade, slight downward drift. */
function useOrbScrollNudge(homeScrollTargetRef, reduceMotion) {
  const { scrollYProgress } = useScroll({
    target: homeScrollTargetRef,
    offset: ["start start", "end start"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.94], { clamp: true });
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9], { clamp: true });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 20], { clamp: true });
  return {
    scrollScale: reduceMotion ? 1 : scrollScale,
    scrollOpacity: reduceMotion ? 1 : scrollOpacity,
    scrollY: reduceMotion ? 0 : scrollY,
  };
}

const MOON_TOP = 76;
const MOON_RIGHT = 14;

function moonBoxPx(width) {
  if (width >= 768) return 220;
  if (width >= 640) return 200;
  return 180;
}

/** Bottom-right screen corner: moon sits just above the bottom safe area. */
function getMoonIntroStart() {
  if (typeof window === "undefined") {
    return { top: 520, right: MOON_RIGHT };
  }
  const h = window.innerHeight;
  const w = window.innerWidth;
  const box = moonBoxPx(w);
  const marginBottom = 20;
  const top = Math.round(Math.max(MOON_TOP + 40, h - box - marginBottom));
  return {
    top,
    right: MOON_RIGHT,
  };
}

function centeredGlowMoon({ sizePct, blurPx, gradient }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: sizePct,
        background: gradient,
        filter: `blur(${blurPx}px)`,
      }}
    />
  );
}

function MoonGlSquareHost({ children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const apply = () => {
      const s = Math.max(2, Math.floor(Math.min(outer.clientWidth, outer.clientHeight)));
      inner.style.width = `${s}px`;
      inner.style.height = `${s}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(outer);
    const r1 = requestAnimationFrame(apply);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(apply));
    const t = window.setTimeout(apply, 160);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="flex h-full w-full min-h-0 min-w-0 flex-none items-center justify-center"
    >
      <div ref={innerRef} className="relative shrink-0 overflow-hidden rounded-full">
        {children}
      </div>
    </div>
  );
}

function MoonOrbClip({ children, label }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] isolate"
      role="img"
      aria-label={label}
    >
      <MoonGlSquareHost>{children}</MoonGlSquareHost>
    </div>
  );
}

const MOON_BOX =
  "pointer-events-none absolute z-[6] aspect-square h-[180px] w-[180px] shrink-0 sm:h-[200px] sm:w-[200px] md:h-[220px] md:w-[220px]";

export function NightMoon({ homeScrollTargetRef, reduceMotion, onIntroComplete }) {
  const { scrollScale, scrollOpacity, scrollY } = useOrbScrollNudge(homeScrollTargetRef, reduceMotion);
  const introStart = useMemo(() => getMoonIntroStart(), []);
  const introNotified = useRef(false);
  const [moonLocked, setMoonLocked] = useState(false);

  const fireIntroComplete = useCallback(() => {
    if (introNotified.current) return;
    introNotified.current = true;
    onIntroComplete?.();
  }, [onIntroComplete]);

  const onMoonIntroDone = useCallback(() => {
    fireIntroComplete();
    setMoonLocked(true);
  }, [fireIntroComplete]);

  useEffect(() => {
    if (reduceMotion) {
      fireIntroComplete();
    }
  }, [reduceMotion, fireIntroComplete]);

  const boxStyle = useMemo(
    () => ({
      top: MOON_TOP,
      right: MOON_RIGHT,
    }),
    []
  );

  if (reduceMotion) {
    return (
      <div className={MOON_BOX} style={boxStyle}>
        <motion.div
          className="relative h-full w-full min-h-0 min-w-0 overflow-visible"
          style={{
            scale: scrollScale,
            opacity: scrollOpacity,
            y: scrollY,
            transformOrigin: "50% 50%",
          }}
        >
          {centeredGlowMoon({
            sizePct: "min(300%, 58vh)",
            blurPx: 36,
            gradient:
              "radial-gradient(circle closest-side, rgba(230,240,255,0.55) 0%, rgba(180,205,255,0.26) 42%, rgba(150,175,230,0.08) 62%, transparent 78%)",
          })}
          {centeredGlowMoon({
            sizePct: "min(245%, 48vh)",
            blurPx: 24,
            gradient:
              "radial-gradient(circle closest-side, rgba(248,250,252,0.48) 0%, rgba(200,215,245,0.2) 46%, rgba(180,200,235,0.06) 68%, transparent 82%)",
          })}
          {centeredGlowMoon({
            sizePct: "min(190%, 38vh)",
            blurPx: 14,
            gradient:
              "radial-gradient(circle closest-side, rgba(255,255,255,0.22) 0%, rgba(220,230,250,0.12) 52%, rgba(200,218,250,0.05) 72%, transparent 86%)",
          })}
          <MoonOrbClip label="Moon">
            <MoonCanvas reduceMotion={reduceMotion} />
          </MoonOrbClip>
        </motion.div>
      </div>
    );
  }

  /** Square box only: rotate here (safe). Inner WebGL host stays unrotated in layout sense. */
  const introDuration = 2.05;
  const introTimes = [0, 0.38, 1];

  return (
    <motion.div
      className={MOON_BOX}
      initial={{
        top: introStart.top,
        right: introStart.right,
        opacity: 0.92,
        scale: 1,
        rotate: 0,
      }}
      animate={{
        top: [introStart.top, introStart.top, MOON_TOP],
        right: [MOON_RIGHT, MOON_RIGHT, MOON_RIGHT],
        opacity: [0.92, 1, 1],
        scale: 1,
        rotate: [0, 360, 360],
      }}
      transition={{
        duration: introDuration,
        times: introTimes,
        ease: ["easeInOut", [0.22, 0.88, 0.12, 1]],
      }}
      onAnimationComplete={onMoonIntroDone}
      style={{ transformOrigin: "50% 50%" }}
    >
      <motion.div
        className="relative h-full w-full min-h-0 min-w-0 overflow-visible"
        style={{
          scale: scrollScale,
          opacity: scrollOpacity,
          y: scrollY,
          transformOrigin: "50% 50%",
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: moonLocked ? 1 : 0 }}
          transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          {centeredGlowMoon({
            sizePct: "min(300%, 58vh)",
            blurPx: 36,
            gradient:
              "radial-gradient(circle closest-side, rgba(230,240,255,0.55) 0%, rgba(180,205,255,0.26) 42%, rgba(150,175,230,0.08) 62%, transparent 78%)",
          })}
          {centeredGlowMoon({
            sizePct: "min(245%, 48vh)",
            blurPx: 24,
            gradient:
              "radial-gradient(circle closest-side, rgba(248,250,252,0.48) 0%, rgba(200,215,245,0.2) 46%, rgba(180,200,235,0.06) 68%, transparent 82%)",
          })}
          {centeredGlowMoon({
            sizePct: "min(190%, 38vh)",
            blurPx: 14,
            gradient:
              "radial-gradient(circle closest-side, rgba(255,255,255,0.22) 0%, rgba(220,230,250,0.12) 52%, rgba(200,218,250,0.05) 72%, transparent 86%)",
          })}
        </motion.div>

        <MoonOrbClip label="Moon">
          <MoonCanvas reduceMotion={reduceMotion} />
        </MoonOrbClip>
      </motion.div>
    </motion.div>
  );
}
