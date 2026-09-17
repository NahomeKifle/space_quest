import { useEffect, useMemo } from 'react'
import { AdditiveBlending, CanvasTexture, Color } from 'three'
import { Stars } from '@react-three/drei'
import {
  LIGHT_AMBIENT_COLOR,
  LIGHT_AMBIENT_INTENSITY,
  LIGHT_HEMISPHERE_GROUND,
  LIGHT_HEMISPHERE_INTENSITY,
  LIGHT_HEMISPHERE_SKY,
  LIGHT_KEY_COLOR,
  LIGHT_KEY_INTENSITY,
  LIGHT_KEY_POSITION,
  LIGHT_RIM_COLOR,
  LIGHT_RIM_INTENSITY,
  LIGHT_RIM_POSITION,
  SCENE_BACKGROUND,
  STAR_FAR_COUNT,
  STAR_MID_COUNT,
  STAR_NEAR_COUNT,
} from './visualConfig'

function makeNebulaTexture(hex) {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  const color = new Color(hex)
  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)
  const gradient = ctx.createRadialGradient(32, 32, 1, 32, 32, 32)
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`)
  gradient.addColorStop(0.42, `rgba(${r}, ${g}, ${b}, 0.16)`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function Nebula({ position, scale, color, opacity }) {
  const map = useMemo(() => makeNebulaTexture(color), [color])

  useEffect(() => {
    return () => map.dispose()
  }, [map])

  return (
    <sprite position={position} scale={scale} frustumCulled={false}>
      <spriteMaterial
        map={map}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  )
}

function SpaceEnvironment() {
  return (
    <>
      <color attach="background" args={[SCENE_BACKGROUND]} />
      <fog attach="fog" args={[SCENE_BACKGROUND, 52, 170]} />

      <ambientLight intensity={LIGHT_AMBIENT_INTENSITY} color={LIGHT_AMBIENT_COLOR} />
      <hemisphereLight
        color={LIGHT_HEMISPHERE_SKY}
        groundColor={LIGHT_HEMISPHERE_GROUND}
        intensity={LIGHT_HEMISPHERE_INTENSITY}
      />
      <directionalLight
        position={LIGHT_KEY_POSITION}
        intensity={LIGHT_KEY_INTENSITY}
        color={LIGHT_KEY_COLOR}
      />
      <directionalLight
        position={LIGHT_RIM_POSITION}
        intensity={LIGHT_RIM_INTENSITY}
        color={LIGHT_RIM_COLOR}
      />

      <Nebula
        position={[-22, 10, -48]}
        scale={[42, 26, 1]}
        color="#4a6cb0"
        opacity={0.55}
      />
      <Nebula
        position={[28, -6, -56]}
        scale={[36, 22, 1]}
        color="#6a4a88"
        opacity={0.42}
      />
      <Nebula
        position={[4, 16, -70]}
        scale={[30, 18, 1]}
        color="#3a7a78"
        opacity={0.32}
      />

      <Stars
        radius={150}
        depth={70}
        count={STAR_FAR_COUNT}
        factor={2.4}
        saturation={0}
        fade
        speed={0.18}
      />
      <Stars
        radius={78}
        depth={36}
        count={STAR_MID_COUNT}
        factor={3.6}
        saturation={0.15}
        fade
        speed={0.28}
      />
      <Stars
        radius={32}
        depth={14}
        count={STAR_NEAR_COUNT}
        factor={1.6}
        saturation={0}
        fade
        speed={0.08}
      />
    </>
  )
}

export default SpaceEnvironment
