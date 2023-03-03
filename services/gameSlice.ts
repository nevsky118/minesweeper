import {
	BoardType,
	BOARD_SIZES,
	GAME_STATUSES,
	MINES_COUNT,
	TileType,
	TILE_STATUSES,
} from '@/types';
import { generateBoard } from '@/utils/generate-board';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const GAME_TIME = 2400;

interface GameState {
	board: BoardType;
	boardSize: BOARD_SIZES;
	minesCount: number;
	status: GAME_STATUSES;
	isStarted: boolean;
	time: number;
	clicks: {
		active: number;
		wasted: number;
	};
}

const initialState: GameState = {
	board: [],
	boardSize: BOARD_SIZES.INTERMEDIATE,
	minesCount: MINES_COUNT[BOARD_SIZES.INTERMEDIATE],
	status: GAME_STATUSES.UNDECIDED,
	isStarted: false,
	time: GAME_TIME,
	clicks: {
		active: 0,
		wasted: 0,
	},
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setBoard: (state, action: PayloadAction<BoardType>) => {
			state.board = action.payload;
		},
		setTile: (
			state,
			{
				payload: { x, y, status, isAdjacentReveal = false, mine, number },
			}: PayloadAction<TileType & { isAdjacentReveal?: boolean }>
		) => {
			state.board[x][y].status = status;

			if (!isAdjacentReveal) {
				if (mine && status === TILE_STATUSES.FLAG) {
					state.clicks.active += 1;
					return;
				}

				if (mine) {
					state.clicks.wasted += 1;
					return;
				}

				if (!mine && status === TILE_STATUSES.FLAG) {
					state.clicks.wasted += 1;
					return;
				}

				if (number >= 0) {
					state.clicks.active += 1;
					return;
				}
			}
		},
		setBoardSize: (state, action: PayloadAction<BOARD_SIZES>) => {
			state.boardSize = action.payload;

			state.minesCount = MINES_COUNT[action.payload];
		},
		setMinesCount: (state, action: PayloadAction<number>) => {
			state.minesCount = action.payload;
		},
		setStatus: (state, action: PayloadAction<GAME_STATUSES>) => {
			state.status = action.payload;
		},
		setTime: (state, action: PayloadAction<number>) => {
			state.time = action.payload;
		},
		startGame: state => {
			state.isStarted = true;
		},
		restartGame: state => {
			state.status = GAME_STATUSES.UNDECIDED;
			state.isStarted = false;
			state.board = generateBoard(state.boardSize, state.minesCount);
			state.time = GAME_TIME;
			state.clicks = { active: 0, wasted: 0 };
		},
		stopGame: (state, action: PayloadAction<GAME_STATUSES>) => {
			state.status = action.payload;
			state.isStarted = false;

			// reveal all tiles
			state.board.forEach(row => {
				row.forEach(tile => {
					const { x, y, status, number, mine } = tile;

					if (
						status !== TILE_STATUSES.HIDDEN &&
						status !== TILE_STATUSES.FLAG
					) {
						return;
					}

					if (status === TILE_STATUSES.HIDDEN && mine) {
						state.board[x][y].status = TILE_STATUSES.MINE;
						return;
					}

					if (status === TILE_STATUSES.FLAG && !mine) {
						state.board[x][y].status = TILE_STATUSES.MINEX;
						return;
					}

					if (status === TILE_STATUSES.FLAG && mine) {
						return;
					}

					if (number > 0) {
						state.board[x][y].status = Object.values(TILE_STATUSES)[number];
						return;
					}
					state.board[x][y].status = TILE_STATUSES.BLANK;
				});
			});
		},
	},
});

export const {
	setBoard,
	setTile,
	setStatus,
	restartGame,
	stopGame,
	setBoardSize,
	setMinesCount,
	startGame,
	setTime,
} = gameSlice.actions;

export default gameSlice.reducer;
