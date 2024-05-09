const token = localStorage.getItem('token');
	let usuarioActivo;
	let sub;
	let rol;
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

    document.getElementById('usuarioActivo').textContent = data[0].firstname;
    document.getElementById('rolUsuario').textContent = 'Perfil: ' + rol;
    //console.log('Respuesta del servidor:', data);
    // Aquí puedes hacer lo que necesites con la respuesta, como mostrarla en la interfaz de usuario
  })
  .catch(error => {
    console.error('Error al obtener el empleado:', error);
  });
  
//Deslizar los modulos

// Obtenemos todos los encabezados de sección
	    const toggleSections = document.querySelectorAll('.toggle-section');
	
	    // Iteramos sobre cada encabezado para agregar un event listener al clic
	    toggleSections.forEach(section => {
	        section.addEventListener('click', function() {
	            // Obtenemos los enlaces dentro de la sección
	            const links = this.nextElementSibling;
	
	            // Toggle la visibilidad de los enlaces
	            links.style.display = links.style.display === 'none' ? 'block' : 'none';
	        });
	    });
	

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});	
