import { useEffect, useState } from 'react'

const QUERY = '(max-width: 720px)'

function getMatch() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

function useNarrowViewport() {
  const [narrow, setNarrow] = useState(getMatch)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const onChange = () => setNarrow(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return narrow
}

export default useNarrowViewport
