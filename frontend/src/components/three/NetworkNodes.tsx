import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Nodes({ count = 30 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      pos.push(new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8))
    }
    return pos
  }, [count])

  const edges = useMemo(() => {
    const e: [number, number][] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (positions[i].distanceTo(positions[j]) < 3) {
          e.push([i, j])
        }
      }
    }
    return e
  }, [positions, count])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.01
    }
  })

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
      ))}
      {edges.map(([i, j], idx) => {
        const arr = new Float32Array([
          positions[i].x, positions[i].y, positions[i].z,
          positions[j].x, positions[j].y, positions[j].z,
        ])
        return (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute args={[arr, 3]} count={2} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#7C4DFF" transparent opacity={0.15} />
          </line>
        )
      })}
    </group>
  )
}

export default function NetworkNodes() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }} className="pointer-events-none absolute inset-0 -z-10">
      <Nodes />
    </Canvas>
  )
}