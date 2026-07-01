import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
