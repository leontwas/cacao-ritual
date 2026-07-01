import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#f7f0e8',
  color: '#1a0800',
  iconColor: '#c9962a',
  customClass: {
    popup: 'cacao-toast-popup'
  }
});

export const alertaExito = (titulo, texto) => {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: 'success',
    confirmButtonColor: '#c9962a',
    background: '#f7f0e8',
    color: '#1a0800',
    iconColor: '#c9962a'
  });
};

export const alertaError = (titulo, texto) => {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: 'error',
    confirmButtonColor: '#7b1d2e',
    background: '#f7f0e8',
    color: '#1a0800',
    iconColor: '#7b1d2e'
  });
};

export const alertaConfirmacion = (titulo, texto, confirmText = 'Sí, continuar') => {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#c9962a',
    cancelButtonColor: '#7b1d2e',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar',
    background: '#f7f0e8',
    color: '#1a0800',
    iconColor: '#c9962a'
  });
};
