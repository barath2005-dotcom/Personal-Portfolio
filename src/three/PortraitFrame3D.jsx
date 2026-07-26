import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import portraitImg from '../assets/images/portrait-bw.jpg';

/**
 * 3D Glass Portrait Frame
 * Transparent acrylic frame with golden edges, slow rotation, and floating motion.
 */
function GlassFrame() {
  const frameRef = useRef();
  const photoTexture = useTexture(portraitImg);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (frameRef.current) {
      frameRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
      frameRef.current.rotation.x = Math.cos(time * 0.2) * 0.03;
      frameRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <group ref={frameRef} position={[3.5, 0.3, -1]}>
      {/* Glass Frame Border */}
      <RoundedBox args={[3.4, 4.4, 0.18]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial
          color="#0a0a0f"
          roughness={0.05}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={3}
          transparent
          opacity={0.85}
        />
      </RoundedBox>

      {/* Portrait Photo */}
      <mesh position={[0, 0, 0.091]}>
        <planeGeometry args={[3.0, 4.0]} />
        <meshBasicMaterial map={photoTexture} />
      </mesh>

      {/* Top Golden Edge */}
      <mesh position={[0, 2.15, 0.09]}>
        <boxGeometry args={[3.0, 0.025, 0.02]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.8} />
      </mesh>

      {/* Bottom Golden Edge */}
      <mesh position={[0, -2.15, 0.09]}>
        <boxGeometry args={[3.0, 0.025, 0.02]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.5} />
      </mesh>

      {/* Right Golden Edge */}
      <mesh position={[1.65, 0, 0.09]}>
        <boxGeometry args={[0.025, 4.0, 0.02]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.6} />
      </mesh>

      {/* Left Golden Edge */}
      <mesh position={[-1.65, 0, 0.09]}>
        <boxGeometry args={[0.025, 4.0, 0.02]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Decorative Rings behind the portrait
 */
function DecorativeRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.15;
      ring1Ref.current.rotation.y = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.1;
      ring2Ref.current.rotation.z = t * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.08;
      ring3Ref.current.rotation.z = -t * 0.1;
    }
  });

  return (
    <group position={[3.5, 0.3, -3]}>
      {/* Large transparent ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.04, 16, 64]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.15} />
      </mesh>

      {/* Medium ring */}
      <mesh ref={ring2Ref} position={[0.5, 0.5, -0.5]}>
        <torusGeometry args={[2.5, 0.03, 16, 64]} />
        <meshBasicMaterial color="#D4B878" transparent opacity={0.1} />
      </mesh>

      {/* Small ring */}
      <mesh ref={ring3Ref} position={[-0.3, -0.3, 0.5]}>
        <torusGeometry args={[1.8, 0.025, 16, 64]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/**
 * Small floating particles around the portrait
 */
function PortraitParticles({ count = 30 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          3.5 + (Math.random() - 0.5) * 8,
          0.3 + (Math.random() - 0.5) * 8,
          -1 + (Math.random() - 0.5) * 6,
        ],
        scale: Math.random() * 0.025 + 0.008,
        speed: Math.random() * 0.2 + 0.05,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(time * p.speed + p.offset) * 0.6,
        p.position[1] + Math.cos(time * p.speed + p.offset) * 0.6,
        p.position[2] + Math.sin(time * p.speed * 0.5 + p.offset) * 0.4
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#E8C48E" transparent opacity={0.5} />
    </instancedMesh>
  );
}

/**
 * Volumetric Light behind portrait
 */
function VolumetricLight() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.material.opacity = 0.04 + Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[3.5, 0.3, -4]} rotation={[0, 0, Math.PI / 6]}>
      <planeGeometry args={[8, 12]} />
      <meshBasicMaterial color="#E8C48E" transparent opacity={0.04} side={THREE.DoubleSide} />
    </mesh>
  );
}

/**
 * PortraitFrame3D — The complete 3D portrait scene
 * Renders the glass frame, decorative elements, and particles.
 */
export default function PortraitFrame3D() {
  return (
    <>
      <GlassFrame />
      <DecorativeRings />
      <PortraitParticles />
      <VolumetricLight />
    </>
  );
}
