import type { NextPage } from "next";
import dynamic from "next/dynamic";
const Portal = dynamic(() => import("../components/Portal/Portal"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Portal />
    </div>
  );
};

export default Home;
