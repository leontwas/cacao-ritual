import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { apiProductos } from '../services/api';
import { Toast } from '../utils/sweetalert';

const HARDCODED_PRODUCTOS = [
  {
    id: '1',
    nombre: 'Pasta de Cacao Puro',
    descripcion: '100% cacao, sin azúcar ni aditivos. La base perfecta para tu ritual diario.',
    descripcionLarga: 'Nuestra Pasta de Cacao Puro es la expresión más auténtica del cacao en su estado natural. Elaborada a partir de granos seleccionados de Tabasco y Chiapas, México, esta pasta concentra todos los principios activos del cacao: teobromina, magnesio, anandamida y antioxidantes. Sin azúcar, sin lecitina, sin conservadores. Artesanal y natural. Ideal para preparar bebidas rituales calientes, incorporar en recetas saludables o consumir directamente para potenciar tu energía y bienestar emocional. 200g.',
    imagen: 'https://res.cloudinary.com/dvhb2qod/image/upload/v1782925992/paq1_oca2xo.png',
    precio: '$3.200',
    beneficios: ['Alto en magnesio', 'Fuente de antioxidantes', 'Sin aditivos', 'Artesanal']
  },
  {
    id: '2',
    nombre: 'Nibs de Cacao Tostados',
    descripcion: 'Crujientes, intensos, perfectos para incorporar en smoothies y granolas.',
    descripcionLarga: 'Los Nibs de Cacao Tostados son el snack sagrado del cacao. Son los granos de cacao tostados y troceados, sin ningún tipo de procesado adicional. Su textura crujiente y su sabor intenso, ligeramente amargo, son la firma de un cacao puro de calidad. Perfecto para espolvorear sobre granola, yogur, smoothies, ensaladas o simplemente disfrutar solos como snack energizante. Cargados de hierro, magnesio y teobromina. 200g.',
    imagen: 'https://res.cloudinary.com/dvhb2qod/image/upload/v1782925992/paq2_njfirj.png',
    precio: '$1.800',
    beneficios: ['Rico en hierro', 'Energizante natural', 'Sin azúcar', 'Tostado artesanal']
  },
  {
    id: '3',
    nombre: 'Cacao Especiado',
    descripcion: 'Con canela de Ceylán, cardamomo y pimienta de cayena. Una explosión de sabor.',
    descripcionLarga: 'El Cacao Especiado es nuestra mezcla ritual más aromática. Combinamos pasta de cacao puro con canela de Ceylán, cardamomo verde y un toque de pimienta de cayena, creando una experiencia sensorial única. Esta mezcla ancestral activa la circulación, calienta el cuerpo y potencia los efectos del cacao. Ideal para preparar bebidas reconfortantes, batidos o cacao ceremonial. Sin azúcar ni aditivos. 200g.',
    imagen: 'https://res.cloudinary.com/dvhb2qod/image/upload/v1782925993/paq3_a467qi.png',
    precio: '$2.600',
    beneficios: ['Mezcla ancestral', 'Activa la circulación', 'Sabor intenso', 'Sin azúcar']
  },
  {
    id: '4',
    nombre: 'Kit de Iniciación',
    descripcion: 'Todo lo que necesitás para empezar tu práctica: pasta, molinillo y guía.',
    descripcionLarga: 'El Kit de Iniciación es la puerta de entrada perfecta al mundo del cacao ceremonial. Incluye una porción de Pasta de Cacao Puro (100g), un molinillo de madera artesanal para rallar el cacao con intención, y una guía impresa con la historia del cacao, sus beneficios y tres recetas rituales para empezar tu práctica. Todo lo que necesitás para conectarte con el cacao desde el primer día. Ideal como regalo o para quien da sus primeros pasos.',
    imagen: 'https://res.cloudinary.com/dvhb2qod/image/upload/v1782925993/paq4_dkjppx.png',
    precio: '$5.500',
    beneficios: ['Incluye guía ritual', 'Molinillo artesanal', 'Ideal para regalar', 'Pack completo']
  },
  {
    id: '5',
    nombre: 'Cacao en Polvo',
    descripcion: '100% cacao orgánico, sin azúcar ni aditivos. Perfecto para preparar tus bebidas favoritas.',
    descripcionLarga: 'Nuestro Cacao en Polvo es 100% cacao puro, sin azúcar ni aditivos, procesado a baja temperatura para preservar todos sus nutrientes. Su textura fina lo hace ideal para disolver en bebidas calientes o frías, preparar smoothies, postres, infusiones o incorporar en cualquier receta que necesite el alma del cacao. Con cada cucharada obtenés una dosis concentrada de teobromina, magnesio y flavonoides. Orgánico certificado. 250g.',
    imagen: 'https://res.cloudinary.com/dvhb2qod/image/upload/v1782925995/paq5_qb49p1.png',
    precio: '$5.500',
    beneficios: ['Orgánico certificado', 'Procesado en frío', 'Sin azúcar', 'Alta solubilidad']
  },
  {
    id: '6',
    nombre: 'Cacao Ecuatoriano Fino',
    descripcion: 'Cacao ecuatoriano fino, 100% orgánico y de comercio justo.',
    descripcionLarga: 'El Cacao Ecuatoriano Fino proviene del noroeste de Ecuador, zona reconocida mundialmente por producir uno de los cacaos más aromáticos y complejos del planeta. De variedad Nacional (conocida como "Arriba"), este cacao expresa notas florales, afrutadas y un amargor suave y equilibrado. Cultivado por familias productoras bajo prácticas agroforestales y certificación de comercio justo. Una experiencia premium para el paladar más exigente. 200g.',
    imagen: 'https://res.cloudinary.com/dvhb2qod/image/upload/v1782925996/paq6_tksm8k.png',
    precio: '$5.500',
    beneficios: ['Variedad Nacional', 'Comercio justo', 'Aroma floral', 'Origen único']
  },
  {
    id: '7',
    nombre: 'Manteca de Cacao',
    descripcion: 'Manteca de cacao, 100% orgánica y de comercio justo.',
    descripcionLarga: 'La Manteca de Cacao es la grasa natural extraída del grano de cacao prensado en frío, sin refinado ni desodorización. Rica en ácidos grasos esenciales (ácido esteárico, palmítico y oleico), es ideal tanto para uso culinario como cosmético. En cocina, aporta untuosidad y aroma al cacao a cualquier preparación. En cosmética, hidrata y nutre la piel profundamente. 100% orgánica, sin aditivos. Prensada en frío. 100g.',
    imagen: 'https://res.cloudinary.com/dvhb2qod/image/upload/v1782925998/paq7_r1ho6y.png',
    precio: '$5.500',
    beneficios: ['Prensada en frío', 'Uso culinario y cosmético', 'Rica en ácidos grasos', 'Sin refinar']
  },
  {
    id: '8',
    nombre: 'Pasta de Cacao Puro 400g',
    descripcion: 'Pasta de cacao puro, 100% orgánica y de comercio justo.',
    descripcionLarga: 'La versión familiar de nuestra Pasta de Cacao Puro. El mismo cacao artesanal de origen único en formato de 400g, ideal para quienes ya tienen su ritual establecido y consumen cacao regularmente. 100% orgánico, sin azúcar, sin lecitina, sin conservadores. Elaborado con granos de Tabasco, México. El formato más económico por gramo para quien el cacao es parte esencial de su día a día.',
    imagen: 'https://res.cloudinary.com/dvhb2qod/image/upload/v1782926000/paq8_gqkzud.png',
    precio: '$5.800',
    beneficios: ['Formato familiar 400g', 'Mejor precio por gramo', 'Sin aditivos', 'Origen Tabasco']
  }
];

