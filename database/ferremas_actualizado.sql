--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: rol_usuario_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.rol_usuario_enum AS ENUM (
    'Cliente',
    'Administrador',
    'Vendedor',
    'Bodeguero',
    'Contador'
);


ALTER TYPE public.rol_usuario_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventario (
    productoid integer NOT NULL,
    sucursalid integer NOT NULL,
    stockdisponible integer,
    stockminimo integer,
    ubicacionbodega character varying(100)
);


ALTER TABLE public.inventario OWNER TO postgres;

--
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    productoid integer NOT NULL,
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


ALTER TABLE public.productos OWNER TO postgres;

--
-- Name: productos_productoid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_productoid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.productos_productoid_seq OWNER TO postgres;

--
-- Name: productos_productoid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_productoid_seq OWNED BY public.productos.productoid;


--
-- Name: sucursales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sucursales (
    sucursalid integer NOT NULL,
    nombresucursal character varying(255) NOT NULL,
    direccion character varying(255),
    telefono character varying(50)
);


ALTER TABLE public.sucursales OWNER TO postgres;

--
-- Name: sucursales_sucursalid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sucursales_sucursalid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sucursales_sucursalid_seq OWNER TO postgres;

--
-- Name: sucursales_sucursalid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sucursales_sucursalid_seq OWNED BY public.sucursales.sucursalid;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    usuarioid integer NOT NULL,
    rol public.rol_usuario_enum NOT NULL,
    nombre character varying(255) NOT NULL,
    correoelectronico character varying(255) NOT NULL,
    contrasena character varying(255) NOT NULL,
    direccion character varying(255)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_usuarioid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_usuarioid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_usuarioid_seq OWNER TO postgres;

--
-- Name: usuarios_usuarioid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_usuarioid_seq OWNED BY public.usuarios.usuarioid;


--
-- Name: productos productoid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN productoid SET DEFAULT nextval('public.productos_productoid_seq'::regclass);


--
-- Name: sucursales sucursalid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sucursales ALTER COLUMN sucursalid SET DEFAULT nextval('public.sucursales_sucursalid_seq'::regclass);


--
-- Name: usuarios usuarioid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN usuarioid SET DEFAULT nextval('public.usuarios_usuarioid_seq'::regclass);


--
-- Data for Name: inventario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventario (productoid, sucursalid, stockdisponible, stockminimo, ubicacionbodega) FROM stdin;
2	1	250	50	Estante B2
3	1	25	5	Estante C3
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (productoid, nombre, descripcion, categoria, precio, stockdisponible, marca, codigo_fabricante, codigo_ferremas, historial_precios, imagen) FROM stdin;
14	Kit de Pintura 7 Piezas	Set para pintar que incluye rodillo, brocha, bandeja, y más accesorios.	Pinturas	17890.00	119	RODEX	\N	\N	\N	https://media.sodimac.cl/sodimacCL/6142621_01/width=340,height=340,quality=70,format=webp,fit=pad
13	Taladro Percutor Inalámbrico 10 mm 12V	Taladro percutor de 12V, incluye 1 batería de 1.5 Ah y 29 accesorios.	Herramientas	49990.00	44	BAUKER	\N	\N	\N	https://media.sodimac.cl/sodimacCL/5302498_001/width=480,height=480,quality=70,format=webp,fit=pad
12	Set de Accesorios 39 piezas	Completo set de 39 piezas para taladrar y atornillar en distintos materiales.	Accesorios	35990.00	79	UBERMANN	\N	\N	\N	https://media.sodimac.cl/sodimacCL/9028021_1/width=480,height=480,quality=70,format=webp,fit=pad
11	Deck WPC para Exterior	Palmeta tipo Deck WPC de 30x30 cm, ideal para terrazas y jardines, color madera clara.	Pisos y Revestimientos	79990.00	49	Genérica	\N	\N	\N	https://media.sodimac.cl/falabellaCL/138419455_01/width=480,height=480,quality=70,format=webp,fit=pad
10	Caja de Herramientas Metálica	Caja de herramientas de 5 compartimientos, ideal para organizar y transportar.	Herramientas	35000.00	19	Ubermann	\N	\N	\N	https://media.sodimac.cl/sodimacCL/11426X_01/width=480,height=480,quality=70,format=webp,fit=pad
2	Tornillos (caja)	Caja de 100 tornillos	Ferreteria	5.00	470	Marca Gen├®rica	COD-FAB-2	FER-2	[{"Fecha": "2025-05-25T23:40:31.936746", "Valor": 5.00}]	https://media.sodimac.cl/falabellaCL/141044088_01/width=480,height=480,quality=70,format=webp,fit=pad
8	Martillo de bola	Martillo de bola para trabajos pesados	Herramientas	15000.00	46	\N	\N	\N	[{"Fecha": "2025-05-27T01:02:49.400Z", "Valor": 15000}]	https://media.sodimac.cl/falabellaCL/131735915_01/width=480,height=480,quality=70,format=webp,fit=pad
3	Pintura Blanca (galon)	Galon de pintura blanca latex	Pinturas	25.00	48	Marca Gen├®rica	COD-FAB-3	FER-3	[{"Fecha": "2025-05-25T23:40:31.936746", "Valor": 25.00}]	https://media.sodimac.cl/falabellaCL/122291395_01/width=480,height=480,quality=70,format=webp,fit=pad
15	Escalera Fibra Vidrio Tijera 8 Peldaños	Escalera de tijera con plataforma, fabricada en fibra de vidrio para mayor seguridad eléctrica.	Herramientas	535800.00	14	LOUISVILLE	\N	\N	\N	https://media.sodimac.cl/falabellaCL/126995085_01/width=340,height=340,quality=70,format=webp,fit=pad
16	Manguera Bluetooth 5.0	Manguera de última generación con conexión Bluetooth para un riego inteligente y sin cables.	Hogar Inteligente	32990.00	42	TechFlow	\N	\N	\N	https://images3.memedroid.com/images/UPLOADED548/62867d7d5ae1e.jpeg
17	Martillo Automático	Martillo con sistema de auto-impacto. Solo apunte y el martillo hace el resto. Batería no incluida.	Herramientas	17990.00	75	Auto-Hammer Inc.	\N	\N	\N	https://fbi.cults3d.com/uploaders/14710517/illustration-file/a60a0c27-c602-4ef0-8c43-2df126295df2/2020-08-19_17-29.png
\.


