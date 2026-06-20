import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Stream({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const speedsRef = useRef<number[]>([])
  const offsetsRef = useRef<number[]>([])

  const basePositions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    speedsRef.current = []
    offsetsRef.current = []
    for (let i = 0; i < count; i++) {
      const t = Math.random()
      const angle = t * Math.PI * 4
      const radius = 0.5 + t * 2.5
      const height = (Math.random() - 0.5) * 6
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
      speedsRef.current.push(0.2 + Math.random() * 0.5)
      offsetsRef.current.push(Math.random() * 100)
    }
    return pos
  }, [count])

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const mix = Math.random()
      const c1 = new THREE.Color('#00E5FF')
      const c2 = new THREE.Color('#FF00E5')
      const c = c1.clone().lerp(c2, mix)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return col
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const t = (state.clock.elapsedTime * speedsRef.current[i] + offsetsRef.current[i]) % (Math.PI * 4)
      const p = t / (Math.PI * 4)
      const angle = t
      const radius = 0.5 + p * 2.5
      const height = Math.sin(t * 0.8) * 3
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[basePositions, 3]} count={count} itemSize={3} />
        <bufferAttribute args={[colors, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors sizeAttenuation transparent opacity={0.7} />
    </points>
  )
}

export default function KafkaStream() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} className="pointer-events-none absolute inset-0 -z-10">
      <Stream />
    </Canvas>
  )
}