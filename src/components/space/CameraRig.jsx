import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import {
  CAMERA_DEFAULT_DISTANCE,
  CAMERA_DESTINATION_BLEND,
  CAMERA_FOV,
  CAMERA_FOV_NARROW,
  CAMERA_HEIGHT,
  CAMERA_LERP_IDLE,
  CAMERA_LERP_SETTLE,
  CAMERA_LERP_TRAVEL,
  CAMERA_LERP_TURN,
  CAMERA_LOOK_AHEAD,
  CAMERA_LOOK_LERP,
  CAMERA_MAX_DISTANCE,
  CAMERA_MIN_DISTANCE,
  CAMERA_NARROW_ASPECT,
  CAMERA_ZOOM_SPEED,
  ENTER_CAMERA_PULL,
} from './travelConfig'

const back = new Vector3()
const up = new Vector3(0, 1, 0)
const desired = new Vector3()
const lookTarget = new Vector3()
const ahead = new Vector3()

function followLerp(phase) {
  if (phase === 'rotating') return CAMERA_LERP_TURN
  if (phase === 'traveling') return CAMERA_LERP_TRAVEL
  if (phase === 'arrived' || phase === 'entering') return CAMERA_LERP_SETTLE
  return CAMERA_LERP_IDLE
}

function CameraRig({ shipRef, targetRef, phaseRef, compact = false }) {
  const { camera, gl, size } = useThree()
  const snapped = useRef(false)
  const distanceRef = useRef(CAMERA_DEFAULT_DISTANCE)
  const lookRef = useRef(new Vector3())

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1)
    camera.fov = aspect < CAMERA_NARROW_ASPECT ? CAMERA_FOV_NARROW : CAMERA_FOV
    camera.updateProjectionMatrix()
  }, [camera, size.height, size.width])

  useEffect(() => {
    if (compact) return undefined

    const element = gl.domElement
    function onWheel(event) {
      event.preventDefault()
      const phase = phaseRef.current
      if (phase === 'rotating' || phase === 'traveling' || phase === 'entering') {
        return
      }

      const next = distanceRef.current + event.deltaY * CAMERA_ZOOM_SPEED
      distanceRef.current = Math.min(
        CAMERA_MAX_DISTANCE,
        Math.max(CAMERA_MIN_DISTANCE, next)
      )
    }

    element.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      element.removeEventListener('wheel', onWheel)
    }
  }, [compact, gl, phaseRef])

  useFrame((_, delta) => {
    const ship = shipRef.current
    if (!ship) return

    const phase = phaseRef.current
    const zoomDistance = distanceRef.current
    const followDistance =
      phase === 'entering' ? zoomDistance * ENTER_CAMERA_PULL : zoomDistance
    const heightScale = Math.sqrt(followDistance / CAMERA_DEFAULT_DISTANCE)
    const height = CAMERA_HEIGHT * heightScale

    back.set(0, 0, 1).applyQuaternion(ship.quaternion)
    desired
      .copy(ship.position)
      .addScaledVector(back, followDistance)
      .addScaledVector(up, height)

    ahead.set(0, 0, -1).applyQuaternion(ship.quaternion)
    lookTarget
      .copy(ship.position)
      .addScaledVector(ahead, CAMERA_LOOK_AHEAD * heightScale)

    const target = targetRef.current
    if (
      target &&
      (phase === 'rotating' ||
        phase === 'traveling' ||
        phase === 'arrived' ||
        phase === 'entering')
    ) {
      lookTarget.lerp(target.position, CAMERA_DESTINATION_BLEND)
    }

    if (!snapped.current) {
      camera.position.copy(desired)
      lookRef.current.copy(lookTarget)
      snapped.current = true
    } else {
      const smoothing = 1 - Math.exp(-followLerp(phase) * delta)
      camera.position.lerp(desired, smoothing)
      const lookSmoothing = 1 - Math.exp(-CAMERA_LOOK_LERP * delta)
      lookRef.current.lerp(lookTarget, lookSmoothing)
    }

    camera.lookAt(lookRef.current)
  })

  return null
}

export default CameraRig
