const player = document.querySelector('.player')
const video = document.querySelector('video')
const playBtn = document.getElementById('play-btn')
const muteBtn = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const progressContainer =document.querySelector('.progress-range');
const progress = document.querySelector('.progress-bar')



const playbackSpeed = document.querySelector('.player-speed')

const currentTimeElement = document.getElementsByClassName('title-elapsed')
const durationElement = document.getElementsByClassName('title-current')

const expandElement = document.querySelector('.fa-expand')


// Play & Pause ----------------------------------- //


let isPLaying = false

// Play
function playVideo(){
    
    isPLaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    video.play()
}

function pauseVideo(){
    isPLaying = false
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    video.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', ()=>isPLaying ? pauseVideo(): playVideo())


// Progress Bar ---------------------------------- //
function updateProgressBar(e){
    if(isPLaying)
    {
        const{duration, currentTime} = e.srcElement;
        // console.log(duration, currentTime)

        // Update progress bar width
        const progressPercent = (currentTime/duration)*100;
        
        progress.style.width = `${progressPercent}%`

        // Calculate Display For Duration
        const durationMinutes = Math.floor(duration/60);


        let durationSeconds = Math.floor(duration%60)

        if(durationSeconds<10){
            durationSeconds = `0${durationSeconds}`
        }

        if(duration){
            durationElement[0].textContent = `${durationMinutes}:${durationSeconds}`
        }
        // Calculate Display For Duration
        const currentTimeMinutes = Math.floor(currentTime/60);

        let currentTimeSeconds = Math.floor(currentTime%60)

        if(currentTimeSeconds<10){
            currentTimeSeconds = `0${currentTimeSeconds}`
        }

        currentTimeElement[0].textContent = `${currentTimeMinutes}:${currentTimeSeconds}`
    
    }
}
// 
function setProgressBar(e){

    const width = this.clientWidth

    const clickX = e.offsetX;
    // console.log(clickX)
    const{duration} = video;
    playVideo()
    video.currentTime = (clickX/width * duration)
}



// Volume Controls --------------------------- //


// Volume Bar
function chanegVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth
    console.log('offset =', e.offsetX)
    console.log(volume)

    if(volume<0.1){
        volume=0;
    }

    if (volume>0.9){
        volume=1
    }
    volumeBar.style.width = `${volume*100}%`
    video.volume = volume
    console.log(volume)
    if(volume>0.1 && volume<0.5){
        muteBtn.classList.replace('fa-volume-up', 'fa-volume-down')
    }
    else if(volume>0.5){
        muteBtn.classList.replace('fa-volume-down', 'fa-volume-up')
    }
}


function changeSpeed(){
    video.playbackRate = playbackSpeed.value
}

function setMuteorUnmute(){
    if(video.muted===false){
        video.muted=true
        volumeRange.classList.add('muted')
        muteBtn.classList.replace('fa-volume-up', 'fa-volume-mute')
        muteBtn.classList.replace('fa-volume-down', 'fa-volume-mute')
    }
    else{
        video.muted=false
        muteBtn.classList.replace('fa-volume-mute', 'fa-volume-up')
        volumeRange.classList.remove('muted')
    }
    
}


// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //

// Copied open & close fullscreen function from w3schools
/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen')
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen')
  }

let fullscreen = false;
// Toggle Fullscreen
function toggleFullScreen(){
    if(!fullscreen){
        openFullscreen(player);
    }
    else{
        closeFullscreen();
    }
    fullscreen= !fullscreen
    // video.requestFullscreen()
}


// Event Listeners
video.addEventListener('timeupdate', updateProgressBar)
video.addEventListener('ended', pauseVideo)
progressContainer.addEventListener('click', setProgressBar)
volumeRange.addEventListener('click', chanegVolume)

expandElement.addEventListener('click', toggleFullScreen)

muteBtn.addEventListener('click', setMuteorUnmute)

playbackSpeed.addEventListener('change', changeSpeed)