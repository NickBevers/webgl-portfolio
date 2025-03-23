import { shaderMaterial } from '@react-three/drei';
import { Texture } from 'three';

import distortVertex from '../webgl/shaders/vertex/baseVertex.glsl';
import distortFragment from '../webgl/shaders/fragment/distortFragment.glsl';

const CustomShaderMaterial = shaderMaterial(
  {
    uTexture: new Texture(),
    uDisplacement: new Texture(),
    uTime: 0,
    uHover: 0,
  },
  distortVertex,
  distortFragment
);

export default CustomShaderMaterial;
