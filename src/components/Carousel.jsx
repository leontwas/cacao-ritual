import React, { useState, useEffect, useRef } from 'react';

const INITIAL_SLIDES = [
  {
    id: 1,
    image: '/img/img1.png',
    author: 'TU RITUAL',
    title: 'Despertá tus sentidos',
    topic: 'A PURO CACAO',
    des: 'El cacao es una fuente natural de antioxidantes que ayudan a proteger las células. Contiene magnesio, hierro y potasio, minerales esenciales para el organismo. Además, favorece la salud cardiovascular, mejora la circulación y contribuye al bienestar emocional al estimular la producción de serotonina.',
    buttons: [
      { text: 'Encontranos', link: '#', styleClass: 'btn--borde' }
    ]
  },
  {
    id: 2,
    image: '/img/img2.png',
    author: 'TU RITUAL',
    title: 'El placer de un buen',
    topic: 'CACAO',
    des: 'Una buena taza de chocolate caliente transforma cualquier momento en una experiencia especial. Su aroma envolvente, sabor intenso y textura cremosa brindan calidez, confort y bienestar. Perfecta para compartir, relajarse o disfrutar un instante de placer en cualquier época del año.',
    buttons: [
      { text: 'Ver productos', link: '#', styleClass: 'btn--acento' },
      { text: 'Aprender más', link: '#', styleClass: 'btn--borde' }
    ]
  },
  {
    id: 3,
    image: '/img/img3.png',
    author: 'TU RITUAL',
    title: 'Un momento',
    topic: 'PARA DISFRUTAR',
    des: 'Nada se compara con el placer de una taza de chocolate recién preparada. Su sabor intenso, aroma irresistible y suave cremosidad crean una pausa perfecta para relajarse. Déjate envolver por su calidez y convierte cada sorbo en un instante de felicidad y confort.',
    buttons: [
      { text: 'UNITE A NOSOTROS', link: '#', styleClass: 'btn--acento' },
      { text: 'FRANQUICIAS', link: '#', styleClass: 'btn--borde' }
    ]
  },
  {
    id: 4,
    image: '/img/img4.png',
    author: 'TU RITUAL',
    title: 'El sabor que',
    topic: 'TE ABRAZA',
    des: 'Cuando el aroma del cacao llena el ambiente, comienza una experiencia única. Una taza de chocolate caliente combina tradición, dulzura y calidez en cada sorbo. Ideal para compartir, relajarse o simplemente consentirte, su sabor auténtico convierte los momentos cotidianos en recuerdos inolvidables.',
    buttons: [
      { text: 'CONTACTANOS', link: '#', styleClass: 'btn--borde' }
    ]
  }
];

const Carousel = () => {
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [transitionClass, setTransitionClass] = useState('');
  const timeoutRunningRef = useRef(null);
  const timeoutAutoNextRef = useRef(null);

  const timeRunning = 1500;
  const timeAutoNext = 7000;

  const handleNext = () => {
    showSlider('next');
  };

  const handlePrev = () => {
    showSlider('prev');
  };

  const showSlider = (type) => {
    // Set transition class to trigger CSS animations
    setTransitionClass(type);

    // Reorder slides array based on direction
    if (type === 'next') {
      setSlides((prevSlides) => [...prevSlides.slice(1), prevSlides[0]]);
    } else {
      setSlides((prevSlides) => [
        prevSlides[prevSlides.length - 1],
        ...prevSlides.slice(0, prevSlides.length - 1)
      ]);
    }

    // Clear running timeout if active
    if (timeoutRunningRef.current) {
      clearTimeout(timeoutRunningRef.current);
    }
    // Remove transition class after the duration of the animation (1500ms)
    timeoutRunningRef.current = setTimeout(() => {
      setTransitionClass('');
    }, timeRunning);

    // Reset auto play timeout
    resetAutoNextTimer();
  };

  const resetAutoNextTimer = () => {
    if (timeoutAutoNextRef.current) {
      clearTimeout(timeoutAutoNextRef.current);
    }
    timeoutAutoNextRef.current = setTimeout(() => {
      handleNext();
    }, timeAutoNext);
  };

  // Start autoplay on mount
  useEffect(() => {
    resetAutoNextTimer();
    return () => {
      if (timeoutRunningRef.current) clearTimeout(timeoutRunningRef.current);
      if (timeoutAutoNextRef.current) clearTimeout(timeoutAutoNextRef.current);
    };
  }, []);

  return (
    <div className={`carousel ${transitionClass}`}>
      <div className="list">
        {slides.map((slide) => (
          <div key={slide.id} className="item">
            <img src={slide.image} alt={slide.title} />
            <div className="content">
              <div className="author">{slide.author}</div>
              <div className="title">{slide.title}</div>
              <div className="topic">{slide.topic}</div>
              <div className="des">{slide.des}</div>
              <div className="buttons">
                {slide.buttons.map((btn, idx) => (
                  <a key={idx} href={btn.link} className={`btn ${btn.styleClass}`}>
                    {btn.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" onClick={handlePrev}>&lt;</button>
        <button id="next" onClick={handleNext}>&gt;</button>
      </div>
      <div className="time"></div>
    </div>
  );
};

export default Carousel;
