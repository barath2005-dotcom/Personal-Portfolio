import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Grid, Trail } from '@react-three/drei';
import * as THREE from 'three';

// A. Animated Wireframe Sphere (Hero centerpiece)
const HeroSphere = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
      
      // subtle pulsing scale
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 0, 2]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshBasicMaterial 
          color="#E8C48E" 
          wireframe 
          transparent 
          opacity={0.15}
        />
      </mesh>
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.02} />
      </mesh>
    </Float>
  );
};

// C. Geometric Grid Floor
const FloorGrid = () => {
  return (
    <Grid 
      position={[0, -5, -10]} 
      args={[100, 100]} 
      cellSize={2} 
      cellThickness={1} 
      cellColor="#C5A059" 
      sectionSize={10} 
      sectionThickness={1.5} 
      sectionColor="#E8C48E" 
      fadeDistance={40} 
      fadeStrength={2}
      transparent
      opacity={0.1}
    />
  );
};

// D. Orbiting Satellite Objects
const Satellites = () => {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[4, 2, -5]}>
      {/* Center point of orbit */}
      <mesh>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#E8C48E" roughness={0.1} metalness={1} />
      </mesh>
      
      {/* Orbiting object 1 */}
      <mesh position={[2, 0, 0]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#D4B878" roughness={0.2} metalness={0.8} />
      </mesh>
      
      {/* Orbiting object 2 */}
      <mesh position={[-1, 1.5, 0]}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#C5A059" roughness={0.1} metalness={1} />
      </mesh>

      {/* Orbiting object 3 */}
      <mesh position={[0, -2, 1]}>
        <tetrahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#E8C48E" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Connection lines */}
      <Line points={[[0,0,0], [2,0,0]]} color="#E8C48E" lineWidth={1} transparent opacity={0.3} />
      <Line points={[[0,0,0], [-1,1.5,0]]} color="#E8C48E" lineWidth={1} transparent opacity={0.3} />
      <Line points={[[0,0,0], [0,-2,1]]} color="#E8C48E" lineWidth={1} transparent opacity={0.3} />
    </group>
  );
};

// E. DNA/Helix Structure
const Helix = () => {
  const groupRef = useRef();
  
  const helixPoints = useMemo(() => {
    const points = [];
    const points2 = [];
    for(let i=0; i<40; i++) {
      const t = i * 0.3;
      const x = Math.sin(t) * 1.5;
      const z = Math.cos(t) * 1.5;
      const y = i * 0.4 - 8;
      points.push(new THREE.Vector3(x, y, z));
      points2.push(new THREE.Vector3(-x, y, -z));
    }
    return { points, points2 };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[-6, 0, -15]} rotation={[0.2, 0, 0.2]}>
      {helixPoints.points.map((p, i) => (
        <React.Fragment key={`helix-${i}`}>
          <mesh position={p}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#E8C48E" />
          </mesh>
          <mesh position={helixPoints.points2[i]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#D4B878" />
          </mesh>
          {/* Rungs */}
          <Line points={[p, helixPoints.points2[i]]} color="#C5A059" lineWidth={1} transparent opacity={0.4} />
        </React.Fragment>
      ))}
      <Line points={helixPoints.points} color="#E8C48E" lineWidth={2} transparent opacity={0.5} />
      <Line points={helixPoints.points2} color="#E8C48E" lineWidth={2} transparent opacity={0.5} />
    </group>
  );
};

// F. Floating Holographic Panels
const HolographicPanel = ({ position, rotation, speed = 1, size = [3, 4] }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.005;
      meshRef.current.rotation.y += delta * 0.05 * speed;
    }
  });

  return (
    <Float floatIntensity={2} speed={speed}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <planeGeometry args={[size[0], size[1], 10, 10]} />
        <meshPhysicalMaterial 
          color="#E8C48E"
          transmission={0.9}
          opacity={0.1}
          transparent
          wireframe
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
};

// Neural Data Streams (Curved Lines)
const DataStreams = () => {
  const curves = useMemo(() => {
    const lines = [];
    for(let i=0; i<5; i++) {
      const points = [];
      const startX = (Math.random() - 0.5) * 20;
      const startY = (Math.random() - 0.5) * 20;
      const startZ = -20 - Math.random() * 20;
      
      for(let j=0; j<10; j++) {
        points.push(new THREE.Vector3(
          startX + Math.sin(j) * 4,
          startY + Math.cos(j) * 4,
          startZ + j * 5
        ));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      lines.push(curve.getPoints(50));
    }
    return lines;
  }, []);

  return (
    <group>
      {curves.map((pts, idx) => (
        <Line key={idx} points={pts} color="#E8C48E" lineWidth={1} transparent opacity={0.15} />
      ))}
    </group>
  );
};

const FloatingObjects = () => {
  return (
    <group>
      <HeroSphere />
      <FloorGrid />
      <Satellites />
      <Satellites />
      
      <group position={[-8, -3, -10]}>
         <Satellites />
      </group>
      
      <Helix />
      
      <HolographicPanel position={[6, 0, -8]} rotation={[0, -Math.PI/4, 0]} speed={0.8} />
      <HolographicPanel position={[-5, 2, -12]} rotation={[0, Math.PI/6, 0]} size={[4, 2]} speed={1.2} />
      <HolographicPanel position={[2, -4, -20]} rotation={[Math.PI/8, 0, 0]} size={[5, 3]} speed={0.5} />
      
      <DataStreams />
    </group>
  );
};

export default FloatingObjects;
