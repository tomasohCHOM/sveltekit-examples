<script lang="ts">
	import { Canvas, T } from "@threlte/core";
	import { OrbitControls } from "@threlte/extras";
	import { onMount, onDestroy } from "svelte";

	// Type definitions
	type Position = {
		x: number;
		y: number;
		z: number;
	};

	type Rotation = {
		x: number;
		y: number;
		z: number;
	};

	type KeyState = {
		forward: boolean;
		backward: boolean;
		left: boolean;
		right: boolean;
		run: boolean;
	};

	// Player state
	let position: Position = { x: 0, y: 1.7, z: 5 }; // Eye height at 1.7 units
	let rotation: Rotation = { x: 0, y: 0, z: 0 };
	let moveSpeed: number = 0.1;
	let lookSpeed: number = 0.5;

	// Movement controls
	let keys: KeyState = {
		forward: false,
		backward: false,
		left: false,
		right: false,
		run: false
	};

	// Mouse controls
	let isPointerLocked: boolean = false;
	let canvasElement: HTMLCanvasElement | null = null;
	let frameId: number | null = null;
	let canvasContainer: HTMLDivElement | null = null;

	function onKeyDown(e: KeyboardEvent): void {
		switch (e.code) {
			case "KeyW":
				keys.forward = true;
				break;
			case "KeyS":
				keys.backward = true;
				break;
			case "KeyA":
				keys.left = true;
				break;
			case "KeyD":
				keys.right = true;
				break;
			case "ShiftLeft":
				keys.run = true;
				break;
		}
	}

	function onKeyUp(e: KeyboardEvent): void {
		switch (e.code) {
			case "KeyW":
				keys.forward = false;
				break;
			case "KeyS":
				keys.backward = false;
				break;
			case "KeyA":
				keys.left = false;
				break;
			case "KeyD":
				keys.right = false;
				break;
			case "ShiftLeft":
				keys.run = false;
				break;
		}
	}

	function onMouseMove(e: MouseEvent): void {
		if (!isPointerLocked) return;

		// Update rotation based on mouse movement
		rotation.y -= e.movementX * lookSpeed * 0.01;
		rotation.x -= e.movementY * lookSpeed * 0.01;

		// Limit looking up/down to avoid flipping
		rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));
	}

	function requestPointerLock(): void {
		if (canvasElement && !isPointerLocked) {
			try {
				canvasElement.requestPointerLock();
				console.log("Requesting pointer lock");
			} catch (e) {
				console.error("Error requesting pointer lock:", e);
			}
		} else {
			console.log("Canvas element not available or already locked");
		}
	}

	function onPointerLockChange(): void {
		isPointerLocked = document.pointerLockElement === canvasElement;
		console.log("Pointer lock state changed:", isPointerLocked);
	}

	// Animation loop for movement
	function animate(): void {
		if (isPointerLocked) {
			const actualSpeed = keys.run ? moveSpeed * 2 : moveSpeed;

			// Calculate movement direction based on camera rotation
			if (keys.forward) {
				position.x -= Math.sin(rotation.y) * actualSpeed;
				position.z -= Math.cos(rotation.y) * actualSpeed;
			}
			if (keys.backward) {
				position.x += Math.sin(rotation.y) * actualSpeed;
				position.z += Math.cos(rotation.y) * actualSpeed;
			}
			if (keys.left) {
				position.x -= Math.cos(rotation.y) * actualSpeed;
				position.z += Math.sin(rotation.y) * actualSpeed;
			}
			if (keys.right) {
				position.x += Math.cos(rotation.y) * actualSpeed;
				position.z -= Math.sin(rotation.y) * actualSpeed;
			}
		}

		frameId = requestAnimationFrame(animate);
	}

	onMount(() => {
		// Setup event listeners
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		window.addEventListener("mousemove", onMouseMove);
		document.addEventListener("pointerlockchange", onPointerLockChange);

		// Get canvas element for pointer lock - wait a bit to ensure it's rendered
		setTimeout(() => {
			canvasElement = document.querySelector("canvas");
			if (canvasElement) {
				console.log("Canvas element found");
			} else {
				console.error("Canvas element not found");
			}
		}, 100);

		// Start animation loop
		animate();
	});

	onDestroy(() => {
		// Clean up event listeners
		// window.removeEventListener("keydown", onKeyDown);
		// window.removeEventListener("keyup", onKeyUp);
		// window.removeEventListener("mousemove", onMouseMove);
		// document.removeEventListener("pointerlockchange", onPointerLockChange);

		// Cancel animation frame
		if (frameId !== null) {
			cancelAnimationFrame(frameId);
		}
	});

	// Handle canvas click directly
	function handleCanvasClick(): void {
		requestPointerLock();
	}

	// Three.js mesh props for type consistency
	interface MeshProps {
		position: [number, number, number];
		color: string;
		geometry: [number, number, number];
	}

	// Wall props
	const walls: MeshProps[] = [
		{ position: [0, 2.5, -10], color: "#8d6e63", geometry: [20, 5, 1] },
		{ position: [0, 2.5, 10], color: "#8d6e63", geometry: [20, 5, 1] },
		{ position: [-10, 2.5, 0], color: "#8d6e63", geometry: [1, 5, 20] },
		{ position: [10, 2.5, 0], color: "#8d6e63", geometry: [1, 5, 20] }
	];

	// Cube props
	const cubes: MeshProps[] = [
		{ position: [5, 1, 0], color: "#1e88e5", geometry: [2, 2, 2] },
		{ position: [-5, 1, 0], color: "#e53935", geometry: [2, 2, 2] },
		{ position: [0, 1, -5], color: "#fdd835", geometry: [2, 2, 2] }
	];
