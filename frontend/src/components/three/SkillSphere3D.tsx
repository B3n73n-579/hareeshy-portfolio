import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const SKILL_NAMES = [
  'Java', 'Spring', 'Kafka', 'K8s', 'AWS', 'React', 'Redis',
  'Docker', 'SQL', 'NoSQL', 'Microservices', 'DDD', 'CQRS',
  'Event Sourcing', 'REST', 'gRPC', 'WebFlux', 'Gradle',
]

function SkillSphere() {
  const groupRef = useRef<THREE.Group>(null!)

  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = []
    const radius = 2.5
    for (let i = 0; i < SKILL_NAMES.length; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ),
      )
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {SKILL_NAMES.map((name, i) => (
        <Text
          key={name}
          position={positions[i]}
          fontSize={0.15}
          color={i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#7C4DFF' : '#FF00E5'}
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      ))}
    </group>
  )
}

export default function SkillSphere3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="pointer-events-none absolute inset-0 -z-10">
      <ambientLight />
      <SkillSphere />
    </Canvas>
  )
}