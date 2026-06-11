import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Sparkles, Instances, Instance, MeshReflectorMaterial } from '@react-three/drei';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

const isMobile = typeof window !== 'undefined' && matchMedia('(max-width: 768px), (pointer: coarse)').matches;
const prefersReduced = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowEnd = typeof window !== 'undefined' && navigator.hardwareConcurrency <= 4;
const tier: 'high' | 'mobile' | 'off' = (prefersReduced || (isLowEnd && isMobile)) ? 'off' : isMobile ? 'mobile' : 'high';

/* ------------------------------------------------------------------ */
/* Glass profiles (lathe curves, unit height ~1)                       */
/* ------------------------------------------------------------------ */

const PROFILES: Record<string, THREE.Vector2[]> = {
  martini: [
    [0, 0], [0.30, 0], [0.30, 0.02], [0.08, 0.04], [0.035, 0.07],
    [0.035, 0.52], [0.07, 0.55], [0.43, 0.93], [0.43, 0.95],
    [0.41, 0.95], [0.015, 0.58], [0, 0.58],
  ].map(([x, y]) => new THREE.Vector2(x, y)),
  coupe: [
    [0, 0], [0.30, 0], [0.30, 0.02], [0.08, 0.04], [0.035, 0.07],
    [0.035, 0.50], [0.07, 0.55], [0.30, 0.62], [0.40, 0.78], [0.40, 0.80],
    [0.38, 0.80], [0.28, 0.66], [0.015, 0.60], [0, 0.60],
  ].map(([x, y]) => new THREE.Vector2(x, y)),
  highball: [
    [0, 0], [0.17, 0], [0.18, 0.02], [0.18, 0.95], [0.17, 1.0],
    [0.155, 1.0], [0.155, 0.05], [0, 0.05],
  ].map(([x, y]) => new THREE.Vector2(x, y)),
  rocks: [
    [0, 0], [0.21, 0], [0.22, 0.03], [0.22, 0.52], [0.21, 0.55],
    [0.195, 0.55], [0.195, 0.08], [0, 0.08],
  ].map(([x, y]) => new THREE.Vector2(x, y)),
};

const LIQUIDS: Record<string, THREE.Vector2[]> = {
  martini: [[0, 0.60], [0.345, 0.865], [0, 0.865]].map(([x, y]) => new THREE.Vector2(x, y)),
  coupe: [[0, 0.62], [0.27, 0.70], [0, 0.70]].map(([x, y]) => new THREE.Vector2(x, y)),
  highball: [[0, 0.06], [0.145, 0.06], [0.145, 0.70], [0, 0.70]].map(([x, y]) => new THREE.Vector2(x, y)),
  rocks: [[0, 0.09], [0.185, 0.09], [0.185, 0.38], [0, 0.38]].map(([x, y]) => new THREE.Vector2(x, y)),
};

function Glass({ type = 'martini', position = [0, 0, 0] as [number, number, number], scale = 0.35, liquid = '#e8a33d', rotationY = 0 }) {
  const glassGeo = useMemo(() => new THREE.LatheGeometry(PROFILES[type], 48), [type]);
  const liquidGeo = useMemo(() => new THREE.LatheGeometry(LIQUIDS[type], 48), [type]);

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      <mesh geometry={glassGeo}>
        <meshPhysicalMaterial
          transmission={isMobile ? 0.85 : 1}
          roughness={0.04}
          thickness={0.05}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#ffffff"
          transparent
        />
      </mesh>
      <mesh geometry={liquidGeo}>
        <meshPhysicalMaterial
          transmission={0.6}
          roughness={0.15}
          thickness={0.4}
          color={liquid}
          transparent
          opacity={0.92}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* LUMA glowing sign (canvas texture, fully offline)                   */
/* ------------------------------------------------------------------ */

function useSignTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 320;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 1024, 320);

    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0, '#c9a353');
    grad.addColorStop(0.25, '#f2dda5');
    grad.addColorStop(0.5, '#d1ac56');
    grad.addColorStop(0.75, '#f9ecc7');
    grad.addColorStop(1, '#c9a353');

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#e2b859';
    ctx.shadowBlur = 40;
    ctx.fillStyle = grad;
    ctx.font = '500 170px Georgia, "Times New Roman", serif';
    ctx.fillText('L U M A', 512, 130);

    ctx.shadowBlur = 14;
    ctx.font = '300 34px Arial, sans-serif';
    ctx.fillStyle = '#d8b86a';
    ctx.fillText('S I G N A T U R E   M O C K T A I L S', 512, 258);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }, []);
}

