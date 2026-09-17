# Nahome Kifle — Portfolio

Personal software-engineering portfolio. Home is a cinematic 3D space scene;
the destination pages are ordinary React routes with project, experience,
resume, about, and contact content.

## Stack

- React 19 and Vite 6
- React Router 7
- Three.js with React Three Fiber, Drei, and postprocessing
- CSS Modules

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The 3D scene is lazy-loaded. Visiting inner routes does not download or
mount the Three.js tree.

Static hosts should fall back unknown paths to `index.html` so client-side
routes keep working.

## Architecture

- `src/App.jsx` — route table
- `src/components/layout/` — shell, navbar, skip link, document titles
- `src/pages/` — Home plus destination pages
- `src/components/home/HomeContent.jsx` — lazy-loads `SpaceScene` behind a
  WebGL check, Suspense placeholder, and error boundary
- `src/components/space/` — Canvas, ship, destinations, camera, travel, and
  visual effects
- `src/data/` — portfolio copy (`projects.js`, `experience.js`, `resume.js`,
  `contact.js`)

## 3D interaction

On Home: idle → select a destination → **Travel** → rotate toward it → fly →
arrive → **Enter** → fade → client-side route. Ship forward is local **-Z**.

Destination identities live in `src/components/space/destinationData.js`.
Visual tuning lives in `src/components/space/visualConfig.js` and camera /
travel constants in `src/components/space/travelConfig.js`.

## Assets

The spaceship is an original low-poly model built from Three.js primitives in
`src/components/space/Spaceship.jsx`. No external GLB, textures, or third-party
3D assets are used.
