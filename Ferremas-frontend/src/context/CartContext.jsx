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

  // Efecto para cargar/filtrar productos
  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('categoria', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);
      
      const url = `http://localhost:3000/api/productos?${params.toString()}`;
      try {
        const response = await axios.get(url);
        // Aseguramos que los datos del back-end se mapeen a 'stock' para consistencia
        const productsWithStock = response.data.map(p => ({...p, stock: p.stockdisponible}));
        setProducts(productsWithStock);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  // Efecto para cargar categorías
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
  
  // --- LÓGICA COMPLETA Y FUNCIONAL PARA EL CARRITO CON MANEJO DE STOCK ---

  const addToCart = (productToAdd) => {
    const productInList = products.find(p => p.productoid === productToAdd.productoid);
    if (productInList && productInList.stock > 0) {
      // Lógica para añadir al carrito
      setCartItems(prevItems => {
        const itemExists = prevItems.find(item => item.productoid === productToAdd.productoid);
        if (itemExists) {
          return prevItems.map(item =>
            item.productoid === productToAdd.productoid ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      });
      // Lógica para disminuir el stock en la lista de productos
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
    // Quitamos el item del carrito
    const newCartItems = cartItems.filter(item => {
      if (item.productoid === productId) {
        itemInCart = item;
        return false;
      }
      return true;
    });
    setCartItems(newCartItems);

    // Devolvemos el stock a la lista de productos si encontramos el item
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
    // Disminuimos la cantidad o marcamos para eliminar
    const newCartItems = cartItems.map(item => {
      if (item.productoid === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          itemRemovedCompletely = true; // Se va a eliminar
          return null;
        }
      }
      return item;
    }).filter(Boolean); // Limpiamos los nulos

    setCartItems(newCartItems);
    
    // Devolvemos 1 al stock solo si el producto se eliminó por completo
    if (itemRemovedCompletely) {
        removeFromCart(productId) // Llamamos a la función principal de remover
    } else {
         setProducts(prevProducts =>
            prevProducts.map(p =>
              p.productoid === productId ? { ...p, stock: p.stock + 1 } : p
            )
        );
    }
  };
  
  const clearCart = () => {
    // Devolvemos todo el stock de los productos del carrito
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const itemInCart = cartItems.find(item => item.productoid === p.productoid);
        if (itemInCart) {
          return { ...p, stock: p.stock + itemInCart.quantity };
        }
        return p;
      });
    });
    // Vaciamos el array del carrito
    setCartItems([]);
  };
  
  const value = {
    cartItems, products, categories,
    selectedCategory, setSelectedCategory,
    searchTerm, setSearchTerm,
    addToCart, removeFromCart, decreaseQuantity, clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};