'use client';

import { useEffect, useRef, useState } from "react";
import { useNotification } from '../notificationContext';
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const GLBViewer = () => {
  const canvasRef = useRef(null);
  const { message } = useNotification();

  const controlCameraRef = useRef("");

  useEffect(() => {
    if (typeof window === 'undefined') return; // only run Three.js in client side

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    let mountains;
    loader.load(
      '/glb-models/mountains.glb',
      (gltf) => {
        mountains = gltf.scene;
        scene.add(mountains);
        mountains.rotation.y = Math.PI - 0.1;
        mountains.position.x = -0.6;
        mountains.position.y = -0.6;
      },
      undefined,
      (error) => {
        console.error('Error loading GLB model:', error);
      }
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const light = new THREE.PointLight(0xffee00, 360, 50);
    light.position.set(0, 5, 0);
    scene.add(light);

    const animate = () => {
      if (controlCameraRef.current === "Start Moving!") {
        if (camera.position.z <= 2.8) {
          camera.position.z = 2.8;
        }
        else {
          camera.position.z -= 0.018;
        }
      }
      if (controlCameraRef.current === "Moving Back!") {
        if (camera.position.z >= 5.5) {
          camera.position.z = 5.5;
        }
        else {
          camera.position.z += 0.018;
        }
      }

      if (controlCameraRef.current === "Start Rotating!") {
        if (mountains.rotation.y <= 2.8) {
          mountains.rotation.y = 2.8;
          mountains.position.x = -0.357;
        }
        else {
          mountains.rotation.y -= 0.003;
          mountains.position.x += 0.003;
        }
      }
      if (controlCameraRef.current === "Rotating Back!") {
        if (mountains.rotation.y >= 3.04159) {
          mountains.rotation.y = 3.04159;
          mountains.position.x = -0.6;
        }
        else {
          mountains.rotation.y += 0.003;
          mountains.position.x -= 0.003;
        }
      }

      light.position.x = -Math.sin(Date.now() * 0.00025) * 10;
      light.position.z = -Math.abs(Math.cos(Date.now() * 0.00025)) * 10;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (message === "Button clicked!") {
      controlCameraRef.current = "Start Moving!";
    }
    if (message === "Button clicked back!") {
      controlCameraRef.current = "Moving Back!";
    }
    if (message === "Logo clicked!") {
      controlCameraRef.current = "Start Rotating!";
    }
    if (message === "Logo clicked back!") {
      controlCameraRef.current = "Rotating Back!";
    }
  }, [message]);

  return <canvas ref={canvasRef} />;
};

export default GLBViewer;