import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GoldParticles = () => {
  const meshRef = useRef();
  const count = 500;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 80;
      
      const speed = 0.1 + Math.random() * 0.2;
      const factor = 0.5 + Math.random() * 2;
      const xSpeed = (Math.random() - 0.5) * 0.1;
      const ySpeed = (Math.random() - 0.5) * 0.1;
      
      // varying sizes
      const size = Math.random() > 0.9 ? 1.5 + Math.random() * 2 : 0.3 + Math.random() * 0.7;

      temp.push({
        t: Math.random() * 100,
        factor,
        speed,
        x,
        y,
        z,
        xSpeed,
        ySpeed,
        size
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z, xSpeed, ySpeed, size } = particle;

      t = particle.t += delta * speed;
      
      // flowing stream motion
      const currentX = x + Math.cos(t * 0.5) * factor;
      const currentY = y + Math.sin(t * 0.5) * factor;
      const currentZ = z + Math.sin(t * 0.2) * factor * 2;

      dummy.position.set(currentX, currentY, currentZ);
      
      // optional slow drift
      particle.x += xSpeed * delta;
      particle.y += ySpeed * delta;
      
      dummy.scale.set(size, size, size);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#E8C48E" transparent opacity={0.6} />
    </instancedMesh>
  );
};

export default GoldParticles;
