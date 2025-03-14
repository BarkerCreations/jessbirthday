<script lang="ts">
	import { goto } from '$app/navigation';
	import Dialog from '../../components/Dialog.svelte';

	let dialog;

	function restartApp() {
		goto('/');
	}

	function closeFlip() {
		dialog.close();
	}

	function coinflip() {
		dialog.showModal();
	}

	let flipped = false;
	let rotations = 0;

	function flipCoin() {
		rotations += Math.floor(Math.random() * 5) + 5; // Add 5-10 rotations on each flip
		flipped = Math.random() > 0.5;
	}
</script>

<div class="container">
	<h1>Invitation time</h1>

	<div class="gifts-container">
		<p>Save the date:</p>
		<h2>Fri 21st March 2025</h2>
		<p>A gentleman requests your presence for an evening of superior company, good food, and drinks of your
			choosing...</p>

		<div class="options">
			<div class="option">
				<div class="img-container">
					<img src="/onyx.png" alt="Onyx" />
				</div>

				<div class="info">
					<h3>Onyx</h3>
					<p>Asian food with a great Stephansplatz view. <a class="menu" href="https://www.docohotel.com/media/adlh0rcr/onyx_menuekarte_20240802.pdf" target="_blank">View Menu</a></p>
				</div>
			</div>

			or...

			<div class="option">
				<div class="img-container">
					<img src="/sevennorth.png" alt="SevenNorth" />
				</div>

				<div class="info">
					<h3>SevenNorth</h3>
					<p>Israeli/Middle-eastern and some of the best steak in town. <a class="menu" href="https://sevennorthrestaurant.com/en/vienna/menu/" target="_blank">View Menu</a></p>
				</div>
			</div>
		</div>

		<p>Both are booked, the choice is yours! If you can't decide we do
			<button class="flip" on:click={coinflip}>have a way to decide</button>
			.
		</p>
	</div>

	<div class="bottom-section">
		<button on:click={restartApp}>
			Restart the 'app'
		</button>
	</div>

	<Dialog bind:dialog>
		<div class="dialog">
			<button on:click={closeFlip} class="close">✕</button>

			<div class="coin-container" on:click={flipCoin}>
				<div
					class="coin"
					style="transform: rotateY({rotations * 180 + (flipped ? 180 : 0)}deg)"
				>
					<div class="heads"></div>
					<div class="tails"></div>
				</div>
			</div>

			<p>Tap on coin to flip.<br />
			Rory is Onyx, Klaus is SevenNorth</p>
		</div>
	</Dialog>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        background: rgb(40, 40, 40);
        height: calc(100vh + 80px);
        width: 100vw;
    }

    div.options {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 0 1.75rem 30px;
    }

    div.option {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .option h3 {
        margin-top: 0;
    }

    .option .img-container {
        min-width: 120px;
        min-height: 120px;
        max-width: 120px;
        max-height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
    }

    .option img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
    }

    .option p {
        margin: 0;
    }

    h1 {
        text-align: center;
    }

    .bottom-section {
        padding: 20px 0;
    }

    p, h2 {
        margin: 0 1.75rem 30px;
    }

    a {
        color: white;
        text-decoration: underline;
    }

    button {
        display: block;
        background: transparent;
        border: 1px solid white;
        border-radius: 16px;
        padding: 16px;
        color: white;
        margin: 0 auto;
    }

    button.flip {
        display: inline;
        background: transparent;
        border: transparent;
        padding: 0;
        text-decoration: underline;
        font-family: unset;
        font-size: unset;
    }

    .dialog {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        width: 80vw;
				height: 60vh;
    }

		.dialog p {
				text-align: center;
				margin-top: 40px;
		}

		.dialog button.close {
				position: absolute;
				top: 10px;
				right: 10px;
				background: transparent;
				border: transparent;
				color: black;
				font-size: 1.5rem;
		}

    .coin-container {
        width: 100px;
        height: 100px;
        perspective: 1000px;
    }

    .coin {
        width: 100px;
        height: 100px;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 1s ease-in-out;
    }

    .heads, .tails {
        width: 100%;
        height: 100%;
        position: absolute;
        backface-visibility: hidden;
				border-radius: 50%;
    }

    .heads {
        background: url('/rory.jpg') no-repeat center/cover;
    }

    .tails {
        background: url('/klaus.jpg') no-repeat center/cover;
        transform: rotateY(180deg);
    }
</style>