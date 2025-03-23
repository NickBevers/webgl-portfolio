// components/Plane.tsx
import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import { animated, useSpring } from '@react-spring/three';
import CustomShaderMaterial from './CustomShaderMaterial';

const Plane: React.FC = () => {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, displacement] = useLoader(TextureLoader, ['/images/logo/brown-200', '/images/displacement.jpg']);

  const hoverSpring = useSpring({ uHover: hovered ? 1 : 0 });

  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as any).uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <animated.positionMesh
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <CustomShaderMaterial
        uTexture={texture}
        uDisplacement={displacement}
        uTime={0}
        uHover={hoverSpring.uHover}
      />
    </animated.positionMesh>
  );
};

export default Plane;
