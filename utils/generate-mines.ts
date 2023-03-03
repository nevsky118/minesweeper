import { positionMatch } from './position-match';

export const generateMines = (
	boardSize: number,
	minesCount: number,
	excludeTile: { x: number; y: number }
): { x: number; y: number }[] => {
	const mines: { x: number; y: number }[] = [];

	while (mines.length < minesCount) {
		const x = Math.floor(Math.random() * boardSize);
		const y = Math.floor(Math.random() * boardSize);

		const newMine = { x, y };

		if (
			!positionMatch(newMine, excludeTile) &&
			!mines.some(m => positionMatch(m, newMine))
		) {
			mines.push(newMine);
		}
	}

	return mines;
};
