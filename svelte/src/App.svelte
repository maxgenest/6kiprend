<script>
  import MessagingSystem from "./components/MessagingSystem.svelte";
</script>

<main class="main">
	<h1 class="title">6 ki prend</h1>

  <MessagingSystem />
</main>

<style>
	.main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.title {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		.main {
			max-width: none;
		}
	}
</style>