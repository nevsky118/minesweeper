import { GAME_TIME } from '@/services/gameSlice';
import { RootState } from '@/store';
import { GAME_STATUSES } from '@/types';
import { useSelector } from 'react-redux';

const Stats = () => {
	const gameStatus = useSelector((state: RootState) => state.game.status);
	const time = useSelector((state: RootState) => state.game.time);
	const clicks = useSelector((state: RootState) => state.game.clicks);

	if (gameStatus !== GAME_STATUSES.LOSS && gameStatus !== GAME_STATUSES.WIN) {
		return null;
	} else {
		const timeSpent = GAME_TIME - time;

		const minutes = Math.floor(timeSpent / 60);
		const seconds = timeSpent % 60;

		const penaltyFactor = gameStatus === GAME_STATUSES.WIN ? 1 : 10;
		const efficiency =
			(
				(clicks.active / (clicks.active + clicks.wasted * penaltyFactor)) *
				100
			).toFixed(2) + '%';

		return (
			<div
				className="container"
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<div className="header">STATS</div>
				<div className="stats-block">
					<div className="stats">
						<div className="stats-entry">TIME</div>
						<span>
							{minutes} min. {seconds} sec.
						</span>
					</div>

					<div className="stats">
						<div className="stats-entry">Active Clicks</div>
						<span>{clicks.active}</span>
					</div>

					<div className="stats">
						<div className="stats-entry">Wasted Clicks</div>
						<span>{clicks.wasted}</span>
					</div>

					<div className="stats">
						<div className="stats-entry">Efficiency</div>
						<span>{efficiency}</span>
					</div>
				</div>
			</div>
		);
	}
};

export default Stats;
