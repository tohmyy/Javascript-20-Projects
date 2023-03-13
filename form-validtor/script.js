const form = document.getElementById('form')
const password1El = document.getElementById('password1')
const password2El = document.getElementById('password2')
const messageContainer = document.getElementById('message-container')
const message = document.getElementById('message')

let isValid = false
let passwordsMatch = false
function validateForm(){
    // Using Constraint API
    isValid = form.checkValidity();

    if(!isValid){
       message.textContent = 'Please fill out all fields'
    message.style.color ='red'
    messageContainer.style.borderColor = 'red';
    console.log(isValid)
    return;
    }
    // Checking password match
    if(password1El.value===password2El.value){
        passwordsMatch= true
        password1El.style.borderColor='green'
        password2El.style.borderColor='green'
    }
    else{
        passwordsMatch= false
        password1El.style.borderColor='red'
        password2El.style.borderColor='red'
        message.textContent = 'Make sure passwords match'
        message.style.color ='red'
        messageContainer.style.borderColor = 'red';
        return;
    }

    // If form is valid and passwords match
    if(isValid && passwordsMatch){
        message.textContent = 'Successfully Registered'
        message.style.color ='green'
        messageContainer.style.borderColor = 'green';
    }
    
}

function storeFormData(){
    // using the name attribute for each input
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value
    }
    console.log(user)
}

function processFormData(e){
    // console.log(e)
    e.preventDefault()
    validateForm();

    // submit data if valid
    if(isValid && passwordsMatch){
        storeFormData()
    }
}

// EVENT LISTENER

form.addEventListener('submit', processFormData)