/* ------------------------------------------------------------------ */
/* The Luma bar (destination of the walk)                              */
/* ------------------------------------------------------------------ */

const BOTTLE_COLORS = ['#a3501e', '#5e7a2f', '#8a2440', '#b8862f', '#3f5e6e', '#7a4a8a', '#9c6b1f', '#4a6e3f', '#6e2f2f', '#2f4a6e'];

function LumaBar() {
  const signTex = useSignTexture();
  const flickerRef = useRef<THREE.PointLight>(null);
  const bottles = isMobile ? 6 : 10;

  useFrame(({ clock }) => {
    if (flickerRef.current) {
      const t = clock.elapsedTime;
      flickerRef.current.intensity = 36 + Math.sin(t * 2.1) * 3 + Math.sin(t * 5.7) * 2;
    }
  });

  return (
    <group position={[0, 0, -17]}>
      {/* Counter */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[7, 1.1, 1.2]} />
        <meshStandardMaterial color="#181006" roughness={0.45} metalness={0.2} />
      </mesh>
      {/* Gold counter top */}
      <mesh position={[0, 1.13, 0]}>
        <boxGeometry args={[7.3, 0.06, 1.4]} />
        <meshStandardMaterial color="#c9a23a" roughness={0.22} metalness={0.9} />
      </mesh>
      {/* Glowing strip under counter top */}
      <mesh position={[0, 1.08, 0.71]}>
        <boxGeometry args={[7.3, 0.025, 0.01]} />
        <meshBasicMaterial color="#ffd98c" toneMapped={false} />
      </mesh>

      {/* Back bar wall */}
      <mesh position={[0, 1.8, -1.9]}>
        <boxGeometry args={[7.4, 3.6, 0.25]} />
        <meshStandardMaterial color="#100a04" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Shelves with glowing edges */}
      {[1.55, 2.3].map((y) => (
        <group key={y}>
          <mesh position={[0, y, -1.65]}>
            <boxGeometry args={[6.2, 0.05, 0.38]} />
            <meshStandardMaterial color="#241808" roughness={0.35} metalness={0.5} />
          </mesh>
          <mesh position={[0, y - 0.035, -1.47]}>
            <boxGeometry args={[6.2, 0.015, 0.01]} />
            <meshBasicMaterial color="#e8c277" toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Bottles on shelves */}
      {Array.from({ length: bottles }).map((_, i) => {
        const shelf = i % 2 === 0 ? 1.55 : 2.3;
        const x = -2.6 + (Math.floor(i / 2) * 1.3) + (i % 2) * 0.4;
        const h = 0.45 + ((i * 7) % 3) * 0.09;
        return (
          <group key={i} position={[x, shelf + 0.025, -1.65]}>
            <mesh position={[0, h / 2, 0]}>
              <cylinderGeometry args={[0.085, 0.095, h, 16]} />
              <meshPhysicalMaterial color={BOTTLE_COLORS[i]} transmission={0.5} roughness={0.1} thickness={0.3} transparent />
            </mesh>
            <mesh position={[0, h + 0.07, 0]}>
              <cylinderGeometry args={[0.03, 0.04, 0.16, 12]} />
              <meshPhysicalMaterial color={BOTTLE_COLORS[i]} transmission={0.4} roughness={0.1} transparent />
            </mesh>
          </group>
        );
      })}

      {/* Glasses lined up on the bar */}
      <Glass type="martini" position={[-1.9, 1.16, 0.15]} scale={0.4} liquid="#e8a33d" rotationY={0.4} />
      <Glass type="coupe" position={[-0.7, 1.16, 0.25]} scale={0.38} liquid="#d4536a" />
      <Glass type="highball" position={[0.5, 1.16, 0.1]} scale={0.42} liquid="#b9d46a" rotationY={1.1} />
      {!isMobile && <Glass type="rocks" position={[1.7, 1.16, 0.22]} scale={0.44} liquid="#c87137" rotationY={2.2} />}

      {/* LUMA sign */}
      <mesh position={[0, 3.05, -1.74]}>
        <planeGeometry args={[4.6, 1.45]} />
        <meshBasicMaterial map={signTex} transparent toneMapped={false} />
      </mesh>
      {/* Soft glow plane behind sign */}
      <mesh position={[0, 3.05, -1.76]}>
        <planeGeometry args={[5.6, 2.1]} />
        <meshBasicMaterial color="#52401a" transparent opacity={0.35} toneMapped={false} />
      </mesh>

      {/* Sign light washing over the bar */}
      <pointLight ref={flickerRef} position={[0, 2.9, 0.8]} color="#ffcf7a" intensity={36} distance={15} decay={2} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Cocktail tables with drinks and tea lights                          */
/* ------------------------------------------------------------------ */

function CocktailTable({ position, children }: { position: [number, number, number]; children?: React.ReactNode }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.32, 0.36, 0.04, 24]} />
        <meshStandardMaterial color="#1a1208" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 1.0, 12]} />
        <meshStandardMaterial color="#c9a23a" roughness={0.3} metalness={0.85} />
      </mesh>
      <mesh position={[0, 1.04, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.045, 32]} />
        <meshStandardMaterial color="#1d1409" roughness={0.35} metalness={0.3} />
      </mesh>
      {/* Tea light */}
      <mesh position={[0.22, 1.1, -0.15]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#ffb45c" toneMapped={false} />
      </mesh>
      {children}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Strings of warm hanging lights                                      */
/* ------------------------------------------------------------------ */

function StringLights() {
  const strands = isMobile ? [3, -5, -13] : [5, 1, -3, -7, -11, -15];
  const beadsPerStrand = 26;

  const positions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (const z of strands) {
      for (let i = 0; i < beadsPerStrand; i++) {
        const s = i / (beadsPerStrand - 1);
        const x = THREE.MathUtils.lerp(-6.5, 6.5, s);
        const y = 4.3 - Math.sin(Math.PI * s) * 0.85;
        arr.push([x, y, z]);
      }
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Instances limit={positions.length}>
      <sphereGeometry args={[0.038, 10, 10]} />
      <meshBasicMaterial color="#ffd9a0" toneMapped={false} />
      {positions.map((p, i) => (
        <Instance key={i} position={p} />
      ))}
    </Instances>
  );
}

/* ------------------------------------------------------------------ */
/* Reflective venue floor                                              */
/* ------------------------------------------------------------------ */

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -6]}>
      <planeGeometry args={[70, 70]} />
      {isMobile ? (
        <meshStandardMaterial color="#0a0703" roughness={0.3} metalness={0.6} />
      ) : (
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={55}
          roughness={0.9}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0703"
          metalness={0.55}
          mirror={0.6}
        />
      )}
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Camera journey: walk through the event toward the bar               */
/* ------------------------------------------------------------------ */

