
# Frontend – fullstack‑test

Este módulo contiene la parte de cliente del proyecto **fullstack‑test**.  
Construido con React para consumir la API del backend.

## 📦 Tecnologías usadas  
- React 
- TypeScript (o JavaScript)  
- Gestión de rutas, estado, peticiones HTTP (axios, fetch…)  
- Archivo de configuración de entorno: `.env.example`.

## 🚀 Instalación y ejecución  
1. Dentro del directorio `frontend`:  
   ```bash
   cd fullstack-test/frontend  
   npm install  
   ```  
2. Archivo de entorno: crea `.env.example` con la URL del backend, por ejemplo:  
   ```
   REACT_APP_API_URL=http://localhost:3000/api
   ```  
3. Ejecuta en modo desarrollo:  
   ```bash
   npm start
   ```  
   Para generar build (producción):  
   ```bash
   npm run build
   ```  

## 🧭 Uso  
- Abre `http://localhost:3000` en tu navegador.  
- Usa la aplicación para (describir qué hace el frontend: login, lista de items, etc.).  
- Asegúrate de que el backend esté corriendo para que el frontend pueda comunicarse.

## 📁 Estructura del directorio  
```
/frontend
  /src
    /components
    /pages
    /services
    /hooks
    /assets
  public/
  package.json
```


