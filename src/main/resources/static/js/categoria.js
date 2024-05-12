// Función para mostrar el modal
function mostrarModal() {
    const modal = document.getElementById('modalCrearCategoria');
    modal.style.display = 'block';
}

// Función para ocultar el modal
function ocultarModal() {
    const modal = document.getElementById('modalCrearCategoria');
    modal.style.display = 'none';
}

// Función para crear una nueva categoría
function crearCategoria() {
    const nombre = document.getElementById('nombreCategoria').value;
    const medida = document.getElementById('medidaCategoria').value;

    // Validar que se ingresen los datos
    if (nombre.trim() === '' || descripcion.trim() === '') {
        alert('Por favor ingrese el nombre y la medida de la categoría.');
        return;
    }

    // Agregar la nueva categoría a la tabla
    const categoriasContainer = document.getElementById('categorias');
    const id = categoriasContainer.getElementsByTagName('tr').length + 1;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${id}</td>
        <td>${nombre}</td>
        <td>${medida}</td>
    `;
    categoriasContainer.appendChild(row);

    // Ocultar el modal después de crear la categoría
    ocultarModal();
}
