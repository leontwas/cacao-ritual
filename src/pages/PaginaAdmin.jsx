import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiProductos } from '../services/api';
import { alertaExito, alertaError, alertaConfirmacion, Toast } from '../utils/sweetalert';

const PaginaAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Campos del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const data = await apiProductos.obtenerTodos();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      alertaError('Error', 'No se pudieron cargar los productos de la API');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const resetFormulario = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setImagen(null);
    setModoEdicion(false);
    setIdEditando(null);
    // Reset file input
    const fileInput = document.getElementById('imagen-producto');
    if (fileInput) fileInput.value = '';
  };

  const handleEditClick = (producto) => {
    setModoEdicion(true);
    setIdEditando(producto.id);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmar cambios antes de realizarlos (crear o editar)
    const tituloConfirm = modoEdicion ? '¿Confirmar modificaciones?' : '¿Crear nuevo producto?';
    const textoConfirm = modoEdicion 
      ? 'Se actualizarán los datos de este producto en la base de datos.' 
      : 'El nuevo producto se añadirá a la lista de destacados.';

    const confirm = await alertaConfirmacion(tituloConfirm, textoConfirm, 'Sí, guardar');
    if (!confirm.isConfirmed) return;

    setEnviando(true);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', parseFloat(precio));
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      if (modoEdicion) {
        await apiProductos.actualizar(idEditando, formData);
        alertaExito('¡Actualizado!', 'El producto ha sido modificado con éxito.');
      } else {
        await apiProductos.crear(formData);
        alertaExito('¡Creado!', 'El nuevo producto ha sido registrado.');
      }
      resetFormulario();
      cargarProductos();
    } catch (error) {
      console.error('Error en el submit:', error);
      alertaError('Error', error.message || 'Ocurrió un error al procesar el producto.');
    } finally {
      setEnviando(false);
    }
  };

  const handleDeleteClick = async (id, nombreProd) => {
    const confirm = await alertaConfirmacion(
      '¿Eliminar producto?',
      `¿Estás seguro de que deseas eliminar "${nombreProd}"? Esta acción no se puede deshacer.`,
      'Sí, eliminar'
    );

    if (confirm.isConfirmed) {
      try {
        await apiProductos.eliminar(id);
        Toast.fire({
          icon: 'success',
          title: 'Producto eliminado correctamente'
        });
        cargarProductos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alertaError('Error', error.message || 'No se pudo eliminar el producto.');
      }
    }
  };

  return (
    <div style={{ padding: '120px 5% 80px', minHeight: '90vh', background: 'var(--color-claro)' }}>
      {/* Botón para regresar al inicio */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" className="btn btn--oscuro">
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Regresar al Inicio
        </Link>
      </div>

      <div className="seccion__encabezado">
        <h2>Panel de Administración</h2>
        <div className="separador"></div>
        <p>Administra los productos destacados de la tienda Cacao Ritual</p>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Formulario de Carga */}
        <div style={{ flex: '1', minWidth: '320px', background: 'var(--color-blanco)', padding: '30px', boxShadow: 'var(--sombra)', borderRadius: '4px', height: 'fit-content' }}>
          <h3>{modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}</h3>
          <div className="separador" style={{ margin: '10px 0 20px 0' }}></div>

          <form onSubmit={handleSubmit}>
            <div className="formulario__grupo">
              <label htmlFor="nombre-producto">Nombre</label>
              <input
                type="text"
                id="nombre-producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="formulario__grupo">
              <label htmlFor="desc-producto">Descripción Corta</label>
              <input
                type="text"
                id="desc-producto"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
            <div className="formulario__grupo">
              <label htmlFor="precio-producto">Precio ($)</label>
              <input
                type="number"
                id="precio-producto"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>
            <div className="formulario__grupo">
              <label htmlFor="imagen-producto">Imagen (JPG, PNG)</label>
              <input
                type="file"
                id="imagen-producto"
                onChange={handleFileChange}
                accept="image/*"
                required={!modoEdicion}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn btn--acento" style={{ flex: '1' }} disabled={enviando}>
                {enviando ? 'Guardando...' : 'Guardar'}
              </button>
              {modoEdicion && (
                <button type="button" className="btn btn--oscuro" onClick={resetFormulario}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabla de Productos */}
        <div style={{ flex: '2', minWidth: '500px', background: 'var(--color-blanco)', padding: '30px', boxShadow: 'var(--sombra)', borderRadius: '4px' }}>
          <h3>Listado de Productos</h3>
          <div className="separador" style={{ margin: '10px 0 20px 0' }}></div>

          {cargando ? (
            <p>Cargando productos...</p>
          ) : productos.length === 0 ? (
            <p>No hay productos registrados en la base de datos.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-crema)', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Imagen</th>
                    <th style={{ padding: '12px' }}>Nombre</th>
                    <th style={{ padding: '12px' }}>Precio</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id} style={{ borderBottom: '1px solid var(--color-claro)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ width: '50px', height: '50px', background: 'var(--color-claro)', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={prod.imagen} alt={prod.nombre} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                      </td>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{prod.nombre}</td>
                      <td style={{ padding: '12px', color: 'var(--color-secundario)', fontWeight: 'bold' }}>
                        ${prod.precio}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleEditClick(prod)}
                          style={{ marginRight: '8px', border: 'none', background: 'transparent', color: 'var(--color-acento)', cursor: 'pointer', fontSize: '1.1rem' }}
                          title="Editar"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(prod.id, prod.nombre)}
                          style={{ border: 'none', background: 'transparent', color: '#7b1d2e', cursor: 'pointer', fontSize: '1.1rem' }}
                          title="Eliminar"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginaAdmin;
