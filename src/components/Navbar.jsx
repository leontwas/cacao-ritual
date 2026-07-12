import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import Carrito from './Carrito';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const { cantidadTotal } = useCarrito();
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar__logo">
            <a href="/" onClick={handleLogoClick}>Cacao Ritual</a>
          </div>
          <input type="checkbox" id="nav-toggle" className="navbar__toggle" />
          <label htmlFor="nav-toggle" className="navbar__hamburger" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <ul className="navbar__menu">

            {usuario && usuario.rol === 'admin' && (
              <li>
                <Link to="/administrar.html" style={{ color: 'var(--color-acento)', fontWeight: 'bold' }}>
                  Administrar
                </Link>
              </li>
            )}
            <li>
              <a
                href="/#productos-destacados"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('productos-destacados')?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  } else {
                    document.getElementById('productos-destacados')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Nuestra Tienda
              </a>
            </li>
            <li><a href="/tutoriales.html">Tutoriales</a></li>
            <li><a href="/locales.html">Locales</a></li>
            <li><a href="/menu-tienda.html">Nuestro Menú</a></li>
            <li><a href="/trabaja-en-tdc.html">Trabajá con Nosotros</a></li>
            <li><a href="/franquicias.html">Franquicias</a></li>
            <li><a href="/contacto.html">Contacto</a></li>
          </ul>
          <div className="navbar__iconos">
            <i className="fa-solid fa-magnifying-glass"></i>
            <div 
              style={{ position: 'relative', display: 'inline-flex', cursor: 'pointer', alignItems: 'center' }} 
              onClick={() => setIsCarritoOpen(true)}
              title="Ver Carrito"
            >
              <i className="fa-solid fa-bag-shopping"></i>
              {cantidadTotal > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  background: 'var(--color-secundario)',
                  color: 'var(--color-blanco)',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  lineHeight: '1'
                }}>
                  {cantidadTotal}
                </span>
              )}
            </div>

            {usuario ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-crema)', fontWeight: '500' }}>
                  {usuario.nombre.split(' ')[0]}
                </span>
                <button 
                  onClick={logout} 
                  style={{ border: 'none', background: 'transparent', color: 'var(--color-claro)', cursor: 'pointer', fontSize: '1rem', padding: '4px' }}
                  title="Cerrar Sesión"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <Link to="/login" style={{ marginLeft: '8px', color: 'var(--color-claro)' }} title="Iniciar Sesión">
                <i className="fa-solid fa-user"></i>
              </Link>
            )}
          </div>
        </nav>
      </header>

      <Carrito isOpen={isCarritoOpen} onClose={() => setIsCarritoOpen(false)} />
    </>
  );
};

export default Navbar;
