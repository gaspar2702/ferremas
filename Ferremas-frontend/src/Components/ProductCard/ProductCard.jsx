import React from 'react';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ tool }) => {
  const { addToCart } = useCart();

  // Calculamos el porcentaje de descuento si hay un precio original
  const discountPercentage = tool.originalPrice 
    ? Math.round(((tool.originalPrice - tool.precio) / tool.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card-designed">
      <div className="product-image-container">
        <img src={tool.imagen} alt={tool.nombre} className="product-image-designed" />
        {discountPercentage > 0 && (
          <span className="discount-badge-designed">-{discountPercentage}%</span>
        )}
        <button className="favorite-button-designed"><FaRegHeart /></button>
      </div>
      <div className="product-info-designed">
        <span className="product-brand-designed">{tool.marca}</span>
        <p className="product-name-designed">{tool.nombre}</p>
        <div className="product-price-container">
          <span className="product-price-designed">${tool.precio.toLocaleString('es-CL')}</span>
          {tool.originalPrice && (
            <span className="original-price-designed">${tool.originalPrice.toLocaleString('es-CL')}</span>
          )}
        </div>
        <p className="product-stock-designed">Stock: {tool.stockdisponible}</p>
        <button onClick={() => addToCart(tool)} className="add-to-cart-btn-designed">
          AÑADIR AL CARRO
        </button>
      </div>
    </div>
  );
};

export default ProductCard;