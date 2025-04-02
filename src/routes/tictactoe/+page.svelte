<script lang="ts">
	// Constant variables
	const ROWS = 3;
	const COLS = 3;

	// State variables
	let board = $state([
		["", "", ""],
		["", "", ""],
		["", "", ""]
	]);
	let playerTurn = $state(0);
	let isGameOver = $state(false);
	let winner = $state("");

	// Does not take any parameters since we are using the board variable directly
	// Checks if either player has won the game
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
			board[rowIndex][colIndex] = "X";
		} else {
			board[rowIndex][colIndex] = "O";
		}
		checkBoard();
		if (isGameOver) {
			return;
		}
		playerTurn ^= 1;
	}
</script>

<main>
	<h1>Tic Tac Toe</h1>
	<section>
		<div class="board">
			{#each board as row, rowIndex}
				<div class="row">
					{#each row as cell, colIndex}
						<button
							class:border-top={rowIndex !== 0}
							class:border-bottom={rowIndex !== ROWS - 1}
							class:border-left={colIndex !== 0}
							class:border-right={colIndex !== COLS - 1}
							onclick={() => handleCellClick(rowIndex, colIndex)}
						>
							{cell}
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

	.board {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
	}

	button {
		width: 6rem;
		height: 6rem;
		font-size: 1.5rem;
		font-weight: bold;
		border-style: solid;
		border-color: #1a202c;
		background: none;
		cursor: pointer;
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
</style>
