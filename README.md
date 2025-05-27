¡Absolutamente! Aquí tienes el contenido completo del README.md listo para que lo copies y lo pegues directamente en un archivo llamado README.md en la raíz de tu repositorio de GitHub.

Markdown

# Ferremas-API

Este proyecto es una API RESTful desarrollada con Node.js y Express.js para la gestión de productos de una ferretería (`Ferremas`). Incluye funcionalidades CRUD completas para productos, integración con una base de datos PostgreSQL, y la estructura base para futuras integraciones, como un sistema de pagos (Transbank Webpay Plus) y una API de divisas.

El objetivo principal es proporcionar un backend robusto y fácil de usar para una aplicación de ferretería.

## 🚀 Características Implementadas

* **API RESTful:** Endpoints bien definidos para la interacción con los recursos.
* **Gestión de Productos (CRUD):**
    * `GET /api/productos`: Obtener todos los productos.
    * `GET /api/productos/:id`: Obtener un producto por su ID.
    * `POST /api/productos`: Crear un nuevo producto.
    * `PUT /api/productos/:id`: Actualizar un producto existente.
    * `DELETE /api/productos/:id`: Eliminar un producto.
* **Base de Datos PostgreSQL:** Almacenamiento persistente de los datos de productos y su historial de precios.
* **Historial de Precios:** Cada producto guarda un registro de sus cambios de precio a lo largo del tiempo.
* **Estructura Modular:** Organización del código en capas (Controladores, Servicios, Modelos) para una mejor mantenibilidad y escalabilidad.
* **Manejo de Errores:** Respuestas de error estandarizadas para diferentes escenarios (ej. 400 Bad Request, 404 Not Found, 500 Internal Server Error, 409 Conflict por llaves foráneas).
* **Configuración de Variables de Entorno:** Uso de `.env` para manejar configuraciones sensibles y específicas del entorno (ej. credenciales de DB, claves de API).
* **Integración con Transbank Webpay Plus (Base):** Configuración y endpoints para iniciar y retornar transacciones (aunque no se haya completado el flujo completo de pago, la infraestructura está).
* **Integración con API de Divisas (Dólar):** Endpoint para consultar el valor actual del dólar (infraestructura presente).

## 🛠️ Tecnologías Utilizadas

* **Node.js:** Entorno de ejecución JavaScript.
* **Express.js:** Framework web para construir la API.
* **PostgreSQL:** Sistema de gestión de base de datos relacional.
* **`pg`:** Cliente de PostgreSQL para Node.js.
* **`dotenv`:** Para cargar variables de entorno desde un archivo `.env`.
* **`axios`:** Cliente HTTP para realizar peticiones a APIs externas (Transbank, API de Divisas).
* **Transbank SDK:** Librería oficial para interactuar con Webpay Plus.

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js** (versión 14 o superior recomendada)
* **npm** (Node Package Manager, viene con Node.js)
* **PostgreSQL** (versión 10 o superior recomendada)
* Un cliente de PostgreSQL (como **pgAdmin**, **DBeaver** o la consola `psql`) para gestionar tu base de datos.
* **Git** (opcional, para clonar el repositorio)
* **Postman** (o similar, para probar los endpoints de la API)

## 🚀 Pasos para la Configuración y Ejecución

Sigue estos pasos para poner en marcha el proyecto en tu máquina local.

### 1. Clonar el Repositorio (Opcional si ya tienes los archivos)

Si no tienes los archivos, clona el repositorio desde GitHub:

```bash
git clone https://github.com/gaspar2702/ferremas
cd Ferremas-API
```
2. Instalar Dependencias
Navega al directorio raíz del proyecto (Ferremas-API) y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

Bash

npm install
3. Configurar la Base de Datos PostgreSQL
3.1. Crear la Base de Datos
Abre tu cliente de PostgreSQL (ej. pgAdmin, psql) y crea una nueva base de datos. Puedes llamarla ferremas_db o el nombre que prefieras.

SQL

CREATE DATABASE ferremas_db;
3.2. Configurar el Archivo .env
Crea un archivo llamado .env en la raíz de tu proyecto (Ferremas-API/.env). Este archivo contendrá las credenciales de tu base de datos y las claves para las integraciones externas.

Ejemplo de .env:

DB_USER=tu_usuario_pg
DB_HOST=localhost
DB_DATABASE=ferremas_db
DB_PASSWORD=tu_contraseña_pg
DB_PORT=5432

# Configuración de Transbank (para pruebas, usa las claves de integración)
# Puedes obtener estas claves en el portal de Transbank Developers
TRANSBANK_COMMERCE_CODE=597055555532
TRANSBANK_API_KEY=597055555532

