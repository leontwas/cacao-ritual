const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const fetchConToken = async (endpoint, options = {}) => {
  const token = localStorage.getItem('cacao_token');
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // FormData se auto-gestiona (el navegador define Content-Type y boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  // Intentar parsear JSON
  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = { error: 'Error al procesar la respuesta del servidor.' };
  }

  if (!response.ok) {
    throw new Error(data.error || 'Ocurrió un error inesperado');
  }

  return data;
};

export const apiAuth = {
  registro: (nombre, email, password) => 
    fetchConToken('/auth/registro', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password })
    }),
  login: (email, password) =>
    fetchConToken('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  perfil: () =>
    fetchConToken('/auth/perfil', {
      method: 'GET'
    })
};

export const apiProductos = {
  obtenerTodos: () =>
    fetchConToken('/productos', {
      method: 'GET'
    }),
  crear: (formData) =>
    fetchConToken('/productos', {
      method: 'POST',
      body: formData
    }),
  actualizar: (id, formData) =>
    fetchConToken(`/productos/${id}`, {
      method: 'PUT',
      body: formData
    }),
  eliminar: (id) =>
    fetchConToken(`/productos/${id}`, {
      method: 'DELETE'
    })
};

export const apiCarrito = {
  obtener: () =>
    fetchConToken('/carrito', {
      method: 'GET'
    }),
  agregar: (productoId, cantidad, nombre, precio, imagen) =>
    fetchConToken('/carrito', {
      method: 'POST',
      body: JSON.stringify({ productoId, cantidad, nombre, precio, imagen })
    }),
  eliminar: (productoId) =>
    fetchConToken(`/carrito/${productoId}`, {
      method: 'DELETE'
    }),
  vaciar: () =>
    fetchConToken('/carrito', {
      method: 'DELETE'
    })
};
