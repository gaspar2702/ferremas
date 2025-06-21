import React from 'react';
import { Link } from 'react-router-dom';
import './CarritoProductos.css';

const CarritoProductos = ({ items, total, onAddToCart, onDecreaseQuantity, onRemoveFromCart, onClearCart }) => {

  return (
    <div className="cart-layout">
      <div className="cart-items-list">
        {items.map(item => (
          <div key={item.productoid} className="cart-item-row">
            {/* --- CORRECCIÓN AQUÍ --- */}
            {/* Cambiamos item.image por item.imagen para que coincida con tus datos */}
            <img src={item.imagen} alt={item.nombre} className="item-image" />
            
            <div className="item-info">
              <p className="item-brand">{item.marca}</p>
              <p className="item-name">{item.nombre}</p>
              <button onClick={() => onRemoveFromCart(item.productoid)} className="item-remove-link">Eliminar</button>
            </div>
            <div className="item-quantity-selector">
              <button onClick={() => onDecreaseQuantity(item.productoid)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onAddToCart(item)}>+</button>
            </div>
            <p className="item-price">${(item.precio * item.quantity).toLocaleString('es-CL')}</p>
          </div>
        ))}
        <button onClick={onClearCart} className="empty-cart-link">Vaciar Carro</button>
      </div>
      <div className="cart-summary-box">
        <h2>Resumen de tu compra</h2>
        <div className="summary-line">
          <span>Total</span>
          <span className="summary-total">${total.toLocaleString('es-CL')}</span>
        </div>
        <p className="shipping-info">El costo de envío se calculará al añadir la dirección.</p>
        <Link to="/" className="action-button outline">Agregar más productos</Link>
        <Link to="/checkout" className="action-button solid">Continuar</Link>
      </div>
    </div>
  );
};

export default CarritoProductos;