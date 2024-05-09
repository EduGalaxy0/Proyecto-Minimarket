//EDITAR USUARIO DE LA TABLA USUARIOS
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el formulario y el botón
    const submitButton = document.getElementById("btnCrearUsuario-edit");
    const selectElement1 = document.getElementById('perfil-edit');
    
    let perfilSelecValue1;

    
    // Agregar un evento de cambio al select
    selectElement1.addEventListener('change', () => {
        // Obtener el valor seleccionado cada vez que cambia el select
         perfilSelecValue1 = selectElement1.value;

        // Mostrar el valor seleccionado en la consola
        console.log('Perfil Value:', perfilSelecValue1);
    });

    // Agregar un evento de clic al botón de enviar
    submitButton.addEventListener("click", () => {
        const firstname = document.getElementById("firstname-edit").value;
        const lastname = document.getElementById("lastname-edit").value;
        const username = document.getElementById("username-edit").value;
        const email = document.getElementById("email-edit").value;
        //const password = document.getElementById("password-edit").value;
        const address = document.getElementById("address-edit").value;
        const numberphone = document.getElementById("numberphone-edit").value;
		
		
        let shouldSubmit = true;

    // Verificar que se hayan completado todos los campos
    if (!firstname || !lastname || !username || !email || !password || !address || !numberphone || !perfil) {
        alert("Por favor complete todos los campos.");
        shouldSubmit = false; // Establecer la bandera en falso
        return;
    }

    // Realizar validaciones adicionales solo si todos los campos están completos
    if (shouldSubmit) {
        
        if (numberphone.length !== 9) {
            alert("El número de celular debe tener 9 dígitos");
            shouldSubmit = false; // Establecer la bandera en falso
            return;
        }
        
    }
		alert(perfilSelecValue1);
		if (shouldSubmit) {
		
			// Crear el objeto de usuario en formato JSON
        const userData = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            //password: password,
            address: address,
            numberphone: numberphone,
            perfil: perfilSelecValue1
        };
        
            // Enviar los datos al servidor
           fetch("http://localhost:8080/v1/editarUsuario", {
			    method: "POST",
			    headers: {
			        "Content-Type": "application/json"
			    },
			    body: JSON.stringify(userData)
			})			
			
			alert("Grandioso, se editó el usuario");
			location.reload();	
			
		   
        }
    });
});

