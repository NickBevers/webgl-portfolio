import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

// import shaders
import vertexShader from '../../webgl/shaders/vertex/baseVertex.glsl'
import fragmentShader from '../../webgl/shaders/fragment/distortFragment.glsl'

const HoverMaterial = shaderMaterial(
  {
    uTextureFrom: null,
    uTextureTo: null,
    uTextureDisplacement: null,
    uEffectFactor: 0.8,
    uProgress: 0
  },
  vertexShader,
  fragmentShader,
)


// declaratively
extend({ HoverMaterial })

export default HoverMaterial