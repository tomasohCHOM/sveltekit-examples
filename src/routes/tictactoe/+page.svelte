<script lang="ts">
	// Constant variables
	const CROSS = "X";
	const CIRCLE = "O";

	// State variables
	let board = $state([
		["", "", ""],
		["", "", ""],
		["", "", ""]
	]);
	let playerTurn = $state(0);
	let isGameOver = $state(false);
	let winner = $state("");

	// Checks if either player has won the game (or if it resulted in a tie)
	// Does not take any parameters since we are using the board variable directly
	function checkBoard() {
		// Check rows and columns
		for (let i = 0; i < 3; i++) {
			if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
				isGameOver = true;
				winner = board[i][0];
				return;
			}
			if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
				isGameOver = true;
				winner = board[0][i];
				return;
			}
		}

		// Check diagonals
		if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
			isGameOver = true;
			winner = board[0][0];
			return;
		}
		if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
			isGameOver = true;
			winner = board[0][2];
			return;
		}

		// Check for a tie
		if (board.flat().every((cell) => cell !== "")) {
			isGameOver = true;
			winner = "Tie";
		}
	}

	function handleCellClick(rowIndex: number, colIndex: number) {
		if (board[rowIndex][colIndex] !== "" || isGameOver) {
			return;
		}
		if (playerTurn === 0) {
			board[rowIndex][colIndex] = CROSS;
		} else {
			board[rowIndex][colIndex] = CIRCLE;
		}
		checkBoard();
		if (isGameOver) {
			return;
		}
		playerTurn ^= 1;
	}

	function resetGame() {
		board = [
			["", "", ""],
			["", "", ""],
			["", "", ""]
		];
		playerTurn = 0;
		isGameOver = false;
		winner = "";
	}
</script>

<svelte:head>
	<title>Tic Tac Toe</title>
</svelte:head>

<main>
	<h1>Tic Tac Toe</h1>
	<section>
		<div class="board">
			{#each board as row, rowIndex}
				<div class="row">
					{#each row as cell, colIndex}
						<button
							class="cell"
							class:border-top={rowIndex !== 0}
							class:border-bottom={rowIndex !== 2}
							class:border-left={colIndex !== 0}
							class:border-right={colIndex !== 2}
							onclick={() => handleCellClick(rowIndex, colIndex)}
						>
							{#if cell !== ""}
								<img
									src="/tictactoe/{cell === CROSS ? 'cross' : 'circle'}.svg?t=${Date.now()}"
									alt="{cell} Icon"
								/>
							{/if}
						</button>
					{/each}
				</div>
			{/each}
		</div>
	</section>
	<p class="text-center text-lg">
		{#if isGameOver}
			{#if winner === "Tie"}
				It's a tie!
			{:else}
				Player {winner} has won the game!
			{/if}
		{:else}
			Player {playerTurn}'s turn
		{/if}
	</p>
	{#if isGameOver}
		<button class="reset-btn" onclick={resetGame}>Play Again!</button>
	{/if}
</main>

<style>
	main {
		padding: 4rem 2rem;
		max-width: 1024px;
		margin: 0 auto;
		text-align: center;
		display: grid;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: bold;
		color: #1a202c;
		margin-bottom: 1rem;
	}

	button {
		cursor: pointer;
	}

	.board {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
	}

	.cell {
		width: 5rem;
		height: 5rem;
		font-size: 1.5rem;
		font-weight: bold;
		border-style: solid;
		border-color: #1a202c;
		background: none;
		cursor: pointer;
	}

	.cell > img {
		width: 3rem;
		margin-inline: auto;
	}

	.reset-btn {
		font-weight: 600;
		padding: 0.25rem 5rem;
		border-radius: 0.5rem;
		background-color: rgb(68, 133, 225);
		color: white;
	}

	.border-top {
		border-top-width: 2px;
	}

	.border-bottom {
		border-bottom-width: 2px;
	}

	.border-left {
		border-left-width: 2px;
	}

	.border-right {
		border-right-width: 2px;
	}

	@media screen and (min-width: 768px) {
		.cell {
			width: 6rem;
			height: 6rem;
		}
	}
</style>
