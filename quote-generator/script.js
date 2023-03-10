const url = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');
complete();

// Show Loading
function loading(){
    quoteContainer.classList.add('hide');
    loader.classList.remove('hide');
    // loader.hidden = false;
    // quoteContainer.hidden = true;
}
// Hide Loading
function complete(){
    quoteContainer.classList.remove('hide');
    loader.classList.add('hide');
    // quoteContainer.hidden = false;
    // loader.hidden = true;
    
}




const quoteList = async()=>{
    loading();
    const quote = await fetch(url);
    const response = await quote.json();
    displayQuote(response); 
}

const displayQuote=(data)=>{
    const randNum= Math.floor(Math.random()*1600+1);
    const randQuote = data[randNum];
    const content = randQuote.text;
    const author = randQuote.author;
    document.getElementById('quote').textContent = content;
    document.getElementById('author').textContent = author;
    complete();

    // console.log(data)
    // console.log(randNum);
    // counter = ''
    // for(i in data){
    //     if(counter===data[i].tag){

    //     }
    //     else{
    //       console.log(data[i].tag)  
    //     }
    //     counter = data[i].tag
        
    // }
}

document.getElementById('new-quote').addEventListener('click', (event)=>{
    event.preventDefault();
    loading();
    quoteList();
    
})

