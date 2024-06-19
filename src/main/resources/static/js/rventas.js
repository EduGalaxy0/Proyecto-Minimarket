    const salesData = {
        '001-000123': {
            products: [
                { name: 'Producto A', quantity: 1, unitPrice: '$50.00' },
                { name: 'Producto B', quantity: 1, unitPrice: '$100.00' }
            ],
            total: '$150.00'
        },
        '001-000124': {
            products: [
                { name: 'Producto C', quantity: 2, unitPrice: '$75.00' },
                { name: 'Producto D', quantity: 1, unitPrice: '$50.00' }
            ],
            total: '$200.00'
        },
        '001-000125': {
            products: [
                { name: 'Producto E', quantity: 1, unitPrice: '$100.00' },
                { name: 'Producto F', quantity: 1, unitPrice: '$250.00' }
            ],
            total: '$350.00'
        },
        '001-000126': {
            products: [
                { name: 'Producto G', quantity: 2, unitPrice: '$100.00' },
                { name: 'Producto H', quantity: 1, unitPrice: '$250.00' }
            ],
            total: '$450.00'
        },
        '001-000127': {
            products: [
                { name: 'Producto I', quantity: 1, unitPrice: '$100.00' },
                { name: 'Producto J', quantity: 2, unitPrice: '$100.00' }
            ],
            total: '$300.00'
        }
    };

   function showDetails(invoiceNumber) {
       const details = salesData[invoiceNumber];
       const productDetails = details.products.map(product => `
           <tr>
               <td>${product.name}</td>
               <td>${product.quantity}</td>
               <td>${product.unitPrice}</td>
               <td>${(product.quantity * parseFloat(product.unitPrice.slice(1))).toFixed(2)}</td>
           </tr>
       `).join('');
       document.getElementById('modalBody').innerHTML = `
           <h3>Boleta N° ${invoiceNumber}</h3>
           <table>
               <thead>
                   <tr>
                       <th>Producto</th>
                       <th>Cantidad</th>
                       <th>Precio Unitario</th>
                       <th>Subtotal</th>
                   </tr>
               </thead>
               <tbody>
                   ${productDetails}
               </tbody>
           </table>
       `;
       document.getElementById('modalFooter').innerHTML = `<p>Total: ${details.total}</p>`;
       document.getElementById('detailsModal').style.display = 'block';
   }

   function closeModal() {
       document.getElementById('detailsModal').style.display = 'none';
   }

   window.onclick = function(event) {
       const modal = document.getElementById('detailsModal');
       if (event.target == modal) {
           modal.style.display = 'none';
       }
   }