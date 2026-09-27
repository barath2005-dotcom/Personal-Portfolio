import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import FloatingObjects from './FloatingObjects';
import GoldParticles from './GoldParticles';
import PostEffects from './PostEffects';
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

const DynamicLight = () => {
  const lightRef = useRef();
  const { viewport } = useThree();
  const [mouse, setMouse] = useState(new THREE.Vector2());

  useEffect(() => {
    const onMouseMove = (e) => {
      setMouse(new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      ));
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state) => {
    if (lightRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x, 0.05);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y, 0.05);
      // Keep it somewhat near the camera
      lightRef.current.position.z = state.camera.position.z - 5;
    }
  });

  return <pointLight ref={lightRef} color="#E8C48E" intensity={1.5} distance={20} />;
};

const Scene3D = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050608' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <React.Suspense fallback={null}>
          <fog attach="fog" args={['#050608', 5, 80]} />
          
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 15, 10]} color="#fffaf0" intensity={1} />
          
          <DynamicLight />
          
          {/* Beautiful environment map for ultra-realistic glass/metal reflections */}
          <Environment preset="city" />

          <FloatingObjects />
          <GoldParticles />
          <CameraController />
          <PostEffects />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
