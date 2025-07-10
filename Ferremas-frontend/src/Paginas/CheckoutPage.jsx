import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems = [], clearCart, refetchProducts, selectedSucursal } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const total = cartItems.reduce((sum, item) => sum + (item.precio || 0) * (item.quantity || 1), 0);

  const handleSimulatedPayment = async () => {
    if (cartItems.length === 0) return;
    setIsLoading(true);
    setError('');
    try {
      const buyOrder = `FERREMAS-${Date.now().toString().slice(-6)}`;
      const response = await axios.post('http://localhost:3000/api/pago/simular-compra', {
        items: cartItems,
        sucursalId: selectedSucursal,
        buyOrder: buyOrder
      });
      if (response.status === 200) {
        await refetchProducts();
        clearCart();
        navigate(`/pago/exitoso?orden=${buyOrder}`);
      }
    } catch (err) {
      setError(err.response?.data?.details || 'Hubo un error al procesar la compra.');
      setIsLoading(false);
    }
  };

  // --- ESTILOS PARA LA PÁGINA Y EL NUEVO BOTÓN ---
  const styles = {
    page: { padding: '40px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif' },
    title: { textAlign: 'center', marginBottom: '30px' },
    summary: { border: '1px solid #ccc', borderRadius: '8px', padding: '20px' },
    item: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' },
    total: { display: 'flex', justifyContent: 'space-between', paddingTop: '15px', marginTop: '15px', borderTop: '2px solid #333', fontWeight: 'bold', fontSize: '1.2em' },
    errorMessage: { color: 'red', textAlign: 'center', marginTop: '15px' },
    // Estilos para el botón de pago
    payButton: {
      display: 'block',
      width: '100%',
      padding: '15px',
      marginTop: '30px',
      backgroundColor: '#d9534f', // Color rojo
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.2em', // Letra más grande
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    // Estilo para cuando el botón está deshabilitado (cargando)
    payButtonDisabled: {
      backgroundColor: '#a5a5a5',
      cursor: 'not-allowed',
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Finalizar Compra</h1>
      <div style={styles.summary}>
        <h2>Resumen de tu Pedido</h2>
        {cartItems.map(item => (
          <div key={item.productoid} style={styles.item}>
            <span>{item.nombre} (x{item.quantity})</span>
            <span>${((item.precio || 0) * (item.quantity || 1)).toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
          </div>
        ))}
        <div style={styles.total}>
          <span>Total a Pagar:</span>
          <span>${total.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
        </div>
      </div>
      
      {error && <p style={styles.errorMessage}>{error}</p>}

      <button
        style={isLoading ? {...styles.payButton, ...styles.payButtonDisabled} : styles.payButton} 
        onClick={handleSimulatedPayment} 
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : 'Confirmar Compra (Simulación)'}
      </button>
    </div>
  );
};

export default CheckoutPage;