# DataPulse

Aplicación front-end (proyecto final TripleTen) que muestra el “pulso” de la actualidad tech con la [API pública de Hacker News](https://github.com/HackerNews/API).

## Características

- Feed **Top / New / Jobs**
- Búsqueda local por título o autor (sobre el feed cargado)
- Detalle de historia (`/story/:id`) con comentarios de primer nivel
- Página **About** del autor
- Navegación con React Router y enlace activo (`NavLink`)
- Estados de carga y error
- UI con tipografía propia, variables CSS y BEM

## Tecnologías

- Vite
- React 19
- TypeScript
- React Router
- oxlint
- normalize.css

## API

- Base: `https://hacker-news.firebaseio.com/v0/`
- Listas: `topstories`, `newstories`, `jobstories`
- Ítems: `item/{id}.json`
- Las peticiones viven en `src/utils/api.ts` (los componentes no llaman a `fetch` directo)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint