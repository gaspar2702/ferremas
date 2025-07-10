import React from 'react';
import { BrowserRouter, Routes, Route, useSearchParams, Link } from 'react-router-dom'; // <-- Importamos Link
import { CartProvider } from './context/CartContext';

// Importar Páginas
import PaginaInicio from './Paginas/PaginaInicio';
import Carrito from './Paginas/Carrito';
import CheckoutPage from './Paginas/CheckoutPage';

// Importar Componentes
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

// --- COMPONENTES DE RESULTADO MEJORADOS ---

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  const orden = searchParams.get('orden');
  return (
    <div style={{padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif'}}>
      <h1>¡Gracias por tu compra!</h1>
      <p>Tu pago ha sido procesado exitosamente.</p>
      {orden && <p><strong>Número de Orden:</strong> {orden}</p>}
      <br />
      {/* BOTÓN AÑADIDO */}
      <Link to="/" style={{padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px'}}>
        Volver al Inicio
      </Link>
    </div>
  );
};

const PagoFallido = () => {
  const [searchParams] = useSearchParams();
  const orden = searchParams.get('orden');
  return (
    <div style={{padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif'}}>
      <h1>Pago Fallido</h1>
      <p>Hubo un problema con tu pago. Por favor, intenta de nuevo.</p>
      {orden && <p><strong>Número de Orden:</strong> {orden}</p>}
      <br />
      {/* BOTÓN AÑADIDO */}
      <Link to="/" style={{padding: '10px 20px', backgroundColor: '#333', color: 'white', textDecoration: 'none', borderRadius: '5px'}}>
        Volver al Inicio
      </Link>
    </div>
  );
};


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<PaginaInicio />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/pago/exitoso" element={<PagoExitoso />} />
              <Route path="/pago/fallido" element={<PagoFallido />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;