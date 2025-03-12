<script lang="ts">
	import { goto } from '$app/navigation';
	import { Confetti } from 'svelte-confetti';

	let doneQuordle = false;

	let games = {
		quordle: { name: 'Quordle*', description: 'Start with an easy one', route: '/quordle' },
		pico: { name: doneQuordle ? 'Pico park??' : '???', description: '', route: '/pico', lockedAtStart: !doneQuordle }
	};
</script>

<style>
    .container {
        text-align: left;
        padding: 20px;
				max-width: 600px;
    }

    img.header {
        text-align: center;
        margin: 0 auto;
        display: block;
				max-width: 250px;
				width: 60%;
    }

    .game-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
				align-items: stretch;
        gap: 20px;
        width: 90%;
        margin: 36px auto 0;
        justify-content: center;
				justify-items: center;
    }

    .game-tile {
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
        aspect-ratio: 1 / 1;
        max-width: 30vw;
    }

    h2 {
        margin-bottom: 0;
    }

    .placeholder {
        border: 2px dashed gray;
        color: gray;
    }

    .active {
        border: 2px solid white;
    }
</style>

<div
	style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;"
>
	<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration=5000 amount=200 fallDistance="100vh"
						size="15" />
</div>

<div class="container">
	<img class="header" src="/header.png" alt="Main Banner" style="width: 70%; border-radius: 10px;" />
	<h1>Happy Birthday Jess!</h1>
	<p>We've been sending our puzzle achievements back-and-forth, but since today is about you I've made a little Jess-themed game in lieu of a card.</p>
	<p>Shall we begin?</p>

	<div class="game-grid">
		<div class="game-tile {games.quordle.lockedAtStart ? 'placeholder' : 'active'}"
				 on:click={() => !games.quordle.lockedAtStart && goto(games.quordle.route)}>
			<img src="/quordle.png" alt="Quordle" style="width: 100px; border-radius: 10px;" />
			<h2>{games.quordle.name}</h2>
		</div>

		<div class="game-tile {games.pico.lockedAtStart ? 'placeholder' : 'active'}"
				 on:click={() => !games.pico.lockedAtStart && goto(games.pico.route)}>
			{#if doneQuordle}
				<img src="/quordle.png" alt="Pico" style="width: 100px; border-radius: 10px;" />
			{:else}
				<h2>?</h2>
			{/if}
			<h2>{games.pico.name}</h2>
		</div>
	</div>
</div>
