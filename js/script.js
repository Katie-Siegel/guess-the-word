/////////////////////////////////////  Global Variables  //////////////////////////////
//Selector for Guessed Letters List
const guessedLettersList = document.querySelector(
	'.guessed-letters'
);
// Selector for "Guess!" Button
const button = document.querySelector('.guess');
//Selector for the input field where the player will guess a letter
const guessInput =
	document.querySelector('.letter');
//Selector for the paragraph where the word will appear
const wordInProgress = document.querySelector(
	'.word-in-progress'
);
//Selector for the paragraph where remaing guesses are displayed
const remaingGuesses =
	document.querySelector('.remaining');
//Selector for the <span> where the number of guesses left are displayed
const span = document.querySelector('span');
//Selector for guess response paragraph
const guessResponse =
	document.querySelector('.message');
//Selector for "Play agan" button
const playAgain = document.querySelector(
	'.play-again'
);
//Selector for win gif
const winGif = document.querySelector('.win-gif');
//Selector for lost gif
const lostGif =
	document.querySelector('.lost-gif');

///  Global Variables - Used in Funcations  ///
//Starting word for game
let word = 'magnolia';
//Starting array for player guesses
let guessedLetters = [];
//Staring number of guesses
let remainingGuessesNumber = 8; //must be "let" so that the variable can be updated

///  Active Functions  ///

//Function to pull a random word list from API
const getWord = async function () {
	const res = await fetch(
		'https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'
	);
	const data = await res.text();
	// console.log(data);
	const wordArray = data.split('\n');
	// console.log(wordArray);
	let randomWord =
		wordArray[
			Math.floor(Math.random() * wordArray.length)
		];
	// console.log(randomWord);
	word = randomWord.trim();
	placeholder(word);
};

//Start Game
getWord();

// Display our symbol as placeholders for the chosen word's letters
const placeholder = function (word) {
	const placeholderLetters = [];
	for (const letter of word) {
		console.log(letter);
		placeholderLetters.push('●');
	}
	wordInProgress.innerText =
		placeholderLetters.join('');
};

placeholder(word);

//Activates operations connected to the "Guess!" button
button.addEventListener('click', function (e) {
	e.preventDefault(); //prevents page from reloading everytime button is pressed
	const guess = guessInput.value; //Detects the value entered into the input box
	// console.log(input);
	const goodGuess = valueCheck(guess);
	makeGuess(goodGuess);
	guessInput.value = ''; //Clears the input box
});

//Check's that the input is a letter
const valueCheck = function (input) {
	const acceptedLetter = /[a-zA-Z]/;
	if (input.length === 0) {
		guessResponse.innerText =
			'Please enter a letter';
	} else if (input.length > 1) {
		guessResponse.innerText =
			'Please enter one letter at a time';
	} else if (!input.match(acceptedLetter)) {
		guessResponse.innerText =
			'Please enter a valid letter';
	} else {
		guessResponse.innerText = 'Great Guess!';
		return input;
	}
};

//Checks the input and adds it to the guessedLetter array if it's not already there
const makeGuess = function (guessInput) {
	guessInput = guessInput.toUpperCase();
	if (guessedLetters.includes(guessInput)) {
		guessResponse.innerText =
			"You've already guessed this letter. Please guess a new one.";
	} else {
		guessedLetters.push(guessInput);
		console.log(guessedLetters);
		wordInProgressUpdate(guessedLetters);
		guessesRemaining(guessInput);
		pageUpdate();
	}
};

// Adds guessed letters to the page. Based off the content of the guessedLetters array
const pageUpdate = function () {
	guessedLettersList.innerHTML = ''; //Clear current list
	for (const letter of guessedLetters) {
		const listItem = document.createElement('li');
		listItem.innerText = letter;
		guessedLettersList.append(listItem);
	}
};

//Updates answer display when a correct letter is guessed and checks for winCondition()
const wordInProgressUpdate = function (
	guessedLetters
) {
	const wordUpper = word.toUpperCase();
	const wordArray = wordUpper.split('');
	// console.log(wordArray);
	const correctGuess = [];
	for (const letter of wordArray) {
		if (guessedLetters.includes(letter)) {
			correctGuess.push(letter.toUpperCase());
		} else {
			correctGuess.push('●');
		}
	}
	wordInProgress.innerText =
		correctGuess.join('');
	winCondtion();
};

//Determines if the player has completed the word
const winCondtion = function () {
	if (
		word.toUpperCase() ===
		wordInProgress.innerText
	) {
		guessResponse.classList.add('win');
		guessResponse.innerText =
			'Omigod! You guessed correct the word! Wicked!';
		winGif.classList.remove('hide');
		startOver();
	}
};

// Tracks number of guesses and updates players guess status message
const guessesRemaining = function (guess) {
	const wordUpper = word.toUpperCase();
	const guessUpper = guess.toUpperCase();
	if (wordUpper.includes(guessUpper)) {
		guessResponse.innerText = `That's right!`;
	} else {
		guessResponse.innerText = `There's no ${guess} in this word`;
		remainingGuessesNumber -= 1;
	}
	if (remainingGuessesNumber === 0) {
		guessResponse.classList.add('lost');
		guessResponse.innerHTML = `Game Over. Major Bummer. <br>Your word was <span class="stand-out">${word}</span>.`;
		span.innerText = `${remainingGuessesNumber} guesses`;
		lostGif.classList.remove('hide');
		startOver();
	} else {
		span.innerText = `${remainingGuessesNumber} guesses`;
	}
};

//Start game over without reloading window
const startOver = function () {
	button.classList.add('hide');
	remaingGuesses.classList.add('hide');
	guessedLettersList.classList.add('hide');
	playAgain.classList.remove('hide');
};

//Activation buttion for Play Again reset
playAgain.addEventListener('click', function (e) {
	guessResponse.classList.remove('win');
	guessResponse.classList.remove('lost');
	guessResponse.innerText = '';
	guessedLettersList.innerHTML = '';
	remainingGuessesNumber = 8;
	guessedLetters = [];
	span.innerText = `${remainingGuessesNumber} guesses`;
	button.classList.remove('hide');
	remaingGuesses.classList.remove('hide');
	guessedLettersList.classList.remove('hide');
	playAgain.classList.add('hide');
	winGif.classList.add('hide');
	lostGif.classList.add('hide');
	getWord();
});
