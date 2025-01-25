"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeJSHeader = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 400,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Load iMac Classic model
    const loader = new GLTFLoader();
    let iMac: THREE.Group;

    // Create screen texture
    const screenTexture = new THREE.TextureLoader().load('/vscode-screen.png');
    const screenMaterial = new THREE.MeshStandardMaterial({ 
      map: screenTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
      metalness: 0.5,
      roughness: 0.5
    });

    loader.load(
      '/models/imac-classic.glb',
      (gltf) => {
        iMac = gltf.scene;
        iMac.scale.set(12, 12, 12);
        
        // Find the screen mesh and apply VSCode texture
        iMac.traverse((child) => {
          if (child.name === 'Screen') {
            (child as THREE.Mesh).material = screenMaterial;
          }
        });
        
        scene.add(iMac);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 15;
    camera.position.y = 5;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full" />
  );
};

export default ThreeJSHeader;
