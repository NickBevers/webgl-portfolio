'use client'
import React, { useEffect } from "react";
import styles from "./textureplane.module.css";

import { Plane, PerspectiveCamera, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";

import HoverMaterial from "./hoverMaterial";

// in your component
interface SceneProps {
  imageFrom: string;
  imageTo: string;
  displacement: string;
}

interface HoverMaterialProps {
  uTextureFrom: string;
  uTextureTo: string;
  uTextureDisplacement: string;
  uEffectFactor: number;
  uProgress: number;
}

// setup camera
const cameraProps = {
  fov: 75,
  near: 0.1,
  far: 5,
  position: new Vector3(0, 0, 0.65),
};

const Scene: React.FC<SceneProps> = ({
  imageFrom,
  imageTo,
  displacement,
}) => {
  const { gl } = useThree();
  const materialRef = React.useRef<HoverMaterialProps>(null);
  const [hovering, setHovering] = React.useState<boolean>(false);
  const [ textureFrom, textureTo, displacementTexture ] = useTexture([imageFrom, imageTo, displacement]);

  useEffect(() => {
    if (!global.window) return;
    gl.setPixelRatio(global.window.devicePixelRatio || 1);
  }, [gl]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uProgress = MathUtils.lerp(materialRef.current.uProgress, hovering ? 1 : 0, 0.075);
    }
  })

  return (
    <>
      <Plane args={[1, 1]} position={[0, 0, 0]} onPointerEnter={() => {setHovering(true)}} onPointerLeave={() => setHovering(false)}>
        <hoverMaterial
          ref={materialRef}
          attach="material"
          key={HoverMaterial.key}
          uTextureFrom={textureFrom}
          uTextureTo={textureTo}
          uTextureDisplacement={displacementTexture}
          uEffectFactor={0.1}
          uProgress={0.}
        />;
      </Plane>
    </>
  );
}


const TexturePlane: React.FC<{
  textureUrl1: string,
  textureUrl2: string,
  displacementUrl: string,
}> = ({ textureUrl1, textureUrl2, displacementUrl }) => {
  return (
    <section className={styles.plane}>
      <Canvas >
        <PerspectiveCamera makeDefault {...cameraProps} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Scene imageFrom={textureUrl1} imageTo={textureUrl2} displacement={displacementUrl} />
      </Canvas>
    </section>
  );
}


export default TexturePlane;