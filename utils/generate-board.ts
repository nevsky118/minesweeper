import { BoardType, TileType, TILE_STATUSES } from '@/types';
import { generateMines } from './generate-mines';
import { positionMatch } from './position-match';

export const generateBoard = (
	boardSize: number,
	minesCount: number,
	clickedTile = { x: 0, y: 0 }
): BoardType => {
	const board: BoardType = [];

	const mines = generateMines(boardSize, minesCount, clickedTile);

	for (let x = 0; x < boardSize; x++) {
		const row: TileType[] = [];
		for (let y = 0; y < boardSize; y++) {
			const tile = {
				x,
				y,
				status: TILE_STATUSES.HIDDEN,
				mine: mines.some(m => positionMatch(m, { x, y })),
				number: 0,
			};

			if (!tile.mine) {
				const surroundingCells = [
					{ x: x - 1, y: y - 1 },
					{ x: x - 1, y },
					{ x: x - 1, y: y + 1 },
					{ x, y: y - 1 },
					{ x, y: y + 1 },
					{ x: x + 1, y: y - 1 },
					{ x: x + 1, y },
					{ x: x + 1, y: y + 1 },
				];
				tile.number = surroundingCells.reduce((count, cell) => {
					if (
						cell.x >= 0 &&
						cell.x < boardSize &&
						cell.y >= 0 &&
						cell.y < boardSize &&
						mines.some(m => positionMatch(m, cell))
					) {
						return count + 1;
					}
					return count;
				}, 0);
			}

			row.push(tile);
		}
		board.push(row);
	}

	return board;
};
