import { Stars } from '@react-three/drei'

function SpaceEnvironment() {
  return (
    <>
      <color attach="background" args={['#020208']} />
      <ambientLight intensity={0.28} />
      <directionalLight
        position={[4, 7, 8]}
        intensity={1.35}
        color="#f4efe6"
      />
      <Stars
        radius={90}
        depth={48}
        count={4500}
        factor={3.4}
        saturation={0}
        fade
        speed={0.35}
      />
    </>
  )
}

export default SpaceEnvironment
