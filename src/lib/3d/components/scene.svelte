<script lang="ts">
	import { T } from "@threlte/core";
	import { useTask } from "@threlte/core";
	import PointerLockControls from "./pointer-lock-controls.svelte";
	import { onMount } from "svelte";

	export let pointerLockEnabled = false;

	// Scene objects
	let objects: any = [];
	let controlsObject: any;
	let isOnObject = false;

	onMount(() => {
		// Generate random objects
		generateObjects();
	});

	function generateObjects() {
		// We'll create these in the setup of the cubes below
		objects = Array(500)
			.fill(0)
			.map(() => ({
				position: {
					x: Math.floor(Math.random() * 20 - 10) * 20,
					y: Math.floor(Math.random() * 20) * 20 + 10,
					z: Math.floor(Math.random() * 20 - 10) * 20
				},
				color: {
					h: Math.random() * 0.2 + 0.5,
					s: Math.random() * 0.5,
					v: 1
				}
			}));
	}

	function hsvToHex(h: number, s: number, v: number) {
		// Convert HSV to RGB then to hex
		let r: number = 0,
			g: number = 0,
			b: number = 0;
		let i = Math.floor(h * 6);
		let f = h * 6 - i;
		let p = v * (1 - s);
		let q = v * (1 - f * s);
		let t = v * (1 - (1 - f) * s);

		switch (i % 6) {
			case 0:
				(r = v), (g = t), (b = p);
				break;
			case 1:
				(r = q), (g = v), (b = p);
				break;
			case 2:
				(r = p), (g = v), (b = t);
				break;
			case 3:
				(r = p), (g = q), (b = v);
				break;
			case 4:
				(r = t), (g = p), (b = v);
				break;
			case 5:
				(r = v), (g = p), (b = q);
				break;
		}

		const toHex = (x: number) => {
			const hex = Math.round(x * 255).toString(16);
			return hex.length === 1 ? "0" + hex : hex;
		};
		// const color = `rgb(${r * 255},${g * 255},${b * 255})`;
		// console.log(color);
		// return color;
		return "#FF0000";
	}

	// Floor vertices generation
	const floorSize = 2000;
	const floorSegments = 100;

	// Ray for collision detection
	let ray = { origin: { x: 0, y: 0, z: 0 }, direction: { x: 0, y: -1, z: 0 } };

	// Frame loop for physics and collisions
	useTask((delta) => {
		if (!controlsObject || !pointerLockEnabled) return;

		// Update ray origin to follow camera
		ray.origin.x = controlsObject.current.position.x;
		ray.origin.y = controlsObject.current.position.y - 10;
		ray.origin.z = controlsObject.current.position.z;

		// Check for collisions with objects
		isOnObject = false;

		// Here we would do proper ray intersection testing
		// This is a simplified version checking distance to objects
		for (const obj of objects) {
			const dx = ray.origin.x - obj.position.x;
			const dy = ray.origin.y - obj.position.y;
			const dz = ray.origin.z - obj.position.z;
			const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

			if (distance < 20) {
				isOnObject = true;
				break;
			}
		}
	});
</script>

<T.PerspectiveCamera position={[0, 10, 0]} fov={75} near={1} far={1000} makeDefault>
	<PointerLockControls enabled={pointerLockEnabled} {isOnObject} bind:controlsObject />
</T.PerspectiveCamera>

<!-- Scene lighting -->
<T.DirectionalLight position={[1, 1, 1]} intensity={1.5} />
<T.DirectionalLight position={[-1, -0.5, -1]} intensity={0.75} />

<!-- Fog -->
<T.Fog color="#ffffff" near={0} far={750} />

<!-- Floor -->
<T.Mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
	<T.PlaneGeometry args={[floorSize, floorSize, floorSegments, floorSegments]}>
		<!-- In Threlte, we'd need to manipulate vertices directly in a more complex way -->
	</T.PlaneGeometry>
	<T.MeshBasicMaterial color="#88cc88" vertexColors={true} />
</T.Mesh>

<!-- Objects -->
{#each objects as obj, i}
	<T.Mesh position={[obj.position.x, obj.position.y, obj.position.z]} castShadow receiveShadow>
		<T.BoxGeometry args={[20, 20, 20]} />
		<T.MeshPhongMaterial
			color={hsvToHex(obj.color.h, obj.color.s, obj.color.v)}
			specular="#ffffff"
			flatShading={true}
			vertexColors={true}
		/>
	</T.Mesh>
{/each}
