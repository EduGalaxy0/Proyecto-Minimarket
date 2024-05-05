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
                            <td>${user.username}</td>
                            <td>${user.firstname}</td>
                            <td>${user.lastname}</td>
                            <td>${user.email}</td>
                            <td>${user.address}</td>
                            <td>${user.numberphone}</td>
                            <td>${user.perfiles[0].nombre}</td>
                            <td>
								<div class="action-buttons">
	                                <button class="edit-button">Editar</button>
	                                <button class="delete-button">Eliminar</button>
	                            </div>
							</td>
                        `;
                        tbody.appendChild(row);
                    // Agregar evento click al botón de editar
                const editButton = row.querySelector('.edit-button');
                editButton.addEventListener('click', function () {
                    const username = user.username;
                    window.location.href = 'http://localhost:8080/v1/editarUsuario';
                    localStorage.setItem('usuarioEdit', username);
                    
                });
				
                // Agregar evento click al botón de eliminar
                const deleteButton = row.querySelector('.delete-button');
                deleteButton.addEventListener('click', function () {
                    const username = user.username;
                    // Aquí puedes ejecutar la lógica para eliminar el usuario con el username especificado
                    
                });
            });
        })
                .catch(error => console.error('Error al obtener usuarios:', error));
        });
        
