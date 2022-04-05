import React, { useMemo, useRef } from "react";
// @ts-ignore
import firefliesVertexShader from "../shaders/fireflies/vertex.glsl";
// @ts-ignore
import firefliesFragmentShader from "../shaders/fireflies/fragment.glsl";
import { AdditiveBlending, ShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";

const fireFliesCount = 40;

export default function FireFlies() {
  const firefliesMaterial = useRef<ShaderMaterial>();

  const bufferGeometryAttributes = useMemo(() => {
    const positionArray = new Float32Array(fireFliesCount * 3);
    const scaleArray = new Float32Array(fireFliesCount);

    for (let i = 0; i < fireFliesCount; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
      positionArray[i * 3 + 1] = Math.random() * 1.5;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;

      scaleArray[i] = Math.random();
    }
    return { positionArray, scaleArray };
  }, []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (firefliesMaterial.current) {
      firefliesMaterial.current.uniforms.uTime.value = elapsedTime;
    }
  });

  return (
    <points>
      <shaderMaterial
        ref={firefliesMaterial}
        attach={"material"}
        uniforms={{
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uSize: { value: 100 },
        }}
        vertexShader={firefliesVertexShader}
        fragmentShader={firefliesFragmentShader}
        transparent={true}
        blending={AdditiveBlending}
        depthWrite={false}
      />
      <bufferGeometry attach="geometry">
        <bufferAttribute
          //@ts-ignore
          attachObject={["attributes", "position"]}
          array={bufferGeometryAttributes.positionArray}
          itemSize={3}
        />
        <bufferAttribute
          //@ts-ignore
          attachObject={["attributes", "aSacel"]}
          array={bufferGeometryAttributes.scaleArray}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
}
