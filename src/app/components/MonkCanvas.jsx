"use client";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

export default function MonkCanvas() {
  const containerRef = useRef();
  const monkRef = useRef(null);

  const arrPositionModel = [
    { id: "banner", position: { x: 1.6, y: -1.5, z: 8 }, rotation: { x: 0, y: -0.5, z: 0 } },
    { id: "intro", position: { x: -1.6, y: -1.2, z: 5 }, rotation: { x: 0, y: 0.8, z: 0 } },
    { id: "description", position: { x: 1.8, y: -1.5, z: 4 }, rotation: { x: 0.2, y: -0.6, z: 0 } },
    { id: "services", position: { x: 0, y: -1.2, z: 6 }, rotation: { x: 0, y: 0, z: 0 } },
    { id: "roadmap", position: { x: -1.4, y: -1.0, z: 5 }, rotation: { x: 0, y: 0.5, z: 0 } },
    { id: "team", position: { x: 2.0, y: -1.5, z: 4 }, rotation: { x: 0, y: -0.8, z: 0 } },
    { id: "cta", position: { x: 0, y: -1.8, z: 2 }, rotation: { x: 0, y: 0, z: 0 } }
  ];

  useEffect(() => {
    const scene = new THREE.Scene();
    
    // Increased FOV slightly to make the model appear smaller/further away
    const camera = new THREE.PerspectiveCamera(18, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const topLight = new THREE.DirectionalLight(0xffffff, 4);
    topLight.position.set(5, 5, 5);
    scene.add(topLight);

    let mixer;
    const loader = new GLTFLoader();

    loader.load("/robot_playground.glb", (gltf) => {
      const model = gltf.scene;
      monkRef.current = model;

      // Desktop: 0.85 | Mobile: 0.5 
      const baseScale = window.innerWidth < 768 ? 0.5 : 0.80; 
      model.scale.set(baseScale, baseScale, baseScale);
      
      model.position.set(1.6, -1.5, 8);
      model.rotation.y = -0.5;
      scene.add(model);
      
      mixer = new THREE.AnimationMixer(model);
      if (gltf.animations.length > 0) {
        mixer.clipAction(gltf.animations[0]).play();
      }
    });

    const modelMove = () => {
      const sections = document.querySelectorAll('.sec-wrapper');
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          currentSection = section.id;
        }
      });

      const activePos = arrPositionModel.find((val) => val.id === currentSection);
      
      if (activePos && monkRef.current) {
        const isMobile = window.innerWidth < 768;
        const targetX = isMobile ? activePos.position.x * 0.25 : activePos.position.x;

        gsap.to(monkRef.current.position, {
          x: targetX,
          y: activePos.position.y,
          z: activePos.position.z,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto"
        });
        gsap.to(monkRef.current.rotation, {
          x: activePos.rotation.x,
          y: activePos.rotation.y,
          z: activePos.rotation.z,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("scroll", modelMove);
    
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (monkRef.current) {
            const baseScale = window.innerWidth < 768 ? 0.5 : 0.7;
            monkRef.current.scale.set(baseScale, baseScale, baseScale);
        }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", modelMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 20, pointerEvents: 'none' }} />;
}