const ProductoModal = ({ producto, onClose }) => {
  const { agregarItem } = useCarrito();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Completar beneficios por defecto si no existen en la API
  const beneficios = producto.beneficios || ['Cacao Puro de Origen', 'Sin aditivos químicos', '100% natural y sustentable'];

  return (
    <div className="prod-modal__overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="prod-modal__contenido" onClick={(e) => e.stopPropagation()}>
        <button className="prod-modal__cerrar" onClick={onClose} aria-label="Cerrar">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="prod-modal__cuerpo">
          <div className="prod-modal__imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>

          <div className="prod-modal__info">
            <h2 className="prod-modal__nombre">{producto.nombre}</h2>
            <div className="prod-modal__separador"></div>
            <p className="prod-modal__descripcion">
              {producto.descripcionLarga || producto.descripcion}
            </p>

            <ul className="prod-modal__beneficios">
              {beneficios.map((b, i) => (
                <li key={i}><i className="fa-solid fa-circle-check"></i> {b}</li>
              ))}
            </ul>

            <div className="prod-modal__pie">
              <span className="prod-modal__precio">
                {typeof producto.precio === 'number' ? `$${producto.precio}` : producto.precio}
              </span>
              <div className="prod-modal__acciones">
                <button 
                  className="btn btn--acento" 
                  onClick={() => {
                    agregarItem(producto);
                    onClose();
                  }}
                >
                  <i className="fa-solid fa-bag-shopping"></i>&nbsp; Agregar al carrito
                </button>
                <button className="btn btn--oscuro" onClick={onClose}>
                  <i className="fa-solid fa-arrow-left"></i>&nbsp; Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await apiProductos.obtenerTodos();
        // Si no hay productos en Firestore, cargamos los hardcodeados por defecto
        if (data && data.length > 0) {
          // Unir descripciones largas si coinciden por nombre para mantener el detalle estético
          const listado = data.map(item => {
            const match = HARDCODED_PRODUCTOS.find(p => p.nombre.toLowerCase() === item.nombre.toLowerCase());
            return {
              ...item,
              descripcionLarga: match ? match.descripcionLarga : item.descripcion,
              beneficios: match ? match.beneficios : undefined
            };
          });
          setProductos(listado);
        } else {
          setProductos(HARDCODED_PRODUCTOS);
        }
      } catch (err) {
        console.warn('Fallo de conexión con la API, usando productos estáticos por defecto.');
        setProductos(HARDCODED_PRODUCTOS);
      }
    };

    fetchProductos();
  }, []);

  const abrirModal = (producto) => setProductoSeleccionado(producto);

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    document.getElementById('productos-destacados')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="productos-destacados" className="seccion seccion--blanca">
        <div className="seccion__encabezado">
          <h2>Productos destacados</h2>
          <div className="separador"></div>
          <p>Seleccionamos los mejores cacaos del mundo para que tu ritual sea siempre excepcional.</p>
        </div>
        <div className="productos__grid">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="tarjeta-producto"
              onClick={() => abrirModal(producto)}
              style={{ cursor: 'pointer' }}
            >
              <div className="tarjeta-producto__imagen">
                <img src={producto.imagen} alt={producto.nombre} />
              </div>
              <div className="tarjeta-producto__info">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <div className="tarjeta-producto__precio">
                  <span>{typeof producto.precio === 'number' ? `$${producto.precio.toLocaleString('es-AR')}` : producto.precio}</span>
                  <span className="btn btn--oscuro">Ver más</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {productoSeleccionado && (
        <ProductoModal producto={productoSeleccionado} onClose={cerrarModal} />
      )}
    </>
  );
};

export default ProductosDestacados;
