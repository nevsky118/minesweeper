import { setTile } from '@/services/gameSlice';
import { BoardType, TileType, TILE_STATUSES } from '@/types';
import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

export const revealTile = (
	tile: TileType,
	board: BoardType,
	dispatch: Dispatch<AnyAction>
) => {
	if (tile.status !== TILE_STATUSES.HIDDEN) {
		return;
	}

	if (tile.mine) {
		dispatch(setTile({ ...tile, status: TILE_STATUSES.BOOM }));
		return;
	}

	if (tile.number !== 0) {
		dispatch(
			setTile({
				...tile,
				status: Object.values(TILE_STATUSES)[tile.number],
			})
		);
	} else {
		const tilesToReveal: TileType[] = [tile];
		const visited: Set<string> = new Set([`${tile.x},${tile.y}`]);

		// reveal adjacent tiles
		while (tilesToReveal.length > 0) {
			const currentTile = tilesToReveal.pop()!;
			const { x: currX, y: currY } = currentTile;

			dispatch(
				setTile({
					...currentTile,
					status: TILE_STATUSES.BLANK,
					isAdjacentReveal: true,
				})
			);

			for (let i = currX - 1; i <= currX + 1; i++) {
				for (let j = currY - 1; j <= currY + 1; j++) {
					if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
						continue;
					}

					const adjacentTile = board[i][j];

					if (
						visited.has(`${i},${j}`) ||
						adjacentTile.status !== TILE_STATUSES.HIDDEN
					) {
						continue;
					}

					if (adjacentTile.number !== 0) {
						dispatch(
							setTile({
								...adjacentTile,
								status: Object.values(TILE_STATUSES)[adjacentTile.number],
								isAdjacentReveal: true,
							})
						);
					} else {
						tilesToReveal.push(adjacentTile);
					}

					visited.add(`${i},${j}`);
				}
			}
		}
	}
};
