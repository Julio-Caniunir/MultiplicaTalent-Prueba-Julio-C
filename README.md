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

