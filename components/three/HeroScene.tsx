"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  varying float vElev;
  void main() {
    vec3 p = position;
    float t = uTime * 0.4;
    float e = sin(p.x * 1.6 + t) * 0.22
            + sin(p.y * 2.4 + t * 0.8) * 0.16
            + sin((p.x + p.y) * 3.2 - t * 0.6) * 0.08;
    p.z += e;
    vElev = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  varying float vElev;
  void main() {
    float shade = smoothstep(-0.4, 0.5, vElev);
    vec3 col = mix(vec3(0.04), vec3(0.35), shade);
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Cloth() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <mesh rotation={[-0.9, 0, 0.25]}>
      <planeGeometry args={[10, 10, 120, 120]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Cloth />
    </Canvas>
  );
}
