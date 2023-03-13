// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
 const game = document.querySelector('#game-page')
const itemContainer = document.querySelector('.item-container');

// Score Page
const scoreContainerEl = document.querySelector('.score-container')
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

const wrongBtn = document.querySelector('.wrong')

// Equations
let questionAmount = []
let equationsArray = [];
let playerGuessArray = []
const wrongArray = []

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timerPlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0s'

// Scroll
let valueY = 0;

// play again function
function playAgain(){
  let questionAmount = []
let equationsArray = [];
let playerGuessArray = []
const wrongArray = []

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timerPlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0s'

splashPage.hidden = false;
countdownPage.hidden = true;
  game.hidden=true;
scorePage.hidden = true;
playAgainBtn.hidden=true;

}

// display score page
function displayScorePage(){
  scoreContainerEl.children[2].textContent = `${timerPlayed.toFixed(2)}s`
  scoreContainerEl.children[3].textContent = `-${wrongArray.length+1}s`
  scoreContainerEl.children[1].textContent = `${(timerPlayed+wrongArray.length+1).toFixed(2)}s`
  countdownPage.hidden = true;
  splashPage.hidden = true;
    game.hidden=true;
  scorePage.hidden = false;
  playAgainBtn.hidden=false;

}

// Check correct or wrong answer
function checkCorrect(){
  for(i in playerGuessArray){
    if(playerGuessArray[i]!==equationsArray[i].evaluated){
      wrongArray.push('wrong')
    }
    // console.log(playerGuessArray[i])
  }
}

// let myVar setInterval()
function checkTime(){
  console.log(timerPlayed)
  // finalTime++
  // console.log(finalTime)
  if(playerGuessArray.length==questionAmount){
    // console.log(finalTime)
    // console.log('player guess array: ', playerGuessArray)
    
    clearInterval(timer);

    checkCorrect()
    let score = wrongArray.length
    
    displayScorePage()
    console.log(equationsArray)
  }
}

// 
function addTime(){
  timerPlayed += 0.1;
  checkTime();
}

// Start timer when game is clicked
function startTimer(){
// Reset times
  timerPlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime, 100)
  gamePage.removeEventListener('click', startTimer)
}



// Scroll, Store User Selection in PlayerGuessArray
function select(guessedTrue){
  

  // Scroll 80px
  valueY += 80;
  itemContainer.scroll(0, valueY)

  // Add player guess to array
  return guessedTrue ? playerGuessArray.push('true'): playerGuessArray.push('false');
}


// Get random number up to a max number
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max))
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  console.log('correct equations: ', correctEquations);
  // Set amount of wrong equations
  const wrongEquations = questionAmount-correctEquations
  console.log('wrong equations: ', wrongEquations);
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9)
    secondNumber = getRandomInt(9)
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9)
    secondNumber = getRandomInt(9)
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3)
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray)
  console.log('equations array:', equationsArray)
  // equationsToDOM();
}

// Add Equations to DOM
function equationsToDOM(){
  equationsArray.forEach((equation)=>{
    // Item
    const item = document.createElement('div')
    item.classList.add('item');

    // Equation Text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;

    // Append
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  })
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations()
  equationsToDOM()

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

// Navigate from Splash to Countdown Page
function showCountdown(){
  let timer = 3
  countdown.textContent='3'
  setTimeout(()=>{
    countdown.textContent='2'}, 1000)
    
  setTimeout(()=>{
      countdown.textContent = '1'}, 2000)
  setTimeout(()=>{
    countdown.textContent='GO'
  }, 3000)
  setTimeout(()=>{
    countdownPage.hidden = true;
  splashPage.hidden = true;
    game.hidden=false
  }, 4000)
  
  // createEquations()

  countdownPage.hidden = false;
  splashPage.hidden = true;
}

function getRadioValue(){
  let radioValue;
  radioInputs.forEach((radioInput)=>{
    if(radioInput.checked){
      radioValue = radioInput.value;

    }
  })
  if(radioValue){
  showCountdown()
  }

  return radioValue;
}

// 
function selectQuestionAmount(e){
  e.preventDefault();
  questionAmount = getRadioValue()
  // createEquations()
  populateGamePage()
  console.log("Total Questions", questionAmount)

}

startForm.addEventListener('click', ()=>{
  radioContainers.forEach((radioEl)=>{
    // Remove Selected Label Styling
    radioEl.classList.remove('selected-label')
    if(radioEl.children[1].checked){
      radioEl.classList.add('selected-label');
      console.log(radioEl.children[1].value)
    }
    
  })
})

// Event Listener
startForm.addEventListener('submit', selectQuestionAmount)
gamePage.addEventListener('click', startTimer)
// wrongBtn.addEventListener('click', se)