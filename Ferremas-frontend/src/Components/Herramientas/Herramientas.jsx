import React from 'react';
import { useCart } from '../../context/CartContext';
import ProductGrid from '../ProductGrid/ProductGrid'; // Esta importación ahora funcionará

const Herramientas = () => {
  const { products } = useCart(); 

  const styles = {
    section: { padding: '30px 40px', fontFamily: 'Arial, sans-serif' },
    header: { textAlign: 'center', marginBottom: '30px' },
    title: { fontSize: '32px', marginBottom: '5px' },
    subtitle: { fontSize: '16px', color: '#666' },
  };

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Nuestras Herramientas</h2>
        <p style={styles.subtitle}>Calidad y durabilidad para cada uno de tus proyectos.</p>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
};

export default Herramientas;