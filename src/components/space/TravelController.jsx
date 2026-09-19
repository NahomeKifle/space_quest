import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Quaternion, Vector3 } from 'three'
import {
  ARRIVAL_DISTANCE,
  ARRIVAL_SETTLE_DISTANCE,
  ARRIVAL_SETTLE_HOLD,
  ARRIVAL_SETTLE_SPEED,
  MAX_FRAME_DELTA,
  ROTATION_BLEND_ANGLE,
  TRAVEL_ACCELERATION,
  TRAVEL_DECELERATION,
  peakTravelSpeed,
  rotationDelta,
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
  const travelSpeedRef = useRef(0)
  const peakSpeedRef = useRef(0)
  const settleHoldRef = useRef(0)
  const initialAngleRef = useRef(null)
  const travelArmedRef = useRef(false)
  const arrivalPos = useRef(new Vector3())

  useFrame((_, delta) => {
    const ship = shipRef.current
    const phase = phaseRef.current
    const target = targetRef.current
    if (!ship) return

    const dt = Math.min(delta, MAX_FRAME_DELTA)

    if (phase !== 'rotating' && phase !== 'traveling') {
      travelSpeedRef.current = 0
      travelArmedRef.current = false
      initialAngleRef.current = null
      settleHoldRef.current = 0
      ship.userData.travelSpeed = 0
      return
    }

    if (!target) {
      ship.userData.travelSpeed = 0
      return
    }

    direction.copy(target.position).sub(ship.position)
    if (direction.lengthSq() > 1e-8) {
      targetQuat.setFromUnitVectors(nose, direction.normalize())
    }

    const remainingAngle = ship.quaternion.angleTo(targetQuat)
    if (initialAngleRef.current === null) {
      initialAngleRef.current = Math.max(remainingAngle, 1e-4)
    }
    ship.quaternion.rotateTowards(
      targetQuat,
      rotationDelta(remainingAngle, initialAngleRef.current, dt)
    )

    if (phase === 'rotating') {
      travelSpeedRef.current = 0
      if (ship.quaternion.angleTo(targetQuat) <= ROTATION_BLEND_ANGLE) {
        onPhaseChange('traveling')
      }
      ship.userData.travelSpeed = 0
      return
    }

    if (!travelArmedRef.current) {
      travelArmedRef.current = true
      travelSpeedRef.current = 0
      settleHoldRef.current = 0
      getArrivalPoint(ship.position, target.position, arrivalPos.current)
      peakSpeedRef.current = peakTravelSpeed(
        ship.position.distanceTo(arrivalPos.current)
      )
    }

    direction.copy(arrivalPos.current).sub(ship.position)
    const distance = direction.length()

    if (distance > 1e-4) {
      direction.multiplyScalar(1 / distance)
      const stopSpeed = Math.sqrt(
        Math.max(0, 2 * TRAVEL_DECELERATION * distance)
      )
      const desired = Math.min(peakSpeedRef.current, stopSpeed)
      const speed = travelSpeedRef.current
      if (speed < desired) {
        travelSpeedRef.current = Math.min(
          desired,
          speed + TRAVEL_ACCELERATION * dt
        )
      } else {
        travelSpeedRef.current = Math.max(
          desired,
          speed - TRAVEL_DECELERATION * dt
        )
      }
      const step = Math.min(travelSpeedRef.current * dt, distance)
      ship.position.addScaledVector(direction, step)
    } else {
      travelSpeedRef.current = 0
    }

    const remaining = ship.position.distanceTo(arrivalPos.current)
    if (
      remaining <= ARRIVAL_SETTLE_DISTANCE &&
      travelSpeedRef.current <= ARRIVAL_SETTLE_SPEED
    ) {
      settleHoldRef.current += dt
      if (settleHoldRef.current >= ARRIVAL_SETTLE_HOLD) {
        travelSpeedRef.current = 0
        ship.userData.travelSpeed = 0
        onPhaseChange('arrived')
      }
    } else {
      settleHoldRef.current = 0
    }

    ship.userData.travelSpeed = travelSpeedRef.current
  })

  return null
}

export default TravelController
