'use client'
import React, { useEffect, useState } from 'react';
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 50) setIsScrolled(true);
    else setIsScrolled(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className={`${styles.scrollIcon} ${isScrolled ? styles.hidden : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={'#ECE7DF'} viewBox="0 0 256 256"><path d="M144,16H112A64.07,64.07,0,0,0,48,80v96a64.07,64.07,0,0,0,64,64h32a64.07,64.07,0,0,0,64-64V80A64.07,64.07,0,0,0,144,16Zm48,160a48.05,48.05,0,0,1-48,48H112a48.05,48.05,0,0,1-48-48V80a48.05,48.05,0,0,1,48-48h32a48.05,48.05,0,0,1,48,48ZM136,64v48a8,8,0,0,1-16,0V64a8,8,0,0,1,16,0Z"></path></svg>
      </div>
    </section>
  );
}


export default OrganicGrowthPlane;