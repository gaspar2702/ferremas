import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // --- DEFINICIÓN DE TODOS LOS ESTADOS ---
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSucursal, setSelectedSucursal] = useState(null);

  // --- LÓGICA PARA CARGAR Y RECARGAR PRODUCTOS ---
  const refetchProducts = async () => {
    if (!selectedSucursal) return; // No busca productos si no hay una sucursal

    try {
      const params = new URLSearchParams({ sucursalId: selectedSucursal });
      if (selectedCategory) params.append('categoria', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);
      
      const url = `http://localhost:3000/api/productos?${params.toString()}`;
      const response = await axios.get(url);
      // Mapeamos stockdisponible a stock para consistencia en el front-end
      setProducts(response.data.map(p => ({...p, stock: p.stockdisponible || 0})));
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };
  
  // Carga las sucursales al iniciar la app
  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sucursales');
        setSucursales(response.data);
        if (response.data.length > 0) {
          setSelectedSucursal(response.data[0].sucursalid); // Selecciona la primera por defecto
        }
      } catch (error) {
        console.error('Error al obtener las sucursales:', error);
      }
    };
    fetchSucursales();
  }, []);

  // Carga las categorías al iniciar la app
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

  // Recarga los productos cada vez que un filtro cambia
  useEffect(() => {
    refetchProducts();
  }, [selectedCategory, searchTerm, selectedSucursal]);

  
  // --- LÓGICA COMPLETA Y FUNCIONAL PARA EL CARRITO CON MANEJO DE STOCK ---
  const addToCart = (productToAdd) => {
    // Revisa el stock en la lista de productos del front-end
    const productInList = products.find(p => p.productoid === productToAdd.productoid);
    if (productInList && productInList.stock > 0) {
      setCartItems(prevItems => {
        const itemExists = prevItems.find(item => item.productoid === productToAdd.productoid);
        if (itemExists) {
          return prevItems.map(item =>
            item.productoid === productToAdd.productoid ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      });
      // Disminuye el stock visualmente en el front-end
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.productoid === productToAdd.productoid ? { ...p, stock: p.stock - 1 } : p
        )
      );
    } else {
      alert('¡No queda stock de este producto!');
    }
  };

  const clearCart = () => {
    // La lógica de devolver stock ya no es necesaria aquí,
    // porque el refresco después de la compra traerá el stock correcto desde la DB.
    setCartItems([]);
  };

  // ... Aquí irían las funciones de removeFromCart y decreaseQuantity si las necesitas ...

  const value = {
    cartItems, products, categories, sucursales,
    selectedCategory, setSelectedCategory,
    searchTerm, setSearchTerm,
    selectedSucursal, setSelectedSucursal,
    addToCart,
    clearCart,
    refetchProducts, // <-- Exportamos la función de refresco
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};