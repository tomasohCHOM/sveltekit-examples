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

	const MAX_ATTEMPTS = 6;
	const WORD_LENGTH = 5;
	const validGuesses = new Set<string>(GUESSES_LIST);

	// Game state
	let secret: string;
	let secretIndex: number;
	let guesses: string[] = [];
	let colorsFromGuesses: string[] = [];
	let currentGuess: string = "";
	let numAttempts: number = 0;
	let isGameOver: boolean = false;
	let isError: boolean = false;
	let gameOverMessage: string = "";

	let popOver: HTMLDivElement;

	onMount(async () => {
		window.addEventListener("keydown", handleKeyType);
		secret = selectRandomWord();
	});

	onDestroy(async () => {
		if (browser) window.removeEventListener("keydown", handleKeyType);
	});

	/**
	 * Select a random word from the answers list
	 */
	function selectRandomWord(): string {
		secretIndex = Math.floor(Math.random() * ANSWERS_LIST.length);
		return ANSWERS_LIST[secretIndex];
	}

	/**
	 * Calculate color codes for the current guess
	 * G = Correct (green), Y = Present (yellow), B = Absent (gray)
	 */
	function getColorsFromGuess(guessedWords: string[], attempts: number): void {
		const result = Array(WORD_LENGTH).fill("B");
		const answerLetters = secret.split("");
		const guessLetters = guessedWords[attempts].split("");

		// First pass: find exact matches (correct position)
		for (let i = 0; i < WORD_LENGTH; i++) {
			if (guessLetters[i] === answerLetters[i]) {
				result[i] = "G";
				answerLetters[i] = "$"; // Mark as used
			}
		}
		// Second pass: find letters in wrong positions
		for (let i = 0; i < WORD_LENGTH; i++) {
			// Skip already matched letters
			if (result[i] === "G") continue;
			const position = answerLetters.indexOf(guessLetters[i]);
			if (position !== -1) {
				result[i] = "Y";
				answerLetters[position] = "$"; // Mark as used
			}
		}
		colorsFromGuesses = [...colorsFromGuesses, result.join("")];
	}

	/**
	 * Display a temporary message in the pop-over
	 */
	function showPopOverMessage(message: string, delay: number = 0): void {
		setTimeout(() => {
			// Show message
			popOver.textContent = message;
			popOver.style.visibility = "visible";
			popOver.style.opacity = "1";

			// Hide message after duration
			setTimeout(() => {
				popOver.style.opacity = "0";
				setTimeout(() => {
					popOver.style.visibility = "hidden";
				}, MESSAGE_FADING_TRANSITION);
			}, MESSAGE_DURATION);
		}, delay);
	}

	function handleSubmit(): void {
		// Validate guess
		if (!isValidGuess(currentGuess)) return;

		// Process the guess
		guesses = [...guesses, currentGuess];
		getColorsFromGuess(guesses, numAttempts);
		numAttempts++;

		// Check for game over conditions
		if (isWinningGuess() || isMaxAttemptsReached()) {
			handleGameOver();
		} else {
			handleContinueGame();
		}
	}

	/**
	 * Validate if the current guess is acceptable
	 */
	function isValidGuess(guess: string): boolean {
		// Check word length
		if (guess.length !== WORD_LENGTH) {
			showErrorMessage("Not enough letters");
			return false;
		}

		// Check if word is in the valid guesses list
		if (!validGuesses.has(guess)) {
			showErrorMessage("Not a valid word");
			return false;
		}

		return true;
	}

	/**
	 * Show error message and visual feedback
	 */
	function showErrorMessage(message: string): void {
		isError = true;
		setTimeout(() => (isError = false), 250);
		showPopOverMessage(message);
	}

	/**
	 * Check if the current guess is the winning word
	 */
	function isWinningGuess(): boolean {
		return currentGuess === secret;
	}

	/**
	 * Check if maximum attempts have been reached
	 */
	function isMaxAttemptsReached(): boolean {
		return numAttempts === MAX_ATTEMPTS;
	}

	/**
	 * Handle game over state
	 */
	function handleGameOver(): void {
		// Remove keyboard listener
		if (browser) window.removeEventListener("keydown", handleKeyType);

		// Set game over state after animation completes
		setTimeout(() => {
			isGameOver = true;
		}, WORD_REVEAL_ANIMATION_DELAY + MESSAGE_DURATION);

		// Set appropriate message
		gameOverMessage = isWinningGuess() ? WIN_MESSAGES[numAttempts - 1] : secret;
		// Show message and open word card
		showPopOverMessage(gameOverMessage, WORD_REVEAL_ANIMATION_DELAY);
		// Clear current guess
		currentGuess = "";
	}

	/**
	 * Handle continuing the game after a valid guess
	 */
	function handleContinueGame(): void {
		currentGuess = "";
		// Temporarily disable keyboard during animation
		if (browser) window.removeEventListener("keydown", handleKeyType);
		setTimeout(() => {
			if (browser) window.addEventListener("keydown", handleKeyType);
		}, WORD_REVEAL_ANIMATION_DELAY);
	}

	/**
	 * Handle keyboard input
	 */
	function handleKeyType(event: KeyboardEvent): void {
		if (isGameOver || event.ctrlKey) return;

		// Handle special keys
		if (event.key === "Backspace") {
			currentGuess = currentGuess.slice(0, -1);
		} else if (event.key === "Enter") {
			handleSubmit();
		}

		// Don't add more letters if word is complete
		if (currentGuess.length === WORD_LENGTH) return;

		// Add letter to current guess if it's a valid character
		if (event.key >= "a" && event.key <= "z") {
			currentGuess += event.key;
		}
	}

	/**
	 * Reset the game state for a new game
	 */
	function resetGame(): void {
		// Reset game state
		guesses = [];
		colorsFromGuesses = [];
		currentGuess = "";
		numAttempts = 0;
		isGameOver = false;
		isError = false;
		gameOverMessage = "";

		// Re-add event listener
		if (browser) window.addEventListener("keypress", handleKeyType);

		// Select a new random word
		selectRandomWord();
	}
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
