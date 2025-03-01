<script lang="ts">
	import Board from './Board.svelte';

	let words = ['KLAUS', 'VIBES', 'CROWN', 'BILLS'];
	let guesses: Array<string[]> = Array(4).fill([]).map(() => []);
	let currentGuess = '';

	function submitGuess() {
		if (currentGuess.length === 5) {
			guesses = guesses.map((g, index) => {
				// Don't keep guessing on completed words
				if (g.includes(words[index])) return [...g, ''];

				return [...g, currentGuess.toUpperCase()];
			});

			currentGuess = '';
			const allGuessed = words.every((w, index) => {
				return guesses.some((g) => {
					return g.join('').toLowerCase().includes(w.toLowerCase());
				});
			})

			if (allGuessed) {
				alert('You won!');
			}
		}
	}
</script>

<div class="quordle-container">
	<h1>Quordle* Jess Edition</h1>
	<div class="grid">
		{#each words as word, i}
			<Board {word} guesses={guesses[i]} />
		{/each}
	</div>
	<form action="">
		<input bind:value={currentGuess} maxlength="5" autofocus />
		<button on:click={submitGuess}>Submit</button>
	</form>
</div>

<style>
    .quordle-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 100vh;
        padding: 0;
        background: #161617; /* ChatGPT dark theme */
    }

    /* 2x2 Grid for Boards */
    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
				grid-auto-rows: max-content;
				justify-items: center;
        gap: 8px;
        width: 100vw; /* Adjusted to fit better */
        height: 65vh; /* Ensure the game fits */
        max-width: 600px;
    }

    /* Ensure text input and button are below the grid */
    .input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
    }

    input {
        width: 80%;
        max-width: 300px;
        height: 40px;
        text-align: center;
        font-size: 1.2em;
        border-radius: 5px;
    }

    button {
        margin-top: 5px;
        padding: 10px;
        font-size: 1em;
        background-color: #3a3a3c;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
</style>