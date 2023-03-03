import { setBoard, stopGame } from '@/services/gameSlice';
import { RootState } from '@/store';
import { GAME_STATUSES, TILE_STATUSES } from '@/types';
import { generateBoard } from '@/utils/generate-board';
import { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tile from './Tile';

const Board = () => {
	const board = useSelector((state: RootState) => state.game.board);
	const boardSize = useSelector((state: RootState) => state.game.boardSize);
	const minesCount = useSelector((state: RootState) => state.game.minesCount);

	const dispatch = useDispatch();

	useEffect(() => {
		if (board.length > 0) {
			if (checkWin()) {
				dispatch(stopGame(GAME_STATUSES.WIN));
				return;
			}

			if (checkLose()) {
				dispatch(stopGame(GAME_STATUSES.LOSS));
				return;
			}
		}
	}, [board]);

	const checkLose = () =>
		board.some(row => row.some(tile => tile.status === TILE_STATUSES.BOOM));

	const checkWin = () =>
		board.every(row =>
			row.every(
				tile =>
					(!tile.mine && tile.status === TILE_STATUSES.BLANK) ||
					(tile.status >= TILE_STATUSES.N1 &&
						tile.status <= TILE_STATUSES.N8) ||
					(tile.mine && tile.status === TILE_STATUSES.FLAG)
			)
		);

	useEffect(() => {
		dispatch(setBoard(generateBoard(boardSize, minesCount)));
	}, [boardSize, minesCount]);

	return (
		<div className="board" style={{ '--size': boardSize } as CSSProperties}>
			{board.map((row, rowIndex) =>
				row.map((value, colIndex) => (
					<Tile key={`${rowIndex}-${colIndex}`} tile={value} />
				))
			)}
		</div>
	);
};

export default Board;
