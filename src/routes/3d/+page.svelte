<script lang="ts">
	import { onMount } from "svelte";
	import { Canvas } from "@threlte/core";
	import Scene from "$lib/3d/components/scene.svelte";

	let blocker: any;
	let instructions: any;
	let canvasContainer;
	let pointerLockEnabled = false;

	onMount(() => {
		const havePointerLock = "pointerLockElement" in document;
		if (!havePointerLock) {
			instructions.innerHTML = "Your browser doesn't seem to support Pointer Lock API";
			return;
		}
		const element = document.body;
		const pointerlockchange = () => {
			if (document.pointerLockElement === element) {
				pointerLockEnabled = true;
				blocker.style.display = "none";
			} else {
				pointerLockEnabled = false;
				blocker.style.display = "flex";
				instructions.style.display = "";
			}
		};

		const pointerlockerror = () => {
			instructions.style.display = "";
		};

		// Hook pointer lock state change events
		document.addEventListener("pointerlockchange", pointerlockchange, false);
		document.addEventListener("pointerlockerror", pointerlockerror, false);

		instructions.addEventListener(
			"click",
			() => {
				instructions.style.display = "none";

				// Ask the browser to lock the pointer
				element.requestPointerLock = element.requestPointerLock;

				if (/Firefox/i.test(navigator.userAgent)) {
					const fullscreenchange = () => {
						if (document.fullscreenElement === element) {
							document.removeEventListener("fullscreenchange", fullscreenchange);
							document.removeEventListener("mozfullscreenchange", fullscreenchange);
							element.requestPointerLock();
						}
					};

					document.addEventListener("fullscreenchange", fullscreenchange, false);
					document.addEventListener("mozfullscreenchange", fullscreenchange, false);

					element.requestFullscreen = element.requestFullscreen;

					element.requestFullscreen();
				} else {
					element.requestPointerLock();
				}
			},
			false
		);
	});
</script>

<div class="container" bind:this={canvasContainer}>
	<div id="blocker" bind:this={blocker}>
		<div id="instructions" bind:this={instructions}>
			<span style="font-size:40px">Click to play</span>
			<br />
			(W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
		</div>
	</div>

	<Canvas>
		<Scene {pointerLockEnabled} />
	</Canvas>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100vh;
		background-color: #ffffff;
		margin: 0;
		overflow: hidden;
		font-family: arial;
	}

	#blocker {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#instructions {
		color: #ffffff;
		text-align: center;
		cursor: pointer;
		user-select: none;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
