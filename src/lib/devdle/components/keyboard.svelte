<script lang="ts">
	type Props = {
		currentGuess: string;
		guesses: string[];
		answer: string;
		isGameOver: boolean;
		handleSubmit: () => void;
	};
	let {
		answer,
		handleSubmit,
		guesses = $bindable(),
		currentGuess = $bindable(),
		isGameOver = $bindable()
	}: Props = $props();

	// Keyboard layout
	const keys = ["qwertyuiop", "asdfghjkl", "<zxcvbnm>"];

	// Special key mappings
	const specialKeys = {
		"<": { display: "DEL", action: () => (currentGuess = currentGuess.slice(0, -1)) },
		">": { display: "ENTER", action: handleSubmit }
	};

	/**
	 * Get color status for a key based on previous guesses
	 * Priority: correct (green) > present (yellow) > absent (gray)
	 */
	function getKeyColor(letter: string): string {
		let status = ""; // No color initally
		for (const guess of guesses) {
			if (!guess.includes(letter)) continue;
			if (answer.includes(letter)) {
				// Mark as present (yellow) initially
				status = "present";
				// Check if it's in the correct position in any guess
				for (let i = 0; i < guess.length; i++) {
					if (guess[i] === letter && answer[i] === letter) {
						return "correct"; // Green has highest priority, return immediately
					}
				}
			} else {
				status = "absent";
			}
		}
		return status;
	}

	function handleKeyClick(key: string): void {
		if (isGameOver) return;
		// Handle special keys
		if (key in specialKeys) {
			specialKeys[key as keyof typeof specialKeys].action();
			return;
		}
		// Don't add more letters if already 5 chars
		if (currentGuess.length === 5) return;
		// Add the letter to the current guess
		currentGuess += key.toLowerCase();
	}

	function getKeyDisplay(key: string): string {
		return key in specialKeys
			? specialKeys[key as keyof typeof specialKeys].display
			: key.toUpperCase();
	}
</script>

<div class="keyboard disable-double-tap-zoom">
	<br />
	{#key guesses}
		{#each keys as keyRow}
			<div class="row">
				{#each keyRow as letter}
					<button
						onclick={() => handleKeyClick(letter)}
						class="keyboard-key .disable-double-tap-zoom {getKeyColor(letter)}"
					>
						{getKeyDisplay(letter)}
					</button>
				{/each}
			</div>
		{/each}
	{/key}
</div>

<style>
	.keyboard {
		padding-block-end: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 768px;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.keyboard > .row {
		display: flex;
		gap: 0.25rem;
	}

	.keyboard-key {
		background-color: var(--color-secondary);
		color: var(--color-contrast);
	}

	.correct {
		--_corresponding-color: var(--color-correct);
		background-color: var(--color-correct);
		color: var(--color-true-white);
	}

	.present {
		--_corresponding-color: var(--color-present);
		background-color: var(--color-present);
		color: var(--color-true-white);
	}

	.absent {
		--_corresponding-color: var(--color-absent);
		background-color: var(--color-absent);
		color: var(--color-true-white);
	}

	/* For disabling constant double tapping on mobile devices. */
	.disable-double-tap-zoom {
		touch-action: manipulation;
	}

	@keyframes keyboardDelay {
		0% {
		}
		100% {
			background-color: var(--_corresponding-color);
			color: var(--color-true-white);
		}
	}

	@media screen and (max-width: 36em) {
		.keyboard-key {
			padding: 0.5em 0.7em;
			font-size: 1rem;
		}
	}
	@media screen and (max-width: 25em) {
		.keyboard-key {
			padding: 0.5em 0.5em;
		}
	}
	@media screen and (max-width: 20em) {
		.keyboard-key {
			padding: 0.5em 0.4em;
		}
	}
</style>
