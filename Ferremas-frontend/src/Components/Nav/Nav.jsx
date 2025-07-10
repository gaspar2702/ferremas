import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './Nav.css';
import logoFerreMas from '../../assets/ferremas.png';

const Nav = () => {
  // 1. Obtenemos todo lo necesario del contexto, incluyendo lo de las sucursales
  const {
    cartItems,
    categories,
    setSelectedCategory,
    sucursales,
    setSelectedSucursal,
    setSearchTerm
  } = useCart();

  // 2. Creamos un estado separado para cada menú desplegable
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isSucursalDropdownOpen, setSucursalDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCategoryClick = (category) => {
    setSearchTerm('');
    setInputValue('');
    setSelectedCategory(category);
    setCategoryDropdownOpen(false);
  };

  // 3. Nueva función para manejar el clic en una sucursal
  const handleSucursalClick = (sucursalId) => {
    setSelectedSucursal(sucursalId);
    setSucursalDropdownOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSelectedCategory('');
    setSearchTerm(inputValue);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/"><img src={logoFerreMas} alt="Logo Ferremas" /></Link>
      </div>

      <form className="nav-search" onSubmit={handleSearchSubmit}>
        {/* 4. MENÚ DE SUCURSAL AÑADIDO */}
        <div className="category-container">
          <button
            type="button"
            className="category-button"
            onClick={() => setSucursalDropdownOpen(!isSucursalDropdownOpen)}
          >
            Sucursal ▼
          </button>
          {isSucursalDropdownOpen && (
            <ul className="category-dropdown">
              {(sucursales || []).map((sucursal) => (
                <li key={sucursal.sucursalid} onClick={() => handleSucursalClick(sucursal.sucursalid)}>
                  {sucursal.nombresucursal}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* MENÚ DE CATEGORÍAS (el que ya tenías) */}
        <div className="category-container">
          <button
            type="button"
            className="category-button"
            onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            Categorías ▼
          </button>
          {isCategoryDropdownOpen && (
            <ul className="category-dropdown">
              <li onClick={() => handleCategoryClick('')}>Todas las categorías</li>
              {(categories || []).map((cat, index) => (
                <li key={cat.categoria || index} onClick={() => handleCategoryClick(cat.categoria)}>
                  {cat.categoria}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>

      <div className="nav-actions">
        <Link to="/carrito" className="nav-cart-icon">
          <FaShoppingCart />
          {cartItems.length > 0 && <span className="cart-counter">{cartItems.length}</span>}
        </Link>
        <button className="btn btn-login">Iniciar sesión</button>
        <button className="btn btn-register">Regístrate</button>
      </div>
    </nav>
  );
};

export default Nav;