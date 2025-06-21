import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const CheckoutPage = () => {
  // --- CORRECCIÓN CLAVE ---
  // Añadimos " = [] " para asegurar que cartItems sea siempre un array,
  // incluso si el contexto aún no ha cargado. Esto evita el error.
  const { cartItems = [], clearCart, refetchProducts } = useCart(); 
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const total = cartItems.reduce((sum, item) => sum + (item.precio || 0) * (item.quantity || 1), 0);

  const handleSimulatedPayment = async () => {
    if (cartItems.length === 0) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/pago/simular-compra', {
        items: cartItems,
        total: total,
      });
      if (response.status === 200) {
        console.log('Compra simulada con éxito:', response.data.message);
        clearCart();
        await refetchProducts();
        alert('¡Compra simulada con éxito! El stock ha sido actualizado.');
        navigate('/');
      }
    } catch (err) {
      console.error('Error en la simulación de compra:', err.response?.data || err.message);
      setError(err.response?.data?.details || 'Hubo un error al procesar la compra.');
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-page" style={{ padding: '40px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Finalizar Compra</h1>
      <div className="order-summary" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
        <h2>Resumen de tu Pedido</h2>
        {cartItems.map(item => (
          <div key={item.productoid} className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
            <span>{item.nombre} (x{item.quantity})</span>
            <span>${((item.precio || 0) * (item.quantity || 1)).toLocaleString('es-CL')}</span>
          </div>
        ))}
        <div className="summary-total" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', marginTop: '15px', borderTop: '2px solid #333', fontWeight: 'bold', fontSize: '1.2em' }}>
          <span>Total a Pagar:</span>
          <span>${total.toLocaleString('es-CL')}</span>
        </div>
      </div>
      
      {error && <p style={{color: 'red', textAlign: 'center', marginTop: '15px'}}>{error}</p>}

      <button 
        className="pay-button"
        style={isLoading ? {backgroundColor: '#a5a5a5', cursor: 'not-allowed', display: 'block', width: '100%', padding: '15px', marginTop: '30px', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.2em', fontWeight: 'bold'} : {backgroundColor: '#d9534f', cursor: 'pointer', display: 'block', width: '100%', padding: '15px', marginTop: '30px', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.2em', fontWeight: 'bold'}} 
        onClick={handleSimulatedPayment} 
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : 'Confirmar Compra'}
      </button>
    </div>
  );
};

export default CheckoutPage;