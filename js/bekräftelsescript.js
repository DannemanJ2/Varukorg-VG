const searchParams = new URLSearchParams(window.location.search);
const selectedProduct = JSON.parse(searchParams.get('selectedProduct'));
const customer = JSON.parse(searchParams.get('customer'))
console.log(customer);

if (selectedProduct) {
    // Visa den valda produkten på beställningssidan
    const resultatDiv = document.getElementById('resultat2');
    resultatDiv.innerHTML = `
        <h3>Du beställde:</h3>
        <div>
        <img src="${selectedProduct.image}" alt="${selectedProduct.title}" class="img-egen">
        <p><strong>Titel:</strong> ${selectedProduct.title}</p>
        <p><strong>Pris:</strong> $${selectedProduct.price}</p>
        <p><strong>Beskrivning:</strong> ${selectedProduct.description}</p>
        <h3>Leveransuppgifter:</h3>
        <p><strong>Namn:</strong> ${customer.userName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Telefonnummer:</strong> ${customer.tel}</p>
        <p><strong>Adress:</strong> ${customer.adress}</p>
        <p><strong>Postnummer:</strong> ${customer.postnr}</p>
        <p><strong>Stad:</strong> ${customer.city}</p>
        </div>
    `;
}