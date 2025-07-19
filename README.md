# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
park-hike-planner
├─ Assets
│  ├─ imgs
│  └─ react.svg
├─ README.md
├─ auth
│  ├─ Login.css
│  ├─ Login.jsx
│  └─ Register.jsx
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ src
│  ├─ .App.jsx.swp
│  ├─ App.css
│  ├─ App.jsx
│  ├─ Components
│  │  ├─ ChooseTrail
│  │  │  ├─ ChooseTrail.css
│  │  │  └─ ChooseTrail.jsx
│  │  ├─ FilterBar
│  │  │  └─ FilterBar.jsx
│  │  ├─ HikePlan
│  │  │  ├─ CreateHikePlan.jsx
│  │  │  ├─ EditHikePlan.jsx
│  │  │  ├─ HikePlan.css
│  │  │  ├─ ViewHikePlan.css
│  │  │  └─ ViewHikePlan.jsx
│  │  ├─ MyHikes
│  │  │  ├─ MyHikes.css
│  │  │  └─ MyHikes.jsx
│  │  ├─ NPS
│  │  │  └─ Campgrounds.jsx
│  │  ├─ Nav
│  │  │  ├─ NavBar.css
│  │  │  └─ NavBar.jsx
│  │  ├─ SVG
│  │  │  ├─ AllSVGLayers.jsx
│  │  │  ├─ SVGBackground.css
│  │  │  ├─ SVGLayer1.jsx
│  │  │  ├─ SVGLayer2.jsx
│  │  │  ├─ SVGLayer3.jsx
│  │  │  ├─ SVGLayer4.jsx
│  │  │  ├─ SVGLayer5.jsx
│  │  │  └─ SVGLayerBG.jsx
│  │  └─ TrailDetails
│  │     ├─ TrailDetails.css
│  │     └─ TrailDetails.jsx
│  ├─ Services
│  │  ├─ ApiServices.jsx
│  │  ├─ HikePlanService.jsx
│  │  ├─ NPSApiContext.jsx
│  │  ├─ TrailService.jsx
│  │  └─ UserServices.jsx
│  ├─ api
│  │  ├─ database.json
│  │  └─ db.json
│  ├─ index.css
│  ├─ main.jsx
│  └─ views
│     ├─ ApplicationViews.jsx
│     └─ Authorized.jsx
└─ vite.config.js

```