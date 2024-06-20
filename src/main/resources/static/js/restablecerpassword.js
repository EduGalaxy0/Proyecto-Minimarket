document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var newPassword = document.getElementById('newPassword').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  // Validaciones
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(newPassword)) {
    alert('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Aquí puedes agregar la lógica para enviar la nueva contraseña al servidor

  // Muestra el mensaje de cambio exitoso
  document.getElementById('changePasswordMessage').classList.remove('d-none');
  });