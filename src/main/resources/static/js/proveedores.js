function agregarProducto() {
    // Obtener la tabla de productos
    var table = document.getElementById("productos");
    // Insertar una nueva fila en la tabla
    var newRow = table.insertRow();
    // Insertar celdas en la nueva fila
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    // Agregar campos de entrada a las celdas
    cell1.innerHTML = '<input type="text" name="producto[]" placeholder="Nombre del producto" required>';
    cell2.innerHTML = '<input type="text" name="unidad_medida[]" placeholder="Unidad de medida" required>';
    cell3.innerHTML = '<input type="number" name="precio[]" placeholder="Precio del producto" required>';
}