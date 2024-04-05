async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        
        displayProducts(products);
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }
if (document.readyState == 'complete') {
    ready();
} else {
    window.addEventListener('load', ready)
}
function ready() {
    displayCart();
    
    var removeCartItemsBtn = document.getElementsByClassName('remove-btn')
    for (var i = 0; i < removeCartItemsBtn.length; i++) {
        var button = removeCartItemsBtn[i]
        button.addEventListener('click', removeCartItem)
    }
    var removeAllBtn = document.getElementsByClassName('remove-all-btn')
    removeAllBtn[0].addEventListener('click', clearCart)
    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartBtn = document.getElementsByClassName('addToCart-btn')
    for (var i = 0; i < addToCartBtn.length; i++) {
        var button = addToCartBtn[i]
        button.addEventListener('click', addToCart)
    }
    var placeOrderBtn = document.getElementsByClassName('place-order-btn')
    placeOrderBtn[0].addEventListener('click', placeOrder)
}

function placeOrder(event) {
    window.location.href = 'bestallningssida.html'
}
function clearCart() {
    localStorage.clear()
    var cartItems = document.getElementById('cart-items')
    cartItems.innerHTML = ''
    displayCart();
}
function removeCartItem(event) {
    var storage = JSON.parse(localStorage.getItem('storedProducts'))
    var buttonClicked = event.target
    var title = buttonClicked.parentElement.parentElement.children[0].getElementsByClassName('cart-item-title')[0].textContent
    buttonClicked.parentElement.parentElement.remove();
    // var product = storage.find(item => item.title === title);
    // localStorage.removeItem(product);
    var productIndex = storage.findIndex(item => item.title === title);

    if (productIndex !== -1) {
        storage.splice(productIndex, 1);

        localStorage.setItem('storedProducts', JSON.stringify(storage));
    }
    updateTotal()

}
function quantityChanged(event) {
    var input = event.target
    var storage = JSON.parse(localStorage.getItem('storedProducts'))
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
        
    }
    var title = input.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText
    var product = storage.find(item => item.title == title)
    product.quantity = input.value
    localStorage.setItem('storedProducts', JSON.stringify(storage))

    updateTotal()
}
function updateTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('Price: $', ''))
        var quantity = quantityElement.getElementsByClassName('cart-quantity-input')[0].value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
function addToCart(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    addItemToCart(title, price, imgSrc)
    updateTotal()
}

function addItemToCart(title, price, imgSrc) {
    var storage = JSON.parse(localStorage.getItem('storedProducts'))
    if (storage == null) storage = [];
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var quantity = 1
    // var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var cartObject = { title: title, price: price, imgSrc: imgSrc, quantity:quantity}
    for (var i = 0; i < storage.length; i++) {
        // if (cartItemNames[i].innerText == title) {
        //     alert('Denna vara ligger redan i varukorgen!')
        //     return
        // }
        if(storage.find(item => item.title === title)) {
            alert('Denna vara ligger redan i varukorgen')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="${quantity}">
        <button class="remove-btn" type="button">Ta Bort</button>
    </div>`
    storage.push(cartObject)
    localStorage.setItem('storedProducts', JSON.stringify(storage))
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
function displayCart() {
    var storage = JSON.parse(localStorage.getItem('storedProducts'))
    if (storage == null) storage = [];

    storage.forEach(product => {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${product.imgSrc}" width="100" height="100">
        <span class="cart-item-title">${product.title}</span>
    </div>
    <span class="cart-price cart-column">${product.price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="${product.quantity}">
        <button class="remove-btn" type="button">Ta Bort</button>
    </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
    });
    updateTotal();


}
function displayProducts(products) {
    const productsContainer = document.getElementById('products');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-md-4', 'product');
        productElement.innerHTML = `
        <div class ="product-content">
            <h2 class="shop-item-title">${product.title}</h2>
            <p class="shop-item-price">Price: $${product.price}</p>
            <p>${product.description}</p>
            <img src="${product.image}" alt="${product.title}" class="img-fluid shop-item-img">
        </div>
        <div class="addToCart-btn">
            <button class = "btn btn-primary order-btn">Lägg Till</button>
        </div>
        `;
        productsContainer.appendChild(productElement);
        // Hämta den skapade knappen för produkten
        const orderButton = productElement.querySelector('.addToCart-btn');
        // Lägg till eventlyssnare för knappen
        orderButton.addEventListener('click', (event) => {
            // Lagra den valda produkten i localStorage
            // localStorage.setItem('selectedProduct' + (localStorage.length + 1).toString, JSON.stringify(product));

            addToCart(event)
        });
    });
}
getProducts();