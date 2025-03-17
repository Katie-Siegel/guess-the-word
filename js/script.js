/////////////////////////////////////  Global Variables  //////////////////////////////
//Selector for Guessed Letters List
const guessedLettersList = document.querySelector(
	'.guessed-letters'
);
// Selector for "Guess!" Button
const button = document.querySelector('.guess');
//Selector for the input field where the player will guess a letter
const guessInput =
	document.querySelector('input');
//Selector for the paragraph where the word will appear
const wordInProgress = document.querySelector(
	'.word-in-progress'
);
//Selector for the paragraph where remaing guesses are displayed
const remaingGuesses =
	document.querySelector('.remaining');
//Selector for the <span> where guesses are displayed
const span = document.querySelector('span');
//Selector for guess response paragraph
const guessResponse =
	document.querySelector('.message');
//Selector for "Play agan" button
const playAgain = document.querySelector(
	'.play-again'
);
//Starting word for game
const word = 'magnolia';

//Determines number of ● displayed instead of letters at start
const wordLength = function () {
	const number = word.length;
	wordInProgress.innerText = '●'.repeat(number);
	console.log(wordInProgress);
};

wordLength(word);

button.addEventListener('click', function (e) {
	e.preventDefault();
	let input = guessInput.value;
	console.log(input);
	guessInput.value = '';
});
