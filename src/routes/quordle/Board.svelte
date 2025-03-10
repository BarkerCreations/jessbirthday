<script lang="ts">
	interface Props {
		guesses: string[];
		word: string;
		currentGuess: string;
		guessError: boolean;
	}

	let { currentGuess, guesses, word, guessError }: Props = $props();

	function getTileClass(guess, index) {
		if (!guess) return '';
		if (word[index] === guess[index]) return 'correct';
		if (word.includes(guess[index])) return 'present';
		return 'absent';
	}

	function getRowClass(rowIndex, guesses) {
		if (rowIndex === guesses.length) return 'current';
		if (rowIndex > guesses.length) return 'compact mono';
		if (rowIndex > guesses.findIndex(g => g === word)) return 'compact mono'
		return 'compact';
	}

	function getTileContents(guess, guesses, rowIndex, colIndex) {
		return rowIndex === guesses.length
			? guess.charAt(colIndex)
			: guesses[rowIndex]
				? guesses[rowIndex][colIndex]
				: ''
	}
</script>

<div class="board">
	{#each Array(9) as _, rowIndex}
		<div class="grid-row {getRowClass(rowIndex, guesses)}">
			{#each Array(5) as _, colIndex}
				<div class="tile {getTileClass(guesses[rowIndex], colIndex)}" class:error={guessError}>
					{ getTileContents(currentGuess, guesses, rowIndex, colIndex) }
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
    .board {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 6px;
        background: #1a1a1b;
        border-radius: 10px;
        width: max-content;
        height: max-content;
        max-width: 230px;
        max-height: 270px;
    }

    .grid-row {
        display: flex;
        justify-content: center;
        gap: 2px;
    }

    /* Default compact row */
    .grid-row.compact .tile {
        height: 4vw;
        font-size: 0.8em;
    }

		.grid-row.compact.mono {
				grid-gap: 0;
		}

		.grid-row.compact.mono .tile {
				border-radius: 0 !important;
        width: 100% !important;
		}

    /* Current guess row */
    .grid-row.current .tile {
        height: 6vw;
        font-size: 1.2em;
    }

    /* Tile Styling */
    .tile {
        width: 8vw;
        max-width: 50px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3a3a3c;
        font-weight: bold;
        text-transform: uppercase;
        border-radius: 3px;
    }

    /* Color States */
    .correct {
        background-color: #6aaa64;
        border-color: #6aaa64;
        color: white;
    }
    .present {
        background-color: #c9b458;
        border-color: #c9b458;
        color: white;
    }
    .absent {
        background-color: #787c7e;
        border-color: #787c7e;
        color: white;
    }

		.grid-row.current .error {
				background-color: darkred;
				color: white;
		}
</style>