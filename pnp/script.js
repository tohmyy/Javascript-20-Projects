const videoELement = document.getElementById('video');
const button = document.getElementById('button');

async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();// creates a constant that holds media data, waiting until user selects screen/window to capture/share

        videoELement.srcObject = mediaStream;
        videoELement.onloadedmetadata = () =>{
            videoELement.play()
        }
    }
    catch(err){
        console.log('there was an error here o, fix it: \n \n', err);
    }
}

button.addEventListener('click', async (event)=>{
    button.disabled = true;
    await videoELement.requestPictureInPicture();
    
    button.disabled = false;
    videoELement.classList.add('hide')
})
selectMediaStream()