</script>

<div class="h-full w-full" bind:this={canvasContainer}>
	<Canvas>
		<!-- Custom first-person camera -->
		<T.PerspectiveCamera
			position={[position.x, position.y, position.z]}
			rotation={[rotation.x, rotation.y, rotation.z]}
			fov={75}
			near={0.1}
			far={1000}
			makeDefault
		>
			<!-- Disable OrbitControls when pointer is locked -->
			{#if !isPointerLocked}
				<OrbitControls />
			{/if}
		</T.PerspectiveCamera>

		<!-- Light setup -->
		<T.AmbientLight intensity={0.6} />
		<T.DirectionalLight intensity={0.8} position={[10, 10, 10]} />

		<!-- Environment -->
		<!-- Ground plane -->
		<T.Mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
			<T.PlaneGeometry args={[100, 100]} />
			<T.MeshStandardMaterial color="#4c7e4c" />
		</T.Mesh>

		<!-- Generate cubes from the array -->
		{#each cubes as cube}
			<T.Mesh position={cube.position}>
				<T.BoxGeometry args={cube.geometry} />
				<T.MeshStandardMaterial color={cube.color} />
			</T.Mesh>
		{/each}

		<!-- Generate walls from the array -->
		{#each walls as wall}
			<T.Mesh position={wall.position}>
				<T.BoxGeometry args={wall.geometry} />
				<T.MeshStandardMaterial color={wall.color} />
			</T.Mesh>
		{/each}
	</Canvas>

	<!-- Overlay button to request pointer lock explicitly -->
	{#if !isPointerLocked}
		<div class="controls-overlay">
			<div class="controls-info">
				<h2>First-Person Controls</h2>
				<p>Click the button below to enable first-person mode</p>
				<button class="start-button" on:click={requestPointerLock}>
					Start First-Person Mode
				</button>
				<div class="controls-list">
					<ul>
						<li>WASD - Move</li>
						<li>Mouse - Look around</li>
						<li>Shift - Run</li>
						<li>ESC - Exit first-person mode</li>
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(body, html) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.controls-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: auto; /* Changed to allow click events */
	}

	.controls-info {
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 20px;
		border-radius: 10px;
		text-align: center;
	}

	.controls-info h2 {
		margin-top: 0;
	}

	.controls-list {
		margin-top: 15px;
	}

	.controls-info ul {
		list-style: none;
		padding: 0;
		margin: 0;
		text-align: left;
	}

	.start-button {
		background-color: #4caf50;
		border: none;
		color: white;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 15px 0;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s;
	}

	.start-button:hover {
		background-color: #45a049;
	}
</style>
