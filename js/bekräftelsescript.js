const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
const customer = JSON.parse(localStorage.getItem('customer'))

if (selectedProduct) {
    // Visa den valda produkten på beställningssidan
    const resultatDiv = document.getElementById('resultat2');
    var storage = JSON.parse(localStorage.getItem('storedProducts'))
    resultatDiv.innerHTML = `
        
        <div>
        <h3>Leveransuppgifter:</h3>
        <p><strong>Namn:</strong> ${customer.userName}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Telefonnummer:</strong> ${customer.tel}</p>
        <p><strong>Adress:</strong> ${customer.adress}</p>
        <p><strong>Postnummer:</strong> ${customer.postnr}</p>
        <p><strong>Stad:</strong> ${customer.city}</p>
        </div>
        <h3>Du beställde:</h3>
        
    `;
    for(var i = 0; i < storage.length; i++) {
        var temp = `
        <p><strong>Titel:</strong> ${storage[i].title}</p>
        <p><strong>Pris:</strong> $${storage[i].price}</p>
        <p><strong>Beskrivning:</strong> ${storage[i].description}</p>
        `
        resultatDiv.append(temp)
        resultatDiv.append(`</div>`)
    }
    
}