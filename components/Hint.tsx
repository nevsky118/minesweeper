import { showHint } from '@/services/gameSlice';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

const Hint = () => {
	const dispatch = useDispatch();
	const isStarted = useSelector((state: RootState) => state.game.isStarted);
	const hintShown = useSelector((state: RootState) => state.game.hintShown);

	const handleHintClick = () => {
		if (isStarted && !hintShown) {
			dispatch(showHint());
		}
	};

	return (
		<>
			<button
				onClick={handleHintClick}
				disabled={!isStarted || hintShown}
				className="hint"
			>
				💡
			</button>
		</>
	);
};

export default Hint;
