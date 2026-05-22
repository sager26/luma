import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Stars, Sparkles } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function MartiniGlass({ position, rotation, scale }: any) {
  const groupRef = useRef<THREE.Group>(null);

  const glassPoints = useMemo(() => {
    return [
      new THREE.Vector2(0, -2.5),
      new THREE.Vector2(1.2, -2.5),
      new THREE.Vector2(1.2, -2.4),
      new THREE.Vector2(0.3, -2.2),
      new THREE.Vector2(0.12, -2.0),
      new THREE.Vector2(0.12, -0.2),
      new THREE.Vector2(0.25, 0),
      new THREE.Vector2(2.1, 2.0),
      new THREE.Vector2(2.1, 2.05),
      new THREE.Vector2(2.0, 2.05),
      new THREE.Vector2(0.05, 0.1),
      new THREE.Vector2(0, 0.1),
    ];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const glassMaterial = (
    <MeshTransmissionMaterial 
      backside 
      backsideThickness={0}
      thickness={0.05} 
      roughness={0.02}
      transmission={1} 
      ior={1} 
      chromaticAberration={0} 
      anisotropy={0} 
      clearcoat={1}
      clearcoatRoughness={0.1}
      color="#ffffff"
    />
  );

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1} position={position}>
      <group ref={groupRef} rotation={rotation} scale={scale}>
        <mesh>
          <latheGeometry args={[glassPoints, 64]} />
          {glassMaterial}
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-gradient-to-br from-indigo-950 via-gray-950 to-black">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#d4af37" />
        <pointLight position={[-10, 5, 5]} intensity={3} color="#4b0082" />
        <pointLight position={[5, -5, 5]} intensity={3} color="#ff4500" />
        <spotLight position={[-10, -10, 5]} intensity={1} color="#ffffff" />
        
        {/* Subtle background stars & sparkles */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
        <Sparkles count={150} scale={15} size={2} speed={0.4} opacity={0.4} color="#d4af37" />
        
        <MartiniGlass position={[-4, 2, 0]} rotation={[0, -0.5, 0]} scale={0.4} />
        <MartiniGlass position={[2, -1, -2]} rotation={[0, 1.5, 0]} scale={0.7} />
        <MartiniGlass position={[-2, -3, -5]} rotation={[0, 0.5, 0]} scale={0.5} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
