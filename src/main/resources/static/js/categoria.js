document.addEventListener('DOMContentLoaded', function() {
    let categories = [
        { id: 1, nombre: 'Golosinas', descripcion: 'Dulces y galletas' },
        { id: 2, nombre: 'Limpieza', descripcion: 'Todo sobre el cuidado de la casa' },
        // Add more categories as needed
    ];  

    const rowsPerPage = 5;
    let currentPage = 1;

    const categoriesTbody = document.getElementById('tableBody_categoria');
    const prevPageCategoriaBtn = document.getElementById('prevPageCategoriaBtn');
    const nextPageCategoriaBtn = document.getElementById('nextPageCategoriaBtn');
    const pageIndicatorCategoria = document.getElementById('pageIndicatorCategoria');
    const modalAgregarCategoria = document.getElementById('modalAgregarCategoria');
    const modalEliminarCategoria = document.getElementById('modalEliminarCategoria');
    const modalEditarCategoria = document.getElementById('modalEditarCategoria');
    const formAgregarCategoria = document.getElementById('formAgregarCategoria');
    const formEditarCategoria = document.getElementById('formEditarCategoria');

    let editingCategoriaId = null;
    let deletingCategoriaId = null;

    function renderTableCategorias() {
        categoriesTbody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const currentCategories = categories.slice(start, end);

        currentCategories.forEach(categoria => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="text-center">${categoria.id}</td>
                <td class="text-center">${categoria.nombre}</td>
                <td class="text-center">${categoria.descripcion}</td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm" onclick="mostrarModalEditarCategoria(${categoria.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="mostrarModalEliminarCategoria(${categoria.id})">Eliminar</button>
                </td>
            `;
            categoriesTbody.appendChild(row);
        });

        pageIndicatorCategoria.textContent = `Página ${currentPage}`;
        updatePaginationCategorias();
    }

    function updatePaginationCategorias() {
        prevPageCategoriaBtn.disabled = currentPage === 1;
        nextPageCategoriaBtn.disabled = currentPage * rowsPerPage >= categories.length;
    }

    prevPageCategoriaBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTableCategorias();
        }
    });

    nextPageCategoriaBtn.addEventListener('click', function() {
        if (currentPage * rowsPerPage < categories.length) {
            currentPage++;
            renderTableCategorias();
        }
    });

    window.mostrarModalAgregarCategoria = function() {
        modalAgregarCategoria.style.display = 'block';
    }

    window.cerrarModalCategoria = function() {
        modalAgregarCategoria.style.display = 'none';
        modalEliminarCategoria.style.display = 'none';
        modalEditarCategoria.style.display = 'none';
    }

    window.mostrarModalEliminarCategoria = function(id) {
        deletingCategoriaId = id;
        modalEliminarCategoria.style.display = 'block';
    }

    window.eliminarCategoriaConfirmado = function() {
        categories = categories.filter(c => c.id !== deletingCategoriaId);
        renderTableCategorias();
        cerrarModalCategoria();
    }

    window.mostrarModalEditarCategoria = function(id) {
        editingCategoriaId = id;
        const categoria = categories.find(c => c.id === id);
        document.getElementById('nombreCategoriaEdit').value = categoria.nombre;
        document.getElementById('descripcionCategoriaEdit').value = categoria.descripcion;
        modalEditarCategoria.style.display = 'block';
    }

    window.guardarEdicionCategoria = function() {
        const categoria = categories.find(c => c.id === editingCategoriaId);
        categoria.nombre = document.getElementById('nombreCategoriaEdit').value;
        categoria.descripcion = document.getElementById('descripcionCategoriaEdit').value;
        renderTableCategorias();
        cerrarModalCategoria();
    }

    window.agregarCategoria = function() {
        const newCategoria = {
            id: categories.length + 1,
            nombre: document.getElementById('nombreCategoria').value,
            descripcion: document.getElementById('descripcionCategoria').value
        };
        categories.push(newCategoria);
        renderTableCategorias();
        cerrarModalCategoria();
    }

    renderTableCategorias();
});
