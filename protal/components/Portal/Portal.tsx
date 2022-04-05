import SimpleContainer from "../SimpleContainer/SimpleContainer";
import PortalModel from "./PortalModel";

export default function Portal() {
  return (
    <SimpleContainer
      camera={{
        isPerspectiveCamera: true,
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        far: 100,
        near: 0.1,
        position: [4, 2, 4],
      }}
      gl={{ antialias: true }}
    >
      <PortalModel />
    </SimpleContainer>
  );
}
