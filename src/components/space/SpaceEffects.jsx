import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import {
  BLOOM_INTENSITY,
  BLOOM_INTENSITY_NARROW,
  BLOOM_RADIUS,
  BLOOM_THRESHOLD,
  VIGNETTE_DARKNESS,
  VIGNETTE_OFFSET,
} from './visualConfig'

function SpaceEffects({ compact = false }) {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        luminanceThreshold={BLOOM_THRESHOLD}
        intensity={compact ? BLOOM_INTENSITY_NARROW : BLOOM_INTENSITY}
        mipmapBlur
        radius={BLOOM_RADIUS}
      />
      {compact ? null : (
        <Vignette
          eskil={false}
          offset={VIGNETTE_OFFSET}
          darkness={VIGNETTE_DARKNESS}
        />
      )}
    </EffectComposer>
  )
}

export default SpaceEffects
