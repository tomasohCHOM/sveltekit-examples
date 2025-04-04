<script lang="ts">
	import { WORD_REVEAL_ANIMATION_DELAY } from "$lib/devdle/constants/values";

	type Props = {
		guesses: string[];
		colorsFromGuesses: string[];
		currentGuess: string;
		numAttempts: number;
		isError: boolean;
	};

	let { guesses, colorsFromGuesses, currentGuess, numAttempts, isError }: Props = $props();

	// Game board configuration
	const BOARD_SIZE = {
		ROWS: 6,
		COLS: 5
	};

	// Color mappings for clarity
	const COLOR_CLASS = {
		G: "correct",
		Y: "present",
		B: "absent"
	};

	/**
	 * Convert color code to CSS class name
	 */
	function getColorClass(row: number, col: number): string {
		if (!colorsFromGuesses[row]) return "";

		const colorCode = colorsFromGuesses[row][col];
		return COLOR_CLASS[colorCode as keyof typeof COLOR_CLASS] || "";
	}
</script>

<div class="board">
	{#each Array(BOARD_SIZE.ROWS) as _, r}
		<div class="board-row">
			{#each Array(BOARD_SIZE.COLS) as _, c}
				<div
					class="board-cell {guesses[r] !== undefined ? getColorClass(r, c) : ''}"
					class:border-active={r === guesses.length && currentGuess[c] !== undefined}
					class:shake={r === guesses.length && isError === true}
					style="--order: {c}; --win-delay: {WORD_REVEAL_ANIMATION_DELAY};"
				>
					{#if r === numAttempts && currentGuess.length - 1 >= c}
						{currentGuess[c].toUpperCase()}
					{:else}
						{guesses[r]?.[c].toUpperCase() ?? ""}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.board-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		margin-block-end: 0.25rem;
	}

	.board-cell {
		width: 3rem;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--border-empty);
		font-size: 1.5rem;
		font-weight: bold;

		/* To prevent the user from selecting the letters in the cells */
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.board-cell.border-active {
		border: 2px solid var(--border-active);
		animation: cellPopUp 0.1s ease-in-out;
		animation-iteration-count: 1;
	}

	.board-cell.correct,
	.board-cell.present,
	.board-cell.absent {
		animation: flipCells 500ms ease forwards;
		animation-delay: calc(var(--order) * 200ms);
	}

	.board-cell.correct {
		--background-color: var(--color-correct);
		--color: var(--color-true-white);
		border: 2px solid var(--border-active);
	}

	.board-cell.present {
		--background-color: var(--color-present);
		--color: var(--color-true-white);
		border: 2px solid var(--border-active);
	}

	.board-cell.absent {
		--background-color: var(--color-absent);
		--color: var(--color-true-white);
		border: 2px solid var(--border-active);
	}

	.board-cell.shake {
		animation: shakeCells 200ms;
	}

	.board-cell.win {
		animation: winAnimation 300ms;
		animation-delay: calc(var(--win-delay) * 1ms + var(--order) * 100ms);
	}

	@keyframes cellPopUp {
		0% {
			transform: scale(0.95);
			border-color: var(--border-pop);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
			border-color: var(--border-active);
		}
	}

	@keyframes flipCells {
		0% {
			transform: rotateX(0);
			background-color: var(--color-primary);
			border: 2px solid var(--border-active);
			color: var(--color-contrast);
		}
		45% {
			transform: rotateX(90deg);
			background-color: var(--color-primary);
			border: 2px solid var(--border-active);
			color: var(--color-contrast);
		}
		55% {
			transform: rotateX(90deg);
			background-color: var(--background-color);
			color: var(--color);
			border: none;
		}
		100% {
			transform: rotateX(0deg);
			background-color: var(--background-color);
			color: var(--color);
			border: none;
		}
	}

	@keyframes shakeCells {
		10%,
		90% {
			transform: translate(-1px, 0);
		}

		20%,
		80% {
			transform: translate(2px, 0);
		}

		30%,
		50%,
		70% {
			transform: translate(-4px, 0);
		}

		40%,
		60% {
			transform: translate(4px, 0);
		}
	}

	@keyframes winAnimation {
		0% {
			transform: translate(0, 0);
		}

		25% {
			transform: translate(0, 0.5rem);
		}

		50% {
			transform: translate(0, -0.125rem);
		}

		75% {
			transform: translate(0, 0.25rem);
		}

		100% {
			transform: translate(0, 0);
		}
	}

	@media screen and (min-width: 768px) {
		.board-cell {
			width: 3.5rem;
		}
	}
</style>
