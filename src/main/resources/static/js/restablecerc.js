document.getElementById('resetForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
	console.log(email);
    const requestBody = {
        emailTo: email,
        username: "Eduardo Abel"
    };

    fetch('http://localhost:8080/enviarcorreo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Correo enviado exitosamente.');
    })
    .catch((error) => {
        console.error('Error:', error);
        //alert('Error al enviar el correo.');
    });
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
