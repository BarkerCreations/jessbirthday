<script lang="ts">
	import Dialog from '../../components/Dialog.svelte';
	import { goto } from '$app/navigation';

	let dialog;

	function showDialog() {
		dialog.showModal();
	}

	function goToChoices() {
		goto('/choices');
	}
</script>

<div class="container">
	<h1>A little travel?</h1>

	<div class="iframe-container">
		<iframe src="https://travle.earth/practice?r=usa_USA-3559_USA-3520"></iframe>
	</div>

	<div class="bottom-section">
		<p>Okay so I didn't technically MAKE this one, so we have an honesty system for winning...</p>
		<p>In case it's busted, <a href="https://travle.earth/practice?r=usa_USA-3559_USA-3520" target="_blank">click
			here</a> to play in new tab.</p>
		<button on:click={showDialog} class="win">
			I swear, I got a perfect score ➡️
		</button>
	</div>
</div>

<Dialog bind:dialog on:close={goToChoices}>
	<div class="dialog">
		<h1>Smashing it!</h1>
		<img src="/quordle-win.png" alt="Quordle" style="width: 100px; border-radius: 10px;" />
		<button on:click={goToChoices}>Choose your present!</button>
	</div>
</Dialog>

<style>
    .container {
        display: flex;
        flex-direction: column;
        background: rgb(40, 40, 40);
        height: 100vh;
    }

    h1 {
        text-align: center;
        margin: 0 0 18px 0;
    }

    .iframe-container {
        flex: 1;
        width: 100vw;
        overflow: hidden;
				border: 1px solid white;
				border-left: none;
				border-right: none;
    }

    iframe {
        height: 100%;
        width: 100%;
        border: 0;
        overflow: hidden;
    }

    .bottom-section {
        padding: 20px 0;
    }

    p {
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
        color: black;
        border-color: black;
    }
</style>