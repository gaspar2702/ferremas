# API RESTful Ferremas

Este repositorio contiene el código fuente del backend para el sistema **Ferremas**, implementado como una API RESTful. El proyecto está desarrollado con Node.js y el framework Express, y se conecta a una base de datos PostgreSQL. Su funcionalidad principal se centra en la gestión de productos.

## Requisitos del Sistema

Para la configuración y ejecución de este proyecto en su entorno local, se requieren los siguientes componentes:

* **Node.js:** Versión 18.x o superior. Disponible para descarga en [nodejs.org](https://nodejs.org/).
    * Verificación de instalación: `node -v` y `npm -v`.
* **PostgreSQL:** Servidor de base de datos PostgreSQL (versión 14 o superior recomendada). Descargable desde [postgresql.org](https://www.postgresql.org/download/).
* **pgAdmin 4:** (Opcional, pero recomendado) Herramienta gráfica para la administración de bases de datos PostgreSQL. Disponible en [pgadmin.org](https://www.pgadmin.org/download/).
* **Postman / Insomnia:** (Opcional, pero recomendado) Clientes para la prueba de APIs RESTful.
    * Postman: [postman.com](https://www.postman.com/downloads/)
    * Insomnia: [insomnia.rest/download](https://insomnia.rest/download)

## Configuración de la Base de Datos

Siga los siguientes pasos para configurar la base de datos PostgreSQL requerida por la API:

1.  **Asegure que su servidor PostgreSQL esté instalado y en ejecución.**

2.  **Conexión a PostgreSQL:**
    Utilice `pgAdmin 4` o la terminal (`psql`) para conectarse a su servidor PostgreSQL con un usuario que posea permisos de superusuario (ej. `postgres`).

3.  **Creación de la Base de Datos:**
    Ejecute la siguiente sentencia SQL para crear la base de datos de la aplicación:
    ```sql
    CREATE DATABASE ferremas_db;
    ```

4.  **Creación de un Usuario para la Aplicación:**
    Se recomienda crear un usuario dedicado para la aplicación con privilegios específicos. Reemplace `su_contraseña_segura` con una contraseña robusta.
    ```sql
    CREATE USER ferremas_user WITH PASSWORD 'su_contraseña_segura';
    ```
    **Importante:** La contraseña definida aquí (`su_contraseña_segura`) debe coincidir con la configurada posteriormente en el archivo `.env`.

5.  **Otorgamiento de Permisos al Usuario sobre la Base de Datos:**
    Conceda todos los privilegios al usuario `ferremas_user` sobre la base de datos `ferremas_db`:
    ```sql
    GRANT ALL PRIVILEGES ON DATABASE ferremas_db TO ferremas_user;
    ```

6.  **Importación del Esquema y Datos Iniciales:**
    Este proyecto incluye el archivo `db_dump.sql` dentro de la carpeta `database/`, el cual contiene la estructura completa de la base de datos (tablas, secuencias, etc.) y datos iniciales de ejemplo.

    **Desde la terminal (PowerShell o CMD):**
    Navegue a la carpeta raíz de su proyecto `Ferremas-API` (ej. `C:\Users\su_usuario\Proyecto\Ferremas-API`).
    Luego, ejecute el siguiente comando para importar el archivo. Si `psql` no es reconocido directamente, utilice la ruta completa al ejecutable (ej. `"C:\Program Files\PostgreSQL\17\bin\psql.exe"`).

    ```powershell
    # Comando recomendado para PowerShell:
    & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U ferremas_user -d ferremas_db -f ./database/db_dump.sql

    # Si utiliza CMD o Git Bash y 'psql' está en su PATH:
    # psql -U ferremas_user -d ferremas_db -f ./database/db_dump.sql
    ```
    El sistema le solicitará la contraseña del usuario `ferremas_user`. Ingrésela y presione Enter (la entrada de contraseña no será visible por seguridad).

    **Desde pgAdmin 4:**
    * Conéctese a la base de datos `ferremas_db` en pgAdmin.
    * Haga clic derecho sobre `ferremas_db` y seleccione `Query Tool`.
    * En la barra de herramientas de la "Query Tool", ubique el ícono de "abrir archivo".
    * Navegue hasta la carpeta `database/` dentro de su proyecto y seleccione el archivo `db_dump.sql`.
    * Haga clic en el botón "Execute/Refresh" para ejecutar todas las sentencias SQL contenidas.

7.  **Verificación y Ajuste de Permisos Adicionales (Opcional - Resolución de Problemas):**
    Si la API encuentra errores de "permiso denegado" al interactuar con la base de datos después de la importación, ejecute los siguientes comandos en la "Query Tool" de `ferremas_db` utilizando un usuario con privilegios de superusuario (ej. `postgres`):
    ```sql
    -- Otorgar permisos a todas las tablas y secuencias existentes en el esquema 'public'
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ferremas_user;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ferremas_user;

    -- Configurar permisos por defecto para futuras tablas y secuencias
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ferremas_user;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ferremas_user;
    ```

## Instalación de Dependencias del Proyecto

1.  **Navegación al Directorio del Proyecto:**
    Abra su terminal y navegue a la carpeta raíz de su proyecto `Ferremas-API`:
    ```bash
    cd C:\Users\su_usuario\Proyecto\Ferremas-API
    ```
    (Asegúrese de reemplazar `C:\Users\su_usuario\Proyecto\Ferremas-API` con la ruta real de su proyecto).

2.  **Instalación de Dependencias:**
    Ejecute el siguiente comando para instalar todas las librerías de Node.js requeridas por el proyecto:
    ```bash
    npm install
    ```

## Configuración de Variables de Entorno

El proyecto utiliza variables de entorno para la configuración de la base de datos, lo cual es una práctica recomendada por seguridad y flexibilidad.

1.  **Creación del archivo `.env`:**
    En la raíz de su proyecto (`Ferremas-API`), cree un nuevo archivo denominado `.env`.

2.  **Adición de Credenciales:**
    Copie el contenido del archivo `.env.example` (incluido en el repositorio) y péguelo en su nuevo archivo `.env`. Posteriormente, **reemplace los valores de ejemplo** con sus credenciales reales de PostgreSQL y el puerto de escucha de la API:

    ```env
    # Variables de entorno para la configuración de la base de datos PostgreSQL
    DB_USER=ferremas_user           # Usuario de PostgreSQL creado (ej. ferremas_user)
    DB_PASSWORD=su_contraseña_segura_aqui # Contraseña del usuario de PostgreSQL
    DB_HOST=localhost               # Dirección del servidor de PostgreSQL (generalmente localhost)
    DB_NAME=ferremas_db             # Nombre de la base de datos creada (ferremas_db)
    DB_PORT=5432                    # Puerto de PostgreSQL (por defecto 5432)

    # Puerto en el que la API escuchará las solicitudes
    PORT=3000
    ```
    **Verificación:** Es crucial que `DB_PASSWORD` coincida exactamente con la contraseña utilizada al crear el usuario `ferremas_user` en la base de datos.

## Ejecución del Servidor

Una vez que todas las dependencias estén instaladas y las variables de entorno configuradas, puede iniciar el servidor de la API:

1.  **Inicio del Servidor:**
    Desde la terminal, en la raíz del proyecto, ejecute:
    ```bash
    node app.js
    ```

2.  **Verificación de Estado:**
    Si la configuración es correcta, observará mensajes en la consola indicando la conexión exitosa a la base de datos y que el servidor está escuchando en el puerto configurado:
    ```
    Conexión a PostgreSQL establecida correctamente.
    Servidor escuchando en el puerto 3000
    Accede a la API de Productos en: http://localhost:3000/api/productos
    ```
