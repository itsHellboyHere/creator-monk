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

// Simple lerp helper — no GSAP needed
function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function MonkCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip entirely on mobile — saves 8MB GLB + Three.js bundle
    if (window.innerWidth < 768) return;

    let THREE, GLTFLoader;
    let renderer, scene, camera, mixer, model;
    let rafId = null;
    let clock;
    let isMoving = false;
    let hidden = false;

    // Target values for lerp
    const target = { x: 1.6, y: -1.5, z: 8, rx: 0, ry: -0.5, rz: 0 };

    // Lazy load Three.js only when component mounts
    async function init() {
      THREE = await import("three");
      const { GLTFLoader: Loader } = await import(
        "three/examples/jsm/loaders/GLTFLoader"
      );
      GLTFLoader = Loader;

      scene = new THREE.Scene();
      clock = new THREE.Clock();

      camera = new THREE.PerspectiveCamera(
        18,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 15;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambient);
      const dirLight = new THREE.DirectionalLight(0xffffff, 4);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      // Load model
      const loader = new GLTFLoader();
      loader.load(
        GLB_URL,
        (gltf) => {
          model = gltf.scene;
          model.scale.set(0.55, 0.55, 0.55);
          model.position.set(target.x, target.y, target.z);
          model.rotation.set(target.rx, target.ry, target.rz);
          scene.add(model);

          mixer = new THREE.AnimationMixer(model);
          if (gltf.animations.length > 0) {
            mixer.clipAction(gltf.animations[0]).play();
          }

          // Start render loop only after model loads
          startLoop();
        },
        undefined,
        (err) => console.error("GLB load error:", err)
      );
    }

    // Render loop — only runs when needed
    function startLoop() {
      const animate = () => {
        if (hidden) {
          rafId = requestAnimationFrame(animate);
          return;
        }

        const delta = clock.getDelta();

        // Update animation mixer
        if (mixer) mixer.update(delta);

        // Lerp model to target — stops needing render when close enough
        if (model) {
          const SPEED = 0.05;
          let stillMoving = false;

          const dx = target.x - model.position.x;
          const dy = target.y - model.position.y;
          const dz = target.z - model.position.z;
          const drx = target.rx - model.rotation.x;
          const dry = target.ry - model.rotation.y;
          const drz = target.rz - model.rotation.z;

          if (
            Math.abs(dx) > 0.001 ||
            Math.abs(dy) > 0.001 ||
            Math.abs(dz) > 0.001 ||
            Math.abs(drx) > 0.001 ||
            Math.abs(dry) > 0.001 ||
            Math.abs(drz) > 0.001
          ) {
            model.position.x = lerp(model.position.x, target.x, SPEED);
            model.position.y = lerp(model.position.y, target.y, SPEED);
            model.position.z = lerp(model.position.z, target.z, SPEED);
            model.rotation.x = lerp(model.rotation.x, target.rx, SPEED);
            model.rotation.y = lerp(model.rotation.y, target.ry, SPEED);
            model.rotation.z = lerp(model.rotation.z, target.rz, SPEED);
            stillMoving = true;
          }

          // Always render if mixer has animations
          renderer.render(scene, camera);

          isMoving = stillMoving;
        }

        rafId = requestAnimationFrame(animate);
      };

      rafId = requestAnimationFrame(animate);
    }

    // On scroll — update target position
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

    // Resize handler
    function onResize() {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Visibility API — pause rendering when tab hidden
    function onVisibilityChange() {
      hidden = document.hidden;
    }

    init();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      // Cleanup
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }

      if (mixer) mixer.stopAllAction();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
      }}
    />
  );
}