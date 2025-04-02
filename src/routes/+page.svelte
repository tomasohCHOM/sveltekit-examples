<script>
	const links = [
		{ href: "/tictactoe", title: "Tic Tac Toe", desc: "finished example from the workshop" },
		{ href: "/devdle", title: "Devdle", desc: "fully animated programming-based Wordle" },
		{ href: "/pokedex", title: "Pokedex", desc: "example fetching data from the PokéAPI" },
		{ href: "/daisy", title: "Daisy", desc: "landing & documentation pages for a SaaS company" },
		{ href: "/3d", title: "3D", desc: "first-person scene using threejs and threlte" }
	];
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>
	<title>FullyHacks 2025 SvelteKit Workshop</title>
</svelte:head>

<main class="py-16 px-8 md:px-16 md:py-24 flex flex-col gap-6 md:gap-8 max-w-[1536px] mx-auto">
	<h1 class="text-3xl md:text-5xl font-semibold text-gray-900">SvelteKit Examples</h1>
	<p class="md:text-lg">
		A website to showcase all the cool projects you can build with <a
			href="https://svelte.dev/docs/kit/introduction"
			target="_blank">SvelteKit</a
		>!
	</p>
	<ul class="text-sm md:text-[1rem] list-disc ml-4 md:ml-8">
		{#each links as link}
			<li>
				<a href={link.href}>
					{link.title}
				</a>
				- {link.desc}
			</li>
		{/each}
	</ul>
	<p class="text-sm md:text-[1rem]">
		For more resources, check out <a href="https://svelte.dev/" target="_blank">svelte.dev</a>
		and our
		<a href="https://github.com/acmcsufoss/fullypack_sveltekit" target="_blank"
			>SvelteKit Fullypacks</a
		> template!
	</p>
	<a
		href="https://github.com/tomasohCHOM/sveltekit-examples"
		target="_blank"
		class="max-w-max text-sm md:text-[1rem]">GitHub Repo</a
	>
</main>

<style>
	* {
		font-family: "Inter", sans-serif;
	}

	a {
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: #d1d5dc;
		transition: text-decoration-color 150ms ease;
	}

	a:hover {
		text-decoration-color: #101828;
	}
</style>
