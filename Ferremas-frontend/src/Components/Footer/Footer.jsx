import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoFerreMas from '../../assets/ferremas.png'; // <-- 1. IMPORTAMOS LA IMAGEN

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section about">
          {/* 2. USAMOS LA IMAGEN IMPORTADA */}
          <img src={logoFerreMas} alt="Logo Ferremas" className="footer-logo" />
          <p>
            En Ferremas, ofrecemos las mejores herramientas y materiales para todos tus proyectos de construcción y hogar. Calidad y servicio garantizados.
          </p>
        </div>
        <div className="footer-section links">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/carrito">Mi Carrito</Link></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Política de Privacidad</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contacto</h3>
          <p>
            <i className="fa fa-map-marker"></i> Av. Siempre Viva 742, Santiago
          </p>
          <p>
            <i className="fa fa-phone"></i> +56 2 1234 5678
          </p>
          <p>
            <i className="fa fa-envelope"></i> contacto@ferremas.cl
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Ferremas | Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;