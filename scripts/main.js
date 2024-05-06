const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const endScreen = document.getElementById('endScreen');

let score = 0;
const scoreBox =  document.getElementById('scoreBox');
scoreBox.innerHTML = score;

let games = 0;
const gamesBox =  document.getElementById('gamesBox');
gamesBox.innerHTML = games;
const gamesContainer = document.getElementById('gamesContainer')
gamesContainer.style.visibility = 'hidden';

const totalGames =  document.getElementsByClassName('totalGames');

let difficulty;
let playedSequenceNO;

const glass1 = document.getElementById('glass1');
const glass2 = document.getElementById('glass2');
const glass3 = document.getElementById('glass3');
const glass4 = document.getElementById('glass4');
const glass5 = document.getElementById('glass5');

const sound1 = new Audio("./audio/glass1.wav");
const sound2 = new Audio("./audio/glass2.wav");
const sound3 = new Audio("./audio/glass3.wav");
const sound4 = new Audio("./audio/glass4.wav");
const sound5 = new Audio("./audio/glass5.wav");

sound1.playbackRate = 1;
sound2.playbackRate = 1;
sound3.playbackRate = 1;
sound4.playbackRate = 1;
sound5.playbackRate = 1;

let glasses = ['glass1', 'glass2', 'glass3', 'glass4', 'glass5'];
let playerSequence = [];
let sequenceNumber = playedSequenceNO;

const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const hard = document.getElementById('hard');
const ContinueBtn = document.getElementById('continueBtn');

easy.addEventListener('click', () => {
  startGame('easy');
});
medium.addEventListener('click', () => {
  startGame('medium');
});
hard.addEventListener('click', () => {
  startGame('hard');
});

ContinueBtn.addEventListener('click', () => {
  startScreen.style.display = 'flex';
  gameScreen.style.display = 'none';
  endScreen.style.display = 'none';

  score = 0;
  scoreBox.innerHTML = score;
  games = 0;
  gamesBox.innerHTML = games; 
  gamesContainer.style.visibility = 'hidden';
  glasses = [ 'glass1', 'glass2', 'glass3', 'glass4', 'glass5' ];
  glassSequence = [];
  playerSequence = [];
  clearInterval(intervalId); // Clear the interval here
  clearInterval(intervalId2); // Also clear the intervalId2 if it's still running
});


const liquid1 = document.getElementById('liquid1');
const liquid2 = document.getElementById('liquid2');
const liquid3 = document.getElementById('liquid3');
const liquid4 = document.getElementById('liquid4');
const liquid5 = document.getElementById('liquid5');

function startGame(diff) {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  endScreen.style.display = 'none';

  difficulty = diff;

  score = 0;
  scoreBox.innerHTML = score;
  games = 0;
  gamesBox.innerHTML = games;
  gamesContainer.style.visibility = 'hidden';

  glasses = ['glass1', 'glass2', 'glass3', 'glass4', 'glass5'];
  glassSequence = [];
  playerSequence = [];
  setPlayedSequenceNO();
  sequenceNumber = playedSequenceNO;

  clearInterval(intervalId); // Clear the previous interval
  clearInterval(intervalId2); // Clear intervalId2 if it's set

  intervalId = setInterval(gameEndLogic, 1); // Restart the game end check interval

  // Generate the glass sequence only once when starting the game
  createGlassSequence(glasses);
}


function setPlayedSequenceNO() {
  let totalGamesElements = document.getElementsByClassName('totalGames');
  if (difficulty === 'easy') {
    playedSequenceNO = 5;
    for (let i = 0; i < totalGamesElements.length; i++) {
      totalGamesElements[i].innerHTML = playedSequenceNO;
    }
  } else if (difficulty === 'medium') {
    playedSequenceNO = 7;
    for (let i = 0; i < totalGamesElements.length; i++) {
      totalGamesElements[i].innerHTML = playedSequenceNO;
    }
  } else if (difficulty === 'hard') {
    playedSequenceNO = 10;
    for (let i = 0; i < totalGamesElements.length; i++) {
      totalGamesElements[i].innerHTML = playedSequenceNO;
    }
  }
  // console.log('setplayed', playedSequenceNO);
}

let glassSequence = [];

let sequenceGenerating = false;

// CreateGlassSequence()
function createGlassSequence(array) {
  sequenceGenerating = true; // Set the flag to true at the start of sequence generation
  const interval = setInterval(() => {
    if (sequenceNumber === 0 || array.length === 0) {
      clearInterval(interval); // Stop the interval if sequenceNumber is reached or if array is empty
      gamesContainer.style.visibility = 'visible';
      // console.log("Sequence complete");
      sequenceGenerating = false; // Set the flag back to false when sequence generation completes
      return;
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * array.length);
    // Select the element at the random index
    const randomGlass = array[randomIndex];
    // Add the selected element to the sequence
    glassSequence.push(randomGlass);
    
    // Log the resulting sequence
    // console.log(glassSequence);

    // Play sounds or perform other actions as needed
    switch (randomGlass) {
      case 'glass1':
        liquid1.innerHTML = particlesHTML;
        removeParticlesWithFade();
        sound1.play();
        break;
      case 'glass2':
        liquid2.innerHTML = particlesHTML;
        removeParticlesWithFade();
        sound2.play();
        break;
      case 'glass3':
        liquid3.innerHTML = particlesHTML;
        removeParticlesWithFade();
        sound3.play();
        break;
      case 'glass4':
        liquid4.innerHTML = particlesHTML;
        removeParticlesWithFade();
        sound4.play();
        break;
      case 'glass5':
        liquid5.innerHTML = particlesHTML;
        removeParticlesWithFade();
        sound5.play();
        break;
    }

    // Decrement sequenceNumber only if it's greater than 0
    if (sequenceNumber > 0) {
      sequenceNumber--;
    }
  }, 1600);
}

