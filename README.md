# Ferremas - Proyecto Full-Stack E-Commerce

## 1. Visión General del Proyecto

Este es un proyecto full-stack que simula una tienda de comercio electrónico para la ferretería "Ferremas". La aplicación consta de un **front-end** interactivo construido con React y un **back-end** robusto construido con Node.js y Express, conectado a una base de datos PostgreSQL.

El objetivo es proporcionar una experiencia de compra fluida, permitiendo a los usuarios ver productos, filtrarlos, añadirlos a un carrito y simular un proceso de compra completo que afecta directamente al inventario en la base de datos.

## 2. Características Implementadas

* **Catálogo de Productos:** El front-end carga y muestra dinámicamente los productos desde la base de datos a través de la API.
* **Filtro por Categorías:** Un menú desplegable permite a los usuarios filtrar los productos por categoría.
* **Búsqueda de Productos:** Una barra de búsqueda funcional permite filtrar productos por texto en su nombre o descripción.
* **Gestión de Stock Visual:** Cada producto muestra su stock disponible, el cual disminuye visualmente en tiempo real cuando un producto es agregado al carrito.
* **Carrito de Compras Interactivo:**
    * Añadir productos al carrito.
    * Ver los productos en una página de carrito dedicada.
    * Modificar cantidades y eliminar productos desde el carrito.
    * Ver el total de la compra calculado en tiempo real.
* **Simulación de Flujo de Pago:**
    * Una página de "Checkout" que resume la compra.
    * Un botón de "Confirmar Compra" que se comunica con el back-end.
    * El back-end **simula un pago exitoso** y actualiza el stock en la base de datos PostgreSQL.
    * El front-end se actualiza para reflejar el nuevo stock después de la compra.

## 3. Arquitectura y Tecnologías

El proyecto está dividido en dos partes principales que se ejecutan de forma independiente:

#### Back-End
* **Runtime:** Node.js
* **Framework:** Express.js para crear la API RESTful.
* **Base de Datos:** PostgreSQL para el almacenamiento persistente de datos.
* **Conector de DB:** `pg` (node-postgres).
* **Gestión de Entorno:** Archivo `.env` para variables sensibles (credenciales de DB).
* **Estructura:** Modular en Capas (Rutas -> Controladores -> Servicios -> Modelos).

#### Front-End
* **Librería:** React (usando Vite para el entorno de desarrollo).
* **Lenguaje:** JavaScript con JSX.
* **Gestión de Estado Global:** React Context API (`CartContext`) para manejar el estado del carrito, la lista de productos y los filtros de manera global.
* **Routing:** `react-router-dom` para la navegación entre páginas.
* **Llamadas a la API:** `axios` para la comunicación con el back-end.
* **Estilos:** Archivos `.css` modulares por componente.

---

## 4. Instalación y Puesta en Marcha

Para ejecutar el proyecto completo en un entorno de desarrollo local, necesitas tener ambos servidores (back-end y front-end) corriendo al mismo tiempo.

### Requisitos Previos
* Node.js (versión 14 o superior)
* PostgreSQL (versión 10 o superior)
* Un cliente de base de datos como **pgAdmin**

### A. Configuración del Back-End

1.  **Clonar/Descargar el Repositorio:** Asegúrate de tener la carpeta del proyecto `ferremas-main`.

2.  **Configurar la Base de Datos:**
    * Inicia tu servidor de PostgreSQL (una forma fácil es abriendo **pgAdmin**).
    * En pgAdmin, crea una nueva base de datos vacía llamada **`ferremas_db`**.
    * Crea el rol de usuario necesario. Haz clic derecho en "Login/Group Roles" -> Create -> Role.
        * Nombre: `ferremas_user`
        * Pestaña "Definition": establece una contraseña.
        * Pestaña "Privileges": asegúrate de que "Can log in?" esté en "Yes".
    * Ejecuta el script `database/db_dump.sql` sobre la base de datos `ferremas_db` usando la "Query Tool" de pgAdmin para crear todas las tablas y datos iniciales.

3.  **Configurar las Variables de Entorno:**
    * En la raíz del proyecto `ferremas-main`, crea un archivo llamado `.env`.
    * Copia y pega el siguiente contenido, **asegurándote de que `DB_PASSWORD` coincida con la contraseña que tú estableciste para el usuario `postgres`**.

    ```dotenv
    # Configuración de la Base de Datos PostgreSQL
    DB_USER=postgres
    DB_PASSWORD=terry123
    DB_HOST=localhost
    DB_NAME=ferremas_db
    DB_PORT=5432

    # Puerto de la aplicación Node.js
    PORT=3000
    ```

4.  **Instalar Dependencias y Ejecutar:**
    * Abre una terminal en la carpeta `ferremas-main`.
    * Ejecuta `npm install` para instalar todos los paquetes.
    * Inicia el servidor con `node app.js`.
    * Deberías ver el mensaje `Servidor escuchando en el puerto 3000`. ¡Deja esta terminal abierta!

### B. Configuración del Front-End

1.  **Abrir el Proyecto:** En una **segunda ventana de Visual Studio Code**, abre la carpeta de tu proyecto de front-end.

2.  **Instalar Dependencias y Ejecutar:**
    * Abre una nueva terminal integrada en esta ventana.
    * Ejecuta `npm install` para instalar todos los paquetes de React.
    * Inicia el servidor de desarrollo con `npm run dev`.
    * Deberías ver una URL local, usualmente `http://localhost:5173`.

¡Y listo! Con ambos servidores corriendo, abre la URL del front-end en tu navegador y la aplicación debería funcionar completamente, cargando los datos desde tu base de datos local.