import { restartGame, setTime, stopGame } from '@/services/gameSlice';
import { RootState } from '@/store';
import { GAME_STATUSES } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Number from './Number';
import Smiley from './Smiley';

const Header = () => {
	const dispatch = useDispatch();

	const isStarted = useSelector((state: RootState) => state.game.isStarted);

	const time = useSelector((state: RootState) => state.game.time);
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		if (isStarted) {
			intervalId = setInterval(() => {
				dispatch(setTime(time > 0 ? time - 1 : 0));
			}, 1000);
		}
		return () => clearInterval(intervalId);
	}, [isStarted, time]);

	useEffect(() => {
		if (time === 0) {
			dispatch(stopGame(GAME_STATUSES.LOSS));
		}
	}, [time]);

	return (
		<header className="header">
			<Number n={minutes} />
			<Smiley restartGame={() => dispatch(restartGame())} />
			<Number n={seconds} />
		</header>
	);
};

export default Header;
