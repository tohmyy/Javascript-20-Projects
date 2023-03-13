iconElement = document.querySelector('.far')

const playerChoiceEl = document.getElementById('playerChoice')
const playerScoreEl = document.getElementById('playerScore')
const computerChoiceEl = document.getElementById('computerChoice')
const computerScoreEl = document.getElementById('computerScore')
const resultText = document.getElementById('resultText')

const playerRock = document.getElementById('playerRock')
const playerPaper = document.getElementById('playerPaper')
const playerScissors = document.getElementById('playerScissors')
const playerLizard = document.getElementById('playerLizard')
const playerSpock = document.getElementById('playerSpock')

const computerRock = document.getElementById('computerRock')
const computerPaper = document.getElementById('computerPaper')
const computerScissors = document.getElementById('computerScissors')
const computerLizard = document.getElementById('computerLizard')
const computerSpock = document.getElementById('computerSpock')

const allGameIcons = document.querySelectorAll('.far')

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

// const win = choice

// EVENT LISTENERS
// iconElement.addEventLister('click', ()=>{

// })


// Reset Selected Icon
function resetSelected(){
  allGameIcons.forEach(icon=>{
    icon.classList.remove('selected')
  })
}

// Main Game

// Random computer choice
function computerRandomChoice(){
  const computerChoiceNumber = Math.random();
  if(computerChoiceNumber<0.2){
    computerChoice = 'rock';
  }
  else if(computerChoiceNumber<=0.4){
    computerChoice='paper'
  }
  else if(computerChoiceNumber<=0.6){
    computerChoice='scissors'
  }
  else if(computerChoiceNumber<=0.8){
    computerChoice='lizard'
  }
  else{
    computerChoice='spock'
  }
  return computerChoice;
}

// Add Computer Choice & Styling
function displayComputerChoice(computerChoice){
  
  // console.log(computerRandomChoice())
  // let randChoice = computerRandomChoice()

  console.log(computerChoice)
  switch(computerChoice){
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock'
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper'
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors'
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard'
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock'
      break;
    default:
      break;
  }
}
 


// Check result, increase score, updates
function updateScore(playerChoice){
  console.log('playerChoice:', playerChoice)
  // console.log(playerChoice, randInt)
  console.log("computerChoice:", randInt)

  if(playerChoice===randInt){
    resultText.textContent = "It's a tie"
  }
  else{
    const choice = choices[playerChoice]
    console.log("index:", choice.defeats.indexOf(randInt))
    if(choice.defeats.indexOf(randInt)>-1){
      resultText.textContent='YOU WON!'
      playerScoreNumber++
      playerScoreEl.textContent = playerScoreNumber
    }
    else{
      resultText.textContent='YOU LOST!'
      computerScoreNumber++
      computerScoreEl.textContent = computerScoreNumber
    }
  }



}

// Processes each turn
function checkResult(playerChoice){
  resetSelected();
  computerRandomChoice();
  displayComputerChoice(randInt);
  updateScore(playerChoice)
}

// stores value of the random computer choice
let randInt = ''


// Passing player selection & styling icons
function select(playerChoice){
  
  // resetSelected();
  randInt = computerRandomChoice()

  checkResult(playerChoice)

  // console.log(String(randInt))
  displayComputerChoice(randInt)

  
  // for(i in choices){if(choices[i].name == computerRandomChoice()){console.log('hello')}else{console.log('goodbye')}}

  switch(playerChoice){
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock'
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper'
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors'
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard'
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock'
      break;
    default:
      break;
  }
}

function resetGame(){
  playerScoreNumber=0
  computerScoreNumber=0
  
  resultText.textContent = ''
  playerScoreEl.textContent = playerScoreNumber
  computerScoreEl.textContent = computerScoreNumber
  playerScoreEl.textContent = ''
  computerScoreEl.textContent = ''
  resetSelected();

}

// EVENT LISTENER
document.querySelector('.fas').addEventListener('click', resetGame)


