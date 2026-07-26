import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GoldParticles = ({ count = 200 }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 20;
      const scale = 0.01 + Math.random() * 0.02;
      const speed = 0.5 + Math.random() * 1.5;
      const offset = Math.random() * Math.PI * 2;

      temp.push({ x, y, z, scale, speed, offset });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    particles.forEach((particle, i) => {
      const { x, y, z, scale, speed, offset } = particle;
      
      const px = x + Math.sin(time * speed + offset) * 0.5;
      const py = y + Math.cos(time * speed + offset) * 0.5;
      const pz = z + Math.sin(time * speed * 0.5 + offset) * 0.3;
      
      // Pulse scale
      const currentScale = scale * (1 + Math.sin(time * 2 + offset) * 0.2);

      dummy.position.set(px, py, pz);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#E8C48E" transparent opacity={0.4} />
    </instancedMesh>
  );
};

export default GoldParticles;
