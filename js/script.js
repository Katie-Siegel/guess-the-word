const guessedLettersList = document.querySelector(
	'.guessed-letters'
);
const button = document.querySelector('.guess');
const guessInput =
	document.querySelector('.letter');
const wordInProgress = document.querySelector(
	'.word-in-progress'
);
const remaingGuesses =
	document.querySelector('.remaining');
const span = document.querySelector('span');
const guessResponse =
	document.querySelector('.message');
const playAgain = document.querySelector(
	'.play-again'
);
const winGif = document.querySelector('.win-gif');
const lostGif =
	document.querySelector('.lost-gif');

let word = 'magnolia';
let guessedLetters = [];
let remainingGuessesNumber = 8;

const getWord = async function () {
	const res = await fetch(
		'https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'
	);
	const data = await res.text();
	const wordArray = data.split('\n');
	let randomWord =
		wordArray[
			Math.floor(Math.random() * wordArray.length)
		];
	word = randomWord.trim();
	placeholder(word);
};


getWord();

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

button.addEventListener('click', function (e) {
	e.preventDefault();
	guessResponse.innerText = "";
	const guess = guessInput.value;
	const goodGuess = valueCheck(guess);
	if (goodGuess) {
		makeGuess(guess);
	}
	guessInput.value = '';
});

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

const pageUpdate = function () {
	guessedLettersList.innerHTML = '';
	for (const letter of guessedLetters) {
		const listItem = document.createElement('li');
		listItem.innerText = letter;
		guessedLettersList.append(listItem);
	}
};

const wordInProgressUpdate = function (
	guessedLetters
) {
	const wordUpper = word.toUpperCase();
	const wordArray = wordUpper.split('');
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
	winCondition();
};

const winCondition = function () {
	if (
		word.toUpperCase() ===
		wordInProgress.innerText
	) {
		guessResponse.classList.add('win');
		guessResponse.innerText = `Omigod! You guessed the correct word! Wicked!`;
		winGif.classList.remove('hide');
		startOver();
	}
};

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
	winCondition();
};

const startOver = function () {
	button.classList.add('hide');
	remaingGuesses.classList.add('hide');
	guessedLettersList.classList.add('hide');
	playAgain.classList.remove('hide');
};

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
