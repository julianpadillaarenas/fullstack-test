
# Backend – fullstack‑test

Este módulo contiene la parte de servidor (API REST) del proyecto **fullstack‑test**.  
Construido con Nest.js + TypeScript para servir datos al frontend.

## 📦 Tecnologías usadas  
- TypeScript (o JavaScript)  
- Nestjs (o similar)  
- Base de datos: Postgresql docker
- Variables de entorno para configuración (ex: `PORT`, `DATABASE_URL`, etc.)  
- Carpetas organizadas por responsabilidad: rutas, controladores, modelos, servicios, middlewares.

## 🚀 Instalación y ejecución  
1. Clona el repositorio y entra al directorio `backend`.  
   ```bash
   git clone https://github.com/julianpadillaarenas/fullstack-test.git  
   cd fullstack-test/backend  
   ```  
2. Instala las dependencias:  
   ```bash
   npm install  
   ```  
   o  
   ```bash
   yarn  
   ```  
3. Configura variables de entorno. Crea un archivo `.env` con al menos:  
   ```
   PORT=3000
   DATABASE_URL=...
   ```  
4. Ejecuta en la base de datos :  
   ```bash
   docker compose -f postgresql-docker.yml up -d
   ```  
  
5. Ejecuta en modo desarrollo:  
   ```bash
   npm run docker:start
   ```  
  

## 🧱 Endpoints principales  
Aquí algunos ejemplos de rutas disponibles. (Ajustar según la implementación real)  
- `GET /users` ‑ Obtiene todos los usuarios.  
- `POST /authorization-request` ‑ Crea una solicitud de authorizacion.  

Asegúrate de que la variable de entorno `NODE_ENV=test` esté configurada cuando corres las pruebas.


## 🎯 Buenas prácticas  
- se utilizo una arquitectura tipo hexagonal para mejorar la mantenibilidad del codigo

## 📄 Licencia  
Este proyecto está licenciado bajo (especificar), por ejemplo MIT.
