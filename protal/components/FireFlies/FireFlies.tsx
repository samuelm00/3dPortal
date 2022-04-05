import React, { useMemo, useRef } from "react";
// @ts-ignore
import firefliesVertexShader from "../shaders/fireflies/vertex.glsl";
// @ts-ignore
import firefliesFragmentShader from "../shaders/fireflies/fragment.glsl";
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  ShaderMaterial,
} from "three";
import { useFrame } from "@react-three/fiber";

const fireFliesCount = 40;

export default function FireFlies() {
  const firefliesMaterial = useRef<ShaderMaterial>();
  const ref = useRef<any>();

  const bufferGeometryAttributes = useMemo(() => {
    const positionArray = new Float32Array(fireFliesCount * 3);
    const scaleArray = new Float32Array(fireFliesCount);

    for (let i = 0; i < fireFliesCount; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
      positionArray[i * 3 + 1] = Math.random() * 1.5;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;

      scaleArray[i] = Math.random();
    }
    return {
      position: new BufferAttribute(positionArray, 3),
      aScale: new BufferAttribute(scaleArray, 1),
    };
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (firefliesMaterial.current) {
      firefliesMaterial.current.uniforms.uTime.value = elapsedTime;
    }
    console.log(ref.current);
  });

  return (
    <points>
      <shaderMaterial
        defaultAttributeValues={{ color: [255, 255, 255] }}
        ref={firefliesMaterial}
        attach={"material"}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uSize: { value: 300 },
        }}
        vertexShader={firefliesVertexShader}
        fragmentShader={firefliesFragmentShader}
        transparent={true}
        blending={AdditiveBlending}
        depthWrite={false}
      />
      <bufferGeometry
        ref={ref}
        attach="geometry"
        attributes={{
          ...bufferGeometryAttributes,
        }}
      />
    </points>
  );
}
