// Hämta den valda produkten från localStorage
const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
console.log(selectedProduct);
if (selectedProduct) {
    // Visa den valda produkten på beställningssidan
    const resultatDiv = document.getElementById('resultat');
    resultatDiv.innerHTML = `
        <h3>Du valde:</h3>
        <p><strong>Titel:</strong> ${selectedProduct.title}</p>
        <p><strong>Pris:</strong> $${selectedProduct.price}</p>
        <p><strong>Beskrivning:</strong> ${selectedProduct.description}</p>
        <img src="${selectedProduct.image}" alt="${selectedProduct.title}" class="img-fluid">
    `;
}