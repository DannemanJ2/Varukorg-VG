// Hämta den valda produkten från localStorage
const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
//console.log(selectedProduct);
if (selectedProduct) {
    // Visa den valda produkten på beställningssidan
    const resultatDiv = document.getElementById('resultat');
    resultatDiv.innerHTML = `
        <h3>Du valde:</h3>
        <img src="${selectedProduct.image}" alt="${selectedProduct.title}" class="img-egen">
        <p><strong>Titel:</strong> ${selectedProduct.title}</p>
        <p><strong>Pris:</strong> $${selectedProduct.price}</p>
        <p><strong>Beskrivning:</strong> ${selectedProduct.description}</p>
    `;
}

const form = document.getElementById('myForm')
const userName = document.getElementById('name')
const email = document.getElementById('email')
const tel = document.getElementById('telefonnr')
const adress = document.getElementById('address')
const postnr = document.getElementById('postnr')
const city = document.getElementById('ort')

form.addEventListener('submit', e => {
    e.preventDefault()

    if(validInputs()){
        const customer = {userName: userName.value, email: email.value, tel: tel.value, adress: adress.value, postnr: postnr.value, city: city.value};
        window.location.href = 'bekräftelsesida.html?selectedProduct=' + JSON.stringify(selectedProduct) + '&customer=' + JSON.stringify(customer);
    }
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
const validPostnr = postnr => {
    return /^\d+$/.test(postnr);
}

const validTel = tel => {
    return /^[\d()-]+$/.test(tel)
}

const validInputs = () => {
    const userNameValue = userName.value.trim()
    const emailValue = email.value.trim()
    const telValue = tel.value.trim()
    const adressValue = adress.value.trim()
    const postnrValue = postnr.value.trim()
    const cityValue = city.value.trim()
    var allValid = true
    

    if(userNameValue === ""){
        setError(userName, 'Skriv in ditt namn')
        allValid = false
    }else if(userNameValue.length < 2 || userNameValue.length > 50){
        setError(userName, 'Ditt namn måste vara mellan 2 - 50 tecken långt')
        allValid = false
    }else{
        setSuccess(userName)
    }

    if(emailValue === ""){
        setError(email, 'Skriv in din e-postadress')
        allValid = false
    }else if(!validEmail(emailValue)){
        setError(email, 'Skriv in en korrekt e-postadress')
        allValid = false
    }else if(emailValue.length > 50){
        setError(email, 'E-postadressen får inte vara längre än 50 tecken')
        allValid = false
    }
    else{
        setSuccess(email)
    }

    if(telValue === ""){
        setError(tel, 'Skriv in ditt telefonummer')
        allValid = false
    }else if(telValue.length > 50){
        setError(tel, 'Ditt telefonummer får max innehålla 50 tecken')
        allValid = false
    }else if(!validTel(telValue)){
        setError(tel, 'Ditt telefonummer får bara innehålla siffror, bindestreck och parenteser')
        allValid = false
    }else{
        setSuccess(tel)
    }

    if(adressValue === ""){
        setError(adress, 'Skriv in din adress')
        allValid = false
    }else if(adressValue.length < 2 || adressValue.length > 50){
        setError(adress, 'Adressen måste innehålla mellan 2 - 50 tecken')
        allValid = false
    }else{
        setSuccess(adress)
    }
    
    if(postnrValue === ""){
        setError(postnr, 'Skriv in ditt postnummer')
        allValid = false
    }else if(postnrValue.length != 5){
        setError(postnr, 'Skriv in korrekt postnummer, 5 tecken')
        allValid = false
    }else if(!validPostnr(postnrValue)){
        setError(postnr, 'Skriv in korrekt postnummer, får bara innehålla siffror')
        allValid = false
    }else{
        setSuccess(postnr)
    }
    
    if(cityValue === ""){
        setError(city, 'Skriv in din ort')
        allValid = false
    }else if(cityValue.length < 2 || cityValue.length > 50){
        setError(city, 'Ortnamnet måste innehålla mellan 2 - 50 tecken')
        allValid = false
    }else{
        setSuccess(city)
    }
    if(allValid){
        return true
    }
    
}