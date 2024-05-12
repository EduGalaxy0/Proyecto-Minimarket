// Funciones para abrir y cerrar el modal
function openModal() {
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Función para agregar productos desde el modal a la tabla de la boleta
function agregarProductoModal(nombreProducto, precioProducto) {
    var table = document.getElementById("productos-table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var productNameCell = newRow.insertCell(0);
    var quantityCell = newRow.insertCell(1);
    var priceCell = newRow.insertCell(2);
    var totalCell = newRow.insertCell(3);
    var actionCell = newRow.insertCell(4);

    productNameCell.innerHTML = nombreProducto;
    quantityCell.innerHTML = '<input type="number" value="1" min="1" onchange="actualizarTotalCantidad(this, ' + precioProducto + ')">';
    priceCell.innerHTML = "$" + precioProducto.toFixed(2);
    totalCell.innerHTML = "$" + precioProducto.toFixed(2);
    actionCell.innerHTML = '<button onclick="borrarFila(this)">Eliminar</button>';

    actualizarTotal(precioProducto);
    closeModal();
}

// Función para actualizar el total en la tabla de la boleta cuando se cambia la cantidad
function actualizarTotalCantidad(input, precio) {
    var cantidad = parseInt(input.value);
    var totalElement = document.getElementById("total");
    var currentTotal = parseFloat(totalElement.innerHTML.replace("$", ""));
    var subtotal = cantidad * precio;
    input.parentNode.nextElementSibling.innerHTML = "$" + subtotal.toFixed(2);

    var newTotal = currentTotal + subtotal;
    totalElement.innerHTML = "$" + newTotal.toFixed(2);
}

// Función para eliminar una fila de la tabla de la boleta
function borrarFila(button) {
    var row = button.parentNode.parentNode;
    var price = parseFloat(row.cells[2].innerHTML.replace("$", ""));
    var totalElement = document.getElementById("total");
    var currentTotal = parseFloat(totalElement.innerHTML.replace("$", ""));
    var newTotal = currentTotal - price;
    totalElement.innerHTML = "$" + newTotal.toFixed(2);
    row.parentNode.removeChild(row);
}

// Función para realizar la venta
function hacerVenta() {
    // Aquí puedes agregar la lógica para enviar los datos de la venta al servidor o realizar cualquier acción necesaria
    alert("Venta realizada exitosamente. ¡Gracias por su compra!");
}