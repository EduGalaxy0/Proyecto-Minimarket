var idContador = 1; // Contador para el ID
var filaAEditar; // Variable para almacenar la fila que se está editando

// Función para mostrar el modal
function mostrarModal() {
    document.getElementById("modalAgregar").style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modalAgregar").style.display = "none";
    document.getElementById("modalEliminar").style.display = "none";
    document.getElementById("modalEditar").style.display = "none";
}

// Función para agregar un producto a la tabla
function agregarProducto() {
    // Obtener valores de los campos del modal
    var nombre = document.getElementById("nombreProducto").value;
    var precio = document.getElementById("precioProducto").value;
    var cantidad = document.getElementById("cantidadProducto").value;
    var categoria = document.getElementById("categoriaProducto").value;

    // Crear una nueva fila en la tabla con los datos del producto
    var tabla = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];
    var fila = tabla.insertRow();

    var celdaId = fila.insertCell(0);
    var celdaNombre = fila.insertCell(1);
    var celdaPrecio = fila.insertCell(2);
    var celdaCantidad = fila.insertCell(3);
    var celdaCategoria = fila.insertCell(4);
    var celdaAcciones = fila.insertCell(5);

    celdaId.innerHTML = idContador;
    celdaNombre.innerHTML = nombre;
    celdaPrecio.innerHTML = precio;
    celdaCantidad.innerHTML = cantidad;
    celdaCategoria.innerHTML = categoria;
    celdaAcciones.innerHTML = '<button class="btn-editar" onclick="mostrarModalEditar(this)">Editar</button>' +
                              '<button class="btn-eliminar" onclick="mostrarModalEliminar(this)">Eliminar</button>';

    // Incrementar el contador de ID para el próximo producto
    idContador++;

    // Cerrar el modal después de agregar el producto
    cerrarModal();
}

// Función para mostrar el modal de confirmación de eliminación
function mostrarModalEliminar(btnEliminar) {
    document.getElementById("modalEliminar").style.display = "block";
    // Guardar la fila a la que pertenece el botón de eliminar
    filaAEliminar = btnEliminar.parentNode.parentNode;
}

// Función para confirmar eliminación de un producto
function eliminarProductoConfirmado() {
    filaAEliminar.parentNode.removeChild(filaAEliminar);
    // Cerrar el modal después de eliminar el producto
    cerrarModal();
}

// Función para mostrar el modal de edición de producto
function mostrarModalEditar(btnEditar) {
    filaAEditar = btnEditar.parentNode.parentNode;
    var nombre = filaAEditar.cells[1].innerText;
    var precio = filaAEditar.cells[2].innerText;
    var cantidad = filaAEditar.cells[3].innerText;
    var categoria = filaAEditar.cells[4].innerText;

    // Poblar los campos del modal con la información del producto a editar
    document.getElementById("nombreProductoEdit").value = nombre;
    document.getElementById("precioProductoEdit").value = precio;
    document.getElementById("cantidadProductoEdit").value = cantidad;
    document.getElementById("categoriaProductoEdit").value = categoria;

    document.getElementById("modalEditar").style.display = "block";
}

// Función para guardar la edición del producto
function guardarEdicion() {
    var nombreEdit = document.getElementById("nombreProductoEdit").value;
    var precioEdit = document.getElementById("precioProductoEdit").value;
    var cantidadEdit = document.getElementById("cantidadProductoEdit").value;
    var categoriaEdit = document.getElementById("categoriaProductoEdit").value;

    // Actualizar los datos en la fila de la tabla
    filaAEditar.cells[1].innerText = nombreEdit;
    filaAEditar.cells[2].innerText = precioEdit;
    filaAEditar.cells[3].innerText = cantidadEdit;
    filaAEditar.cells[4].innerText = categoriaEdit;

    // Cerrar el modal después de guardar la edición
    cerrarModal();
}

// Función para buscar productos
function buscar() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablaProductos");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // La columna de nombre
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}