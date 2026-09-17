# Space Quest

Personal software engineering portfolio. The home experience is a cinematic 3D
space scene; destination pages are ordinary React routes.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

## Visual assets

The spaceship is an original low-poly model built from Three.js primitives in
`src/components/space/Spaceship.jsx` (nose along local **-Z**). No external
GLB or textures are used.

Major visual tuning lives in `src/components/space/visualConfig.js`
(lighting, bloom, vignette, engine glow, star counts) and the camera FOV
constants in `src/components/space/travelConfig.js`. Destination identities
are composed in `src/components/space/DestinationVisuals.jsx`.
