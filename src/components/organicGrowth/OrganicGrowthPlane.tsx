'use client'
import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Plane } from '@react-three/drei';
import styles from './organicGrowth.module.css';
import { Vector3 } from 'three';
import { OrganicMaterial } from './GrowthMaterial';

const cameraProps = {
  fov: 100,
  near: 0.1,
  far: 5,
  position: new Vector3(0, 0, 1),
};

type GrowthMaterialProps = {
  uTime: number;
  uSpeed: number;
  uProgress: number;
  uBaseColor: string;
  uGrowthColor: string;
  uAspect: number;
}

const Scene: React.FC = () => {
  const { gl, size } = useThree();
  const aspect = size.width / size.height;
  const materialRef = React.useRef<GrowthMaterialProps>(null);
  const beige = new Vector3(0.925,0.906,0.875);
  const darkGreen = new Vector3(0.263,0.337,0.314);

  React.useEffect(() => {
    if (!global.window) return;
    gl.setPixelRatio(global.window.devicePixelRatio || 1);
  }, [gl]);
  
  useFrame((state) => {
    if (materialRef.current) materialRef.current.uProgress = state.clock.elapsedTime * 0.5;
  });

  return (
    <>
      <Plane args={[aspect * 3, 3]} position={[0, 0, 0]}>
        {/* takes around 4s for the growth to be completed. Switch to a basicMaterial afterwards - TODO: change to GSAP later on?*/}
        <organicMaterial ref={materialRef} attach="material" key={OrganicMaterial.key} uTime={0.} uProgress= {0.} uAspect={1.} uGrowthColor={darkGreen} uBaseColor={beige} />
      </Plane>
    </>
  );
}

const OrganicGrowthPlane: React.FC = () => {
  return (
    <section className={styles.plane}>
      <Canvas >
        <PerspectiveCamera makeDefault {...cameraProps} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Scene/>
      </Canvas>
      <div className={styles.name}>
        <span className={`${styles.firstname} ${styles.active}`}>Nick</span>
        <span className={`${styles.lastname} ${styles.active}`}>Bevers</span>
      </div>
    </section>
  );
}


export default OrganicGrowthPlane;