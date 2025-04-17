<script lang="ts">
	import { onMount } from "svelte";

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let stars: Star[] = [];
	let mouseX: number = 0;
	let mouseY: number = 0;
	let prevMouseX: number = 0;
	let prevMouseY: number = 0;
	let width: number;
	let height: number;

	let backgroundRGB: string;
	let starRGB: string;

	// Configuration
	const starCount: number = 500;
	const starSizeRange: { min: number; max: number } = { min: 0.5, max: 1 };
	const starSpeedRange: { min: number; max: number } = { min: 0.2, max: 3 };

	class Star {
		x: number;
		y: number;
		size: number;
		speed: number;
		brightness: number;

		constructor() {
			this.reset();
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.size = Math.random() * (starSizeRange.max - starSizeRange.min) + starSizeRange.min;
			this.speed = Math.random() * (starSpeedRange.max - starSpeedRange.min) + starSpeedRange.min;
			this.brightness = Math.random() * 0.8 + 0.2; // Between 0.2 and 1.0
		}

		reset(): void {
			this.size = Math.random() * (starSizeRange.max - starSizeRange.min) + starSizeRange.min;
			this.speed = Math.random() * (starSpeedRange.max - starSpeedRange.min) + starSpeedRange.min;
			this.brightness = Math.random() * 0.8 + 0.2; // Between 0.2 and 1.0
		}

		update(deltaX: number, deltaY: number): void {
			// Move star based on mouse movement and star's speed
			this.x += deltaX * this.speed;
			this.y += deltaY * this.speed;

			// Wrap around if star goes off screen
			if (this.x < 0) this.x = width;
			if (this.x > width) this.x = 0;
			if (this.y < 0) this.y = height;
			if (this.y > height) this.y = 0;
		}

		draw(): void {
			// ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
			ctx.fillStyle = `rgba(${starRGB}, ${this.brightness})`;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function initStars(): void {
		stars = [];
		for (let i = 0; i < starCount; i++) {
			stars.push(new Star());
		}
	}

	function animate(): void {
		// Calculate mouse movement delta
		const deltaX = -(mouseX - prevMouseX) * 0.05;
		const deltaY = -(mouseY - prevMouseY) * 0.05;

		// Update previous mouse position
		prevMouseX = mouseX;
		prevMouseY = mouseY;

		// Clear canvas
		ctx.fillStyle = `rgba(${backgroundRGB}, 1)`;
		ctx.fillRect(0, 0, width, height);

		// Update and draw stars
		stars.forEach((star) => {
			star.update(deltaX, deltaY);
			star.draw();
		});

		requestAnimationFrame(animate);
	}

	function handleMouseMove(event: MouseEvent): void {
		mouseX = event.clientX;
		mouseY = event.clientY;

		// Initialize previous position if this is the first movement
		if (prevMouseX === 0 && prevMouseY === 0) {
			prevMouseX = mouseX;
			prevMouseY = mouseY;
		}
	}

	function resizeCanvas(): void {
		width = window.innerWidth;
		height = window.innerHeight;

		if (canvas) {
			canvas.width = width;
			canvas.height = height;

			// Recreate stars when canvas is resized
			initStars();
		}
	}

	onMount(() => {
		ctx = canvas.getContext("2d")!;
		const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

		backgroundRGB = darkMode ? "31, 33, 37" : "248, 248, 248";
		starRGB = darkMode ? "255, 255, 255" : "31, 33, 37";

		// Set initial canvas size
		resizeCanvas();

		// Add event listeners
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("resize", resizeCanvas);

		// Start animation loop
		animate();

		// Cleanup on component unmount
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", resizeCanvas);
		};
	});
</script>

<div class="relative h-full w-full">
	<canvas
		bind:this={canvas}
		class="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full bg-transparent"
	></canvas>
</div>
