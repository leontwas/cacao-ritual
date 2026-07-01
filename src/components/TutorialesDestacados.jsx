import React from 'react';

const TUTORIALES = [
  {
    id: 1,
    tag: 'Principiantes',
    titulo: 'Tu primera taza de Cacao Ritual',
    descripcion: 'El paso a paso para preparar un cacao con la temperatura, dosis y técnica correcta.',
    imagen: '/img/tutorial-1.jpg'
  },
  {
    id: 2,
    tag: 'Conocimiento',
    titulo: 'Cacao Ritual vs chocolate: la diferencia real',
    descripcion: 'Por qué no es lo mismo y qué pierde el cacao cuando se convierte en chocolate comercial.',
    imagen: '/img/tutorial-2.jpg'
  },
  {
    id: 3,
    tag: 'Bienestar',
    titulo: 'Los beneficios reales de la teobromina',
    descripcion: 'Qué dice la ciencia sobre los efectos del cacao puro en el estado de ánimo y la energía.',
    imagen: '/img/tutorial-3.jpg'
  }
];

const TutorialesDestacados = () => {
  return (
    <section className="seccion seccion--oscura">
      <div className="seccion__encabezado">
        <h2>Aprendé a prepararlo</h2>
        <div className="separador"></div>
        <p>Guías prácticas para que saques el máximo potencial de tu cacao ceremonial.</p>
      </div>
      <div className="tutoriales__grid">
        {TUTORIALES.map((tutorial) => (
          <div key={tutorial.id} className="tarjeta-tutorial">
            <div className="tarjeta-tutorial__imagen">
              <img src={tutorial.imagen} alt={tutorial.titulo} />
            </div>
            <div className="tarjeta-tutorial__contenido">
              <span className="tarjeta-tutorial__tag">{tutorial.tag}</span>
              <h3>{tutorial.titulo}</h3>
              <p>{tutorial.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TutorialesDestacados;
