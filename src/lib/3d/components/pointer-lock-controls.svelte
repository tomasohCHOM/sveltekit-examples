<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { useTask, useThrelte } from "@threlte/core";
	import { Vector3 } from "three";
	import Keyboard from "$lib/devdle/components/keyboard.svelte";

	export let enabled = false;
	export let isOnObject = false;
	export let controlsObject: any;

	// Movement variables
	let moveForward = false;
	let moveBackward = false;
	let moveLeft = false;
	let moveRight = false;
	let canJump = false;

	let velocity = new Vector3();
	let direction = new Vector3();

	// Movement constants
	const movementSpeed = 100.0;
	const jumpHeight = 350.0;

	// Get the camera from Threlte's context
	const { camera } = useThrelte();

	onMount(() => {
		// Initialize position
		controlsObject = camera;
		controlsObject.current.position.y = 10;

		// Setup key listeners
		document.addEventListener("keydown", onKeyDown, false);
		document.addEventListener("keyup", onKeyUp, false);
	});

	onDestroy(() => {
		document.removeEventListener("keydown", onKeyDown, false);
		document.removeEventListener("keyup", onKeyUp, false);
	});

	function onKeyDown(event: KeyboardEvent) {
		if (!enabled) return;

		switch (event.code) {
			case "KeyW":
				moveForward = true;
				break;
			case "KeyA":
				moveLeft = true;
				break;
			case "KeyS":
				moveBackward = true;
				break;
			case "KeyD":
				moveRight = true;
				break;
			case "Space":
				if (canJump === true) velocity.y += jumpHeight;
				canJump = false;
				break;
		}
	}

	function onKeyUp(event: KeyboardEvent) {
		if (!enabled) return;

		switch (event.code) {
			case "KeyW":
				moveForward = false;
				break;
			case "KeyA":
				moveLeft = false;
				break;
			case "KeyS":
				moveBackward = false;
				break;
			case "KeyD":
				moveRight = false;
				break;
		}
	}

	// Movement and physics update
	useTask((delta) => {
		if (!enabled) return;

		// Get delta time in seconds
		const deltaTime = delta;

		// Apply gravity
		velocity.y -= 9.8 * 100.0 * deltaTime;

		// Reset direction
		direction.z = Number(moveForward) - Number(moveBackward);
		direction.x = Number(moveLeft) - Number(moveRight);
		direction.normalize();

		// Update position based on movement keys
		if (moveForward || moveBackward) {
			velocity.z = -direction.z * movementSpeed * deltaTime;
		} else {
			velocity.z = 0;
		}

		if (moveLeft || moveRight) {
			velocity.x = -direction.x * movementSpeed * deltaTime;
		} else {
			velocity.x = 0;
		}

		// Handle collision detection
		if (isOnObject === true) {
			velocity.y = Math.max(0, velocity.y);
			canJump = true;
		}

		// Update camera position
		controlsObject.current.position.x += velocity.x;
		controlsObject.current.position.y += velocity.y * deltaTime;
		controlsObject.current.position.z += velocity.z;

		// Prevent falling below ground level
		if (controlsObject.current.position.y < 10) {
			velocity.y = 0;
			controlsObject.current.position.y = 10;
			canJump = true;
		}
	});

	function handleMouseMove(event: MouseEvent) {
		if (!enabled) return;

		const movementX = event.movementX;
		const movementY = event.movementY;

		// Rotate the camera based on mouse movement
		controlsObject.current.rotation.y -= movementX * 0.002;

		// Limit pitch to avoid flipping
		const pitchObject = camera;
		pitchObject.current.rotation.x -= movementY * 0.002;
		pitchObject.current.rotation.x = Math.max(
			-Math.PI / 2,
			Math.min(Math.PI / 2, pitchObject.current.rotation.x)
		);
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />
