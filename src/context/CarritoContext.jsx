import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { apiCarrito } from '../services/api';
import { Toast, alertaConfirmacion } from '../utils/sweetalert';

const CarritoContext = createContext(null);

const parsePrecio = (precioStr) => {
  if (typeof precioStr === 'number') return precioStr;
  return Number(String(precioStr).replace(/[^0-9]/g, ''));
};

export const CarritoProvider = ({ children }) => {
  const { usuario } = useAuth();
  const [items, setItems] = useState([]);

  // Cargar carrito inicial
  useEffect(() => {
    const cargarCarrito = async () => {
      if (usuario) {
        try {
          // Fusionar carrito local si existe
          const localCart = JSON.parse(localStorage.getItem('cacao_local_cart') || '[]');
          if (localCart.length > 0) {
            for (const item of localCart) {
              await apiCarrito.agregar(
                item.productoId,
                item.cantidad,
                item.nombre,
                item.precio,
                item.imagen
              );
            }
            localStorage.removeItem('cacao_local_cart');
          }
          
          // Obtener carrito de Firestore
          const dbItems = await apiCarrito.obtener();
          setItems(dbItems);
        } catch (error) {
          console.error('Error al cargar carrito de la base de datos:', error);
        }
      } else {
        // Cargar desde localStorage para invitados
        const localCart = JSON.parse(localStorage.getItem('cacao_local_cart') || '[]');
        setItems(localCart);
      }
    };

    cargarCarrito();
  }, [usuario]);

  const agregarItem = async (producto, cantidad = 1) => {
    const productoId = String(producto.id || producto.productoId);
    const nombre = producto.nombre;
    const precio = producto.precio;
    const imagen = producto.imagen;

    // Buscar si el producto ya existe en el carrito
    const itemExistente = items.find(item => String(item.productoId) === productoId);
    const nuevaCantidad = itemExistente ? itemExistente.cantidad + cantidad : cantidad;

    if (usuario) {
      try {
        await apiCarrito.agregar(productoId, nuevaCantidad, nombre, precio, imagen);
        const dbItems = await apiCarrito.obtener();
        setItems(dbItems);
      } catch (error) {
        console.error('Error al agregar item en DB:', error);
        Toast.fire({ icon: 'error', title: 'Error al agregar al carrito en la nube' });
        return;
      }
    } else {
      let nuevosItems;
      if (itemExistente) {
        nuevosItems = items.map(item => 
          String(item.productoId) === productoId 
            ? { ...item, cantidad: nuevaCantidad } 
            : item
        );
      } else {
        nuevosItems = [...items, { productoId, cantidad, nombre, precio, imagen }];
      }
      setItems(nuevosItems);
      localStorage.setItem('cacao_local_cart', JSON.stringify(nuevosItems));
    }

    Toast.fire({
      icon: 'success',
      title: `"${nombre}" agregado al carrito`
    });
  };

  const actualizarCantidad = async (productoId, cantidad) => {
    if (cantidad <= 0) {
      eliminarItem(productoId);
      return;
    }

    const item = items.find(item => String(item.productoId) === String(productoId));
    if (!item) return;

    if (usuario) {
      try {
        await apiCarrito.agregar(
          String(productoId),
          cantidad,
          item.nombre,
          item.precio,
          item.imagen
        );
        const dbItems = await apiCarrito.obtener();
        setItems(dbItems);
      } catch (error) {
        console.error('Error al actualizar cantidad en DB:', error);
      }
    } else {
      const nuevosItems = items.map(item => 
        String(item.productoId) === String(productoId) 
          ? { ...item, cantidad } 
          : item
      );
      setItems(nuevosItems);
      localStorage.setItem('cacao_local_cart', JSON.stringify(nuevosItems));
    }
  };

  const eliminarItem = async (productoId) => {
    const item = items.find(item => String(item.productoId) === String(productoId));
    if (!item) return;

    if (usuario) {
      try {
        await apiCarrito.eliminar(String(productoId));
        const dbItems = await apiCarrito.obtener();
        setItems(dbItems);
      } catch (error) {
        console.error('Error al eliminar item de DB:', error);
        Toast.fire({ icon: 'error', title: 'No se pudo eliminar de la nube' });
        return;
      }
    } else {
      const nuevosItems = items.filter(item => String(item.productoId) !== String(productoId));
      setItems(nuevosItems);
      localStorage.setItem('cacao_local_cart', JSON.stringify(nuevosItems));
    }

    Toast.fire({
      icon: 'success',
      title: `"${item.nombre}" eliminado del carrito`
    });
  };

  const vaciarCarrito = async (mostrarAlerta = false) => {
    const vaciar = async () => {
      if (usuario) {
        try {
          await apiCarrito.vaciar();
          setItems([]);
        } catch (error) {
          console.error('Error al vaciar carrito en DB:', error);
        }
      } else {
        setItems([]);
        localStorage.removeItem('cacao_local_cart');
      }
      Toast.fire({ icon: 'success', title: 'Carrito vaciado' });
    };

    if (mostrarAlerta) {
      const confirmacion = await alertaConfirmacion(
        '¿Vaciar carrito?',
        'Se quitarán todos los productos seleccionados.',
        'Sí, vaciar'
      );
      if (confirmacion.isConfirmed) {
        await vaciar();
      }
    } else {
      await vaciar();
    }
  };

  const total = items.reduce((acc, item) => acc + (parsePrecio(item.precio) * item.cantidad), 0);
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CarritoContext.Provider value={{
      items,
      total,
      cantidadTotal,
      agregarItem,
      eliminarItem,
      actualizarCantidad,
      vaciarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};
