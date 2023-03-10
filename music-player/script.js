const image =document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')

const progressContainer =document.getElementById('progress-container');
const progress = document.getElementById('progress')

const currentTimeElement = document.getElementById('current-time')
const durationElement = document.getElementById('duration')

const music = document.querySelector('audio')
const prevBtn =document.querySelector('#prev')
const playBtn =document.querySelector('#play')
const nextBtn =document.querySelector('#next')


// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Song 2',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Song 3',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row(Remix)',
        artist: 'Jacinto Design',
    },
]

// Check if Playing
let isPLaying = false

// Play
function playSong(){
    
    isPLaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play()
}

function pauseSong(){
    isPLaying = false
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', ()=>isPLaying ? pauseSong(): playSong())


// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}



// Current Song
let songIndex = 0

if(localStorage.getItem('songIndex')===null){
    localStorage.setItem('songIndex', songIndex)
}
if(localStorage.getItem('songIndex')){
    songIndex = localStorage.getItem('songIndex')
}
// localStorage.setItem('songIndex', songIndex)
// Previous Song
function prevSong(){
    songIndex--;
    localStorage.setItem('songIndex', songIndex)
    if(songIndex<0){
        songIndex=songs.length-1
        localStorage.setItem('songIndex', songIndex)
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    localStorage.setItem('songIndex', songIndex)
    if(songIndex>songs.length-1){
        songIndex=0
        localStorage.setItem('songIndex', songIndex)
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On load- Select First Song
loadSong(songs[localStorage.getItem('songIndex')])
// loadSong(songs[songIndex])

// ProgressBar
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
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // Calculate Display For Duration
        const currentTimeMinutes = Math.floor(currentTime/60);

        let currentTimeSeconds = Math.floor(currentTime%60)

        if(currentTimeSeconds<10){
            currentTimeSeconds = `0${currentTimeSeconds}`
        }

        currentTimeElement.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`
    }
}
// 
function setProgressBar(e){

    const width = this.clientWidth

    const clickX = e.offsetX;
    console.log(clickX)
    const{duration} = music;
    playSong()
    music.currentTime = (clickX/width * duration)
}


// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)