# URL de la API de Divisas (ejemplo)
API_DOLAR_URL=[https://mindicador.cl/api/dolar](https://mindicador.cl/api/dolar)
Asegúrate de reemplazar tu_usuario_pg y tu_contraseña_pg con tus credenciales de PostgreSQL.
Las claves de Transbank (TRANSBANK_COMMERCE_CODE, TRANSBANK_API_KEY) que se muestran son para el ambiente de pruebas. Si pasas a producción, deberás usar tus claves reales.
3.3. Cargar el Esquema y Datos Iniciales
El proyecto incluye un archivo db_dump.sql con el esquema de la base de datos y algunos datos de ejemplo. Utiliza tu cliente de PostgreSQL para restaurar este archivo en la base de datos que acabas de crear (ferremas_db).

Ejemplo usando psql (desde la terminal):

Asegúrate de estar en el directorio Ferremas-API/database/.

Bash

psql -U tu_usuario_pg -d ferremas_db -h localhost -p 5432 -f db_dump.sql
Reemplaza tu_usuario_pg y ferremas_db con tus datos.
Si el archivo db_dump.sql no está en la carpeta database, ajusta la ruta.
4. Iniciar el Servidor
Una vez que las dependencias están instaladas y la base de datos configurada, puedes iniciar la aplicación:

Bash

npm start
Verás mensajes en la consola indicando que el servidor está escuchando en el puerto 3000 y las URLs de los endpoints principales.

--- Configuración de Transbank (desde process.env) ---
TRANSBANK_COMMERCE_CODE (usado): 597055555532
TRANSBANK_API_KEY (usada): 597055555532
Ambiente Transbank (SDK): [https://webpay3gint.transbank.cl](https://webpay3gint.transbank.cl)
----------------------------------------------------
Servidor escuchando en el puerto 3000
Accede al formulario de pago Transbank en: http://localhost:3000/
API de Productos en: http://localhost:3000/api/productos
Endpoint para iniciar pagos Webpay: http://localhost:3000/api/webpay/init (POST)
Endpoint de retorno Webpay: http://localhost:3000/webpay/return (GET/POST)
Endpoint para valor del Dólar: http://localhost:3000/api/divisas/dolar (GET)
Conexión a PostgreSQL establecida correctamente.
🧪 Prueba de Endpoints con Postman
Abre Postman e importa la colección de tu API si la tienes, o crea las solicitudes manualmente.

Productos
GET All Products

GET http://localhost:3000/api/productos
Response: 200 OK (Array de productos)
GET Product by ID

GET http://localhost:3000/api/productos/1 (o cualquier ID existente)
Response: 200 OK (Objeto de producto)
Response (Producto no encontrado): 404 Not Found
Add Product

POST http://localhost:3000/api/productos
Headers: Content-Type: application/json
Body (raw, JSON):
JSON

{
    "nombre": "Martillo Clásico",
    "descripcion": "Martillo de alta calidad para construcción.",
    "categoria": "Herramientas Manuales",
    "marca": "ToolMaster",
    "codigoFerremas": "FM-001",
    "codigoFabricante": "TM-H001",
    "precio": 15000,
    "stockDisponible": 50
}
Response: 201 Created
Update Product

PUT http://localhost:3000/api/productos/1 (usa un ID existente)
Headers: Content-Type: application/json
Body (raw, JSON - puedes enviar solo los campos a actualizar):
JSON

{
    "precio": 16500,
    "stockDisponible": 48
}
Response: 200 OK
Response (Producto no encontrado): 404 Not Found
Response (Datos inválidos): 400 Bad Request
Delete Product

DELETE http://localhost:3000/api/productos/1 (usa un ID existente)
⚠️ Importante: Si el producto tiene relaciones con la tabla inventario (o cualquier otra tabla con llave foránea), recibirás un error 409 Conflict. Primero, debes eliminar las entradas relacionadas en la tabla inventario manualmente en tu base de datos para poder eliminar el producto.
SQL de ejemplo para eliminar dependencias:
SQL

DELETE FROM inventario WHERE productoid = 1; -- Reemplaza 1 con el ID del producto
Response (Éxito): 200 OK
Response (Producto no encontrado): 404 Not Found
Response (Conflicto por llave foránea): 409 Conflict
Webpay (Pagos Transbank)
Iniciar Transacción

POST http://localhost:3000/api/webpay/init
Headers: Content-Type: application/json
Body (raw, JSON):
JSON

{
    "amount": 19990,
    "buyOrder": "orden-12345",
    "sessionId": "sesion-abcde"
}
Response: JSON con url y token para redirigir al usuario a Transbank.
Posibles Errores: 401 Not Authorized si las claves de Transbank no son válidas.
Retorno de Transacción (GET/POST)

Este endpoint es manejado automáticamente por Transbank después de que el usuario completa el pago en su plataforma. No necesitas probarlo directamente desde Postman.
GET/POST http://localhost:3000/webpay/return
Divisas
Obtener Valor del Dólar
GET http://localhost:3000/api/divisas/dolar
Response: 200 OK (JSON con el valor del dólar)
