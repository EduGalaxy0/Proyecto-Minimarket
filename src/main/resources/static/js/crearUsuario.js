//CREACIÓN DE USUARIOS
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el formulario y el botón
    const selectElement = document.getElementById('perfil');
    const form = document.getElementById("userForm");
    const submitButton = document.getElementById("btnCrearUsuario");
    let perfilSelecValue;
    let perfilValue;
    
    // Agregar un evento de cambio al select
    selectElement.addEventListener('change', () => {
        // Obtener el valor seleccionado cada vez que cambia el select
         perfilSelecValue = selectElement.value;

        // Utilizar un operador ternario para asignar un valor a la variable según el valor seleccionado
         perfilValue = (perfilSelecValue === "administrador") ? "1" :
                              (perfilSelecValue === "cajero") ? "2" :
                              (perfilSelecValue === "almacenero") ? "3" :
                              "";

        // Mostrar el valor seleccionado en la consola
        console.log('Perfil Value:', perfilValue);
    });

    // Agregar un evento de clic al botón de enviar
    submitButton.addEventListener("click", () => {
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const address = document.getElementById("address").value;
        const numberphone = document.getElementById("numberphone").value;
		
		
        let shouldSubmit = true;

    // Verificar que se hayan completado todos los campos
    if (!firstname || !lastname || !username || !email || !password || !address || !numberphone || !perfil) {
        alert("Por favor complete todos los campos.");
        shouldSubmit = false; // Establecer la bandera en falso
        return;
    }

    // Realizar validaciones adicionales solo si todos los campos están completos
    if (shouldSubmit) {
        if (username.length !== 8) {
            alert("El DNI debe tener 8 dígitos");
            shouldSubmit = false; // Establecer la bandera en falso
        	return;
        }
        if (numberphone.length !== 9) {
            alert("El número de celular debe tener 9 dígitos");
            shouldSubmit = false; // Establecer la bandera en falso
            return;
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            alert("La contraseña debe tener al menos 8 caracteres e incluir al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial");
            shouldSubmit = false; // Establecer la bandera en falso
            return;
        }
    }
		
		if (shouldSubmit) {
		
			// Crear el objeto de usuario en formato JSON
        const userData = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            address: address,
            numberphone: numberphone,
            perfil: parseInt(perfilValue)
        };
        
            // Enviar los datos al servidor
           fetch("http://localhost:8080/v1/registerPost", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
})	
        }
    });
});

//OBTENCION DEL SELECT PERFILES
// Seleccionar el elemento select
const selectElement = document.getElementById('perfil');

// Hacer una solicitud para obtener los roles de la base de datos
fetch('http://localhost:8080/v1/perfiles')
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de roles');
    }
    return response.json();
  })
  .then(data => {
    // Limpiar las opciones actuales del select
    selectElement.innerHTML = '';
	const defaultOption = document.createElement('option');
defaultOption.value = "";
defaultOption.textContent = "Seleccione un perfil";
selectElement.appendChild(defaultOption);
    // Agregar una opción por cada rol obtenido de la base de datos
    data.forEach(rol => {
      const option = document.createElement('option');
      option.value = rol.nombre.toLowerCase(); // Suponiendo que el nombre del rol se almacena en la propiedad "nombre"
      option.textContent = rol.nombre;
      selectElement.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error al obtener los roles:', error);
  });