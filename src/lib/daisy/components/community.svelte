<script>
	const coreMaintainers = [
		{ name: "Josh", href: "/daisy/josh.webp" },
		{ name: "Nathan", href: "/daisy/nathan.webp" },
		{ name: "Donovan", href: "/daisy/donovan.webp" },
		{ name: "Tomas", href: "/daisy/tomas.webp" }
	];
</script>

<section class="mx-auto mt-16 grid max-w-[1280px] justify-center gap-8 pb-16 text-gray-900">
	<h2 class="text-center text-5xl font-bold">Community</h2>
	<p class="text-center text-lg md:text-xl">
		Daisy is supported by a community of brilliant and passionate developers!! (It's just as four)
	</p>
	<div class="flex flex-wrap items-center justify-center gap-8 pt-8">
		{#each coreMaintainers as maintainer}
			<div class="flex flex-col items-center justify-center gap-4">
				<img
					src={maintainer.href}
					alt="{maintainer.name}'s pfp"
					class="aspect-square w-24 rounded-full md:w-32"
				/>
				<p>{maintainer.name}</p>
			</div>
		{/each}
	</div>
</section>
