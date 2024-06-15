document.addEventListener("DOMContentLoaded", function () {
            const currentDate = new Date();
            const isoDateString = currentDate.toISOString();
            console.log(isoDateString);
            fetch('http://localhost:8080/v3/productos')
                .then(response => response.json())
                .then(data => {
                    const usersTable = document.getElementById('tablaProductos');
                    const tbody = usersTable.getElementsByTagName('tbody')[0];
					//console.log(data);
                    data.forEach(producto => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.cantidad}</td>
                            <td>${producto.categoria_id.nombre}</td>
                            <td>${producto.descripcion}</td>
                            <td>
								<div class="action-buttons">
	                                <button class="edit-btn">Editar</button>
	                                <button class="delete-btn">Eliminar</button>
	                            </div>
							</td>
                        `;
                        tbody.appendChild(row);
                    
            });
        })
                .catch(error => console.error('Error al obtener productos:', error));
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            let products = [
                { id: 1, nombre: 'Galleta Oreo', precio: 1, cantidad: 100, categoria: 'Galletas', descripcion: 'Descripción 1' },
                { id: 2, nombre: 'Chicle Huevito', precio: 0.20, cantidad: 200, categoria: 'Golosinas', descripcion: 'Descripción 2' },
                // Add more products as needed
            ];
        
            const rowsPerPage = 5;
            let currentPage = 1;
        
            const productsTbody = document.getElementById('tableBody_producto');
            const prevPageBtn = document.getElementById('prevPageBtn');
            const nextPageBtn = document.getElementById('nextPageBtn');
            const pageIndicator = document.getElementById('pageIndicator');
            const modalAgregar = document.getElementById('modalAgregar');
            const modalEliminar = document.getElementById('modalEliminar');
            const modalEditar = document.getElementById('modalEditar');
            const formAgregarProducto = document.getElementById('formAgregarProducto');
            const formEditarProducto = document.getElementById('formEditarProducto');
        
            let editingProductId = null;
            let deletingProductId = null;
        
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
                        <td class="text-center">${product.categoria}</td>
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
                if (currentPage * rowsPerPage < products.length) {
                    currentPage++;
                    renderTable();
                }
            });
        
            window.mostrarModalAgregar = function() {
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
                products = products.filter(p => p.id !== deletingProductId);
                renderTable();
                cerrarModal();
            }
        
            window.mostrarModalEditar = function(id) {
                editingProductId = id;
                const product = products.find(p => p.id === id);
                document.getElementById('nombreProductoEdit').value = product.nombre;
                document.getElementById('precioProductoEdit').value = product.precio;
                document.getElementById('cantidadProductoEdit').value = product.cantidad;
                document.getElementById('categoriaProductoEdit').value = product.categoria;
                document.getElementById('descripcionProductoEdit').value = product.descripcion;
                modalEditar.style.display = 'block';
            }
        
            window.guardarEdicion = function() {
                const product = products.find(p => p.id === editingProductId);
                product.nombre = document.getElementById('nombreProductoEdit').value;
                product.precio = parseFloat(document.getElementById('precioProductoEdit').value);
                product.cantidad = parseInt(document.getElementById('cantidadProductoEdit').value);
                product.categoria = document.getElementById('categoriaProductoEdit').value;
                product.descripcion = document.getElementById('descripcionProductoEdit').value;
                renderTable();
                cerrarModal();
            }
        
            window.agregarProducto = function() {
                const newProduct = {
                    id: products.length + 1,
                    nombre: document.getElementById('nombreProducto').value,
                    precio: parseFloat(document.getElementById('precioProducto').value),
                    cantidad: parseInt(document.getElementById('cantidadProducto').value),
                    categoria: document.getElementById('categoriaProducto').value,
                    descripcion: document.getElementById('descripcionProducto').value
                };
                products.push(newProduct);
                renderTable();
                cerrarModal();
            }
        
            renderTable();
        });
