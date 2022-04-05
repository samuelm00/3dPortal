import { Canvas, Props } from "@react-three/fiber";
import React from "react";
import CameraControls from "../OrbitControls/OrbitControls";

interface SimpleContainerProps extends Props {
  children: React.ReactNode;
}

export default function SimpleContainer({
  children,
  ...props
}: SimpleContainerProps) {
  return (
    <Canvas {...props} dpr={Math.min(window.devicePixelRatio, 2)}>
      <CameraControls />
      {children}
    </Canvas>
  );
}
