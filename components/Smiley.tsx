import { RootState } from '@/store';
import { SMILEYS_MAPPING } from '@/types';
import { useSelector } from 'react-redux';

interface SmileyProps {
	restartGame: () => void;
}

const Smiley = ({ restartGame }: SmileyProps) => {
	const status = useSelector((state: RootState) => state.game.status);

	return (
		<div
			className={`smiley ${SMILEYS_MAPPING[status]}`}
			onClick={restartGame}
		/>
	);
};

export default Smiley;
