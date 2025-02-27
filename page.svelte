<script>
    import { goto } from '$app/navigation';
    let games = [
        { name: 'Quordle*', prize: 'Win a Surprise!', route: '/quordle' },
        { name: 'Coming Soon', prize: '', route: '#', placeholder: true },
        { name: 'Coming Soon', prize: '', route: '#', placeholder: true }
    ];
</script>

<style>
    .container { text-align: center; padding: 20px; }
    .game-grid { display: flex; flex-direction: column; gap: 20px; }
    .game-tile { padding: 20px; border-radius: 10px; cursor: pointer; text-align: center; }
    .placeholder { border: 2px dashed gray; color: gray; }
</style>

<div class="container">
    <img src="/main-image.jpg" alt="Main Banner" style="width: 100%; border-radius: 10px;" />
    <div class="game-grid">
        {#each games as game}
        <div class="game-tile {game.placeholder ? 'placeholder' : ''}" on:click={() => !game.placeholder && goto(game.route)}>
        <h2>{game.name}</h2>
        <p>{game.prize}</p>
    </div>
    {/each}
</div>
</div>
