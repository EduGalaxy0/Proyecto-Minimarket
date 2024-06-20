document.getElementById('resetForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Aquí puedes agregar la lógica para enviar el formulario al servidor

  // Muestra el mensaje de confirmación
  document.getElementById('confirmationMessage').classList.remove('d-none');
});

document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('loginForm').parentElement.classList.add('d-none');
  document.getElementById('resetPasswordCard').classList.remove('d-none');
});

document.getElementById('backToLoginLink').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('resetPasswordCard').classList.add('d-none');
  document.getElementById('loginForm').parentElement.classList.remove('d-none');
});
