export const SHIP_START_POSITION = [0, 0.15, 0]

export const ROTATION_SPEED = 2.05
export const ROTATION_SPEED_FLOOR = 0.2
export const ROTATION_BLEND_ANGLE = 0.34
export const ARRIVAL_DISTANCE = 2.8

export const TRAVEL_SPEED = 3.15
export const TRAVEL_ACCELERATION = 2.35
export const TRAVEL_DECELERATION = 3.4

export const ARRIVAL_SETTLE_DISTANCE = 0.05
export const ARRIVAL_SETTLE_SPEED = 0.15
export const ARRIVAL_SETTLE_HOLD = 0.14

// Ignore a single huge frame (tab switch) without stalling ordinary slow frames.
export const MAX_FRAME_DELTA = 0.1

export const BANK_MAX = 0.22
export const BANK_GAIN = 0.5
export const BANK_RETURN = 3.6

export const CAMERA_MIN_DISTANCE = 4.8
export const CAMERA_DEFAULT_DISTANCE = 7.4
export const CAMERA_MAX_DISTANCE = 12.2
export const CAMERA_ZOOM_SPEED = 0.012
export const CAMERA_HEIGHT = 3.45
export const CAMERA_LOOK_AHEAD = 5.15
export const CAMERA_LERP_IDLE = 2.35
export const CAMERA_LERP_TURN = 1.35
export const CAMERA_LERP_TRAVEL = 3.15
export const CAMERA_LERP_SETTLE = 4.4
export const CAMERA_LOOK_LERP = 3.4
export const CAMERA_DESTINATION_BLEND = 0.14
export const ENTER_CAMERA_PULL = 0.82
export const ENTER_TRANSITION_MS = 800
export const CAMERA_FOV = 42
export const CAMERA_FOV_NARROW = 58
export const CAMERA_NARROW_ASPECT = 0.7

export function travelEase(t) {
  const x = Math.min(Math.max(t, 0), 1)
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2
}

export function rotationDelta(remaining, initialAngle, delta) {
  const span = Math.max(initialAngle, 0.0001)
  const progress = Math.min(Math.max(1 - remaining / span, 0), 1)
  const envelope = Math.sin(progress * Math.PI)
  const factor =
    ROTATION_SPEED_FLOOR + (1 - ROTATION_SPEED_FLOOR) * Math.max(envelope, 0.08)
  return ROTATION_SPEED * factor * delta
}

export function peakTravelSpeed(distance) {
  const span = Math.max(distance, 0.0001)
  const reachable = Math.sqrt(
    (2 * span) / (1 / TRAVEL_ACCELERATION + 1 / TRAVEL_DECELERATION)
  )
  return Math.min(TRAVEL_SPEED, reachable)
}
