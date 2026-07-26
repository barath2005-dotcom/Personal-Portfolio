import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, useTexture, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

import portraitImg from '../assets/images/portrait-bw.jpg';

/**
 * 3D Dark Glossy Glass Photo Frame with Portrait Texture, Rotatable by User
 */
function RotatablePhotoFrame() {
  const frameRef = useRef();
  const photoTexture = useTexture(portraitImg);

  // We use useFrame for a subtle continuous float, but PresentationControls handles the user interaction
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (frameRef.current) {
      // Gentle subtle 3D floating animation (base rotation)
      frameRef.current.position.y = Math.sin(time * 1.5) * 0.1;
    }
  });

  return (
    <group position={[3.2, 0.5, -0.5]}>
      {/* PresentationControls makes the frame grab-and-rotatable by the user! */}
      <PresentationControls
        global={true} // Rotates when dragging anywhere on the canvas
        cursor={true} // Changes cursor to grab
        snap={{ mass: 4, tension: 400 }} // Snaps back to original position when released
        speed={1.5} // Rotation speed
        polar={[-Math.PI / 4, Math.PI / 4]} // Vertical rotation limits
        azimuth={[-Math.PI / 4, Math.PI / 4]} // Horizontal rotation limits
      >
        <group ref={frameRef} rotation={[-0.05, -0.15, -0.02]}>
          {/* Sleek Dark Glossy Glass Frame Slab with Rounded Corners */}
          <RoundedBox args={[3.2, 4.2, 0.16]} radius={0.12} smoothness={4} position={[0, 0, 0]}>
            <meshStandardMaterial
              color="#040407"
              roughness={0.03}
              metalness={0.98}
              envMapIntensity={4}
            />
          </RoundedBox>

          {/* Front Photo Image Plane mapping the uploaded portrait */}
          <mesh position={[0, 0, 0.081]}>
            {/* Plane matches the aspect ratio of a portrait photo, slightly smaller than the glass frame to leave a border */}
            <planeGeometry args={[2.9, 3.9]} />
            <meshBasicMaterial map={photoTexture} />
          </mesh>

          {/* Top Gold Beveled Edge Flare Line */}
          <mesh position={[0, 2.1, 0.08]}>
            <boxGeometry args={[2.9, 0.03, 0.02]} />
            <meshBasicMaterial color="#E5C158" opacity={0.9} transparent />
          </mesh>

          {/* Right Gold Beveled Edge Flare Line */}
          <mesh position={[1.6, 0, 0.08]}>
            <boxGeometry args={[0.03, 3.9, 0.02]} />
            <meshBasicMaterial color="#C5A059" opacity={0.7} transparent />
          </mesh>
        </group>
      </PresentationControls>
    </group>
  );
}

/**
 * 3D Pedestal Block with Glowing Glass Cube on Top (Right Side)
 */
function PedestalWithGlassCube() {
  const cubeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (cubeRef.current) {
      cubeRef.current.rotation.y = time * 0.35;
      cubeRef.current.rotation.x = time * 0.2;
    }
  });

  return (
    <group position={[6.5, -1.0, -1.5]}>
      {/* Dark Square Pedestal Block */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[1.5, 1.4, 1.5]} />
        <meshStandardMaterial color="#08080b" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Glowing Glass Cube resting on top of Pedestal */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh ref={cubeRef} position={[0, 0.6, 0]}>
          <boxGeometry args={[0.85, 0.85, 0.85]} />
          <meshStandardMaterial
            color="#E5C158"
            roughness={0.1}
            metalness={0.95}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * 3D Metallic Gold Torus Ring (Left of Glass Tablet, closer to front)
 */
function FloatingGoldTorus() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = 1.0 + time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0.8, -1.0, 1.5]} rotation={[1.0, 0.2, 0]}>
        <torusGeometry args={[0.95, 0.28, 64, 128]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.1} metalness={1.0} />
      </mesh>
    </Float>
  );
}

/**
 * 3D Metallic Floating Sphere (Top Left of Torus)
 */
function FloatingGoldSphere() {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh position={[0.5, 2.0, 0.5]}>
        <sphereGeometry args={[0.45, 64, 64]} />
        <meshStandardMaterial color="#E5C158" roughness={0.08} metalness={1.0} />
      </mesh>
    </Float>
  );
}

/**
 * Far Left Glass Cube sitting on the stage floor
 */
function FarLeftGlassCube() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-5.8, -1.5, -1.0]} rotation={[0.2, 0.5, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color="#C5A059"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.65}
        />
      </mesh>
    </Float>
  );
}

/**
 * Dark Glossy 3D Stage Floor
 */
function StageFloor() {
  return (
    <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#050508" roughness={0.15} metalness={0.85} />
    </mesh>
  );
}

/**
 * Ambient Gold Dust Particle Field
 */
function GoldParticleDust({ count = 100 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
        ],
        scale: Math.random() * 0.02 + 0.01,
        speed: Math.random() * 0.15 + 0.05,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      const { position, scale, speed, offset } = particle;
      dummy.position.set(
        position[0] + Math.sin(time * speed + offset) * 0.4,
        position[1] + Math.cos(time * speed + offset) * 0.4,
        position[2] + Math.sin(time * speed * 0.5 + offset) * 0.3
      );
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#E5C158" transparent opacity={0.5} />
    </instancedMesh>
  );
}

/**
 * Camera Parallax Controller
 */
function CameraController({ mousePosition }) {
  const { camera } = useThree();
  const targetZ = 8.5; // Slightly further back to fit everything beautifully
  const isInitialWarp = useRef(true);

  if (isInitialWarp.current) {
    camera.position.z = 20;
    isInitialWarp.current = false;
  }

  useFrame(() => {
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    const targetX = mousePosition.normalizedX * 0.5;
    const targetY = mousePosition.normalizedY * 0.4;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0); // Look at center for better composition
  });

  return null;
}

/**
 * Main 3D Hero Scene with interactive Rotatable Photo Frame
 */
function HeroScene({ mousePosition }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 15, 10]} color="#ffffff" intensity={2.0} />
      <pointLight position={[-5, 2, 5]} color="#C5A059" intensity={3.0} />
      <pointLight position={[5, -2, 5]} color="#E5C158" intensity={2.5} />

      <React.Suspense fallback={null}>
        <RotatablePhotoFrame />
      </React.Suspense>
      
      <PedestalWithGlassCube />
      <FloatingGoldTorus />
      <FloatingGoldSphere />
      <FarLeftGlassCube />
      <StageFloor />
      <GoldParticleDust count={100} />

      <CameraController mousePosition={mousePosition} />
    </Canvas>
  );
}

export default HeroScene;
