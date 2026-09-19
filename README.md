# Nahome Kifle — Portfolio

Software engineering portfolio with an interactive 3D home scene. Select a
destination, travel there in the ship, then enter the matching page.

## Stack

React, Vite, React Router, Three.js, React Three Fiber, Drei, React Three
Postprocessing, CSS Modules.

## Architecture

Home mounts a lazy-loaded 3D scene. Destinations map to React Router pages.
Travel handles rotate → fly → arrive → Enter → fade into the route.

Portfolio copy lives in `src/data/`. Destination metadata is in
`src/components/space/destinationData.js`.

```
src/
  data/            projects, experience, resume, contact
  components/
    space/         3D scene, ship, travel, camera
    home/          Home overlay, 3D loading and fallback
    layout/        navbar and page shell
    portfolio/     shared page UI
  pages/           Home, destination pages, 404
```

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Static hosts must serve `index.html` for unknown paths so client routes
(`/projects`, `/about`, `/contact`, and so on) still load on refresh. Vite
preview already does this.

## Assets

The spaceship is an original low-poly model built from Three.js primitives.
No external GLB or third-party 3D assets.
