// Funciones para abrir y cerrar el modal
function openModal() {
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Función para agregar productos desde el modal a la tabla de la boleta
document.addEventListener('DOMContentLoaded', function() {
    const agregarProductoBtn = document.getElementById('agregar-producto');
    const productosLista = document.getElementById('productos-lista');
    const totalAPagar = document.querySelector('.total strong');

    let numeroProducto = 4; // El siguiente número de producto a agregar

    agregarProductoBtn.addEventListener('click', function() {
        const codigo = document.getElementById('producto-codigo').value;
        const nombre = document.getElementById('producto-nombre').value;
        const precio = parseFloat(document.getElementById('producto-precio').value);
        const cantidad = parseInt(document.getElementById('producto-cantidad').value);

        if (!codigo || !nombre || isNaN(precio) || isNaN(cantidad)) {
            alert('Por favor, complete todos los campos del producto.');
            return;
        }

        const total = precio * cantidad;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${numeroProducto++}</td>
            <td>${nombre}</td>
            <td>${codigo}</td>
            <td>${precio.toFixed(2)}</td>
            <td>${cantidad}</td>
            <td>${total.toFixed(2)}</td>
            <td>
                <button class="btn btn-outline-dark btn-sm editar-producto"><i class="fas fa-edit"></i></button>
                <button class="btn btn-outline-danger btn-sm eliminar-producto"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;

        productosLista.appendChild(newRow);
        actualizarTotal();
        agregarEventosEliminar();
    });

    function actualizarTotal() {
        let total = 0;
        const rows = productosLista.querySelectorAll('tr');
        rows.forEach(row => {
            const totalCell = row.querySelector('td:nth-child(6)');
            total += parseFloat(totalCell.textContent);
        });
        totalAPagar.textContent = `Total a Pagar: S/. ${total.toFixed(2)}`;
    }

    function agregarEventosEliminar() {
        document.querySelectorAll('.eliminar-producto').forEach(button => {
            button.addEventListener('click', function() {
                const row = this.parentNode.parentNode;
                const totalCell = row.querySelector('td:nth-child(6)');
                const total = parseFloat(totalCell.textContent);

                productosLista.removeChild(row);
                actualizarTotal();
            });
        });
    }

    // Inicializar eventos de eliminación para productos preexistentes
    agregarEventosEliminar();
});

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

// Función para realizar la venta
function hacerVenta() {
    // Aquí puedes agregar la lógica para enviar los datos de la venta al servidor o realizar cualquier acción necesaria
    alert("Venta realizada exitosamente. ¡Gracias por su compra!");
}

document.addEventListener('DOMContentLoaded', () => {
    const clienteDniInput = document.getElementById('cliente-dni');
    const clienteNombreInput = document.getElementById('cliente-nombre');
    const clienteDireccionInput = document.getElementById('cliente-direccion');
    const clienteTelefonoInput = document.getElementById('cliente-telefono');
    const clienteEmailInput = document.getElementById('cliente-email');

    document.querySelectorAll('.seleccionar-cliente').forEach(button => {
        button.addEventListener('click', function() {
            const dni = this.getAttribute('data-dni');
            const nombre = this.getAttribute('data-nombre');
            const direccion = this.getAttribute('data-direccion');
            const telefono = this.getAttribute('data-telefono');
            const email = this.getAttribute('data-email');

            clienteDniInput.value = dni;
            clienteNombreInput.value = nombre;
            clienteDireccionInput.value = direccion;
            clienteTelefonoInput.value = telefono;
            clienteEmailInput.value = email;

            const modal = bootstrap.Modal.getInstance(document.getElementById('modalBuscarCliente'));
            modal.hide();
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Example product data
    const productos = [
        {codigo: "P01", nombre: "Teclado Mecánico", precio: 150.0},
        {codigo: "P02", nombre: "Mouse Logitech 567", precio: 20.0},
        {codigo: "P03", nombre: "Laptop Lenovo Ideapad 520", precio: 800.0},
        {codigo: "P04", nombre: "Monitor Samsung 24\"", precio: 200.0},
        {codigo: "P05", nombre: "PS4 Modelo M345", precio: 100.0}
    ];

    // Populate the product list in the modal
    const productList = document.getElementById('productos-buscar-lista');
    productList.innerHTML = productos.map(producto => `
        <tr>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td><button class="btn btn-primary btn-sm seleccionar-producto" data-codigo="${producto.codigo}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Seleccionar</button></td>
        </tr>
    `).join('');

    // Handle product selection
    document.querySelectorAll('.seleccionar-producto').forEach(button => {
        button.addEventListener('click', function() {
            const codigo = this.getAttribute('data-codigo');
            const nombre = this.getAttribute('data-nombre');
            const precio = this.getAttribute('data-precio');

            document.getElementById('producto-codigo').value = codigo;
            document.getElementById('producto-nombre').value = nombre;
            document.getElementById('producto-precio').value = precio;

            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalBuscarProducto'));
            modal.hide();
        });
    });

    // Filter products based on input
    document.getElementById('buscar-producto-input').addEventListener('input', function() {
        const filter = this.value.toLowerCase();
        const filteredProducts = productos.filter(producto => 
            producto.codigo.toLowerCase().includes(filter) || 
            producto.nombre.toLowerCase().includes(filter)
        );

        productList.innerHTML = filteredProducts.map(producto => `
            <tr>
                <td>${producto.codigo}</td>
                <td>${producto.nombre}</td>
                <td><button class="btn btn-primary btn-sm seleccionar-producto" data-codigo="${producto.codigo}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Seleccionar</button></td>
            </tr>
        `).join('');
    });
});