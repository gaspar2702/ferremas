-- BORRA LAS TABLAS SI EXISTEN PARA EMPEZAR DE CERO
DROP TABLE IF EXISTS public.inventario;
DROP TABLE IF EXISTS public.usuarios;
DROP TABLE IF EXISTS public.sucursales;
DROP TABLE IF EXISTS public.productos;
DROP TYPE IF EXISTS public.rol_usuario_enum;

-- CREACIÓN DE TIPOS Y TABLAS

CREATE TYPE public.rol_usuario_enum AS ENUM (
    'Cliente',
    'Administrador',
    'Vendedor',
    'Bodeguero',
    'Contador'
);

CREATE TABLE public.productos (
    productoid SERIAL PRIMARY KEY,
    nombre character varying(255) NOT NULL,
    descripcion text,
    categoria character varying(100),
    precio numeric(10,2) NOT NULL,
    stockdisponible integer,
    marca character varying(100),
    codigo_fabricante character varying(100),
    codigo_ferremas character varying(100),
    historial_precios jsonb,
    imagen text
);

CREATE TABLE public.sucursales (
    sucursalid SERIAL PRIMARY KEY,
    nombresucursal character varying(255) NOT NULL,
    direccion character varying(255),
    telefono character varying(50)
);

CREATE TABLE public.usuarios (
    usuarioid SERIAL PRIMARY KEY,
    rol public.rol_usuario_enum NOT NULL,
    nombre character varying(255) NOT NULL,
    correoelectronico character varying(255) NOT NULL UNIQUE,
    contrasena character varying(255) NOT NULL,
    direccion character varying(255)
);

CREATE TABLE public.inventario (
    productoid integer NOT NULL REFERENCES public.productos(productoid),
    sucursalid integer NOT NULL REFERENCES public.sucursales(sucursalid),
    stockdisponible integer,
    stockminimo integer,
    ubicacionbodega character varying(100),
    PRIMARY KEY (productoid, sucursalid)
);

-- INSERCIÓN DE DATOS EN LAS TABLAS

-- Insertar sucursal de ejemplo
INSERT INTO public.sucursales (nombresucursal, direccion, telefono) VALUES
('Sucursal Central', 'Calle Falsa 123', '123-456-7890');

-- Insertar productos (originales y nuevos)
INSERT INTO public.productos (nombre, descripcion, categoria, marca, precio, stockdisponible, imagen) VALUES
('Tornillos (caja)', 'Caja de 100 tornillos para madera.', 'Ferreteria', 'Marca Genérica', 5.00, 500, 'https://media.sodimac.cl/falabellaCL/141044088_01/width=480,height=480,quality=70,format=webp,fit=pad'),
('Pintura Blanca (galon)', 'Galón de pintura blanca látex para interiores.', 'Pinturas', 'Marca Genérica', 25.00, 50, 'https://media.sodimac.cl/falabellaCL/122291395_01/width=480,height=480,quality=70,format=webp,fit=pad'),
('Martillo de bola', 'Martillo de bola para trabajos pesados de mecánica.', 'Herramientas', NULL, 15000.00, 50, 'https://media.sodimac.cl/falabellaCL/131735915_01/width=480,height=480,quality=70,format=webp,fit=pad'),
('Caja de Herramientas Metálica', 'Caja de herramientas de 5 compartimientos, ideal para organizar y transportar.', 'Herramientas', 'Ubermann', 35000, 20, 'https://media.sodimac.cl/sodimacCL/11426X_01/width=480,height=480,quality=70,format=webp,fit=pad'),
('Deck WPC para Exterior', 'Palmeta tipo Deck WPC de 30x30 cm, ideal para terrazas y jardines.', 'Pisos y Revestimientos', 'Genérica', 79990, 50, 'https://media.sodimac.cl/falabellaCL/138419455_01/width=480,height=480,quality=70,format=webp,fit=pad'),
('Set de Accesorios 39 piezas', 'Completo set de 39 piezas para taladrar y atornillar en distintos materiales.', 'Accesorios', 'UBERMANN', 35990, 80, 'https://media.sodimac.cl/sodimacCL/9028021_1/width=480,height=480,quality=70,format=webp,fit=pad'),
('Taladro Percutor Inalámbrico 10 mm 12V', 'Taladro percutor de 12V, incluye 1 batería de 1.5 Ah y 29 accesorios.', 'Herramientas', 'BAUKER', 49990, 45, 'https://media.sodimac.cl/sodimacCL/5302498_001/width=480,height=480,quality=70,format=webp,fit=pad'),
('Kit de Pintura 7 Piezas', 'Set para pintar que incluye rodillo, brocha, bandeja, y más accesorios.', 'Pinturas', 'RODEX', 17890, 120, 'https://media.sodimac.cl/sodimacCL/6142621_01/width=340,height=340,quality=70,format=webp,fit=pad'),
('Escalera Fibra Vidrio Tijera 8 Peldaños', 'Escalera de tijera con plataforma, fabricada en fibra de vidrio para mayor seguridad.', 'Herramientas', 'LOUISVILLE', 535800, 15, 'https://media.sodimac.cl/falabellaCL/126995085_01/width=340,height=340,quality=70,format=webp,fit=pad'),
('Manguera Bluetooth 5.0', 'Manguera de última generación con conexión Bluetooth para un riego inteligente.', 'Hogar Inteligente', 'TechFlow', 32990, 42, 'https://images3.memedroid.com/images/UPLOADED548/62867d7d5ae1e.jpeg'),
('Martillo Automático', 'Martillo con sistema de auto-impacto. Solo apunte y el martillo hace el resto.', 'Herramientas', 'Auto-Hammer Inc.', 17990, 75, 'https://fbi.cults3d.com/uploaders/14710517/illustration-file/a60a0c27-c602-4ef0-8c43-2df126295df2/2020-08-19_17-29.png');

-- Insertar inventario de ejemplo
INSERT INTO public.inventario (productoid, sucursalid, stockdisponible, stockminimo, ubicacionbodega) VALUES
(2, 1, 470, 50, 'Estante B2'),
(3, 1, 48, 5, 'Estante C3'),
(8, 1, 46, 10, 'Estante A1');