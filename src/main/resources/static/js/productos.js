document.addEventListener('DOMContentLoaded', function() {
    const rowsPerPage = 5;
    let currentPage = 1;
    let products = [];

    const productsTbody = document.getElementById('tableBody_producto');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    const modalAgregar = document.getElementById('modalAgregar');
    const modalEliminar = document.getElementById('modalEliminar');
    const modalEditar = document.getElementById('modalEditar');

    let editingProductId = null;
    let deletingProductId = null;
    
	function cargarCategoriasDesdeServidor() {
    const categoriaSelect = document.getElementById('categoriaProducto');
    const categoriaSelectEditar = document.getElementById('categoriaProductoEdit'); // Añadido para editar

    fetch('http://localhost:8080/v3/categorias')
        .then(response => response.json())
        .then(data => {
            // Limpiar el select por si había opciones previas
            categoriaSelect.innerHTML = '<option value="">(Seleccionar categoría)</option>';
            categoriaSelectEditar.innerHTML = '<option value="">(Seleccionar categoría)</option>'; // Añadido para editar

            // Agregar una opción por cada categoría recibida
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.nombre; // Asignar el nombre de la categoría
                option.textContent = categoria.nombre; // Mostrar el nombre de la categoría
                categoriaSelect.appendChild(option);

                const optionEditar = document.createElement('option'); // Añadido para editar
                optionEditar.value = categoria.nombre; // Asignar el nombre de la categoría
                optionEditar.textContent = categoria.nombre; // Mostrar el nombre de la categoría
                categoriaSelectEditar.appendChild(optionEditar);
            });
        })
        .catch(error => console.error('Error al cargar categorías:', error));
}
	
    function fetchAndDisplayProducts() {
        fetch('http://localhost:8080/v3/productos')
            .then(response => response.json())
            .then(data => {
                products = data;
                console.log(data);
                renderTable();
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }

    function renderTable() {
        productsTbody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const currentProducts = products.slice(start, end);

        currentProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${product.id}</td>
                <td class="text-center">${product.nombre}</td>
                <td class="text-center">${product.precio}</td>
                <td class="text-center">${product.cantidad}</td>
                <td class="text-center">${product.categoria_id.nombre}</td>
                <td class="text-center">${product.marca}</td>
                <td class="text-center">${product.descripcion}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm" onclick="mostrarModalEditar(${product.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="mostrarModalEliminar(${product.id})">Eliminar</button>
                </td>
            `;
            productsTbody.appendChild(row);
        });

        pageIndicator.textContent = `Página ${currentPage}`;
        updatePagination();
    }

    function updatePagination() {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage * rowsPerPage >= products.length;
    }

    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', function() {
        currentPage++;
        renderTable();
    });

    window.mostrarModalAgregar = function() {
		cargarCategoriasDesdeServidor();
        modalAgregar.style.display = 'block';
    }

    window.cerrarModal = function() {
        modalAgregar.style.display = 'none';
        modalEliminar.style.display = 'none';
        modalEditar.style.display = 'none';
    }

    window.mostrarModalEliminar = function(id) {
        deletingProductId = id;
        modalEliminar.style.display = 'block';
    }

    window.eliminarProductoConfirmado = function() {
		
        fetch(`http://localhost:8080/v3/eliminar/${deletingProductId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                fetchAndDisplayProducts();
                cerrarModal();
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => console.error('Error al eliminar producto:', error));
    }

    window.mostrarModalEditar = function(id) {
    editingProductId = id;
    const product = products.find(p => p.id === id);

    cargarCategoriasDesdeServidor(); // Cargar categorías antes de mostrar el modal

    document.getElementById('nombreProductoEdit').value = product.nombre;
    document.getElementById('precioProductoEdit').value = product.precio;
    document.getElementById('cantidadProductoEdit').value = product.cantidad;
    document.getElementById('categoriaProductoEdit').value = product.categoria.nombre;
    document.getElementById('marcaProductoEdit').value = product.marca;
    document.getElementById('descripcionProductoEdit').value = product.descripcion;
    modalEditar.style.display = 'block';
}

    window.guardarEdicion = function() {
        const updatedProduct = {
            id: editingProductId,
            nombre: document.getElementById('nombreProductoEdit').value,
            precio: parseFloat(document.getElementById('precioProductoEdit').value),
            cantidad: parseInt(document.getElementById('cantidadProductoEdit').value),
            categoria: document.getElementById('categoriaProductoEdit').value,
            marca: document.getElementById('marcaProductoEdit').value,
            descripcion: document.getElementById('descripcionProductoEdit').value
        };

        fetch(`http://localhost:8080/v3/editar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => {
            if (response.ok) {
                fetchAndDisplayProducts();
                cerrarModal();
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => console.error('Error al editar producto:', error));
    }

    window.agregarProducto = function() {
		const nombre = document.getElementById('nombreProducto').value;
		const precio = parseFloat(document.getElementById('precioProducto').value);
		const cantidad = parseInt(document.getElementById('cantidadProducto').value);
		const categoria = document.getElementById('categoriaProducto').value;
		const marca = document.getElementById('marcaProducto').value;
		const descripcion = document.getElementById('descripcionProducto').value;
		
        const newProduct = {
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            categoria: categoria,
            marca: marca,
            descripcion: descripcion
        };
        console.log(nombre);
        console.log(categoria);
        fetch(`http://localhost:8080/v3/agregar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
        .then(response => {
            if (response.ok) {
                fetchAndDisplayProducts();
                cerrarModal();
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => console.error('Error al agregar producto:', error));
    }

    fetchAndDisplayProducts();
});
