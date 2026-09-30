import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Progress = { current: number };

/** Slow-drifting particle field that leans toward the cursor and fades on scroll. */
function Dust({ count = 520, progress }: { count?: number; progress: Progress }) {
  const points = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) - 3;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const p = points.current;
    if (!p) return;
    p.rotation.y += delta * 0.015;
    p.rotation.x = THREE.MathUtils.damp(p.rotation.x, pointer.y * 0.06, 1.5, delta);
    p.rotation.z = THREE.MathUtils.damp(p.rotation.z, -pointer.x * 0.04, 1.5, delta);
    p.position.y = progress.current * 1.2;
    (p.material as THREE.PointsMaterial).opacity = 0.55 * (1 - progress.current);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#f2efe9" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HeroScene({ progress }: { progress: Progress }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Dust progress={progress} />
    </Canvas>
  );
}
