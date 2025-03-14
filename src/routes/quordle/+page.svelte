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
			// updateKeys();

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
				key.style.position = 'relative';
				const cap = document.createElement('div');
				for (let i = 0; i < 4; i++) {
					cap.appendChild(document.createElement('div'));
				}

				// const letter = key.innerHTML.trim();
				cap.className = 'keycap';
				cap.style.position = 'absolute';
				cap.style.display = 'grid';
				cap.style.gridTemplateRows = 'repeat(2, 1fr)';
				cap.style.gridTemplateColumns = 'repeat(2, 1fr)';
				cap.style.opacity = 0.5;
				cap.style.top = 0;
				cap.style.bottom = 0;
				cap.style.left = 0;
				cap.style.right = 0;
				cap.style.mouseEvents = 'none';
				key.appendChild(cap);
			}

			const keyLetter = key.textContent.toLowerCase().trim();

			words.every((w, i) => {
				const word = w.toLowerCase();
				if (keyLetter.length === 0) return false;
				if (!word.includes(keyLetter)) return false;

				// We have a word and a key
				// If any guess has the letter and the word has the letter
				const anyGuessIncludesLetter = guesses.flat().some((g) => {
					return g.includes(keyLetter) && word.includes(keyLetter);
				});

				// const guessPerfectLetter = guesses.flat().some((g) => {
				// 	if (!word.includes(keyLetter)) return false;
				//
				// 	return [...g].map((char, index) => {
				// 		return word.indexOf(char.toLowerCase()) === index;
				// 	})
				// });

				const selector = `.keycap div:nth-child(${i + 1})`;
				const keyQuadrant = key.querySelector(selector);
				debugger;

				// if (guessPerfectLetter) {
				// 	keyQuadrant.style.backgroundColor = "green";
				// 	return false;
				// }

				// if it is in the word but not in the correct position
				if (anyGuessIncludesLetter) {
					keyQuadrant.style.backgroundColor = 'yellow';
					return false;
				}
			});
		});
	}

	function restartGame() {
		currentGuess = '';
		guesses = Array(4).fill([]).map(() => []);
		guessError = false;

		// const keys = document.querySelectorAll('button.key');
		// keys.forEach(key => {
		// 	const caps = key.querySelectorAll('.keycap');
		// 	if (caps) {
		// 		caps.forEach(cap => cap.remove());
		// 	}
		// });
	}

	function goToTravle() {
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

	<div class="keyboard-wrapper" style="width: 95%">
		<Keyboard layout="wordle" on:keydown={onKeydown} />
	</div>

	<button class="restart" on:click={restartGame}>Restart game</button>

	<Dialog bind:dialog on:close={goToTravle}>
		<div class="dialog">
			<h1>Nicely done!</h1>
			<img src="/quordle-win.png" alt="Quordle" style="width: 100px; border-radius: 10px;" />
			<button on:click={goToTravle}>Another challenge!</button>
		</div>
	</Dialog>
</div>

<style>
    h1 {
        margin: 0 0 18px 0;
    }

    .quordle-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100vw;
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
        margin-bottom: 30px;
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

    button.restart {
        display: block;
        background: transparent;
        border: 1px solid white;
        border-radius: 16px;
        padding: 16px;
        color: white;
        margin: 30px auto 0;
    }
</style>