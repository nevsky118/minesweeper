export const positionMatch = (
	a: { x: number; y: number },
	b: { x: number; y: number }
) => {
	return a.x === b.x && a.y === b.y;
};
