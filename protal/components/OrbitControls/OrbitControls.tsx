import React, { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

export default function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef<any>();

  useFrame(() => controls?.current?.update());

  return (
    // @ts-ignore
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      minPolarAngle={0}
      enableDamping={true}
    />
  );
}
