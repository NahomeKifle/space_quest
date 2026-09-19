import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Quaternion, Vector3 } from 'three'
import {
  ALIGNMENT_HOLD,
  ARRIVAL_DISTANCE,
  ROTATION_ALIGN_THRESHOLD,
  ROTATION_SPEED,
  TRAVEL_SPEED,
  travelEase,
} from './travelConfig'

const nose = new Vector3(0, 0, -1)
const direction = new Vector3()
const targetQuat = new Quaternion()

function getArrivalPoint(from, dest, target) {
  direction.copy(dest).sub(from)
  const distance = direction.length()

  if (distance < 0.001) {
    target.copy(from)
    return target
  }

  direction.multiplyScalar(1 / distance)
  let stopDistance = ARRIVAL_DISTANCE
  if (distance <= ARRIVAL_DISTANCE + 0.4) {
    stopDistance = Math.max(distance * 0.42, distance - 0.85)
  }

  target.copy(dest).addScaledVector(direction, -stopDistance)
  return target
}

function TravelController({ shipRef, phaseRef, targetRef, onPhaseChange }) {
  const holdRef = useRef(0)
  const travelTRef = useRef(0)
  const startPos = useRef(new Vector3())
  const arrivalPos = useRef(new Vector3())
  const prevPhaseRef = useRef(phaseRef.current)

  useFrame((_, delta) => {
    const ship = shipRef.current
    const phase = phaseRef.current
    const target = targetRef.current
    if (!ship) return

    if (phase !== prevPhaseRef.current) {
      if (phase === 'rotating') {
        holdRef.current = 0
      }
      if (phase === 'traveling' && target) {
        travelTRef.current = 0
        startPos.current.copy(ship.position)
        getArrivalPoint(ship.position, target.position, arrivalPos.current)
      }
      prevPhaseRef.current = phase
    }

    if ((phase === 'rotating' || phase === 'traveling' || phase === 'arrived') && target) {
      direction.copy(target.position).sub(ship.position)
      if (direction.lengthSq() > 1e-8) {
        targetQuat.setFromUnitVectors(nose, direction.normalize())
      }
    }

    if (phase === 'rotating' && target) {
      ship.quaternion.rotateTowards(targetQuat, ROTATION_SPEED * delta)
      const remaining = ship.quaternion.angleTo(targetQuat)

      if (remaining <= ROTATION_ALIGN_THRESHOLD) {
        ship.quaternion.copy(targetQuat)
        holdRef.current += delta
        if (holdRef.current >= ALIGNMENT_HOLD) {
          onPhaseChange('traveling')
        }
      }
    }

    if (phase === 'traveling' && target) {
      const total = startPos.current.distanceTo(arrivalPos.current)
      const duration = Math.max(total / TRAVEL_SPEED, 0.4)
      travelTRef.current += delta / duration
      const t = Math.min(travelTRef.current, 1)
      ship.position.lerpVectors(startPos.current, arrivalPos.current, travelEase(t))
      ship.quaternion.rotateTowards(targetQuat, ROTATION_SPEED * delta)

      if (t >= 1) {
        onPhaseChange('arrived')
      }
    }
  })

  return null
}

export default TravelController
