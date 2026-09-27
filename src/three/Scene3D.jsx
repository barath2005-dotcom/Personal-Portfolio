import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import FloatingObjects from './FloatingObjects';
import GoldParticles from './GoldParticles';
import { useScroll } from '../context/ScrollContext';
import * as THREE from 'three';

const CameraController = () => {
  const { camera } = useThree();
  const { scrollProgress } = useScroll(); // 0 at top, 1 at bottom
  
  useFrame(() => {
    // Cinematic camera fly-through:
    // Start at Z=15, fly deeply into the scene down to Z=-25
    const targetZ = 15 - scrollProgress * 40;
    
    // Smoothly interpolate Z position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    // Center camera X/Y
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.03);
    
    // Look straight ahead
    camera.lookAt(0, 0, targetZ - 10);
  });

  return null;
};

const Scene3D = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <React.Suspense fallback={null}>
          <fog attach="fog" args={['#050608', 5, 40]} />
          
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 15, 10]} color="#fffaf0" intensity={1} />
          
          {/* Beautiful environment map for ultra-realistic glass/metal reflections */}
          <Environment preset="city" />

          <FloatingObjects />
          <GoldParticles />
          <CameraController />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
