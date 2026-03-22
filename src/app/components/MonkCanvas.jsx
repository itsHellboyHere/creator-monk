"use client";
import { useEffect, useRef } from "react";

const GLB_URL =
  "https://res.cloudinary.com/dgifa4wgb/image/upload/v1774166565/robot_playground_g25ggg.glb";

const POSITIONS = [
  { id: "banner",      position: { x: 1.6,  y: -1.5, z: 8 }, rotation: { x: 0,   y: -0.5, z: 0 } },
  { id: "intro",       position: { x: -1.6, y: -1.2, z: 5 }, rotation: { x: 0,   y: 0.8,  z: 0 } },
  { id: "description", position: { x: 1.8,  y: -1.5, z: 4 }, rotation: { x: 0.2, y: -0.6, z: 0 } },
  { id: "services",    position: { x: -2.0, y: -1.0, z: 6 }, rotation: { x: 0,   y: 0,    z: 0 } },
  { id: "roadmap",     position: { x: 2.0,  y: -1.0, z: 5 }, rotation: { x: 0,   y: 0.5,  z: 0 } },
  { id: "team",        position: { x: 2.0,  y: -1.5, z: 4 }, rotation: { x: 0,   y: -0.8, z: 0 } },
  { id: "cta",         position: { x: 0,    y: -1.8, z: 2 }, rotation: { x: 0,   y: 0,    z: 0 } },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Robust mobile detection — checks both screen width AND touch capability
function isMobileDevice() {
  if (typeof window === "undefined") return true;
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth < 1024;
  // Only skip if BOTH small screen AND touch — avoids false positive on desktop devtools
  return isTouchDevice && isSmallScreen;
}

export default function MonkCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip on real mobile devices — saves 8MB GLB + Three.js
    if (isMobileDevice()) return;

    let THREE, GLTFLoader;
    let renderer, scene, camera, mixer, model;
    let rafId = null;
    let clock;
    let tabHidden = false;
    let destroyed = false;

    // Target position/rotation for lerp
    const target = {
      x: 1.6, y: -1.5, z: 8,
      rx: 0, ry: -0.5, rz: 0,
    };

    async function init() {
      if (destroyed) return;

      // Dynamic imports — Three.js only loads here, not in initial bundle
      const threeModule = await import("three");
      THREE = threeModule;
      const { GLTFLoader: Loader } = await import(
        "three/examples/jsm/loaders/GLTFLoader"
      );
      GLTFLoader = Loader;

      if (destroyed) return; // Component may have unmounted during async load

      // Scene
      scene = new THREE.Scene();
      clock = new THREE.Clock();

      // Camera
      camera = new THREE.PerspectiveCamera(
        18,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 15;

      // Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const dirLight = new THREE.DirectionalLight(0xffffff, 4);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      // Load GLB from Cloudinary
      const loader = new GLTFLoader();
      loader.load(
        GLB_URL,
        (gltf) => {
          if (destroyed) return;

          model = gltf.scene;
          model.scale.set(0.55, 0.55, 0.55);
          model.position.set(target.x, target.y, target.z);
          model.rotation.set(target.rx, target.ry, target.rz);
          scene.add(model);

          // Start animation mixer
          mixer = new THREE.AnimationMixer(model);
          if (gltf.animations.length > 0) {
            mixer.clipAction(gltf.animations[0]).play();
          }

          startLoop();
        },
        undefined,
        (err) => console.warn("MonkCanvas: GLB load failed —", err.message)
      );
    }

    function startLoop() {
      const animate = () => {
        if (destroyed) return;

        rafId = requestAnimationFrame(animate);

        // Skip render when tab is not visible
        if (tabHidden) return;

        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);

        if (model) {
          // Lerp position toward target
          model.position.x = lerp(model.position.x, target.x, 0.05);
          model.position.y = lerp(model.position.y, target.y, 0.05);
          model.position.z = lerp(model.position.z, target.z, 0.05);
          model.rotation.x = lerp(model.rotation.x, target.rx, 0.05);
          model.rotation.y = lerp(model.rotation.y, target.ry, 0.05);
          model.rotation.z = lerp(model.rotation.z, target.rz, 0.05);
        }

        renderer.render(scene, camera);
      };

      rafId = requestAnimationFrame(animate);
    }

    function onScroll() {
      if (!model) return;

      const sections = document.querySelectorAll(".sec-wrapper");
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          currentSection = section.id;
        }
      });

      const found = POSITIONS.find((p) => p.id === currentSection);
      if (found) {
        target.x  = found.position.x;
        target.y  = found.position.y;
        target.z  = found.position.z;
        target.rx = found.rotation.x;
        target.ry = found.rotation.y;
        target.rz = found.rotation.z;
      }
    }

    function onResize() {
      if (!camera || !renderer) return;
      // Skip if now on mobile (user rotated device etc)
      if (isMobileDevice()) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onVisibilityChange() {
      tabHidden = document.hidden;
    }

    init();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      destroyed = true;

      if (rafId) cancelAnimationFrame(rafId);

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (mixer) mixer.stopAllAction();

      if (renderer) {
        renderer.dispose();
        try {
          if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
          }
        } catch (_) {}
      }

      // Dispose scene geometry + materials to free GPU memory
      if (scene) {
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  // Render nothing on mobile — CSS media query as extra safety net
  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
      }}
      className="monk-canvas-wrap"
    />
  );
}