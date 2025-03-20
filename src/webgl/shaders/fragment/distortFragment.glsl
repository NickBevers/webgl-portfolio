uniform sampler2D uTextureFrom;
uniform sampler2D uTextureTo;
uniform sampler2D uTextureDisplacement;
uniform float uEffectFactor;
uniform float uProgress;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 displacement = texture2D(uTextureDisplacement, uv);

  // Distort the position for both images
  vec2 distortedPositionFrom = uv + (displacement.r * uEffectFactor * uProgress);
  vec2 distortedPositionTo = uv - (displacement.r * uEffectFactor * (1.0 - uProgress));
  
  // Ensure coordinates stay within bounds
  distortedPositionFrom = clamp(distortedPositionFrom, 0.0, 1.0);
  distortedPositionTo = clamp(distortedPositionTo, 0.0, 1.0);

  // Distort the images
  vec4 distortedTextureFrom = texture2D(uTextureFrom, distortedPositionFrom);
  vec4 distortedTextureTo = texture2D(uTextureTo, distortedPositionTo);

  // Blend the images based on progress
  gl_FragColor = mix(distortedTextureFrom, distortedTextureTo, uProgress);
}