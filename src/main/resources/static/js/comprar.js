function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function addToMainTable(provider, product, unit, price) {
    var table = document.getElementById("mainTable").getElementsByTagName('tbody')[0];
    var row = table.insertRow();
    var productNameCell = row.insertCell(0);
    var priceCell = row.insertCell(1);
    var quantityCell = row.insertCell(2);
    var totalCell = row.insertCell(3);

    productNameCell.innerHTML = product;
    priceCell.innerHTML = price;
    quantityCell.innerHTML = '<input type="number" value="1">';
    totalCell.innerHTML = '<span>$' + price + '</span>';

    document.getElementById("selectedProvider").innerText = provider;
}