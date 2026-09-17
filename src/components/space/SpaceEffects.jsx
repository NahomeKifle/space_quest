import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import {
  BLOOM_INTENSITY,
  BLOOM_RADIUS,
  BLOOM_THRESHOLD,
  VIGNETTE_DARKNESS,
  VIGNETTE_OFFSET,
} from './visualConfig'

function SpaceEffects() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        luminanceThreshold={BLOOM_THRESHOLD}
        intensity={BLOOM_INTENSITY}
        mipmapBlur
        radius={BLOOM_RADIUS}
      />
      <Vignette
        eskil={false}
        offset={VIGNETTE_OFFSET}
        darkness={VIGNETTE_DARKNESS}
      />
    </EffectComposer>
  )
}

export default SpaceEffects
