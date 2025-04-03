<script lang="ts">
	const CROSS = "X";
	const CIRCLE = "O";
	const PLAYERS = [CROSS, CIRCLE];

	let board = $state(createEmptyBoard());
	let playerTurn = $state(0);
	let isGameOver = $state(false);
	let winner = $state("");

	function createEmptyBoard() {
		return [
			["", "", ""],
			["", "", ""],
			["", "", ""]
		];
	}

	function checkWinner() {
		// Check rows and columns
		for (let i = 0; i < 3; i++) {
			if (board[i][0] && board[i].every((cell) => cell === board[i][0])) return true;
			if (
				board[0][i] &&
				[board[0][i], board[1][i], board[2][i]].every((cell) => cell === board[0][i])
			)
				return true;
		}
		// Check diagonals
		if (
			board[1][1] &&
			((board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
				(board[0][2] === board[1][1] && board[1][1] === board[2][0]))
		) {
			return true;
		}
		return false;
	}

	function checkBoardState() {
		if (checkWinner()) {
			isGameOver = true;
			winner = `${playerTurn}`;
			return;
		}
		if (board.flat().every((cell) => cell !== "")) {
			isGameOver = true;
			winner = "Tie";
		}
	}

	function handleCellClick(row: number, col: number) {
		if (board[row][col] || isGameOver) return;
		board[row][col] = PLAYERS[playerTurn];
		checkBoardState();
		if (!isGameOver) {
			playerTurn ^= 1;
		}
	}

	function resetGame() {
		board = createEmptyBoard();
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
	<p>
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

	p {
		text-align: center;
		font-size: 1.125rem;
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
