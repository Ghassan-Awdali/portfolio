import React, { useState, useCallback, useMemo, useEffect, useRef, useId } from "react";
import { motion } from "framer-motion";

/** Lens-flare style spikes; `compact` = smaller spikes for distant / subtle stars. */
export function StarBurst({
  sizePx,
  rotationDeg = 0,
  depth = 0.6,
  compact = false,
  className = "",
  style = {},
}) {
  const uid = useId().replace(/:/g, "");
  const long = compact ? 26 : 44;
  const short = compact ? 14 : 24;
  const micro = compact ? 7 : 14;
  const blur = (compact ? 0.35 : 0.6) + (1 - depth) * (compact ? 1.1 : 1.8);
  const lines = [];
  for (let i = 0; i < 4; i++) {
    const deg = i * 90 + rotationDeg;
    lines.push(
      <line
        key={`L${i}`}
        x1="0"
        y1="0"
        x2="0"
        y2={-long}
        stroke="rgba(255,255,255,0.92)"
        strokeWidth={compact ? 0.75 : 1.15}
        strokeLinecap="round"
        transform={`rotate(${deg})`}
      />
    );
  }
  for (let i = 0; i < 4; i++) {
    const deg = 45 + i * 90 + rotationDeg;
    lines.push(
      <line
        key={`S${i}`}
        x1="0"
        y1="0"
        x2="0"
        y2={-short}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth={compact ? 0.5 : 0.75}
        strokeLinecap="round"
        transform={`rotate(${deg})`}
      />
    );
  }
  for (let i = 0; i < 8; i++) {
    const deg = 22.5 + i * 45 + rotationDeg;
    lines.push(
      <line
        key={`M${i}`}
        x1="0"
        y1="0"
        x2="0"
        y2={-micro}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={compact ? 0.32 : 0.45}
        strokeLinecap="round"
        transform={`rotate(${deg})`}
      />
    );
  }

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="-50 -50 100 100"
      className={className}
      style={{ overflow: "visible", ...style }}
      aria-hidden
    >
      <defs>
        <radialGradient id={`coreglow-${uid}`}>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id={`starburst-${uid}`} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="g" />
          <feMerge>
            <feMergeNode in="g" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#starburst-${uid})`}>{lines}</g>
      <circle r={compact ? 1.8 : 2.8} fill="rgba(255,255,255,0.98)" />
      <circle r={compact ? 4.5 : 7} fill={`url(#coreglow-${uid})`} opacity={0.35 + depth * 0.35} />
    </svg>
  );
}

const CLOUD_SLOT_COUNT = 9;

function randomCloud(slot) {
  const fromLeft = Math.random() > 0.5;
  const startX = fromLeft
    ? `${-5 + Math.random() * 26}vw`
    : `${72 + Math.random() * 20}vw`;
  const endX = fromLeft
    ? `${108 + Math.random() * 18}vw`
    : `${-6 - Math.random() * 18}vw`;
  return {
    slot,
    gen: 0,
    fromLeft,
    startX,
    endX,
    y: 6 + Math.random() * 48,
    duration: 34 + Math.random() * 46,
    scale: 0.72 + Math.random() * 0.38,
    driftY: (Math.random() - 0.5) * 14,
    layer: slot % 4,
  };
}

function randomStar(slot) {
  const kind = Math.random() < 0.78 ? "dot" : "burst";
  return {
    slot,
    gen: 0,
    fromLeft: Math.random() > 0.5,
    y: 5 + Math.random() * 62,
    duration: 38 + Math.random() * 72,
    kind,
    span: kind === "dot" ? 1.2 + Math.random() * 2.4 : 6 + Math.random() * 9,
    opacity: kind === "dot" ? 0.48 + Math.random() * 0.38 : 0.4 + Math.random() * 0.36,
    depth: Math.random(),
    rot: Math.random() * 360,
  };
}

