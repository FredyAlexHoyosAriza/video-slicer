# 🎬 Video Clip Slicer

**Video Clip Slicer** es una aplicación moderna que permite a los usuarios dividir un video en múltiples clips personalizados utilizando fragmentos temporales (`media fragments`). Los clips pueden etiquetarse, filtrarse y reproducirse con precisión, todo desde una interfaz intuitiva construida con React y Redux Toolkit.

Este proyecto está en evolución activa. Actualmente, la rama `main` es la principal y está desplegada en Vercel.

## Características

- **Reproductor de Video**: Permite seleccionar y reproducir fragmentos (`start` / `end`) del video cargado.
- **Gestión de Clips**: Crea, edita, elimina y selecciona clips.
- **Etiquetado y Filtrado**: Asigna etiquetas a los clips y búscalos fácilmente por nombre.
- **Interfaz Moderna y Responsive**: UI construida con Tailwind CSS v4 y componentes de React.
- **Gestión de Estado Centralizado**: Implementada con Redux Toolkit para un control global de la aplicación.
- **Preparado para Drag and Drop**: Sistema de reordenamiento visual de clips en desarrollo.

## Tecnologías Utilizadas

### Frontend

- **Next.js 15.3.2** – Framework moderno basado en React, con App Router.
- **React 18** – Biblioteca para interfaces interactivas.
- **TypeScript 5** – Tipado estático para robustez y mantenibilidad.
- **Redux Toolkit** – Manejo de estado global con slices y store configurado.
- **Tailwind CSS v4** – Utilidades CSS modernas con soporte para variables CSS.

## Instalación y Configuración

En el directorio del proyecto, sigue estos pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/FredyAlexHoyosAriza/video-slicer.git
cd video-clip-slicer
```

### 2. Instalar dependencias

```bash
npm install
# o con Yarn
yarn install
```

### 5. Ejecutar el frontend (Next.js)

```bash
npm run dev
# o con Yarn
yarn dev
```

El frontend estará disponible en [https://video-slicer-ten.vercel.app/](https://video-slicer-ten.vercel.app/).

## Uso de la App

La aplicación permite:
Reproducir un video en una URL, por ahora constante y que yace en src/constants/video.ts.
Seleccionar fragmentos mediante tiempo de inicio y fin.
Guardar clips con nombre y etiquetas.
Filtrar clips por nombre de etiqueta usando el buscador.

Seleccionar un clip y reproducirlo con precisión desde el botón global de reproducción.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto

- **GitHub**: [FredyAlexHoyosAriza](https://github.com/FredyAlexHoyosAriza)

---

¡Gracias por revisar este proyecto! Espero que te sea útil.
