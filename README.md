# React + TypeScript + Vite

Este proyecto utiliza React con TypeScript y Vite para ofrecer un entorno de desarrollo rápido con recarga en caliente (HMR) y reglas básicas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) usa [Babel](https://babeljs.io/) (o [oxc](https://oxc.rs) cuando se usa con [rolldown-vite](https://vite.dev/guide/rolldown)) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh

## Compilador de React

El Compilador de React no está habilitado en esta plantilla debido a su impacto en el rendimiento de desarrollo y build. Para añadirlo, consulta [esta documentación](https://react.dev/learn/react-compiler/installation).

## Ampliar la configuración de ESLint

Si estás desarrollando una aplicación de producción, se recomienda actualizar la configuración para habilitar reglas de lint con conocimiento de tipos:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## Scripts

- `npm run dev`: inicia el servidor de desarrollo
- `npm run build`: compila el proyecto
- `npm run preview`: sirve la build para revisión
- `npm run lint`: ejecuta ESLint

## Stack

- `React`, `TypeScript`, `Vite`
- ESLint con reglas para React y TypeScript

## Cómo empezar

1. Instala dependencias: `npm install`
2. Arranca el entorno: `npm run dev`
3. Abre `http://localhost:5174/`

---

## Estrategia de ramas y commits

- `main`: línea estable; recibe merges de `develop` cuando se libera.
- `develop`: integración continua de features; base para nuevas ramas.
- `feature/*`: ramas por funcionalidad (`header-component`, `product-card`, `product-modal`, `app-view`).
- Commits semánticos: `feat(scope): ...`, `fix(scope): ...`, `chore/docs/...`, etc.
- Política de merge: `--no-ff` para preservar contexto de features.
- Resolución de conflictos: se prioriza consistencia visual y funcional; se documenta el resultado.
- Rebase de features: se actualizan sobre `develop` antes de publicar para mantener historia limpia.

## Grafo de commits (resumen)

```txt
* ba4fa1c (origin/feature/app-view, feature/app-view) feat(app-view): actualizar título principal a 'Catálogo Entel'
| *   c65e4fc (origin/feature/product-modal, origin/develop, feature/product-modal, develop) fix(styles): resolver conflicto en App.css y App.
tsx combinando cambios de header y product-card
| |\
| | * 33323b8 (origin/feature/product-card, feature/product-card) feat(product-card): actualizar sombra hover del logo (#009f3f)
| | * 946f357 función: Tarjeta de producto reutilizable con rating, badge y botón
| * | 6f552ca merge: integrar feature/header-component en develop
|/| |
| * | ddec8c3 (origin/feature/header-component, feature/header-component) feat(header): actualizar sombra hover del logo (#0044cc)
| * | 9d0fc5a función: Header responsive con menú móvil y buscador en tiempo real
| |/
* | aa12465 función: módulo API de productos y categorías (FakeStore)
* | 23c500e función: base del sistema de diseño (espaciado, tipografía, componentes)
|/  
| * 51a2fd9 (HEAD -> main, origin/main) chore(i18n): traducir UI y README al español; eliminar comentarios
| * 37a3d04 función: Header, ProductCard, filtros por categoría, toggle grilla/lista y paginación
| * c40db94 función: Modal de detalle de producto (imagen, descripción, rating)
|/
| * 5c8a601 (feature/filters) función: filtros por categoría, toggle grilla/lista y carga progresiva
|/
:
```

## Nota de compatibilidad

- Vite y TypeScript no son compatibles con `Node.js v22` actualmente.
- Usa `Node.js v20.x LTS` o `v18.x LTS` para `npm run dev` y `npm run build`.
- Si no cuentas con `nvm`/`nvs`, instala Node LTS desde `https://nodejs.org/en/download/`.

