import React, { useMemo, useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  DriftingCloudLayer,
  DriftingStarLayer,
  FloatingStarField,
  SkyPlaneFleet,
} from "./SkyEffects";

function buildMeteors(w, h) {
  const margin = 160;
  return Array.from({ length: 4 }, (_, i) => {
    const fromLeft = i % 2 === 0;
    const y0 = Math.random() * h * 0.5 + h * 0.02;
    const slope = 0.18 + Math.random() * 0.32;
    let x0;
    let y1;
    let x1;
    if (fromLeft) {
      x0 = -margin;
      x1 = w + margin;
      y1 = y0 + (x1 - x0) * slope;
    } else {
      x0 = w + margin;
      x1 = -margin;
      y1 = y0 + (x0 - x1) * slope;
    }
    const dx = x1 - x0;
    const dy = y1 - y0;
    const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
    const dist = Math.hypot(dx, dy);
    const trail = Math.min(380, Math.max(160, dist * 0.2));
    return {
      startX: x0,
      startY: y0,
      endX: x1,
      endY: y1,
      angleDeg,
      trail,
      delay: Math.random() * 16,
      duration: 0.85 + Math.random() * 0.65,
      repeatDelay: 5 + Math.random() * 10,
    };
  });
}

const PLANE_DELAY_AFTER_SUN_MS = 2800;

const Particles = ({ celestialIntroDone }) => {
  const { isDarkMode } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  const [planesReady, setPlanesReady] = useState(false);

  useEffect(() => {
    setPlanesReady(false);
  }, [isDarkMode]);

  useEffect(() => {
    if (!celestialIntroDone || isDarkMode) return;
    const t = window.setTimeout(() => setPlanesReady(true), PLANE_DELAY_AFTER_SUN_MS);
    return () => clearTimeout(t);
  }, [celestialIntroDone, isDarkMode]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 28, damping: 20 });
  const parallaxY = useSpring(mouseY, { stiffness: 28, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return undefined;
    const onMove = (e) => {
      const px = (e.clientX / window.innerWidth - 0.5) * 22;
      const py = (e.clientY / window.innerHeight - 0.5) * 22;
      mouseX.set(px);
      mouseY.set(py);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, mouseX, mouseY]);

  const shootingStars = useMemo(() => {
    if (typeof window === "undefined") return [];
    return buildMeteors(window.innerWidth, window.innerHeight);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      <AnimatePresence mode="sync">
        {isDarkMode ? (
          <motion.div
            key="night-sky"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 22% 12%, rgba(14,165,233,0.16), transparent 38%), radial-gradient(circle at 85% 88%, rgba(59,130,246,0.12), transparent 32%)",
              }}
            />

            <motion.div
              className="absolute inset-0 z-[2] will-change-transform"
              style={{
                x: reduceMotion ? 0 : parallaxX,
                y: reduceMotion ? 0 : parallaxY,
              }}
            >
              <FloatingStarField reduceMotion={reduceMotion} />
              <DriftingStarLayer reduceMotion={reduceMotion} />
            </motion.div>

            {!reduceMotion &&
              celestialIntroDone &&
              shootingStars.map((meteor, i) => (
                <motion.div
                  key={`meteor-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: meteor.startX,
                    top: meteor.startY,
                    width: meteor.trail,
                    height: 2,
                    rotate: meteor.angleDeg,
                    transformOrigin: "left center",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.75) 18%, rgba(255,255,255,1) 42%, rgba(186,230,253,0.95) 72%, rgba(255,255,255,0))",
                    filter: "drop-shadow(0 0 3px rgba(255,255,255,0.35))",
                  }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: [0, meteor.endX - meteor.startX],
                    y: [0, meteor.endY - meteor.startY],
                  }}
                  transition={{
                    duration: meteor.duration,
                    repeat: Infinity,
                    repeatDelay: meteor.repeatDelay,
                    delay: meteor.delay,
                    ease: "linear",
                    times: [0, 0.04, 0.9, 1],
                  }}
                />
              ))}
          </motion.div>
        ) : (
          <motion.div
            key="day-sky"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #38bdf8 0%, #7dd3fc 22%, #bae6fd 50%, #e0f2fe 78%, #f0f9ff 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 130% 85% at 50% -5%, rgba(255,255,255,0.92) 0%, transparent 52%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                mixBlendMode: "soft-light",
                background:
                  "radial-gradient(ellipse 90% 70% at 92% 8%, rgba(255,240,200,0.55), transparent 55%)",
              }}
            />

            {celestialIntroDone && (
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={{
                  x: reduceMotion ? 0 : parallaxX,
                  y: reduceMotion ? 0 : parallaxY,
                }}
              >
                <DriftingCloudLayer reduceMotion={reduceMotion} />
              </motion.div>
            )}

            {planesReady && <SkyPlaneFleet reduceMotion={reduceMotion} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Particles;
