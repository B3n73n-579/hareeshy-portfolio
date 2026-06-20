import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.15, 0.8, 0.5)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return col
  }, [count])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02
      meshRef.current.rotation.x += delta * 0.005
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} count={count} itemSize={3} />
        <bufferAttribute args={[colors, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

export default function ParticleBackground({ mobile }: { mobile?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="pointer-events-none absolute inset-0 -z-10">
      <Particles count={mobile ? 500 : 2000} />
    </Canvas>
  )
}