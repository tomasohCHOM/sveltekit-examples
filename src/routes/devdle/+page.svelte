<script lang="ts">
	import { browser } from "$app/environment";
	import { onDestroy, onMount } from "svelte";
	import { WIN_MESSAGES } from "$lib/devdle/constants/messages";
	import {
		WORD_REVEAL_ANIMATION_DELAY,
		MESSAGE_DURATION,
		MESSAGE_FADING_TRANSITION
	} from "$lib/devdle/constants/values";
	import GUESSES_LIST from "$lib/devdle/constants/guesses-list.json";
	import ANSWERS_LIST from "$lib/devdle/constants/answers-list.json";
	import Board from "$lib/devdle/components/board.svelte";
	import Keyboard from "$lib/devdle/components/keyboard.svelte";

	const validGuesses = new Set<string>(GUESSES_LIST);

	let secret: string;
	let secretIndex: number;
	let guesses: string[] = [];
	let colorsFromGuesses: string[] = [];
	let currentGuess: string = "";
	let numAttempts: number = 0;
	let isGameOver: boolean = false;
	let isError: boolean = false;
	let gameOverMessage: string = "";

	$: isWordCardOpen = false;
	let popOver: HTMLDivElement;

	onMount(async () => {
		window.addEventListener("keydown", handleKeyType);
		secret = ANSWERS_LIST[Math.floor(Math.random() * ANSWERS_LIST.length)];
	});

	onDestroy(async () => {
		if (browser) window.removeEventListener("keydown", handleKeyType);
	});

	const getColorsFromGuess = (guessedWords: string[], attempts: number): void => {
		console.log(guessedWords);
		// Represented by letters (G, Y, B) - G = Correct, Y = Present, B = Absent.
		let result = ["B", "B", "B", "B", "B"];
		let answer = secret.split("");
		let guess = guessedWords[attempts];

		for (let i = 0; i < guess.length; i++) {
			if (guess[i] === answer[i]) {
				result[i] = "G";
				answer[i] = "$";
			}
		}
		for (let i = 0; i < guess.length; i++) {
			if (answer.includes(guess[i])) {
				let correctIndex: number = answer.indexOf(guess[i]);
				if (result[i] != "G") {
					result[i] = "Y";
					answer[correctIndex] = "$";
				}
			}
		}
		console.log(guess);
		colorsFromGuesses = [...colorsFromGuesses, result.join("")];
	};

	const triggerPopOver = (message: string, popOverDelay: number | undefined = undefined): void => {
		setTimeout(() => {
			popOver.textContent = message;
			popOver.style.visibility = "visible";
			popOver.style.opacity = "1";

			setTimeout(() => {
				popOver.style.opacity = "0";
				setTimeout(() => {
					popOver.style.visibility = "hidden";
				}, MESSAGE_FADING_TRANSITION);
			}, MESSAGE_DURATION);
		}, popOverDelay);
	};

	const setContainerOpen = (delay: number | undefined = undefined) => {
		setTimeout(() => {
			isWordCardOpen = true;
		}, delay);
	};

	const handleSubmit = (): void => {
		// Trigger error if not a valid guess or doesn't have 5 characters
		if (currentGuess.length !== 5) {
			isError = true;
			setTimeout(() => (isError = false), 250);
			triggerPopOver("Not enough letters");
			return;
		}
		if (!validGuesses.has(currentGuess)) {
			isError = true;
			setTimeout(() => (isError = false), 250);
			triggerPopOver("Not a valid word");
			return;
		}
		// Append the guess and get the color tiles
		guesses = [...guesses, currentGuess];
		getColorsFromGuess(guesses, numAttempts);
		numAttempts++;

		// Game over scenarios
		if (currentGuess === secret || numAttempts === 6) {
			if (browser) window.removeEventListener("keydown", handleKeyType);
			setTimeout(() => {
				isGameOver = true;
			}, WORD_REVEAL_ANIMATION_DELAY + MESSAGE_DURATION);
			if (currentGuess === secret) {
				gameOverMessage = WIN_MESSAGES[numAttempts - 1];
			} else {
				gameOverMessage = secret;
			}
			triggerPopOver(gameOverMessage, WORD_REVEAL_ANIMATION_DELAY);
			setContainerOpen(WORD_REVEAL_ANIMATION_DELAY + MESSAGE_DURATION);
			currentGuess = "";
		} else {
			// Word reveal animation
			currentGuess = "";
			if (browser) window.removeEventListener("keydown", handleKeyType);
			setTimeout(() => {
				if (browser) window.addEventListener("keydown", handleKeyType);
			}, WORD_REVEAL_ANIMATION_DELAY);
		}
	};

	const handleKeyType = (event: KeyboardEvent) => {
		if (isGameOver || event.ctrlKey) return;
		if (event.key === "Backspace") currentGuess = currentGuess.slice(0, -1);
		else if (event.key === "Enter") handleSubmit();
		if (currentGuess.length === 5) return;
		if (event.key >= "a" && event.key <= "z") currentGuess += event.key;
	};

	const resetGame = () => {
		guesses = [];
		colorsFromGuesses = [];
		currentGuess = "";
		numAttempts = 0;
		isGameOver = false;
		isError = false;
		gameOverMessage = "";
		if (browser) window.addEventListener("keypress", handleKeyType);
		secretIndex = Math.floor(Math.random() * ANSWERS_LIST.length);
		secret = ANSWERS_LIST[secretIndex];
	};
</script>

<svelte:head>
	<title>Devdle</title>
	<link rel="stylesheet" href="/devdle/styles.css" />
</svelte:head>

<main>
	<h1>Devdle</h1>
	<div bind:this={popOver} class="pop-over"></div>
	<Board bind:guesses bind:colorsFromGuesses bind:currentGuess bind:numAttempts bind:isError />

	{#if isGameOver}
		<button class="game-over-btn" on:click={() => resetGame()}> Generate New Word </button>
	{/if}
	<Keyboard bind:isGameOver bind:currentGuess bind:guesses answer={secret} {handleSubmit} />
</main>

<style>
	main {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	h1 {
		font-weight: 700;
		font-size: 2.5rem;
	}

	.pop-over {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		top: 15%;
		left: 50%;
		z-index: 5;
		transform: translate(-50%, -50%);
		transition: opacity 0.125s ease-in-out;
		background-color: var(--color-contrast);
		color: var(--color-primary);
		padding: 0.5rem 0.5rem;
		border-radius: 0.25rem;
	}

	.game-over-btn {
		color: var(--color-contrast);
	}
</style>
