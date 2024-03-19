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
    });
    addOrderButtonListeners();
}

function addOrderButtonListeners(){
    const orderButtons = document.querySelectorAll('.order-btn')
    orderButtons.forEach(button =>{
        button.addEventListener('click', () => {
            window.location.href = 'bestallningssida.html';
        })
    })
}

getProducts();

function orderProduct(e){
    let orderName = document.getElementById('name');
    let orderEmail = document.getElementById('email');
    let orderNumber = document.getElementById('telefonnr');
    let orderAddress = document.getElementById('address');
    let product = document.getElementsByClassName('product-content').title
    console.log(product)
    e.preventDefault();
    var order = {
        name: orderName,
        email: orderEmail,
        number: orderNumber,
        address: orderAddress
    }

    console.log(order);
    
}