function tokenDatos(){
	if (token) {
    const tokenParts = token.split('.');
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const parsedPayload = JSON.parse(decodedPayload);
    
     sub = parsedPayload.sub;
     rol = parsedPayload.rol;
    
} else {
    console.log('No se encontró ningún token en el almacenamiento local.');
}
	fetch('http://localhost:8080/auth/usuario/'+ sub)
   
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo obtener el empleado');
    }
    return response.json();
  })
  .then(data => {
    document.getElementById('empleadoCaja').value = data[0].username;
    document.getElementById('username').value = data[0].firstname + " " + data[0].lastname;
  })
  .catch(error => {
    console.error('Error al obtener el empleado:', error);
  });
}
function estadoInicial(){
	$("#caja-abierta").hide();
    $("#caja-cerrada").show();
    $("#montoInicial").val("");
    $("#montoFinal").val("");
    const cajaCerradaElement = document.getElementById("caja-abierta");
  	cajaCerradaElement.classList.remove("d-none");
	}
$(document).ready(function() {
	validarCajaAbierta();
	estadoInicial();
	tokenDatos();
    // Inicializar estado de la caja
    // URL para abrir caja
    const urlAbrirCaja = "/cajas/abrir";

    // Manejar apertura de caja
    $("#abrirCaja").click(function() {
		
        var username = $("#empleadoCaja").val();
        var montoInicial = parseFloat($("#montoInicial").val());

        if (isNaN(montoInicial) || montoInicial <= 0) {
            alert("Datos inválidos. Ingrese valores numéricos válidos para el ID de empleado y el monto inicial.");
            return;
        }

        $.ajax({
            url: urlAbrirCaja,
            method: "POST",
            data: JSON.stringify({
                username: username,
                montoInicial: montoInicial
            }),
            contentType: "application/json",
            success: function(data) {
                if (data) {
                    // Actualizar interfaz con información de la caja abierta
                    const dateString = data.fechaApertura.substring(0, 10);
                    $("#fechaApertura").val(dateString);
                    const dateTime = new Date(data.fechaApertura);
                    console.log(dateTime);
                    const hours = dateTime.getHours().toString().padStart(2, '0');
					const minutes = dateTime.getMinutes().toString().padStart(2, '0');
					const seconds = dateTime.getSeconds().toString().padStart(2, '0');
					const timeString = `${hours}:${minutes}:${seconds}`;
					console.log(timeString);
                    $("#hora").val(timeString);
                    $("#empleadoCaja2").val(data.empleado.username);
                    $("#username2").val(data.empleado.firstname + " "+ data.empleado.lastname);
                    $("#montoInicial2").val(data.montoInicial);
                    $("#caja-abierta").show();
                    $("#caja-cerrada").hide();
		            
		            localStorage.setItem("cajaId", data.id);        
		            
                } else {
                    alert("Error al abrir la caja.");
                }
            },
            error: function(error) {
                console.error("Error:", error);
                alert("Error al abrir la caja. Revise la consola para más detalles.");
            }
        });
    });

    // Manejar cierre de caja (código pendiente de implementación)
    $("#cerrarCaja").click(function() {
        // Implementar la lógica para cerrar la caja
         cerrarCaja();
    });
});

function cerrarCaja() {
  const idCaja = localStorage.getItem('cajaId');
  const montoFinal = parseFloat($("#montoFinal").val());
  const bodyData = {
	  idCaja: idCaja,
    montoFinal: montoFinal
  }
  fetch(`/cajas/cerrar`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json' // Especifica que el contenido es JSON
    },
    body: JSON.stringify(bodyData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cerrar la caja');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    if(data.estado == "PROCESO"){
		alert("Error al cerrar la caja. El monto final no coincide con el total de ventas.");
		
	}
	else{
		
		// Caja cerrada exitosamente
		console.log("Caja cerrada:", data);
    $("#montoInicial").val("");
    $("#montoFinal").val("");
	
    // Actualizar interfaz para mostrar caja cerrada
    $("#caja-abierta").hide();
    $("#caja-cerrada").show();
    alert("Caja cerrada exitosamente");
    

    // Eliminar información de la caja del LocalStorage
    localStorage.removeItem('cajaId');
	}
    

  })
  .catch(error => {
    console.error("Error al cerrar la caja:", error);
    // Mostrar mensaje de error al usuario (opcional)
    alert("Error al cerrar la caja. Revise la consola para más detalles.");
  });
}

function validarCajaAbierta() {
  const idCaja = localStorage.getItem('cajaId');
  console.log(idCaja);

  if (idCaja) {
	  
    fetch(`/cajas/caja/${idCaja}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener información de la caja');
        }
        return response.json();
      })
      .then(data => {
        // Caja abierta encontrada
        console.log(data);
        llave = false;
        mostrarCajaAbierta(data);
      })
      .catch(error => {
        console.error("Error al obtener información de la caja:", error);
        estadoInicial();
      });
  } else {
    estadoInicial();
  }
}


function mostrarCajaAbierta(data) {
	$("#caja-cerrada").hide();
	$("#caja-abierta").show();
  // Actualizar interfaz con información de la caja abierta
const dateTime = new Date(data.fechaApertura);
                    console.log(dateTime);
                    const hours = dateTime.getHours().toString().padStart(2, '0');
					const minutes = dateTime.getMinutes().toString().padStart(2, '0');
					const seconds = dateTime.getSeconds().toString().padStart(2, '0');
					const timeString = `${hours}:${minutes}:${seconds}`;
					console.log(timeString);
                    $("#hora").val(timeString);
                    const dateString = data.fechaApertura.substring(0, 10);
                    $("#fechaApertura").val(dateString);  
  $("#empleadoCaja2").val(data.empleado.username);
  $("#username2").val(data.empleado.firstname + " " + data.empleado.lastname);
  $("#montoInicial2").val(data.montoInicial);

  // Cargar datos adicionales de la caja abierta (si es necesario)

  // Habilitar botones o funcionalidades relacionadas con la caja abierta
}

