import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Progress = { current: number };

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  varying float vLift;
  varying float vDepth;
  varying float vEdge;

  void main() {
    vec3 p = position;

    // layered swells, slow and long so it reads as calm water
    float t = uTime;
    float wave = sin(p.x * 0.32 + t * 0.55) * 0.32
               + sin(p.z * 0.45 - t * 0.40) * 0.22
               + sin((p.x + p.z) * 0.18 + t * 0.30) * 0.30;

    // soft bulge + ring that follows the pointer
    float d = distance(p.xz, uMouse);
    float bump = exp(-d * d * 0.18) * 0.55 * uMouseStrength;
    float ring = sin(d * 2.2 - t * 2.4) * exp(-d * 0.55) * 0.12 * uMouseStrength;

    p.y += wave * 0.55 + bump + ring;
    vLift = clamp(wave * 0.9 + bump * 1.6, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    vEdge = abs(p.x);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (1.0 + vLift * 0.8) / vDepth;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform float uOpacity;
  uniform float uHalfWidth;
  varying float vLift;
  varying float vDepth;
  varying float vEdge;

  void main() {
    // round, soft-edged dot
    float r = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.1, r);
    if (disc < 0.01) discard;

    vec3 color = mix(uBase, uAccent, smoothstep(0.25, 0.9, vLift));
    float horizon = smoothstep(18.0, 6.0, vDepth);      // fade into the distance
    float near = smoothstep(1.2, 3.0, vDepth);          // avoid huge dots at the lens
    float sides = 1.0 - smoothstep(uHalfWidth * 0.55, uHalfWidth, vEdge);
    float alpha = disc * horizon * near * sides * (0.45 + vLift * 0.55) * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;

interface FieldProps {
  progress: Progress;
  cols: number;
  rows: number;
  animate: boolean;
  /** Phone framing: camera higher and tilted down so the field fills the tall screen. */
  lite: boolean;
}

function WaveField({ progress, cols, rows, animate, lite }: FieldProps) {
  const group = useRef<THREE.Group>(null);
  const { camera, pointer, raycaster, gl } = useThree();
  const halfWidth = cols * 0.11;

  const geometry = useMemo(() => {
    const spacing = 0.22;
    const positions = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let z = 0; z < rows; z++) {
      for (let x = 0; x < cols; x++) {
        positions[i++] = (x - cols / 2) * spacing;
        positions[i++] = 0;
        positions[i++] = -z * spacing * 1.25 + 2;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [cols, rows]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: lite ? 40 : 28 },
      uMouse: { value: new THREE.Vector2(0, -2) },
      uMouseStrength: { value: 0 },
      uOpacity: { value: 1 },
      uHalfWidth: { value: halfWidth },
      uBase: { value: new THREE.Color("#8a8a92") },
      uAccent: { value: new THREE.Color("#6AFF9D") },
    }),
    [gl, halfWidth, lite]
  );

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const lastPointer = useRef({ x: 0, y: 0 });
  const idleFor = useRef(10);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (animate) uniforms.uTime.value += delta;

    const moved = pointer.x !== lastPointer.current.x || pointer.y !== lastPointer.current.y;
    lastPointer.current = { x: pointer.x, y: pointer.y };
    idleFor.current = moved ? 0 : idleFor.current + delta;
    const following = idleFor.current < 2.5;

    // Follow the pointer; when it is idle (always, on touch screens) the ripple drifts on its own
    const m = uniforms.uMouse.value;
    let tx = m.x;
    let tz = m.y;
    if (following) {
      plane.constant = -g.position.y;
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        tx = hit.x;
        tz = hit.z;
      }
    } else {
      const t = uniforms.uTime.value;
      tx = Math.sin(t * 0.23) * halfWidth * 0.45;
      tz = -2.5 + Math.cos(t * 0.17) * 2.2;
    }
    m.x = THREE.MathUtils.damp(m.x, tx, following ? 4 : 0.8, delta);
    m.y = THREE.MathUtils.damp(m.y, tz, following ? 4 : 0.8, delta);
    uniforms.uMouseStrength.value = THREE.MathUtils.damp(
      uniforms.uMouseStrength.value,
      following ? 1 : 0.75,
      1.5,
      delta
    );

    const p = progress.current;
    uniforms.uOpacity.value = 1 - p;
    g.position.y = THREE.MathUtils.damp(g.position.y, -1.35 - p * 0.8, 4, delta);
    // gentle parallax
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.06, 2, delta);
    const camY = lite ? 1.6 : 0.2;
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, camY + pointer.y * 0.12, 2, delta);
    state.camera.lookAt(0, lite ? -2.2 : -0.9, lite ? -2.5 : -4);
  });

  return (
    <group ref={group} position={[0, -1.35, 0]}>
      <points geometry={geometry}>
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

interface HeroSceneProps {
  progress: Progress;
  /** Stop rendering while the hero is off-screen. */
  active: boolean;
  reduced: boolean;
}

export default function HeroScene({ progress, active, reduced }: HeroSceneProps) {
  // Smaller grid and pixel ratio on phones and low-power devices
  const narrow = typeof window !== "undefined" && window.innerWidth < 768;
  const lowPower = typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4;
  const lite = narrow || lowPower;
  const cols = lite ? 70 : 130;
  const rows = lite ? 56 : 64;

  return (
    <Canvas
      dpr={lite ? [1, 1.5] : [1, 2]}
      frameloop={reduced ? "demand" : active ? "always" : "never"}
      camera={{ position: [0, 0.2, 5], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: lite ? "low-power" : "high-performance" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <WaveField progress={progress} cols={cols} rows={rows} animate={!reduced} lite={narrow} />
    </Canvas>
  );
}
