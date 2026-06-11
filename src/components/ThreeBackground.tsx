import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Stars, Sparkles } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

const isMobile = typeof window !== 'undefined' && matchMedia('(max-width: 768px), (pointer: coarse)').matches;
const prefersReduced = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowEnd = typeof window !== 'undefined' && navigator.hardwareConcurrency <= 4;
const tier: 'high' | 'mobile' | 'off' = (prefersReduced || (isLowEnd && isMobile)) ? 'off' : isMobile ? 'mobile' : 'high';

function CameraRig() {
  useFrame(({ camera }, delta) => {
    const scrollHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const t = window.scrollY / scrollHeight;
    camera.position.y = THREE.MathUtils.damp(camera.position.y, -t * 3, 2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 10 - t * 1.5, 2, delta);
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, t * 0.05, 2, delta);
  });
  return null;
}

function SceneGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ pointer }) => {
    if (!groupRef.current || isMobile) return;
    groupRef.current.rotation.y += (pointer.x * 0.08 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (pointer.y * -0.04 - groupRef.current.rotation.x) * 0.04;
  });
  return <group ref={groupRef}>{children}</group>;
}

function MartiniGlass({ position, rotation, scale }: any) {
  const groupRef = useRef<THREE.Group>(null);

  const glassPoints = useMemo(() => [
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
  ], []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.004;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1} position={position}>
      <group ref={groupRef} rotation={rotation} scale={scale}>
        <mesh>
          <latheGeometry args={[glassPoints, 64]} />
          {tier === 'mobile' ? (
            <meshPhysicalMaterial
              transmission={0.9}
              roughness={0.05}
              thickness={0.5}
              color="#ffffff"
            />
          ) : (
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
              samples={4}
              resolution={512}
            />
          )}
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeBackground() {
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');

  useEffect(() => {
    const handleVisibility = () => setFrameloop(document.hidden ? 'never' : 'always');
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  if (tier === 'off') {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-gradient-to-br from-indigo-950 via-gray-950 to-black">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-gradient-to-br from-indigo-950 via-gray-950 to-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
        frameloop={frameloop}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#d4af37" />
        {isMobile ? (
          <pointLight position={[-5, 0, 5]} intensity={3} color="#4b0082" />
        ) : (
          <>
            <pointLight position={[-10, 5, 5]} intensity={3} color="#4b0082" />
            <pointLight position={[5, -5, 5]} intensity={3} color="#ff4500" />
          </>
        )}
        <spotLight position={[-10, -10, 5]} intensity={1} color="#ffffff" />

        <Stars radius={100} depth={50} count={isMobile ? 400 : 1200} factor={4} saturation={1} fade speed={1} />
        <Sparkles count={isMobile ? 30 : 80} scale={15} size={2} speed={0.4} opacity={0.4} color="#d4af37" />

        <SceneGroup>
          <MartiniGlass position={[-4, 2, 0]} rotation={[0, -0.5, 0]} scale={0.4} />
          <MartiniGlass position={[2, -1, -2]} rotation={[0, 1.5, 0]} scale={0.7} />
          {!isMobile && (
            <MartiniGlass position={[-2, -3, -5]} rotation={[0, 0.5, 0]} scale={0.5} />
          )}
        </SceneGroup>

        {!isMobile && <Environment preset="city" />}
        <CameraRig />
      </Canvas>
    </div>
  );
}
