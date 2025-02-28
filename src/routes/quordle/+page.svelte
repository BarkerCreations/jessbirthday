<script>
	import { onMount } from 'svelte';
	let words = ['KLAUS', 'VIBES', 'CROWN', 'BILLS'];
	let guesses = [];
	let currentGuess = '';

	function submitGuess() {
		if (currentGuess.length === 5) {
			guesses = [...guesses, currentGuess.toUpperCase()];
			currentGuess = '';
		}
	}
</script>

<style>
    .quordle-container { text-align: center; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .tile { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border: 1px solid black; }
</style>

<div class="quordle-container">
	<h1>Quordle*</h1>
	<div class="grid">
		{#each words as word}
			<div class="tile">{word}</div>
		{/each}
	</div>
	<input bind:value={currentGuess} maxlength="5" />
	<button on:click={submitGuess}>Submit</button>
</div>
