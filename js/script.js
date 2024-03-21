async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-md-4', 'product');
        productElement.innerHTML = `
        <div class ="product-content">
            <h2>${product.title}</h2>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <img src="${product.image}" alt="${product.title}" class="img-fluid">
        </div>
        <div class="order-btn">
            <button class = "btn btn-primary order-btn">Beställ</button>
        </div>
        `;
        productsContainer.appendChild(productElement);
        // Hämta den skapade knappen för produkten
        const orderButton = productElement.querySelector('.order-btn');
        // Lägg till eventlyssnare för knappen
        orderButton.addEventListener('click', () => {
            // Lagra den valda produkten i localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            // Navigera till beställningssidan
            window.location.href = 'bestallningssida.html';
        });
    });
}
getProducts();


const form = document.getElementById('myForm')
const userName = document.getElementById('name')
const email = document.getElementById('email')
const tel = document.getElementById('telefonnr')
const adress = document.getElementById('address')
const postnr = document.getElementById('postnr')
const city = document.getElementById('ort')

form.addEventListener('submit', e => {
    e.preventDefault()

    validInputs()
})

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;

    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';

    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validEmail = email => {
    const charSet =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return charSet.test(String(email).toLocaleLowerCase())
}

const validInputs = () => {
    const userNameValue = userName.value.trim()
    const emailValue = email.value.trim()
    const telValue = tel.value.trim()
    const adressValue = adress.value.trim()
    const postnrValue = postnr.value.trim()
    const cityValue = city.value.trim()

    if(userNameValue === ""){
        setError(userName, 'Skriv in ditt namn')
    }else if(userNameValue.length < 2 || userNameValue.length > 50){
        setError(userName, 'Ditt namn måste vara mellan 2 - 50 tecken långt')
    }else{
        setSuccess(userName)
    }

    if(emailValue === ""){
        setError(email, 'Skriv in din e-postadress')
    }else if(!validEmail(emailValue)){
        setError(email, 'Skriv in en korrekt e-postadress')
    }else if(emailValue.length > 50){
        setError(email, 'E-postadressen får inte vara längre än 50 tecken')
    }
    else{
        setSuccess(email)
    }

    if(telValue === ""){
        setError(tel, 'Skriv in ditt telefonummer')
    }else if(telValue.length > 50){
        setError(tel, 'Ditt telefonummer får max innehålla 50 tecken')
    }else{
        setSuccess(tel)
    }

    if(adressValue === ""){
        setError(adress, 'Skriv in din adress')
    }else if(adressValue.length < 2 || adressValue.length > 50){
        setError(adress, 'Adressen måste innehålla mellan 2 - 50 tecken')
    }else{
        setSuccess(adress)
    }
    
    if(postnrValue === ""){
        setError(postnr, 'Skriv in ditt postnummer')
    }else if(postnrValue.length != 5){
        setError(postnr, 'Skriv in korrekt postnummer, 5 tecken')
    }else{
        setSuccess(postnr)
    }
    
    if(cityValue === ""){
        setError(city, 'Skriv in din ort')
    }else if(cityValue.length < 2 || cityValue.length > 50){
        setError(city, 'Ortnamnet måste innehålla mellan 2 - 50 tecken')
    }else{
        setSuccess(city)
    }
    
}






/*
document.getElementById('myForm').addEventListener('submit', orderProduct);

function orderProduct(e){
    // Get form values
    let orderName = document.getElementById('name').value;
    console.log(orderName);
    let orderEmail = document.getElementById('email').value;
    let orderNumber = document.getElementById('telefonnr').value;
    let orderAddress = document.getElementById('address').value;
    //let product = document.getElementsByClassName('product-content').value
    console.log(product)
    
    var order = {
        name: orderName,
        email: orderEmail,
        number: orderNumber,
        address: orderAddress
    }

    console.log(order);
    e.preventDefault();
    
}
*/
