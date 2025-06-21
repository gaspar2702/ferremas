import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Importar Páginas
import PaginaInicio from './Paginas/PaginaInicio';
import Carrito from './Paginas/Carrito';
import CheckoutPage from './Paginas/CheckoutPage';
const PagoExitoso = () => <div style={{padding: '40px', textAlign: 'center'}}><h1>¡Pago Exitoso!</h1><p>Tu compra ha sido procesada correctamente.</p></div>;
const PagoFallido = () => <div style={{padding: '40px', textAlign: 'center'}}><h1>Pago Fallido</h1><p>Hubo un problema con tu pago. Por favor, intenta de nuevo.</p></div>;

// Importar Componentes
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer'; // <-- 1. IMPORTAMOS EL FOOTER

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* 2. AÑADIMOS EL DIV CONTENEDOR CON ESTILOS */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
          {/* El <main> ayuda a que el contenido principal ocupe el espacio disponible */}
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<PaginaInicio />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/pago/exitoso" element={<PagoExitoso />} />
              <Route path="/pago/fallido" element={<PagoFallido />} />
              <Route path="/pago/error" element={<PagoFallido />} />
            </Routes>
          </main>
          <Footer /> {/* <-- 3. AÑADIMOS EL FOOTER AL FINAL */}
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;