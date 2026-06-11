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

const v2 = (pts: [number, number][]) => pts.map(([x, y]) => new THREE.Vector2(x, y));

/** Smooth a run of profile points with a spline (for curved bowls/shoulders). */
const splined = (pts: [number, number][], divisions = 20) =>
  new THREE.SplineCurve(v2(pts)).getPoints(divisions);

const PROFILES: Record<string, THREE.Vector2[]> = {
  // Martini stays crisp: it really is a cone.
  martini: v2([
    [0, 0], [0.30, 0], [0.30, 0.02], [0.08, 0.04], [0.035, 0.07],
    [0.035, 0.52], [0.07, 0.55], [0.43, 0.93], [0.43, 0.95],
    [0.41, 0.95], [0.015, 0.58], [0, 0.58],
  ]),
  // Coupe gets a smooth, rounded saucer bowl.
  coupe: [
    ...v2([[0, 0], [0.30, 0], [0.30, 0.02], [0.08, 0.04], [0.035, 0.07], [0.035, 0.50]]),
    ...splined([[0.035, 0.50], [0.10, 0.555], [0.26, 0.60], [0.37, 0.68], [0.40, 0.78]]),
    ...v2([[0.40, 0.80], [0.38, 0.80]]),
    ...splined([[0.38, 0.80], [0.345, 0.70], [0.24, 0.625], [0.09, 0.585], [0.015, 0.56]]),
    ...v2([[0, 0.56]]),
  ],
  // Highball gets a slightly weighted base.
  highball: [
    ...v2([[0, 0], [0.16, 0]]),
    ...splined([[0.16, 0], [0.185, 0.015], [0.18, 0.06]], 8),
    ...v2([[0.18, 0.95], [0.175, 1.0], [0.158, 1.0], [0.158, 0.10]]),
    ...splined([[0.158, 0.10], [0.12, 0.085], [0, 0.075]], 8),
  ],
  // Rocks: thick base, slight outward taper like real crystal.
  rocks: [
    ...v2([[0, 0], [0.20, 0]]),
    ...splined([[0.20, 0], [0.225, 0.02], [0.215, 0.07]], 8),
    ...v2([[0.225, 0.52], [0.22, 0.55], [0.20, 0.55], [0.196, 0.12]]),
    ...splined([[0.196, 0.12], [0.14, 0.10], [0, 0.09]], 8),
  ],
};

const LIQUIDS: Record<string, THREE.Vector2[]> = {
  martini: v2([[0, 0.60], [0.345, 0.865], [0, 0.865]]),
  coupe: [
    ...splined([[0, 0.575], [0.10, 0.595], [0.235, 0.635], [0.31, 0.70]], 12),
    ...v2([[0, 0.70]]),
  ],
  highball: v2([[0, 0.08], [0.15, 0.09], [0.15, 0.70], [0, 0.70]]),
  rocks: v2([[0, 0.10], [0.19, 0.11], [0.19, 0.38], [0, 0.38]]),
};

function GlassMaterial() {
  return (
    <meshPhysicalMaterial
      transmission={isMobile ? 0.85 : 1}
      roughness={0.03}
      thickness={0.08}
      ior={1.5}
      clearcoat={1}
      clearcoatRoughness={0.06}
      specularIntensity={1}
      envMapIntensity={1.6}
      color="#ffffff"
      transparent
    />
  );
}

function LiquidMaterial({ color }: { color: string }) {
  return (
    <meshPhysicalMaterial
      transmission={isMobile ? 0.5 : 0.8}
      roughness={0.06}
      thickness={0.5}
      ior={1.33}
      color={color}
      attenuationColor={color}
      attenuationDistance={0.35}
      envMapIntensity={1.2}
      transparent
      opacity={0.95}
    />
  );
}

function IceCube({ position, rotation = [0, 0, 0] as [number, number, number], size = 0.075 }: {
  position: [number, number, number]; rotation?: [number, number, number]; size?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[size, size, size]} />
      <meshPhysicalMaterial
        transmission={0.92}
        roughness={0.32}
        thickness={0.4}
        ior={1.31}
        color="#eaf6ff"
        transparent
      />
    </mesh>
  );
}

function CitrusSlice({ position, rotation, color = '#f5c33b' }: {
  position: [number, number, number]; rotation: [number, number, number]; color?: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* flesh */}
      <mesh>
        <cylinderGeometry args={[0.085, 0.085, 0.014, 20]} />
        <meshStandardMaterial color={color} roughness={0.5} emissive={color} emissiveIntensity={0.12} />
      </mesh>
      {/* rind */}
      <mesh>
        <torusGeometry args={[0.085, 0.009, 8, 20]} />
        <meshStandardMaterial color="#d99a18" roughness={0.55} />
      </mesh>
    </group>
  );
}

