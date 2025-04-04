/**
 * Helper to add leading zeros to a number string
 */
export function zeroPad(num: number, places: number) {
	return String(num).padStart(places, "0");
}
