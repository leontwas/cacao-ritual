import React, { useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { Toast, alertaExito } from '../utils/sweetalert';

const Carrito = ({ isOpen, onClose }) => {
  const { items, total, eliminarItem, actualizarCantidad, vaciarCarrito } = useCarrito();

  // Cerrar al pulsar Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFinalizarCompra = () => {
    alertaExito(
      '¡Compra Finalizada!',
      'Tu pedido de Cacao Ritual ha sido procesado. Nos pondremos en contacto a la brevedad para coordinar la entrega.'
    );
    vaciarCarrito(false);
    onClose();
  };

  return (
    <div className="carrito-overlay" onClick={onClose}>
      <div className="carrito-container" onClick={(e) => e.stopPropagation()}>
        <div className="carrito-header">
          <h2>Tu Carrito</h2>
          <button className="carrito-cerrar" onClick={onClose} aria-label="Cerrar carrito">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="carrito-cuerpo">
          {items.length === 0 ? (
            <div className="carrito-vacio">
              <i className="fa-solid fa-bag-shopping"></i>
              <p>Tu carrito está vacío.</p>
              <button className="btn btn--oscuro" onClick={onClose} style={{ marginTop: '15px' }}>
                Explorar productos
              </button>
            </div>
          ) : (
            <div className="carrito-lista">
              {items.map((item) => (
                <div key={item.productoId} className="carrito-item">
                  <div className="carrito-item__imagen">
                    <img src={item.imagen} alt={item.nombre} />
                  </div>
                  <div className="carrito-item__info">
                    <h4>{item.nombre}</h4>
                    <p className="carrito-item__precio">{item.precio}</p>
                    <div className="carrito-item__controles">
                      <button 
                        onClick={() => actualizarCantidad(item.productoId, item.cantidad - 1)}
                        className="carrito-btn-cant"
                      >
                        -
                      </button>
                      <span className="carrito-cantidad">{item.cantidad}</span>
                      <button 
                        onClick={() => actualizarCantidad(item.productoId, item.cantidad + 1)}
                        className="carrito-btn-cant"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => eliminarItem(item.productoId)}
                    className="carrito-btn-eliminar"
                    title="Eliminar producto"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="carrito-footer">
            <div className="carrito-total">
              <span>Total:</span>
              <span className="carrito-total-valor">${total.toLocaleString('es-AR')}</span>
            </div>
            <div className="carrito-acciones">
              <button 
                className="btn btn--acento" 
                onClick={handleFinalizarCompra}
                style={{ flex: 1 }}
              >
                Finalizar Compra
              </button>
              <button 
                className="btn btn--oscuro" 
                onClick={() => vaciarCarrito(true)}
                style={{ padding: '13px 20px' }}
                title="Vaciar carrito"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
