import React from 'react';

const SobreNosotros = () => {
  return (
    <section className="seccion seccion--crema">
      <div className="sobre-nosotros">
        <div className="sobre-nosotros__imagen">
          <img src="/img/sobre-cacao.jpg" alt="Cacao ceremonial en taza" />
        </div>
        <div className="sobre-nosotros__texto">
          <div className="titulo-centrado">
            <h2>¿Qué es el Cacao Ritual?</h2>
            <div className="separador"></div>
          </div>
          <p>
            El Cacao Ritual es cacao puro, sin procesar industrialmente, trabajado con intención. A
            diferencia del chocolate convencional, conserva todos sus principios activos: teobromina,
            magnesio, anandamida y antioxidantes en su estado más concentrado.
          </p>
          <p>
            Tiene raíces en las culturas mesoamericanas que lo usaban en rituales sagrados hace más de
            tres mil años. Hoy, ese saber ancestral se fusiona con el bienestar moderno para crear una
            práctica que cada vez más personas eligen como parte de su rutina.
          </p>
          <p>
            En Cacao Ritual lo seleccionamos directamente de productores en Tabasco, Chiapas y el
            noroeste de Ecuador, garantizando trazabilidad completa desde el árbol hasta tu taza.
          </p>
          <a href="#" className="btn btn--oscuro">Explorar la tienda</a>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
