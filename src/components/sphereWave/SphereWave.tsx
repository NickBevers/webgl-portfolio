'use client'
import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ShaderMaterial, Vector3, type Mesh, type BufferAttribute } from 'three';
import styles from './SphereWave.module.css'

type ShockwaveFunction = (y: number) => number

type CreateShockwave = (
  time: number,
  amplitude: number,
  frequency: number,
  speed: number,
  width: number
) => ShockwaveFunction

const SphereCanvas: React.FC = () => {
  const meshRef = useRef<Mesh>(null)

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    varying float vY;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vY = position.y; // Pass the y-coordinate to the fragment shader
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    varying float vY;

    void main() {
      // Use only the #435650 color (= sage 800 converted to vec3)
      vec3 baseColor = vec3(0.263, 0.337, 0.314);

      // Enhanced lighting
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);

      // Directional lighting
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diff = max(dot(normal, lightDir), 0.0);
      float shadow = 0.5 + diff * 0.5; // Enhanced shadow contrast

      // Adds enhanced shininess
      float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 3.0);
      vec3 finalColor = mix(baseColor * shadow, vec3(0.4, 0.5, 0.48), fresnel * 0.7);

      // Adds rim lighting for better shape definition (TODO: double check logic)
      float rim = 1.0 - max(dot(viewDir, normal), 0.0);
      rim = pow(rim, 4.0);
      finalColor += rim * 0.2 * vec3(0.3, 0.4, 0.38);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
  })

  // Store original positions for animation
  const originalPositions = useRef<Float32Array>()

  useEffect(() => {
    if (meshRef.current) {
      const positionAttribute = meshRef.current.geometry.getAttribute("position") as BufferAttribute
      originalPositions.current = new Float32Array(positionAttribute.array)
    }
  }, [])

  // Function to create a shockwave that moves with time
  const createShockwave: CreateShockwave = (time, amplitude, frequency, speed, width) => {
    const center = 1.0 - (time % 2.0) * 1.0
    return (y) => {
      const distance = Math.abs(y - center)
      const wave = amplitude * Math.exp(-Math.pow(distance / width, 2)) * Math.sin(frequency * distance - speed * time)
      return wave
    }
  }

  useFrame((state) => {
    if (meshRef.current) {
      const elapsedTime = state.clock.getElapsedTime()
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array
      const tempVertex = new Vector3()

      const shockwave1 = createShockwave(elapsedTime * 0.25, 0.1, 15, 10, 0.15)
      const shockwave2 = createShockwave(elapsedTime * 0.25 + 1.0, 0.08, 20, 12, 0.12)
      const shockwave3 = createShockwave(elapsedTime * 0.25 + 0.5, 0.06, 25, 15, 0.1)

      for (let i = 0; i < positions.length; i += 3) {
        tempVertex.set(originalPositions.current![i], originalPositions.current![i + 1], originalPositions.current![i + 2])
        const direction = tempVertex.clone().normalize()
        const y = tempVertex.y
        const totalWave = shockwave1(y) + shockwave2(y) + shockwave3(y)
        const newPos = tempVertex.clone().add(direction.multiplyScalar(totalWave))
        positions[i] = newPos.x
        positions[i + 1] = newPos.y
        positions[i + 2] = newPos.z
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true
      meshRef.current.geometry.computeVertexNormals()
    }
  })

  return (
    <mesh ref={meshRef} material={material} rotation={[Math.PI / 4, 0, Math.PI / 8]}>
      <sphereGeometry args={[1, 128, 128]} />
    </mesh>
  )
}

const ShockWaveSphere: React.FC = () => {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 2.5])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1600) setCameraPosition([0, 0, 2.5])
      else if (window.innerWidth >= 1000) setCameraPosition([0, 0, 2.5 * 1.2])
      else if (window.innerWidth >= 678) setCameraPosition([0, 0, 2])
      else setCameraPosition([0, 0, 1.8])
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={styles.container} tabIndex={-1}>
      <Canvas className={styles.canvasWrapper} camera={{ position: cameraPosition }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[1, 1, 1]} intensity={1.0} castShadow />
        <directionalLight position={[-1, -1, 1]} intensity={0.7} />
        <pointLight position={[2, 1, 2]} intensity={0.8} />
        <pointLight position={[-2, -1, 2]} intensity={0.8} />
        <SphereCanvas />
        {/*  TODO: Re-enable controls? */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}

export default ShockWaveSphere
