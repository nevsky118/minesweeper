import { TileType, TILE_STATUSES } from '@/types';

export const markTile = (tile: TileType): TILE_STATUSES => {
	if (
		tile.status !== TILE_STATUSES.HIDDEN &&
		tile.status !== TILE_STATUSES.FLAG &&
		tile.status !== TILE_STATUSES.QUESTION
	) {
		return tile.status;
	}

	if (tile.status === TILE_STATUSES.HIDDEN) {
		return TILE_STATUSES.FLAG;
	} else if (tile.status === TILE_STATUSES.FLAG) {
		return TILE_STATUSES.QUESTION;
	} else {
		return TILE_STATUSES.HIDDEN;
	}
};
