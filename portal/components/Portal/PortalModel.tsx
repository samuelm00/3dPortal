import { useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useEffect, useMemo, useState } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {
  Color,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  sRGBEncoding,
} from "three";
// @ts-ignore
import portalVertexShader from "../shaders/portal/vertex.glsl";
// @ts-ignore
import portalFragmentShader from "../shaders/portal/fragment.glsl";
import FireFlies from "../FireFlies/FireFlies";
import CameraControls from "../OrbitControls/OrbitControls";

export default function PortalModel() {
  const [glbModel, setGlbModel] = useState<any>(null);
  const { gl } = useThree();

  const bakedTexture = useMemo(() => {
    const loader = new TextureLoader();
    const texture = loader.load("/static/baked.jpg");
    texture.flipY = false;
    texture.encoding = sRGBEncoding;
    return texture;
  }, []);

  const portalLightMaterial = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorStart: { value: new Color("#111111") },
          uColorEnd: { value: new Color("#3CFCC5") },
        },
        vertexShader: portalVertexShader,
        fragmentShader: portalFragmentShader,
      }),
    []
  );

  const constructGlbModel = () => {
    const gltLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/static/draco/");
    gltLoader.setDRACOLoader(dracoLoader);
    gltLoader.load("/static/portal.glb", (gltf) => {
      setGlbModel(gltf.scene);

      const bakedMesh = gltf.scene.children.find(
        (child) => child.name === "baked"
      ) as Mesh;
      const portalLightMesh = gltf.scene.children.find(
        (child) => child.name === "portalLight"
      ) as Mesh;
      const poleLightAMesh = gltf.scene.children.find(
        (child) => child.name === "poleLightA"
      ) as Mesh;
      const poleLightBMesh = gltf.scene.children.find(
        (child) => child.name === "poleLightB"
      ) as Mesh;

      // Apply materials
      bakedMesh!.material = new MeshBasicMaterial({ map: bakedTexture });
      portalLightMesh!.material = portalLightMaterial;
      poleLightAMesh!.material = new MeshBasicMaterial({ color: 0xffff35 });
      poleLightBMesh!.material = poleLightAMesh!.material;
    });
  };

  useEffect(() => {
    if (bakedTexture && portalLightMaterial) {
      constructGlbModel();
    }
  }, [bakedTexture, portalLightMaterial]);

  useEffect(() => {
    gl.setClearColor("#111111");
  }, []);

  useFrame(({ clock }) => {
    if (portalLightMaterial) {
      portalLightMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  if (!glbModel) {
    return null;
  }

  return (
    <>
      <primitive object={glbModel} />
      <CameraControls />
      <FireFlies />
    </>
  );
}