const particlesHTML = `
  <div class="particles" id="particle1"></div>
  <div class="particles" id="particle2"></div>
  <div class="particles" id="particle3"></div>
  <div class="particles" id="particle4"></div>
  <div class="particles" id="particle5"></div>
  <div class="particles" id="particle6"></div>
  <div class="particles" id="particle7"></div>
  <div class="particles" id="particle8"></div> 
`;

let clickAllowed = true; // Flag variable to indicate if clicking is allowed

function disableClickForInterval() {
  clickAllowed = false; // Disable clicking
  setTimeout(() => {
    clickAllowed = true; // Enable clicking after 500ms
  }, 500);
}

glass1.addEventListener('click', () => {

  if (!sequenceGenerating && clickAllowed) {
    disableClickForInterval(); 
    
    playerSequence.push('glass1');
    sound1.play(); 
    // console.log(playerSequence);
  
    games++;
    gamesBox.innerHTML = games;
  
    liquid1.innerHTML = particlesHTML;
    removeParticlesWithFade();
  
    // checkSequences(glassSequence, playerSequence);
    // console.log(checkSequences(glassSequence, playerSequence));
  }
});

glass2.addEventListener('click', () => {

  if (!sequenceGenerating && clickAllowed) {
    disableClickForInterval(); 

    playerSequence.push('glass2');
    sound2.play(); 
  
    games++
    gamesBox.innerHTML = games;
  
    liquid2.innerHTML = particlesHTML;
    removeParticlesWithFade();
  
    // console.log(playerSequence);
    // checkSequences(glassSequence, playerSequence);
    // console.log(checkSequences(glassSequence, playerSequence));
  }
});

glass3.addEventListener('click', () => {

  if (!sequenceGenerating && clickAllowed) {
    disableClickForInterval(); 

    playerSequence.push('glass3');
    sound3.play(); 
  
    games++
    gamesBox.innerHTML = games;
    // console.log(playerSequence);
  
    liquid3.innerHTML = particlesHTML;
    removeParticlesWithFade();
  
    // checkSequences(glassSequence, playerSequence);
    // console.log(checkSequences(glassSequence, playerSequence));
  }
});

glass4.addEventListener('click', () => {

  if (!sequenceGenerating && clickAllowed) {
    disableClickForInterval(); 

    playerSequence.push('glass4');
    sound4.play(); 
  
    games++
    gamesBox.innerHTML = games;
    // console.log(playerSequence);
  
    liquid4.innerHTML = particlesHTML;
    removeParticlesWithFade();
  
    // checkSequences(glassSequence, playerSequence);
    // console.log(checkSequences(glassSequence, playerSequence));
  }
});

glass5.addEventListener('click', () => {

  if (!sequenceGenerating && clickAllowed) {
    disableClickForInterval(); 

  playerSequence.push('glass5');
  sound5.play(); 

  games++
  gamesBox.innerHTML = games;

  liquid5.innerHTML = particlesHTML;
  removeParticlesWithFade();

  // console.log(playerSequence);
  // checkSequences(glassSequence, playerSequence);
  // console.log(checkSequences(glassSequence, playerSequence));

  }
});

function checkSequences(array1, array2) {
  let correctCount = 0;
  for (let i = 0; i < Math.min(array1.length, array2.length); i++) {
    if (array1[i] === array2[i]) {
      correctCount++;
    } else {
      break;
    }
  }
  return correctCount; 
}

let intervalId;
let intervalId2;

function gameEndLogic() {
  const correctChildren = checkSequences(glassSequence, playerSequence);
  if (playerSequence.length > 0 && playerSequence.length === playedSequenceNO && playerSequence.length === playedSequenceNO) {
    scoreBox.innerHTML = correctChildren;
    glasses = ['glass1', 'glass2', 'glass3', 'glass4', 'glass5'];
    glassSequence = [];
    playerSequence = [];
    clearInterval(intervalId);
    clearInterval(intervalId2); // Clear intervalId2 if it's set
    intervalId2 = setInterval(gameEndStatement, 1000); // Set intervalId2 for game end statement
  }
}

function gameEndStatement() {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'none';
  endScreen.style.display = 'flex';
}

intervalId = setInterval(gameEndLogic, 1);

function removeParticlesWithFade() {

  void liquid1.offsetWidth;

  const particles = document.querySelectorAll('.particles');
  particles.forEach(particle => {
    particle.style.transition = 'opacity 0.8s ease';
    particle.style.opacity = '0';
  });


  setTimeout(() => {
    liquid1.innerHTML = '';
  }, 800); 
}