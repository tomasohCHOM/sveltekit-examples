<script>
	import Starfield from "$lib/starfield.svelte";
	const links = [
		{ href: "/tictactoe", title: "Tic Tac Toe", desc: "finished example from the workshop" },
		{ href: "/devdle", title: "Devdle", desc: "fully animated programming-based Wordle" },
		{ href: "/pokedex", title: "Pokedex", desc: "example fetching data from the PokéAPI" },
		{ href: "/daisy", title: "Daisy", desc: "landing & documentation pages for a SaaS company" },
		{ href: "/3d", title: "3D", desc: "first-person scene using threejs and threlte" }
	];
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>
	<title>FullyHacks 2025 SvelteKit Workshop</title>
</svelte:head>

<Starfield />

<main class="mx-auto flex max-w-[1536px] flex-col gap-6 px-8 py-16 md:gap-8 md:px-16 md:py-24">
	<h1 class="text-3xl font-semibold md:text-5xl">SvelteKit Examples</h1>
	<p class="md:text-lg">
		A website to showcase all the cool projects you can build with <a
			href="https://svelte.dev/docs/kit/introduction"
			target="_blank">SvelteKit</a
		>!
	</p>
	<ul class="ml-4 list-disc text-sm md:ml-8 md:text-[1rem]">
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
	:root {
		--color-background-500: rgb(248, 248, 248);
		--color-background-300: rgb(209, 213, 220);
		--color-foreground: rgb(31, 33, 37);

		background-color: var(--color-background-500);
		color: var(--color-foreground);
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--color-background-500: rgb(31, 33, 37);
			--color-background-300: rgb(119, 121, 122);
			--color-foreground: rgb(255, 255, 255);
		}
	}

	* {
		font-family: "Inter", sans-serif;
	}

	a {
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-color: var(--color-background-300);
		transition: text-decoration-color 150ms ease;
	}

	a:hover {
		text-decoration-color: var(--color-foreground);
	}
</style>
