# Ferremas-API

Este proyecto es una API RESTful desarrollada con Node.js y Express.js para la gestión de productos de una ferretería (`Ferremas`). Incluye funcionalidades CRUD completas para productos, integración con una base de datos PostgreSQL, y la estructura base para futuras integraciones, como un sistema de pagos (Transbank Webpay Plus) y una API de divisas (Banco Central de Chile).

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
* **Integración con Transbank Webpay Plus (Base):** Configuración y endpoints para iniciar y retornar transacciones (la infraestructura está lista).
* **Integración con API del Banco Central de Chile (BCCh):** Endpoint para consultar el valor actual del dólar.

## 🛠️ Tecnologías Utilizadas

* **Node.js:** Entorno de ejecución JavaScript.
* **Express.js:** Framework web para construir la API.
* **PostgreSQL:** Sistema de gestión de base de datos relacional.
* **`pg`:** Cliente de PostgreSQL para Node.js.
* **`dotenv`:** Para cargar variables de entorno desde un archivo `.env`.
* **`axios`:** Cliente HTTP para realizar peticiones a APIs externas (Transbank, API del Banco Central de Chile).
* **Transbank SDK:** Librería oficial para interactuar con Webpay Plus.

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js** (versión 14 o superior recomendada)
* **npm** (Node Package Manager, viene con Node.js)
* **PostgreSQL** (versión 10 o superior recomendada)
* Un cliente de PostgreSQL (como **pgAdmin**, **DBeaver** o la consola `psql`) para gestionar tu base de datos.
* **Git** (opcional, para clonar el repositorio)
* **Postman** (o similar, para probar los endpoints de la API)

```bash
git clone https://github.com/gaspar2702/ferremas
cd Ferremas-API
```
## ⚙️ Credenciales necesarias(vistas tambien en .env)
```bash
# Configuración de la Base de Datos PostgreSQL
DB_USER=postgres
DB_PASSWORD=FerremasUser
DB_HOST=localhost
DB_NAME=ferremas_db
DB_PORT=5432

# Puerto de la aplicación Node.js
PORT=3000

# Variables de Transbank (Ambiente de Integración)
TRANSBANK_ENVIRONMENT="INTEGRACION"
TRANSBANK_COMMERCE_CODE=597055555532
TRANSBANK_API_KEY=597055555532

# Credenciales para la API del Banco Central de Chile (BDE)
BCCH_USER=ben.sotoa@duocuc.cl
BCCH_PASS=Ferremas123
```
