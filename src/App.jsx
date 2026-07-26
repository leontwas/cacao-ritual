import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';

import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import SobreNosotros from './components/SobreNosotros';
import ProductosDestacados from './components/ProductosDestacados';
import TutorialesDestacados from './components/TutorialesDestacados';
import LocalesCTA from './components/LocalesCTA';
import BannerCTA from './components/BannerCTA';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

import Login from './pages/Login';
import Registro from './pages/Registro';
import PaginaAdmin from './pages/PaginaAdmin';
import RutaAdmin from './components/RutaAdmin';

// Componente para manejar redirecciones desde páginas estáticas HTML
const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const route = params.get('route');
    if (route) {
      navigate(`/${route}`, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

// Componente agrupador de la página principal
const Inicio = () => {
  return (
    <>
      <Carousel />
      <SobreNosotros />
      <ProductosDestacados />
      <TutorialesDestacados />
      <LocalesCTA />
      <BannerCTA />
      <Newsletter />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <RedirectHandler />
      <AuthProvider>
        <CarritoProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route 
              path="/administrar" 
              element={
                <RutaAdmin>
                  <PaginaAdmin />
                </RutaAdmin>
              } 
            />
            <Route 
              path="/administrar.html" 
              element={
                <RutaAdmin>
                  <PaginaAdmin />
                </RutaAdmin>
              } 
            />
          </Routes>
          <Footer />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
