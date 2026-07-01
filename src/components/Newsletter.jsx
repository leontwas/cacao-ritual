import React from 'react';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por sumarte a nuestra comunidad!');
  };

  return (
    <section className="newsletter">
      <h2 className="newsletter__titulo">Sumate a la comunidad</h2>
      <p>Recibí recetas, rituales y novedades directamente en tu correo. Sin spam, solo cacao.</p>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Tu correo electrónico" required />
        <button type="submit">Suscribirme</button>
      </form>
    </section>
  );
};

export default Newsletter;
