import { setBoardSize } from '@/services/gameSlice';
import { RootState } from '@/store';
import { BOARD_SIZES, GAME_STATUSES } from '@/types';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DifficultySelect = () => {
	const dispatch = useDispatch();

	const isStarted = useSelector((state: RootState) => state.game.isStarted);
	const boardSize = useSelector((state: RootState) => state.game.boardSize);
	const status = useSelector((state: RootState) => state.game.status);

	const handleBoardSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setBoardSize(parseInt(event.target.value)));
	};

	return (
		<div>
			<select
				id="boardSize"
				name="boardSize"
				value={boardSize}
				disabled={isStarted || status !== GAME_STATUSES.UNDECIDED}
				onChange={handleBoardSizeChange}
			>
				<option value={BOARD_SIZES.BEGINNER}>Beginner</option>
				<option value={BOARD_SIZES.INTERMEDIATE}>Intermediate</option>
				<option value={BOARD_SIZES.EXPERT}>Expert</option>
			</select>
		</div>
	);
};

export default DifficultySelect;
