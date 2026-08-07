"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function Blob() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.08;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.2}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#2563eb"
        attach="material"
        distort={0.35}
        speed={1.5}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}

export default function HeroMesh() {
  return (
    <div className="absolute inset-0 hidden lg:block">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#60a5fa" />
        <Blob />
      </Canvas>
    </div>
  );
}
