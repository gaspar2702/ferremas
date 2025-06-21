import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // --- LÓGICA PARA CARGAR Y RECARGAR PRODUCTOS ---
  const refetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('categoria', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);
      
      const url = `http://localhost:3000/api/productos?${params.toString()}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    refetchProducts();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos/categorias');
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchCategories();
  }, []);
  
  // --- LÓGICA COMPLETA Y FUNCIONAL PARA EL CARRITO ---
  const addToCart = (productToAdd) => {
    const productInList = products.find(p => p.productoid === productToAdd.productoid);
    if (productInList && productInList.stockdisponible > 0) {
      setCartItems(prevItems => {
        const itemExists = prevItems.find(item => item.productoid === productToAdd.productoid);
        if (itemExists) {
          return prevItems.map(item =>
            item.productoid === productToAdd.productoid ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      });
    } else {
      alert('¡No queda stock de este producto!');
    }
  };

  const removeFromCart = (productId) => {
    // Aquí iría tu lógica para devolver stock si es necesario
    setCartItems(prevItems => prevItems.filter(item => item.productoid !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prevItems => 
      prevItems.map(item =>
        item.productoid === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const value = {
    cartItems,
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    refetchProducts,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};