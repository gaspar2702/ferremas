import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products = [] }) => {
  // console.log('Datos recibidos por ProductGrid:', products); // Ya no necesitamos esta línea, la puedes borrar

  return (
    <div className="product-grid">
      {products.map(tool => (
        // --- AQUÍ ESTÁ LA CORRECCIÓN FINAL ---
        // Usamos "productoid" que es el nombre correcto del ID en tus datos
        <ProductCard key={tool.productoid} tool={tool} />
      ))}
    </div>
  );
};

export default ProductGrid;