function CloudPuffs({ scale, layer }) {
  const s = typeof scale === "number" ? scale : 1;
  const depthFade = 0.55 + layer * 0.1;
  const blurOuter = 22 + layer * 4;
  const blurMid = 10 + layer * 2;
  return (
    <div
      className="relative h-full w-full"
      style={{
        transform: `scale(${s})`,
        opacity: depthFade,
      }}
    >
      <div className="absolute inset-0" style={{ filter: `blur(${blurOuter}px)` }}>
        <div className="absolute left-[2%] top-[18%] h-[58%] w-[68%] rounded-full bg-white/75" />
        <div className="absolute right-[6%] top-[28%] h-[48%] w-[58%] rounded-full bg-sky-50/85" />
        <div className="absolute bottom-[8%] left-[22%] h-[42%] w-[62%] rounded-full bg-white/65" />
      </div>
      <div className="absolute inset-0 opacity-70" style={{ filter: `blur(${blurMid}px)` }}>
        <div className="absolute left-[8%] top-[24%] h-[45%] w-[55%] rounded-full bg-sky-100/80" />
        <div className="absolute right-[12%] top-[34%] h-[40%] w-[50%] rounded-full bg-white/70" />
      </div>
      <div className="absolute inset-0 opacity-45" style={{ filter: "blur(3px)" }}>
        <div className="absolute left-[12%] top-[30%] h-[38%] w-[48%] rounded-full bg-white/55" />
      </div>
    </div>
  );
}

function DriftingCloud({ config, onDone, reduceMotion }) {
  const { y, duration, scale, driftY, gen, slot, layer, startX, endX } = config;

  if (reduceMotion) return null;

  return (
    <motion.div
      key={`c-${slot}-${gen}`}
      className="pointer-events-none absolute left-0"
      style={{
        top: `${y}%`,
        width: "min(56vw, 480px)",
        height: "min(20vh, 180px)",
        zIndex: 1 + layer,
      }}
      initial={{ opacity: 0.62, x: startX, y: 0 }}
      animate={{
        opacity: [0.58, 0.64, 0.52, 0],
        x: [startX, endX],
        y: [0, driftY],
      }}
      transition={{
        duration,
        times: [0, 0.2, 0.92, 1],
        ease: "linear",
        delay: 0,
      }}
      onAnimationComplete={() => onDone(slot)}
    >
      <CloudPuffs scale={scale} layer={layer} />
    </motion.div>
  );
}

function DriftingStar({ config, onDone, reduceMotion }) {
  const { fromLeft, y, duration, span, opacity, depth, rot, gen, slot, kind } = config;
  const startX = fromLeft ? "-6vw" : "106vw";
  const endX = fromLeft ? "106vw" : "-6vw";

  if (reduceMotion) return null;

  return (
    <motion.div
      key={`s-${slot}-${gen}`}
      className="pointer-events-none absolute left-0 flex items-center justify-center"
      style={{
        top: `${y}%`,
        width: span,
        height: span,
        marginLeft: -span / 2,
        marginTop: -span / 2,
      }}
      initial={{ opacity: 0, x: startX, scale: 1 }}
      animate={{
        opacity: [0, opacity, opacity, opacity * 0.85, 0],
        x: [startX, startX, endX, endX],
        scale: [1, 1.04, 1, 1.05, 0.98],
      }}
      transition={{
        duration,
        times: [0, 0.06, 0.88, 0.94, 1],
        ease: "linear",
        delay: slot * 0.35,
      }}
      onAnimationComplete={() => onDone(slot)}
    >
      {kind === "dot" ? (
        <div
          className="rounded-full bg-white"
          style={{
            width: span,
            height: span,
            boxShadow:
              "0 0 4px rgba(255,255,255,0.95), 0 0 12px rgba(186,230,253,0.55), 0 0 20px rgba(147,197,253,0.35)",
            opacity: 0.92,
          }}
        />
      ) : (
        <StarBurst sizePx={span} depth={depth} rotationDeg={rot} compact />
      )}
    </motion.div>
  );
}

