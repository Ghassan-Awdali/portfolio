/**
 * Moon textures: public/textures/moon/ — see file header in repo for NASA kit notes.
 */
import React, { Suspense, useMemo, useRef, useLayoutEffect, useCallback } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

const texPath = (name) => `${process.env.PUBLIC_URL || ""}/textures/moon/${name}`;

const canvasStyle = {
  display: "block",
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  borderRadius: "50%",
};

/** Framer + layout can leave the buffer non-square until scroll; force square + sync size. */
function CanvasViewportSync() {
  const gl = useThree((s) => s.gl);
  const setSize = useThree((s) => s.setSize);
  const camera = useThree((s) => s.camera);

  const resize = useCallback(() => {
    const parent = gl.domElement.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const side = Math.max(2, Math.floor(Math.min(w, h)));
    setSize(side, side, true);
    if (camera && camera.isPerspectiveCamera) {
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }
  }, [gl, setSize, camera]);

  useLayoutEffect(() => {
    const parent = gl.domElement.parentElement;
    let raf = 0;
    const schedule = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        resize();
      });
    };

    resize();
    queueMicrotask(resize);
    schedule();
    const ro = parent ? new ResizeObserver(schedule) : null;
    if (parent) ro.observe(parent);
    window.addEventListener("resize", schedule);

    const t1 = window.setTimeout(schedule, 0);
    const t2 = window.setTimeout(schedule, 80);
    const t3 = window.setTimeout(schedule, 320);
    const t4 = window.setTimeout(schedule, 900);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      ro?.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [gl, resize]);

  return null;
}

/** Re-sync GL buffer for several frames after mount (layout + Framer settle). */
function ForceMoonGlResize() {
  const gl = useThree((s) => s.gl);
  const setSize = useThree((s) => s.setSize);
  const camera = useThree((s) => s.camera);
  const frames = useRef(0);
  useFrame(() => {
    if (frames.current >= 32) return;
    frames.current += 1;
    const p = gl.domElement.parentElement;
    if (!p) return;
    const s = Math.max(2, Math.floor(Math.min(p.clientWidth, p.clientHeight)));
    setSize(s, s, true);
    if (camera && camera.isPerspectiveCamera) {
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

function MoonBody({ reduceMotion }) {
  const group = useRef();
  const [colorMap] = useLoader(TextureLoader, [texPath("lunar_color.jpg")]);

  useMemo(() => {
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.generateMipmaps = true;
    colorMap.minFilter = THREE.LinearMipmapLinearFilter;
    colorMap.magFilter = THREE.LinearFilter;
    const maxAniso =
      typeof window !== "undefined" ? Math.min(16, (window.devicePixelRatio || 1) * 8) : 8;
    colorMap.anisotropy = maxAniso;
    colorMap.wrapS = colorMap.wrapT = THREE.ClampToEdgeWrapping;
    colorMap.needsUpdate = true;
  }, [colorMap]);

  useFrame((_, delta) => {
    if (reduceMotion || !group.current) return;
    group.current.rotation.y += delta * 0.022;
  });

  return (
    <group ref={group} rotation={[0.06, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.5, 96, 96]} />
        <meshBasicMaterial map={colorMap} color="#ffffff" toneMapped />
      </mesh>
    </group>
  );
}

function MoonScene({ reduceMotion }) {
  return (
    <>
      <CanvasViewportSync />
      <ForceMoonGlResize />
      <MoonBody reduceMotion={reduceMotion} />
    </>
  );
}

const canvasGl = {
  alpha: true,
  antialias: true,
  premultipliedAlpha: false,
  powerPreference: "high-performance",
};

function onMoonCanvasCreated({ gl }) {
  gl.setClearColor(0x000000, 0);
  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = 1.08;
  const c = gl.domElement;
  c.style.border = "none";
  c.style.outline = "none";
  c.style.boxShadow = "none";
}

export function MoonCanvas({ reduceMotion }) {
  return (
    <Canvas
      gl={canvasGl}
      onCreated={onMoonCanvasCreated}
      camera={{ position: [0, 0, 1.55], fov: 40, aspect: 1, near: 0.1, far: 20 }}
      style={canvasStyle}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <MoonScene reduceMotion={reduceMotion} />
      </Suspense>
    </Canvas>
  );
}
