import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__contenido">
        <div className="footer__columna">
          <span className="footer__logo">Cacao Ritual</span>
          <p className="footer__descripcion">
            Cacao ritual de origen único, seleccionado con intención. Desde los
            productores hasta tu taza, con respeto y trazabilidad.
          </p>
          <div className="footer__social">
            <a href="https://www.instagram.com/" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.youtube.com/" aria-label="YouTube">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.tiktok.com/" aria-label="TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
        <div className="footer__columna">
          <h4>Navegación</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Nuestra Tienda</a></li>
            <li><a href="#">Tutoriales</a></li>
            <li><a href="#">Nuestro Menú</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className="footer__columna">
          <h4>La empresa</h4>
          <ul>
            <li><a href="#">Franquicias</a></li>
            <li><a href="#">Trabajá con Nosotros</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
        <div className="footer__columna">
          <h4>Contacto</h4>
          <ul>
            <li>
              <a href="mailto:hola@cacaoritual.com.ar">
                <i className="fa-regular fa-envelope"></i> hola@cacaoritual.com.ar
              </a>
            </li>
            <li>
              <a href="tel:+5491150001234">
                <i className="fa-solid fa-phone"></i> +54 9 11 5000-1234
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-solid fa-location-dot"></i> Encontrá tu local
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__inferior">
        <p>&copy; 2026 Cacao Ritual. Todos los derechos reservados.</p>
        <p>
          Hecho con <i className="fa-solid fa-heart icono-acento"></i> y mucho cacao
        </p>
      </div>
    </footer>
  );
};

export default Footer;
