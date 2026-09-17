import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import {
  CAMERA_DESTINATION_BLEND,
  CAMERA_FOLLOW_DISTANCE,
  CAMERA_HEIGHT,
  CAMERA_LERP_SPEED,
  CAMERA_LOOK_AHEAD,
  ENTER_CAMERA_PULL,
} from './travelConfig'

const back = new Vector3()
const up = new Vector3(0, 1, 0)
const desired = new Vector3()
const look = new Vector3()
const ahead = new Vector3()

function CameraRig({ shipRef, targetRef, phaseRef }) {
  const { camera } = useThree()
  const snapped = useRef(false)

  useFrame((_, delta) => {
    const ship = shipRef.current
    if (!ship) return

    const phase = phaseRef.current
    const followDistance =
      phase === 'entering'
        ? CAMERA_FOLLOW_DISTANCE * ENTER_CAMERA_PULL
        : CAMERA_FOLLOW_DISTANCE

    back.set(0, 0, 1).applyQuaternion(ship.quaternion)
    desired
      .copy(ship.position)
      .addScaledVector(back, followDistance)
      .addScaledVector(up, CAMERA_HEIGHT)

    if (!snapped.current) {
      camera.position.copy(desired)
      snapped.current = true
    } else {
      const smoothing = 1 - Math.exp(-CAMERA_LERP_SPEED * delta)
      camera.position.lerp(desired, smoothing)
    }

    ahead.set(0, 0, -1).applyQuaternion(ship.quaternion)
    look.copy(ship.position).addScaledVector(ahead, CAMERA_LOOK_AHEAD)

    const target = targetRef.current
    if (
      target &&
      (phase === 'rotating' ||
        phase === 'traveling' ||
        phase === 'arrived' ||
        phase === 'entering')
    ) {
      look.lerp(target.position, CAMERA_DESTINATION_BLEND)
    }

    camera.lookAt(look)
  })

  return null
}

export default CameraRig