function Garnish({ type }: { type: string }) {
  if (type === 'martini') {
    // Olive on a gold pick laid across the rim
    return (
      <group position={[0, 0.93, 0]} rotation={[0, 0.6, 0.12]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.006, 0.006, 0.62, 8]} />
          <meshStandardMaterial color="#c9a23a" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[-0.10, -0.02, 0]}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshStandardMaterial color="#7a8a35" roughness={0.35} />
        </mesh>
        <mesh position={[-0.19, -0.02, 0]}>
          <sphereGeometry args={[0.042, 14, 14]} />
          <meshStandardMaterial color="#7a8a35" roughness={0.35} />
        </mesh>
      </group>
    );
  }
  if (type === 'coupe') {
    return <CitrusSlice position={[0.36, 0.80, 0]} rotation={[0.25, 0, -0.5]} color="#f5c33b" />;
  }
  if (type === 'highball') {
    return (
      <group>
        <IceCube position={[0.04, 0.62, 0.02]} rotation={[0.4, 0.7, 0.2]} />
        <IceCube position={[-0.05, 0.45, -0.03]} rotation={[0.9, 0.2, 0.5]} />
        <IceCube position={[0.02, 0.28, 0.04]} rotation={[0.1, 1.1, 0.8]} size={0.07} />
        {/* gold stirrer */}
        <mesh position={[0.06, 0.72, -0.04]} rotation={[0.18, 0, -0.14]}>
          <cylinderGeometry args={[0.008, 0.008, 0.85, 8]} />
          <meshStandardMaterial color="#c9a23a" metalness={0.9} roughness={0.2} />
        </mesh>
        <CitrusSlice position={[0.17, 0.97, 0]} rotation={[0.1, 0, -0.35]} color="#bcd14a" />
      </group>
    );
  }
  if (type === 'rocks') {
    return (
      <group>
        <IceCube position={[0, 0.27, 0]} rotation={[0.3, 0.8, 0.1]} size={0.13} />
        <CitrusSlice position={[0.18, 0.55, 0.02]} rotation={[0.2, 0, -0.4]} color="#e8923b" />
      </group>
    );
  }
  return null;
}

function Glass({ type = 'martini', position = [0, 0, 0] as [number, number, number], scale = 0.35, liquid = '#e8a33d', rotationY = 0 }) {
  const glassGeo = useMemo(() => new THREE.LatheGeometry(PROFILES[type], 48), [type]);
  const liquidGeo = useMemo(() => new THREE.LatheGeometry(LIQUIDS[type], 48), [type]);

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      <mesh geometry={glassGeo}>
        <GlassMaterial />
      </mesh>
      <mesh geometry={liquidGeo}>
        <LiquidMaterial color={liquid} />
      </mesh>
      {!isMobile && <Garnish type={type} />}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Realistic spirit-style bottle: curved shoulders, neck, cap, label   */
/* ------------------------------------------------------------------ */

const BOTTLE_PROFILE: THREE.Vector2[] = [
  ...v2([[0, 0], [0.14, 0]]),
  ...splined([[0.14, 0], [0.165, 0.02], [0.16, 0.06]], 6),
  ...v2([[0.16, 0.58]]),
  // Curved shoulder into the neck
  ...splined([[0.16, 0.58], [0.15, 0.68], [0.10, 0.75], [0.052, 0.79]], 14),
  ...v2([[0.046, 0.96], [0.058, 0.965], [0.058, 1.0], [0.0, 1.0]]),
];

const BOTTLE_LIQUID: THREE.Vector2[] = [
  ...v2([[0, 0.025], [0.145, 0.03], [0.145, 0.56]]),
  ...splined([[0.145, 0.56], [0.135, 0.66], [0.09, 0.72], [0.04, 0.755]], 10),
  ...v2([[0, 0.755]]),
];

function Bottle({ position, tint, height = 0.62, label = '#efe6d0' }: {
  position: [number, number, number]; tint: string; height?: number; label?: string;
}) {
  const bodyGeo = useMemo(() => new THREE.LatheGeometry(BOTTLE_PROFILE, 32), []);
  const liquidGeo = useMemo(() => new THREE.LatheGeometry(BOTTLE_LIQUID, 32), []);

  return (
    <group position={position} scale={height}>
      {/* Tinted glass shell */}
      <mesh geometry={bodyGeo}>
        <meshPhysicalMaterial
          transmission={isMobile ? 0.6 : 0.9}
          roughness={0.05}
          thickness={0.15}
          ior={1.5}
          color={tint}
          attenuationColor={tint}
          attenuationDistance={0.6}
          clearcoat={0.8}
          envMapIntensity={1.4}
          transparent
        />
      </mesh>
      {/* Liquid inside */}
      <mesh geometry={liquidGeo}>
        <meshPhysicalMaterial
          transmission={0.4}
          roughness={0.1}
          thickness={0.6}
          color={tint}
          attenuationColor={tint}
          attenuationDistance={0.25}
          transparent
          opacity={0.96}
        />
      </mesh>
      {/* Label band */}
      <mesh position={[0, 0.33, 0]}>
        <cylinderGeometry args={[0.168, 0.168, 0.2, 24, 1, true]} />
        <meshStandardMaterial color={label} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      {/* Gold foil cap */}
      <mesh position={[0, 0.945, 0]}>
        <cylinderGeometry args={[0.062, 0.062, 0.11, 16]} />
        <meshStandardMaterial color="#c9a23a" metalness={0.92} roughness={0.22} />
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

const BOTTLE_COLORS = ['#2e4a1e', '#8a5516', '#5a1620', '#b8862f', '#1d3a4a', '#3a1c10', '#9c6b1f', '#26421d', '#6e2317', '#414a1d'];

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
        const h = 0.56 + ((i * 7) % 3) * 0.07;
        return (
          <Bottle
            key={i}
            position={[x, shelf + 0.025, -1.65]}
            tint={BOTTLE_COLORS[i]}
            height={h}
            label={i % 3 === 0 ? '#efe6d0' : i % 3 === 1 ? '#1a130a' : '#caa84e'}
          />
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
