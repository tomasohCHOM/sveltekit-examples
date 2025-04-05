<script>
	const languageFeatures = [
		{
			title: "Simplicity",
			desc: "Daisy is designed to be an expressive language that prioritizes readability and ease of writing, making programming more intuitive."
		},
		{
			title: "Control",
			desc: "Daisy provides fine-grained control over memory management, giving you the flexibility to optimize performance according to your needs."
		},
		{
			title: "Tooling & Community",
			desc: "Daisy comes with robust tooling to enhance development efficiency and a growing community dedicated to support and collaboration."
		}
	];

	const codeExamples = [
		{
			title: "Memory Management Simplified",
			desc: "Take full control of memory without the hassle. Daisy's defer keyword ensures allocated memory is automatically freed at the end of scope, reducing leaks while keeping your code clean and efficient. Enjoy the power of manual memory management with built-in safety!",
			codeBlock: `
{
  ptr: int = mem.alloc(10) # Allocate memory
  defer mem.free(ptr) # Free memory at end of scope
  # Use ptr...
}
`
		},
		{
			title: "Intuitive Type System",
			desc: "Define structured data effortlessly with Daisy's lightweight type system. With built-in support for methods, your code remains organized, expressive, and easy to extend—making complex logic a breeze to implement.",
			codeBlock: `
my_type: type {
  a: int32
  b: str
}

my_method: my_type::func() () {
  # Method logic here
}
`
		},
		{
			title: "Hassle-Free File Handling",
			desc: "Daisy's defer ensures files are closed properly, letting you focus on writing clean and reliable I/O operations. Less boilerplate, more productivity!",
			codeBlock: `
{
  my_file: file = io.open("filename")
  defer io.close(file)
  io.write(file, "hi")
}
`
		}
	];

	const coreMaintainers = [
		{ name: "Josh", href: "/daisy/josh.webp" },
		{ name: "Nathan", href: "/daisy/nathan.webp" },
		{ name: "Donovan", href: "/daisy/donovan.webp" },
		{ name: "Tomas", href: "/daisy/tomas.webp" }
	];
</script>

<main class="mt-16 grid">
	<div class="mx-auto grid max-w-[1280px] gap-16">
		<section class="flex">
			<div class="grid gap-4">
				<h1 class="text-6xl font-bold">
					Write Simply. <span
						class="bg-gradient-to-br from-[#ffd46e] to-[#f0df42] bg-clip-text
          text-transparent"
					>
						Build Gracefully.
					</span>
				</h1>
				<p class="text-lg">
					Daisy is a simple yet powerful language that lets you program the way you want.
				</p>
				<a
					href="/daisy/docs"
					class="max-w-[10rem] rounded-full bg-gradient-to-br from-[#ffd46e] to-[#f0df42]
        px-4 py-2 text-center font-bold text-white transition hover:brightness-105"
				>
					Try Daisy!
				</a>
			</div>
		</section>
		<section class="grid grid-cols-3 gap-4">
			{#each languageFeatures as feature}
				<div
					class="rounded-lg border-2 border-[#fbf1d7] bg-[#fffbf1] p-4 dark:border-[#7e7554] dark:bg-[#2e2e2d]"
				>
					<h3 class="text-center text-xl font-bold">{feature.title}</h3>
					<p class="text-lg">{feature.desc}</p>
				</div>
			{/each}
		</section>
	</div>
	<div class="mt-48 bg-gradient-to-br from-[#ffd46e] to-[#f0df42] p-8">
		<section class="mx-auto grid max-w-[800px] gap-16 py-8">
			{#each codeExamples as example}
				<div class="grid grid-cols-2 gap-4">
					<div class="grid gap-2 text-gray-900">
						<h3 class="text-3xl font-bold">{example.title}</h3>
						<p class="text-lg">{example.desc}</p>
					</div>
					<code class="block max-h-max rounded-lg bg-gray-900 p-8 text-white">
						{example.codeBlock}
					</code>
				</div>
			{/each}
		</section>
	</div>

	<div class="mx-auto mt-16 grid max-w-[1280px] gap-16 pb-16">
		<h2 class="text-center text-5xl font-bold">Community</h2>
		<p class="text-xl">
			Daisy is supported by a community of brilliant and passionate developers!! (It's just as four)
		</p>
		<div class="flex flex-wrap items-center justify-center gap-8">
			{#each coreMaintainers as maintainer}
				<div class="flex flex-col items-center justify-center gap-4">
					<img src={maintainer.href} alt="{maintainer.name}'s pfp" class="h-32 w-32 rounded-full" />
					<p>{maintainer.name}</p>
				</div>
			{/each}
		</div>
	</div>
</main>
