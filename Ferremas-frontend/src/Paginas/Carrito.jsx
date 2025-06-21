import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <-- RUTA CORREGIDA
import CarritoProductos from '../Components/CarritoProductos/CarritoProductos';

const Carrito = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  const pageStyles = {
    container: { padding: '30px 60px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: 'auto' },
    title: { fontSize: '24px', marginBottom: '20px' },
    emptyCartContainer: { textAlign: 'center', padding: '80px 20px' },
    emptyCartTitle: { marginBottom: '10px' },
    emptyCartText: { marginBottom: '25px', color: '#555' },
    button: { display: 'inline-block', padding: '12px 20px', backgroundColor: '#000', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px' }
  };

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.title}>
        Tu carro ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos)
      </h1>

      {cartItems.length === 0 ? (
        <div style={pageStyles.emptyCartContainer}>
          <h1 style={pageStyles.emptyCartTitle}>Tu carro está vacío</h1>
          <p style={pageStyles.emptyCartText}>¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
          <Link to="/" style={pageStyles.button}>Ver productos</Link>
        </div>
      ) : (
        <CarritoProductos
          items={cartItems}
          total={total}
          onAddToCart={addToCart}
          onDecreaseQuantity={decreaseQuantity}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
        />
      )}
    </div>
  );
};

export default Carrito;