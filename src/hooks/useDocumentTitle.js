import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const titles = {
  '/': 'Nahome Kifle | Software Engineer',
  '/projects': 'Projects | Nahome Kifle',
  '/experience': 'Experience | Nahome Kifle',
  '/resume': 'Resume | Nahome Kifle',
  '/about': 'About | Nahome Kifle',
  '/contact': 'Contact | Nahome Kifle',
  '/asset-preview': 'Asset Preview | Nahome Kifle',
}

function useDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] ?? '404 | Nahome Kifle'
  }, [pathname])
}

export default useDocumentTitle
