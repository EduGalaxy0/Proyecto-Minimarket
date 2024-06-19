const inventoryMovements = {
    'Producto A': {
        lastUpdate: '2023-06-15',
        movements: [
            { type: 'Entrada', quantity: 10, date: '2023-06-10' },
            { type: 'Salida', quantity: 5, date: '2023-06-12' },
            { type: 'Entrada', quantity: 15, date: '2023-06-14' }
        ]
    },
    'Producto B': {
        lastUpdate: '2023-06-16',
        movements: [
            { type: 'Salida', quantity: 5, date: '2023-06-11' },
            { type: 'Entrada', quantity: 10, date: '2023-06-13' }
        ]
    },
    'Producto C': {
        lastUpdate: '2023-06-17',
        movements: [
            { type: 'Entrada', quantity: 20, date: '2023-06-12' },
            { type: 'Salida', quantity: 10, date: '2023-06-14' },
            { type: 'Entrada', quantity: 5, date: '2023-06-16' }
        ]
    },
    'Producto D': {
        lastUpdate: '2023-06-18',
        movements: [
            { type: 'Entrada', quantity: 20, date: '2023-06-15' },
            { type: 'Salida', quantity: 5, date: '2023-06-17' }
        ]
    },
    'Producto E': {
        lastUpdate: '2023-06-19',
        movements: [
            { type: 'Entrada', quantity: 10, date: '2023-06-16' }
        ]
    }
};

function loadTableData() {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = '';

    for (const product in inventoryMovements) {
        const productData = inventoryMovements[product];
        let totalEntradas = 0;
        let totalSalidas = 0;

        productData.movements.forEach(movement => {
            if (movement.type === 'Entrada') {
                totalEntradas += movement.quantity;
            } else {
                totalSalidas += movement.quantity;
            }
        });

        const totalMovements = totalEntradas - totalSalidas;

        tbody.innerHTML += `
            <tr>
                <td>${product}</td>
                <td>${totalMovements} unidades</td>
                <td>${productData.lastUpdate}</td>
                <td><button class="details-button" onclick="showDetails('${product}')">Detalles</button></td>
            </tr>`;
    }
}

function showDetails(product) {
    const modal = document.getElementById('detailsModal');
    const detailsTableBody = document.getElementById('detailsTableBody');
    const modalFooter = document.getElementById('modalFooter');

    detailsTableBody.innerHTML = '';
    modalFooter.innerHTML = '';

    const movements = inventoryMovements[product].movements;
    let totalEntradas = 0;
    let totalSalidas = 0;

    movements.forEach(movement => {
        detailsTableBody.innerHTML += `
            <tr>
                <td>${movement.type}</td>
                <td>${movement.quantity} unidades</td>
                <td>${movement.date}</td>
            </tr>`;
        if (movement.type === 'Entrada') {
            totalEntradas += movement.quantity;
        } else {
            totalSalidas += movement.quantity;
        }
    });

    const total = totalEntradas - totalSalidas;
    modalFooter.innerHTML = `<p>Total de movimientos: ${total} unidades</p>`;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target == modal) {
        modal.style.display = 'none';e
    }
}

document.addEventListener('DOMContentLoaded', loadTableData);