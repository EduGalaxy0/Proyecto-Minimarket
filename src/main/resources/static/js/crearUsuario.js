//LÓGICA PARA MOSTRAR LA TABLA DE USUARIOS EN LISTUSUARIOS

document.addEventListener("DOMContentLoaded", function () {
            fetch('http://localhost:8080/v1/usuarios')
                .then(response => response.json())
                .then(data => {
                    const usersTable = document.getElementById('datatable_empleado');
                    const tbody = usersTable.getElementsByTagName('tbody')[0];

                    data.forEach(user => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        	<td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.firstname}</td>
                            <td>${user.lastname}</td>
                            <td>${user.email}</td>
                            <td>${user.address}</td>
                            <td>${user.numberphone}</td>
                            <td>${user.perfiles[0].nombre}</td>
                            <td>
								<div class="action-buttons">
	                                <button class="edit-btn">Editar</button>
	                                <button class="delete-btn">Eliminar</button>
	                            </div>
							</td>
                        `;
                        tbody.appendChild(row);
                    
            });
        })
                .catch(error => console.error('Error al obtener usuarios:', error));
        });
        
     // Evento de clic en los botones de eliminar usuario y editar usuario
		document.addEventListener('click', function(event) {
		    if (event.target.classList.contains('delete-btn')) {
		        // Mostrar un mensaje de confirmación antes de eliminar el usuario
		        var confirmation = confirm('¿Desea Eliminar el Usuario?');
		        if (confirmation) {
					var row = event.target.closest('tr');
					var cells = row.querySelectorAll('td:nth-child(1)');
					const id = cells[0].textContent;
					const requestOptions = {
					  method: "DELETE"	  
					};
					fetch("http://localhost:8080/v1/eliminarEmpleado/" + id , requestOptions)
					  .then((response) => response.text())
					  .then((result) => console.log(result))
					  .catch((error) => console.error(error));
		            row.remove();
		            
		        }
		        
		    } else if (event.target.classList.contains('edit-btn')) {
		        // Abrir el modal de edición del usuario
		        var row = event.target.closest('tr');
		        var cells = row.querySelectorAll('td:nth-child(2), td:nth-child(3), td:nth-child(4), td:nth-child(5), td:nth-child(6), td:nth-child(7)');
				
		
		        // Establecer la clase "editing" en la fila actual para identificarla durante la edición
		        //row.classList.add('editing'); 
				// Assuming the order of cells matches the form input IDs:
				const firstnameEdit = document.getElementById('firstname-edit');
				const lastnameEdit = document.getElementById('lastname-edit');
				const usernameEdit = document.getElementById('username-edit');
				const emailEdit = document.getElementById('email-edit');
				const addressEdit = document.getElementById('address-edit');
				const numberphoneEdit = document.getElementById('numberphone-edit');
				
				// Assign values to inputs based on cell index (assuming correct mapping):
				firstnameEdit.value = cells[1].textContent; // First cell for "Nombre"
				lastnameEdit.value = cells[2].textContent;  // Second cell for "Apellido"
				usernameEdit.value = cells[0].textContent;   // Third cell for "DNI"
				emailEdit.value = cells[3].textContent;      // Fourth cell for "Correo"
				addressEdit.value = cells[4].textContent;    // Fifth cell for "Dirección"
				numberphoneEdit.value = cells[5].textContent; // Sixth cell for "Número Telefonico"
		        // Mostrar el modal de edición del usuario
		        var modal = new bootstrap.Modal(document.getElementById('editarUsuarioModal'));
		        modal.show();
		        
		        document.getElementById('editUserForm').addEventListener('submit', function(event) {
		    event.preventDefault(); // Evitar que se recargue la página

		    // Cerrar el modal
		    var modal = new bootstrap.Modal(document.getElementById('editarUsuarioModal'));
		    modal.hide();
		    
		});
		    }
		});
		
		
		
          

//CREACIÓN DE USUARIOS
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el formulario y el botón
    const selectElement = document.getElementById('perfil');
    //const form = document.getElementById("userForm");
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
			
			location.reload();
		    
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
  
	const selectElement1 = document.getElementById('perfil-edit');

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
    selectElement1.innerHTML = '';
	const defaultOption = document.createElement('option');
defaultOption.value = "";
defaultOption.textContent = "Seleccione un perfil";
selectElement1.appendChild(defaultOption);
    // Agregar una opción por cada rol obtenido de la base de datos
    data.forEach(rol => {
      const option = document.createElement('option');
      option.value = rol.nombre.toLowerCase(); // Suponiendo que el nombre del rol se almacena en la propiedad "nombre"
      option.textContent = rol.nombre;
      selectElement1.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error al obtener los roles:', error);
  });
        
//