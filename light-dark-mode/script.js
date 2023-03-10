const toggleSwitch = document.querySelector('#checkbox')
const nav = document.getElementById('nav')
const textBox = document.getElementById('text-box')
const sunMoon = document.querySelector('#sun-moon')
const toggleText = document.querySelector('.toggle-text')
const image1 = document.querySelector('#image1')
const image2 = document.querySelector('#image2')
const image3 = document.querySelector('#image3')

function imageMode(color){
    image1.src = `img/download/undraw_programming_re_kg9v_${color}.svg`
    image2.src = `img/download/undraw_hacker_mind_-6-y85_${color}.svg`
    image3.src = `img/download/undraw_freelancer_re_irh4_${color}.svg`
}

function darkMode(){

    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%';

    sunMoon.classList.replace('fa-sun', 'fa-moon');
    toggleText.textContent='Dark Mode';

    imageMode('dark')
    
}

function lightMode(){
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%';
    sunMoon.classList.replace('fa-moon', 'fa-sun');
    toggleText.textContent='Light Mode';

    imageMode('light')
}

function switchTheme(event){
    if(event.target.checked){
        window.localStorage.setItem('theme', 'dark')
        document.documentElement.setAttribute('data-theme', 'dark')
        darkMode()
        // document.querySelector('sun-moon').classList.add('fa-moon')
    }
    else{
        window.localStorage.setItem('theme', 'light')
        document.documentElement.setAttribute('data-theme', 'light')
        lightMode();


    }
    console.log(event.target.checked)
}

toggleSwitch.addEventListener('change',switchTheme)

// Checking local storage
const currentTheme = window.localStorage.getItem('theme')
if(currentTheme){
    
    if(currentTheme==='dark'){
        document.documentElement.setAttribute('data-theme', 'dark')
        toggleSwitch.checked=true
        darkMode()
    }
    
}

