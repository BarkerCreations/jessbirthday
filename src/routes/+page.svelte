<script>
	import { goto } from '$app/navigation';
	import { Confetti } from 'svelte-confetti';

	let games = {
		quordle: { name: 'Quordle*', description: 'Start with an easy one', route: '/quordle' },
		second: { name: '???', description: '', route: '#', lockedAtStart: true }
	};
</script>

<style>
    .container {
        text-align: left;
        padding: 20px;
    }

    img.header {
        text-align: center;
        margin: 0 auto;
        display: block;
    }

    .game-grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 70%;
        aspect-ratio: 1 / 1;
        margin: 36px auto 0;
    }

    .game-tile {
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
        text-align: center;
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
	<Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration=5000 amount=200 fallDistance="100vh" size="15" />
</div>

<div class="container">
	<img class="header" src="/header.png" alt="Main Banner" style="width: 70%; border-radius: 10px;" />
	<h1>Happy Birthday Jess!</h1>
	<p>I know we've been sending our puzzle achievements back-and-forth, but since today is about you I've made a couple
		of Jess-themed games for your eyes only.</p>
	<p>Shall we begin?</p>
	<div class="game-grid">
		<div class="game-tile {games.quordle.lockedAtStart ? 'placeholder' : 'active'}"
				 on:click={() => !games.quordle.lockedAtStart && goto(games.quordle.route)}>
			<img src="/quordle.png" alt="Quordle" style="width: 100px; border-radius: 10px;" />
			<h2>{games.quordle.name}</h2>
		</div>
	</div>
</div>