function buildPlanePath(fromLeft, w, h) {
  const n = 48;
  const xs = [];
  const ys = [];
  const yLane = h * (0.1 + Math.random() * 0.1);
  const cruiseAmp = h * (0.008 + Math.random() * 0.006);
  const bankAmp = h * (0.014 + Math.random() * 0.008);

  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = fromLeft ? -80 + t * (w + 160) : w + 80 - t * (w + 160);
    const longArc = Math.sin(t * Math.PI) * bankAmp;
    const lightWave = Math.sin(t * Math.PI * 2.2) * cruiseAmp * 0.35;
    const y = yLane + longArc + lightWave;
    xs.push(x);
    ys.push(y);
  }

  const opacities = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    if (t < 0.05) opacities.push(Math.min(1, t / 0.05));
    else if (t > 0.97) opacities.push(Math.max(0, (1 - t) / 0.03));
    else opacities.push(1);
  }

  const rots = [];
  for (let i = 0; i <= n; i++) {
    const i0 = Math.max(0, i - 1);
    const i1 = Math.min(n, i + 1);
    const dx = xs[i1] - xs[i0] || 0.001;
    const dy = ys[i1] - ys[i0];
    rots.push((Math.atan2(dy, dx) * 180) / Math.PI);
  }

  const duration = 52 + Math.random() * 40;
  const times = xs.map((_, i) => i / n);
  return { xs, ys, rots, opacities, times, duration };
}

function PlaneSilhouette({ facingRight }) {
  return (
    <svg
      width="30"
      height="15"
      viewBox="0 0 32 16"
      className="opacity-90 drop-shadow-sm"
      style={{ transform: facingRight ? "scale(0.92)" : "scaleX(-0.92) scaleY(0.92)" }}
      aria-hidden
    >
      <path
        d="M1 8 L14 6 L26 8 L24 10 L12 9 Z"
        fill="#475569"
        stroke="#334155"
        strokeWidth="0.4"
      />
      <path d="M15 6 L22 2.5 L24 5 Z" fill="#64748b" stroke="#475569" strokeWidth="0.32" />
      <path d="M15 10 L20 13 L14 11 Z" fill="#1e293b" opacity="0.82" />
    </svg>
  );
}

function SkyPlane({ config, onDone, reduceMotion }) {
  const { fromLeft, gen, slot, delay } = config;
  const path = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        xs: [0, 100],
        ys: [0, 0],
        rots: [0, 0],
        opacities: [1, 1],
        times: [0, 1],
        duration: 20,
      };
    }
    return buildPlanePath(fromLeft, window.innerWidth, window.innerHeight);
  }, [fromLeft, gen]);

  if (reduceMotion) return null;

  const { xs, ys, rots, opacities, times, duration } = path;

  return (
    <motion.div
      key={`p-${slot}-${gen}`}
      className="pointer-events-none absolute left-0 top-0 opacity-90"
      initial={{ x: xs[0], y: ys[0], opacity: 0, rotate: rots[0] }}
      animate={{ x: xs, y: ys, rotate: rots, opacity: opacities }}
      transition={{
        duration,
        times,
        ease: "linear",
        delay,
      }}
      onAnimationComplete={() => onDone(slot)}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div
          className="absolute right-full top-1/2 mr-0.5 h-[2px] w-[min(28vw,200px)] -translate-y-1/2 opacity-75"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 25%, rgba(226,232,240,0.45) 55%, rgba(148,163,184,0.25) 85%, transparent 100%)",
            transformOrigin: "right center",
            filter: "blur(0.35px)",
          }}
        />
        <div
          className="absolute right-full top-1/2 mr-1 h-px w-[min(22vw,140px)] -translate-y-1/2 opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            transformOrigin: "right center",
          }}
        />
        <PlaneSilhouette facingRight={fromLeft} />
      </div>
    </motion.div>
  );
}

function randomPlane(slot, gen) {
  return {
    slot,
    gen,
    fromLeft: Math.random() > 0.5,
    delay: Math.random() * 3,
  };
}

export function DriftingCloudLayer({ reduceMotion }) {
  const [clouds, setClouds] = useState(() =>
    Array.from({ length: CLOUD_SLOT_COUNT }, (_, i) => randomCloud(i))
  );
  const recycle = useCallback((slot) => {
    setClouds((prev) =>
      prev.map((c) =>
        c.slot === slot ? { ...randomCloud(slot), slot, gen: c.gen + 1 } : c
      )
    );
  }, []);

  if (reduceMotion) return null;

  return (
    <>
      {clouds.map((c) => (
        <DriftingCloud key={`${c.slot}-${c.gen}`} config={c} onDone={recycle} reduceMotion={reduceMotion} />
      ))}
    </>
  );
}