--
-- Data for Name: sucursales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sucursales (sucursalid, nombresucursal, direccion, telefono) FROM stdin;
1	Sucursal Central	Calle Falsa 123	123-456-7890
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (usuarioid, rol, nombre, correoelectronico, contrasena, direccion) FROM stdin;
1	Cliente	Juan Perez	juan@example.com	hashed_password_123	Calle Inventada 1
2	Administrador	Maria Rodriguez	maria@example.com	hashed_admin_pass	Avenida Ficticia 2
3	Vendedor	Carlos Gomez	carlos@example.com	hashed_vendedor_pass	Pasaje Imaginario 3
\.


--
-- Name: productos_productoid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_productoid_seq', 17, true);


--
-- Name: sucursales_sucursalid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sucursales_sucursalid_seq', 1, true);


--
-- Name: usuarios_usuarioid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_usuarioid_seq', 3, true);


--
-- Name: inventario inventario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (productoid, sucursalid);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (productoid);


--
-- Name: sucursales sucursales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sucursales
    ADD CONSTRAINT sucursales_pkey PRIMARY KEY (sucursalid);


--
-- Name: usuarios usuarios_correoelectronico_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correoelectronico_key UNIQUE (correoelectronico);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuarioid);


--
-- Name: inventario inventario_productoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_productoid_fkey FOREIGN KEY (productoid) REFERENCES public.productos(productoid);


--
-- Name: inventario inventario_sucursalid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_sucursalid_fkey FOREIGN KEY (sucursalid) REFERENCES public.sucursales(sucursalid);


--
-- Name: TABLE inventario; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.inventario TO ferremas_user;


--
-- Name: TABLE productos; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.productos TO ferremas_user;


--
-- Name: SEQUENCE productos_productoid_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.productos_productoid_seq TO ferremas_user;


--
-- Name: TABLE sucursales; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.sucursales TO ferremas_user;


--
-- Name: SEQUENCE sucursales_sucursalid_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.sucursales_sucursalid_seq TO ferremas_user;


--
-- Name: TABLE usuarios; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.usuarios TO ferremas_user;


--
-- Name: SEQUENCE usuarios_usuarioid_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.usuarios_usuarioid_seq TO ferremas_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,USAGE ON SEQUENCES TO ferremas_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO ferremas_user;


--
-- PostgreSQL database dump complete
--

