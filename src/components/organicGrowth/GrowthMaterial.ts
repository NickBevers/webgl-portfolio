import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import vertexShader from '../../webgl/shaders/vertex/baseVertex.glsl';
import fragmentShader from '../../webgl/shaders/fragment/organicGrowthFragment.glsl';

const OrganicMaterial = shaderMaterial(
  {
    uTime: null,
    uProgress: null,
    uColor: null,
    uAspect: null,
    uBaseColor: null,
    uGrowthColor: null,
  },
  vertexShader,
  fragmentShader
);

// Register the material with three.js
extend({ OrganicMaterial });

export { OrganicMaterial };