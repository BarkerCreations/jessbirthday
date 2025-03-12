<script lang="ts">
</script>

<div class="container">
	<h1>Travle?</h1>
	<div class="iframe-container">
		<iframe src="https://travle.earth/practice?r=usa_USA-3559_USA-3520" scrolling="no"></iframe>
	</div>

	<div class="bottom-section">
		<p>Okay so I didn't technically MAKE this one, so we have an honesty system for winning...</p>
		<button>
			I swear, I got a perfect score ➡️
		</button>
	</div>
</div>

<style>
		.container {
        display: flex;
				flex-direction: column;
				background: rgb(40, 40, 40);
				height: 100%;
		}

    h1 {
			text-align: center;
    }

    .iframe-container {
        height: 70vh;
        width: 100vw;
        overflow: hidden;
    }

		iframe {
        height: calc(100% + 10vh);
        width: 100%;
        margin-top: -15vh;
        border: 0;
        overflow: hidden;
		}

		.bottom-section {
				flex: 1;
		}

		p {
				margin: 0 1.75rem 30px;
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
</style>