const FLOATING_STAR_COUNT = 52;

export function FloatingStarField({ reduceMotion }) {
  const stars = useMemo(
    () =>
      Array.from({ length: FLOATING_STAR_COUNT }, () => {
        const kind = Math.random() < 0.72 ? "dot" : "burst";
        const span = kind === "dot" ? 1.1 + Math.random() * 2.6 : 6 + Math.random() * 9;
        return {
          x: Math.random() * 100,
          y: Math.random() * 100,
          kind,
          span,
          depth: Math.random(),
          rot: Math.random() * 360,
          op: kind === "dot" ? 0.5 + Math.random() * 0.38 : 0.42 + Math.random() * 0.34,
          dx: 3 + Math.random() * 6,
          dy: 2.5 + Math.random() * 5,
          dur: 22 + Math.random() * 28,
          delay: Math.random() * 6,
        };
      }),
    []
  );

  return (
    <>
      {stars.map((s, i) => (
        <motion.div
          key={`float-star-${i}`}
          className="absolute flex items-center justify-center"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.span,
            height: s.span,
            marginLeft: -s.span / 2,
            marginTop: -s.span / 2,
          }}
          animate={
            reduceMotion
              ? { opacity: s.op }
              : {
                  x: [0, s.dx * 0.45, 0, -s.dx * 0.38, 0],
                  y: [0, -s.dy * 0.42, 0, s.dy * 0.42, 0],
                  opacity: [s.op * 0.88, s.op * 1.05, s.op * 0.92, s.op, s.op],
                  scale: [1, 1.06, 0.98, 1.04, 1],
                }
          }
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          {s.kind === "dot" ? (
            <div
              className="rounded-full bg-white/90"
              style={{
                width: s.span,
                height: s.span,
                boxShadow:
                  "0 0 3px rgba(255,255,255,0.95), 0 0 10px rgba(186,230,253,0.55), 0 0 18px rgba(147,197,253,0.35)",
              }}
            />
          ) : (
            <StarBurst
              sizePx={s.span}
              depth={s.depth}
              rotationDeg={s.rot}
              compact
              style={{ opacity: 0.92 }}
            />
          )}
        </motion.div>
      ))}
    </>
  );
}

const DRIFTING_STAR_SLOTS = 10;

export function DriftingStarLayer({ reduceMotion }) {
  const [stars, setStars] = useState(() =>
    Array.from({ length: DRIFTING_STAR_SLOTS }, (_, i) => randomStar(i))
  );
  const recycle = useCallback((slot) => {
    setStars((prev) =>
      prev.map((c) =>
        c.slot === slot ? { ...randomStar(slot), slot, gen: c.gen + 1 } : c
      )
    );
  }, []);

  if (reduceMotion) return null;

  return (
    <>
      {stars.map((c) => (
        <DriftingStar key={`${c.slot}-${c.gen}`} config={c} onDone={recycle} reduceMotion={reduceMotion} />
      ))}
    </>
  );
}

const PLANE_IDLE_MIN_MS = 42_000;
const PLANE_IDLE_MAX_MS = 88_000;
const PLANE_FIRST_DELAY_MS = 5_500;

export function SkyPlaneFleet({ reduceMotion }) {
  const [plane, setPlane] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const first = window.setTimeout(() => {
      setPlane(randomPlane(0, 0));
    }, PLANE_FIRST_DELAY_MS + Math.random() * 9000);
    return () => clearTimeout(first);
  }, [reduceMotion]);

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    []
  );

  const onDone = useCallback(() => {
    setPlane((current) => {
      const nextGen = current ? current.gen + 1 : 0;
      const wait = PLANE_IDLE_MIN_MS + Math.random() * (PLANE_IDLE_MAX_MS - PLANE_IDLE_MIN_MS);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
        setPlane(randomPlane(0, nextGen));
      }, wait);
      return null;
    });
  }, []);

  if (reduceMotion || !plane) return null;

  return <SkyPlane key={`${plane.slot}-${plane.gen}`} config={plane} onDone={onDone} reduceMotion={reduceMotion} />;
}
