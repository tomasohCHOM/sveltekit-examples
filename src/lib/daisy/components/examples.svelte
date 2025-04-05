<script>
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
</script>

<section class="mx-auto grid max-w-[800px] gap-16 py-8">
	{#each codeExamples as example}
		<div class="grid gap-4 md:grid-cols-2">
			<div class="grid gap-2 text-gray-900">
				<h3 class="text-3xl font-bold">{example.title}</h3>
				<p class="text-lg">{example.desc}</p>
			</div>
			<code
				class="mx-auto block max-h-max max-w-[25rem] rounded-lg bg-gray-900 p-8 text-white md:max-w-max"
			>
				{example.codeBlock}
			</code>
		</div>
	{/each}
</section>
