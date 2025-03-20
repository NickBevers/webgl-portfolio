uniform float uTime;
uniform float uProgress;
uniform float uAspect;
varying vec2 vUv;
uniform vec3 uBaseColor;
uniform vec3 uGrowthColor;

highp float rand(vec2 co) {
  highp float a = 49.4894614; // random number
  highp float b = 28.4891566489; // random number
  highp float c = 123.486521; // random number
  highp float dt = dot(co.xy ,vec2(a,b));
  highp float sn = mod(dt, 3.14);
  return fract(sin(sn) * c);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = rand(i); // bottom-left
  float b = rand(i + vec2(1.0, 0.0)); // bottom-right
  float c = rand(i + vec2(0.0, 1.0)); // top-left
  float d = rand(i + vec2(1.0, 1.0)); // top-right

  // Smooth Interpolation -> smoothing between corners of tiles
  vec2 u = f*f*(3.0-2.0*f);

  // Mix 4 corners percentages
  return mix(a, b, u.x) +
    (c - a) * u.y * (1.0 - u.x) +
    (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
  // Initial values
  float value = 0.0;
  float amplitude = 0.5;

  // Loop of octaves
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
    vec2 newUv = (vUv - vec2(0.5)) * vec2(uAspect, 1.0);

    // Use fbm for a more organic noise pattern
    float organicNoise = fbm(newUv * 3.0 + uTime);

    // Invert the growth mask to start from the center and grow towards the edges
    float growthMask = smoothstep(0.0, 1.0, uProgress - organicNoise);

    // Color modulation based on growth
    vec3 growthColor = mix(uBaseColor, uGrowthColor, growthMask);

    gl_FragColor = vec4(growthColor, 1.0);
}
