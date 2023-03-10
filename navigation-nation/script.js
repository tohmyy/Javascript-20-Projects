const menuBars = document.querySelector('.menu-bars')
const overlay = document.getElementById('overlay')
const nav1 = document.getElementById('nav1')
const nav2 = document.getElementById('nav2')
const nav3 = document.getElementById('nav3')
const nav4 = document.getElementById('nav4')
const nav5 = document.getElementById('nav5')

function toggleNav(){
    
    menuBars.classList.toggle('change')
    console.log()
    overlay.classList.toggle('overlay-active');
    console.log()
    if(overlay.classList.contains('overlay-active')){
        if(overlay.classList.contains('overlay-slide-left')){
        overlay.classList.replace('overlay-slide-left','overlay-slide-right');
    }
    else{
        overlay.classList.add('overlay-slide-right');
    }
}
    else{
        if(overlay.classList.contains('overlay-slide-right')){
            overlay.classList.replace('overlay-slide-right','overlay-slide-left');
        }
        else{
            overlay.classList.add('overlay-slide-left');
        }
    }
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
nav1.addEventListener('click', toggleNav);
nav2.addEventListener('click', toggleNav);
nav3.addEventListener('click', toggleNav);
nav4.addEventListener('click', toggleNav);
nav5.addEventListener('click', toggleNav);
