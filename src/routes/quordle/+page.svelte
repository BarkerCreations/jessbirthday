<script lang="ts">
	import Board from './Board.svelte';
	import Keyboard from 'svelte-keyboard';
	import Dialog from '../../components/Dialog.svelte';

	import { goto } from '$app/navigation';

	let dialog;
	let words = ['KLAUS', 'VIBES', 'CROWN', 'SCOOT'];
	let guesses: Array<string[]> = Array(4).fill([]).map(() => []);
	let currentGuess = '';
	let guessError = false;

	const onKeydown = (event) => {
		const key = event.detail.toLowerCase();
		if (key === 'enter') {
			submitGuess();
		} else if (key === 'backspace') {
			currentGuess = currentGuess.slice(0, -1);
		} else if (currentGuess.length < 5) {
			currentGuess += key;
		}
	};

	function submitGuess() {
		if (currentGuess.length === 5) {
			if (words.includes(currentGuess.toUpperCase())) {
				processGuess();
				return;
			}

			fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess}`)
				.then(response => {
					if (!response.ok) {
						guessError = true;
						setTimeout(() => {
							guessError = false;
							currentGuess = '';
						}, 1000);
						throw new Error('Invalid word');
					}
					return response.json();
				})
				.then(() => {
					processGuess();
				});
		}

		function processGuess() {
			guesses = guesses.map((g, index) => {
				// Don't keep guessing on completed words
				if (g.includes(words[index])) return [...g, ''];

				return [...g, currentGuess.toUpperCase()];
			});

			currentGuess = '';
			updateKeys();

			const allGuessed = words.every((w, _) => {
				return guesses.some((g) => {
					return g.join('').toLowerCase().includes(w.toLowerCase());
				});
			});

			if (allGuessed) {
				dialog.showModal();
			}
		}
	}

	function updateKeys() {
		const keys = document.querySelectorAll('button.key');
		keys.forEach(key => {
			if (!key.querySelector('.keycap')) {
				key.style.position = "relative";
				const cap = document.createElement('div');
				for (let i = 0; i < 4; i++) {
					cap.appendChild(document.createElement('div'));
				}

				// const letter = key.innerHTML.trim();
				cap.className = "keycap";
				cap.style.position = "absolute";
				cap.style.display = "grid";
				cap.style.gridTemplateRows = "repeat(2, 1fr)"
				cap.style.gridTemplateColumns = "repeat(2, 1fr)";
				cap.style.opacity = 0.5;
				cap.style.top = 0;
				cap.style.bottom = 0;
				cap.style.left = 0;
				cap.style.right = 0;
				cap.style.mouseEvents = "none";
				key.appendChild(cap);
			}

			words.every((w, i) => {
				// Check if the letter is in the word
				// and was guessed in the correct position
				const keyLetter = key.textContent.toLowerCase().trim();
				const guessIncludesWord = guesses.some((g) => {
					return g.join('').toLowerCase().includes(w.toLowerCase());
				});

				if (keyLetter && w.toLowerCase().includes(keyLetter) && guessIncludesWord) {
					const selector = `.keycap div:nth-child(${i+1})`;
					const keyQuadrant = key.querySelector(selector);
					keyQuadrant.style.backgroundColor = "green";
					return false;
				}

				// if it is in the word but not in the correct position
				if (w.includes(key.innerHTML)) {
					key.querySelector('.keycap').style.backgroundColor = "yellow";
					return false;
				}
			});
		});
	}

	function chooseGift() {
		goto('/destinations');
	}
</script>

<div class="quordle-container">
	<h1>Quordle* Special Edition</h1>
	<div class="grid">
		{#each words as word, i}
			<Board {currentGuess} {word} guesses={guesses[i]} {guessError} />
		{/each}
	</div>

	<Keyboard layout="wordle" on:keydown={onKeydown} />

	<Dialog bind:dialog on:close={chooseGift}>
		<div class="dialog">
			<h1>Nicely done!</h1>
			<img src="/quordle-win.png" alt="Quordle" style="width: 100px; border-radius: 10px;" />
			<button on:click={chooseGift}>Choose your present!</button>
		</div>
	</Dialog>
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
        background: #161617;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: max-content;
        justify-items: center;
        gap: 8px;
        width: 100vw;
        height: max-content;
        margin-bottom: 40px;
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

    .dialog {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        width: 80vw;
    }

    .dialog button {
        display: inline-block;
        margin-top: 20px;
    }
</style>