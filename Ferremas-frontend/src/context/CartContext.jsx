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
      if (selectedCategory) {
        params.append('categoria', selectedCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      const url = `http://localhost:3000/api/productos?${params.toString()}`;
      const response = await axios.get(url);

      // Mapeamos los datos para consistencia en el front-end
      const productsWithStock = response.data.map(p => ({
        ...p,
        stock: p.stockdisponible !== undefined ? p.stockdisponible : 0
      }));
      setProducts(productsWithStock);

    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // useEffect para la carga inicial de categorías
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

  // useEffect para recargar los productos cuando cambian los filtros
  useEffect(() => {
    refetchProducts();
  }, [selectedCategory, searchTerm]);
  
  // --- LÓGICA COMPLETA Y FUNCIONAL PARA EL CARRITO CON MANEJO DE STOCK ---

  const addToCart = (productToAdd) => {
    const productInList = products.find(p => p.productoid === productToAdd.productoid);
    
    // Verificamos si hay stock del producto en la lista general
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

      // Disminuimos el stock en la lista de productos del front-end
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.productoid === productToAdd.productoid ? { ...p, stock: p.stock - 1 } : p
        )
      );
    } else {
      alert('¡No queda stock de este producto!');
    }
  };

  const removeFromCart = (productId) => {
    let itemInCart;
    const newCartItems = cartItems.filter(item => {
      if (item.productoid === productId) {
        itemInCart = item;
        return false;
      }
      return true;
    });
    setCartItems(newCartItems);

    if (itemInCart) {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.productoid === productId ? { ...p, stock: p.stock + itemInCart.quantity } : p
        )
      );
    }
  };

  const decreaseQuantity = (productId) => {
    let itemRemovedCompletely = false;
    const newCartItems = cartItems.map(item => {
      if (item.productoid === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          itemRemovedCompletely = true;
          return null;
        }
      }
      return item;
    }).filter(Boolean);

    setCartItems(newCartItems);

    if (!itemRemovedCompletely) {
       setProducts(prevProducts =>
        prevProducts.map(p =>
          p.productoid === productId ? { ...p, stock: p.stock + 1 } : p
        )
      );
    } else {

       setProducts(prevProducts =>
        prevProducts.map(p =>
          p.productoid === productId ? { ...p, stock: p.stock + 1 } : p
        )
      );
    }
  };
  
  const clearCart = () => {
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const itemInCart = cartItems.find(item => item.productoid === p.productoid);
        if (itemInCart) {
          return { ...p, stock: p.stock + itemInCart.quantity };
        }
        return p;
      });
    });
    setCartItems([]);
  };
  
  const value = {
    cartItems, products, categories,
    selectedCategory, setSelectedCategory,
    searchTerm, setSearchTerm,
    addToCart, removeFromCart, decreaseQuantity, clearCart,
    refetchProducts
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};