import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const GlassCube = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-6, 2, 5]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial roughness={0.02} metalness={0.1} transmission={0.95} thickness={0.5} transparent opacity={0.6} color="#ffffff" clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
    </Float>
  );
};

const MetallicRing = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2} position={[5, 3, 2]}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.2, 0.08, 32, 64]} />
        <meshStandardMaterial color="#E8C48E" roughness={0.05} metalness={1} />
      </mesh>
    </Float>
  );
};

const MetallicRing2 = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.2;
      meshRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8} position={[-4, -1, -2]}>
      <mesh ref={meshRef} scale={0.6}>
        <torusGeometry args={[1.2, 0.08, 32, 64]} />
        <meshStandardMaterial color="#E8C48E" roughness={0.05} metalness={1} />
      </mesh>
    </Float>
  );
};

const FloatingSphere = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={1.5} position={[7, 1, -5]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#D4B878" roughness={0.02} metalness={1} />
      </mesh>
    </Float>
  );
};

const FloatingSphere2 = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1} position={[-7, -2, -8]}>
      <mesh ref={meshRef} scale={0.5}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#D4B878" roughness={0.02} metalness={1} />
      </mesh>
    </Float>
  );
};

const AcrylicPanel = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5} position={[-3, -2, -12]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 2, 0.02]} />
        <meshPhysicalMaterial transmission={0.9} roughness={0.05} color="#ffffff" transparent opacity={0.3} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
    </Float>
  );
};

const AcrylicPanel2 = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.08;
      meshRef.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6} position={[4, -3, -15]}>
      <mesh ref={meshRef} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[3, 2, 0.02]} />
        <meshPhysicalMaterial transmission={0.8} roughness={0.1} color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </Float>
  );
};

const GoldenLightStrip = () => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[8, 0, -18]}>
      <mesh rotation={[0, 0, Math.PI / 8]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const GoldenLightStrip2 = () => {
  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6} position={[-8, 1, -20]}>
      <mesh rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshBasicMaterial color="#E8C48E" transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const FloatingIcosahedron = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1} position={[4, 5, -25]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={1} 
          opacity={1} 
          transparent 
          roughness={0.1} 
          thickness={1} 
          ior={1.5}
          metalness={0.1}
          clearcoat={1}
        />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.IcosahedronGeometry(1.5, 0)]} />
          <lineBasicMaterial attach="material" color="#E8C48E" transparent opacity={0.2} />
        </lineSegments>
      </mesh>
    </Float>
  );
};

const GoldDiamond = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.4;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5} position={[-8, 4, -28]}>
      <mesh ref={meshRef} scale={0.7}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#E8C48E" roughness={0.1} metalness={1} envMapIntensity={2} />
      </mesh>
    </Float>
  );
};

const GlassCylinder = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8} position={[6, -4, -30]}>
      <mesh ref={meshRef} rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshPhysicalMaterial 
          transmission={0.9} 
          roughness={0.05} 
          color="#ffffff" 
          transparent 
          opacity={0.4} 
          clearcoat={1} 
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
};

const GoldTorusKnot = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.2;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1} position={[-5, -4, -35]}>
      <mesh ref={meshRef} scale={0.5}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial color="#E8C48E" roughness={0.1} metalness={1} />
      </mesh>
    </Float>
  );
};

const GlassPyramid = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5} position={[9, -2, -38]}>
      <mesh ref={meshRef}>
        <coneGeometry args={[1, 1.5, 4]} />
        <meshPhysicalMaterial 
          transmission={0.95} 
          roughness={0.02} 
          color="#ffffff" 
          transparent 
          opacity={0.5} 
          clearcoat={1} 
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
};

const WireframeDodecahedron = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={0.5} position={[-2, 6, -40]}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#E8C48E" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  );
};

const GoldCoin = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={2} floatIntensity={1.2} position={[2, -6, -42]}>
      <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
        <meshStandardMaterial color="#D4B878" roughness={0.1} metalness={1} />
      </mesh>
    </Float>
  );
};

const FloatingObjects = () => {
  return (
    <group>
      <GlassCube />
      <MetallicRing />
      <MetallicRing2 />
      <FloatingSphere />
      <FloatingSphere2 />
      <AcrylicPanel />
      <AcrylicPanel2 />
      <GoldenLightStrip />
      <GoldenLightStrip2 />
      
      {/* New Premium Objects */}
      <FloatingIcosahedron />
      <GoldDiamond />
      <GlassCylinder />
      
      {/* Even More Objects */}
      <GoldTorusKnot />
      <GlassPyramid />
      <WireframeDodecahedron />
      <GoldCoin />
    </group>
  );
};

export default FloatingObjects;
