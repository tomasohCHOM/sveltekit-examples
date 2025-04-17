<script lang="ts">
	import { onMount } from "svelte";

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let stars: Star[] = [];
	let mouseX: number = 0;
	let mouseY: number = 0;
	let prevMouseX: number = 0;
	let prevMouseY: number = 0;
	let velocityX: number = 0;
	let velocityY: number = 0;
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
		size: number = 0;
		speed: number = 0;
		brightness: number = 0;

		constructor() {
			this.reset();
			this.x = Math.random() * width;
			this.y = Math.random() * height;
		}

		reset(): void {
			this.size = Math.random() * (starSizeRange.max - starSizeRange.min) + starSizeRange.min;
			this.speed = Math.random() * (starSpeedRange.max - starSpeedRange.min) + starSpeedRange.min;
			this.brightness = Math.random() * 0.8 + 0.2;
		}

		update(deltaX: number, deltaY: number): void {
			this.x += deltaX * this.speed;
			this.y += deltaY * this.speed;

			if (this.x < 0) this.x = width;
			if (this.x > width) this.x = 0;
			if (this.y < 0) this.y = height;
			if (this.y > height) this.y = 0;
		}

		draw(): void {
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
		const dx = mouseX - prevMouseX;
		const dy = mouseY - prevMouseY;

		if (dx == 0 && dy == 0) {
			const driftStrength = 0.5;
			velocityX = 0.95;
			velocityY = 0.95;

			velocityX = -Math.random() * 0.25 * driftStrength;
			velocityY = Math.random() * 0.25 * driftStrength;
		} else {
			velocityX = -dx * 0.025;
			velocityY = -dy * 0.025;

			prevMouseX = mouseX;
			prevMouseY = mouseY;
		}

		ctx.fillStyle = `rgba(${backgroundRGB}, 1)`;
		ctx.fillRect(0, 0, width, height);

		stars.forEach((star) => {
			star.update(velocityX, velocityY);
			star.draw();
		});

		requestAnimationFrame(animate);
	}

	function handleMouseMove(event: MouseEvent): void {
		mouseX = event.clientX;
		mouseY = event.clientY;

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
			initStars();
		}
	}

	onMount(() => {
		ctx = canvas.getContext("2d")!;
		const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

		backgroundRGB = darkMode ? "31, 33, 37" : "248, 248, 248";
		starRGB = darkMode ? "255, 255, 255" : "31, 33, 37";

		resizeCanvas();

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("resize", resizeCanvas);

		animate();

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