function CameraJourney() {
  const progress = useRef(0);
  const lookTarget = useRef(new THREE.Vector3(0, 1.2, 0));

  const posCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.7, 9),
    new THREE.Vector3(1.7, 1.5, 4),
    new THREE.Vector3(-1.6, 1.4, -1),
    new THREE.Vector3(1.3, 1.2, -7),
    new THREE.Vector3(0, 1.15, -12.6),
  ]), []);

  const lookCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.4, 0),
    new THREE.Vector3(-0.5, 1.3, -5),
    new THREE.Vector3(0.5, 1.4, -10),
    new THREE.Vector3(0, 1.8, -15),
    new THREE.Vector3(0, 2.4, -16.8),
  ]), []);

  useFrame(({ camera, pointer }, delta) => {
    const scrollHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const t = THREE.MathUtils.clamp(window.scrollY / scrollHeight, 0, 1);
    progress.current = THREE.MathUtils.damp(progress.current, t, 2, delta);

    const p = posCurve.getPoint(progress.current);
    camera.position.lerp(p, 1 - Math.exp(-6 * delta));

    const look = lookCurve.getPoint(progress.current);
    if (!isMobile) {
      look.x += pointer.x * 0.9;
      look.y += pointer.y * 0.45;
    }
    lookTarget.current.lerp(look, 1 - Math.exp(-5 * delta));
    camera.lookAt(lookTarget.current);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/* Error boundary: if WebGL fails for any reason, fall back to CSS     */
/* ------------------------------------------------------------------ */

function CssBackdrop() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-gradient-to-b from-[#0e0a05] via-[#080503] to-black">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-700/10 blur-3xl" />
    </div>
  );
}

class SceneErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <CssBackdrop /> : this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/* Main export                                                          */
/* ------------------------------------------------------------------ */

export default function ThreeBackground() {
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');

  useEffect(() => {
    const handleVisibility = () => setFrameloop(document.hidden ? 'never' : 'always');
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  if (tier === 'off') {
    return <CssBackdrop />;
  }

  return (
    <SceneErrorBoundary>
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-gradient-to-b from-[#0e0a05] via-[#080503] to-black">
      <Canvas
        camera={{ position: [0, 1.7, 9], fov: 50 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
        frameloop={frameloop}
      >
        <fogExp2 attach="fog" args={['#080503', 0.032]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 8, 2]} intensity={1.1} color="#e2b859" />
        <pointLight position={[0, 3.6, -4]} color="#ff9d5c" intensity={16} distance={16} decay={2} />

        <Floor />
        <StringLights />
        <LumaBar />

        {/* Tables scattered along the walk */}
        <CocktailTable position={[2.3, 0, 3.2]}>
          <Glass type="coupe" position={[-0.12, 1.06, 0.1]} scale={0.36} liquid="#d4536a" rotationY={0.7} />
        </CocktailTable>
        <CocktailTable position={[-2.5, 0, 0.4]}>
          <Glass type="martini" position={[0.1, 1.06, -0.08]} scale={0.37} liquid="#e8a33d" />
          {!isMobile && <Glass type="rocks" position={[-0.2, 1.06, 0.14]} scale={0.4} liquid="#c87137" rotationY={1.6} />}
        </CocktailTable>
        {!isMobile && (
          <>
            <CocktailTable position={[2.1, 0, -4.2]}>
              <Glass type="highball" position={[0.05, 1.06, 0.05]} scale={0.4} liquid="#b9d46a" rotationY={2.4} />
            </CocktailTable>
            <CocktailTable position={[-2.3, 0, -8.4]}>
              <Glass type="coupe" position={[0.12, 1.06, -0.1]} scale={0.36} liquid="#e8c23d" rotationY={1.2} />
              <Glass type="martini" position={[-0.18, 1.06, 0.12]} scale={0.37} liquid="#d4536a" rotationY={3.4} />
            </CocktailTable>
          </>
        )}

        {/* Floating golden dust in the air */}
        <Sparkles count={isMobile ? 25 : 70} scale={[18, 5, 28]} position={[0, 2.5, -6]} size={1.6} speed={0.25} opacity={0.5} color="#e2b859" />

        {/* Locally-generated environment reflections (no network fetch) */}
        {!isMobile && (
          <Environment resolution={64}>
            <Lightformer intensity={2} color="#e2b859" position={[0, 5, -9]} scale={[10, 2, 1]} />
            <Lightformer intensity={1.2} color="#fff2d5" position={[-5, 3, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 2, 1]} />
            <Lightformer intensity={1.2} color="#ffd9a0" position={[5, 3, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 2, 1]} />
          </Environment>
        )}
        <CameraJourney />
      </Canvas>
    </div>
    </SceneErrorBoundary>
  );
}
