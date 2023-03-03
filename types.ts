export type TileType = {
	x: number;
	y: number;
	mine: boolean;
	status: TILE_STATUSES;
	number: number;
};

export type BoardType = TileType[][];

export enum TILE_STATUSES {
	HIDDEN = 'hidden',
	N1 = 'n1',
	N2 = 'n2',
	N3 = 'n3',
	N4 = 'n4',
	N5 = 'n5',
	N6 = 'n6',
	N7 = 'n7',
	N8 = 'n8',
	MINE = 'mine',
	FLAG = 'flag',
	BLANK = 'blank',
	MINEX = 'minex',
	BOOM = 'boom',
	QUESTION = 'question',
}

export enum Smileys {
	SMILE = 'smile',
	OH = 'oh',
	LOSS = 'loss',
	WIN = 'win',
}

export enum GAME_STATUSES {
	UNDECIDED = 'undecided',
	LOSS = 'loss',
	WIN = 'win',
	OH = 'oh',
}

export enum BOARD_SIZES {
	BEGINNER = 9,
	INTERMEDIATE = 16,
	EXPERT = 30,
}

export const MINES_COUNT = {
	[BOARD_SIZES.BEGINNER]: 10,
	[BOARD_SIZES.INTERMEDIATE]: 40,
	[BOARD_SIZES.EXPERT]: 99,
};

export const SMILEYS_MAPPING = {
	[GAME_STATUSES.UNDECIDED]: Smileys.SMILE,
	[GAME_STATUSES.WIN]: Smileys.WIN,
	[GAME_STATUSES.LOSS]: Smileys.LOSS,
	[GAME_STATUSES.OH]: Smileys.OH,
};
