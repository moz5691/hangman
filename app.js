const wordList = [
  'Cat',
  'Monkey',
  'America',
  'Atlanta',
  'New York',
  'Javascript',
  'Sunshine',
  'Spring',
  'Peace',
  'Love',
  'Fruit'
];

const Hangman = function(word, noOfGuess) {
  this.word = word.toLowerCase().split('');
  this.noOfGuess = noOfGuess;
  this.guessLetter = [];
  this.gameStatus = 'playing';
};

Hangman.prototype.findPuzzle = function() {
  let found = '';
  this.word.forEach(letter => {
    if (this.guessLetter.includes(letter) || this.guessLetter == ' ') {
      found += letter + ' ';
    } else {
      found += '_ ';
    }
  });
  return found.toUpperCase();
};

Hangman.prototype.guessWork = function(guess) {
  guess = guess.toLowerCase();
  const isGuessUnique = !this.guessLetter.includes(guess);
  const isGuessNotInWord = !this.word.includes(guess);
  if (this.gameStatus !== 'playing') {
    return;
  }

  if (isGuessUnique) {
    this.guessLetter.push(guess);
  }
  if (isGuessUnique && isGuessNotInWord) {
    this.noOfGuess--;
  }
  console.log(this.guessLetter);
  console.log(this.noOfGuess);
  this.updateStatus();
};

Hangman.prototype.updateStatus = function() {
  // return status, playing, finished, failed.
  let isFinished = true;
  this.word.forEach(letter => {
    if (this.guessLetter.includes(letter)) {
      //  isFinished = true;
    } else {
      isFinished = false;
    }
  });
  if (this.noOfGuess === 0) {
    this.gameStatus = 'failed';
  }
  if (this.noOfGuess > 0 && isFinished) {
    this.gameStatus = 'finished';
  }
  if (this.noOfGuess > 0 && !isFinished) {
    this.gameStatus = 'playing';
  }
  console.log(this.noOfGuess, isFinished);
};
Hangman.prototype.displayStatus = function() {
  livesId.innerHTML = `<p>Lives left: ${this.noOfGuess}</p>`;
  if (this.gameStatus === 'failed') {
    gameStatusId.innerHTML = `<p>Failed, the word is ${this.word
      .join('')
      .toUpperCase()}</p>`;
  } else if (this.gameStatus === 'finished') {
    gameStatusId.innerHTML = `<p>You are correct!</p>`;
  } else {
    gameStatusId.innerHTML = `<p>Playing</p>`;
  }
};
// DOM manipulation and Event Handler
const gameId = document.getElementById('game-field');
const livesId = document.getElementById('lives-field');
const gameStatusId = document.getElementById('game-status-field');

// Randomizer for choosing word.
const chosenWord = function() {
  const randomNum = Math.floor(Math.random() * wordList.length);
  return wordList[randomNum];
};
// Initial layout of chosen word.
const choiceOfWord = chosenWord();
console.log(choiceOfWord);
gameId.textContent = choiceOfWord.replace(/[a-zA-Z]/g, '_ ');

const game2 = new Hangman(choiceOfWord, 10);
game2.displayStatus();

// callback function for event handler
const gameMain = function(e) {
  e.preventDefault();
  const key = e.key;
  guess = key;
  game2.guessWork(guess);
  game2.displayStatus();
  gameId.textContent = game2.findPuzzle();
};

window.addEventListener('keydown', gameMain);
