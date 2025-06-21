import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './Nav.css';
import logoFerreMas from '../../assets/ferremas.png'; // 1. IMPORTAMOS la imagen desde la carpeta assets

const Nav = () => {
  const { cartItems, categories, setSelectedCategory, setSearchTerm } = useCart();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Ya no necesitamos la variable 'logoUrl' porque importamos la imagen directamente

  const handleCategoryClick = (category) => {
    setSearchTerm(''); 
    setInputValue('');
    setSelectedCategory(category);
    setDropdownOpen(false); 
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); 
    setSelectedCategory(''); 
    setSearchTerm(inputValue); 
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        {/* 2. USAMOS la imagen importada en la etiqueta <img> */}
        <Link to="/"><img src={logoFerreMas} alt="Logo Ferremas" /></Link>
      </div>

      <form className="nav-search" onSubmit={handleSearchSubmit}>
        <div className="category-container">
          <button 
            type="button" 
            className="category-button" 
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            Categorías ▼
          </button>
          {isDropdownOpen && (
            <ul className="category-dropdown">
              <li onClick={() => handleCategoryClick('')}>Todas las categorías</li>
              {categories.map((cat, index) => (
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