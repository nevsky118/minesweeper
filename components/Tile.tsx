import { setTile, startGame, setStatus, setBoard } from '@/services/gameSlice';
import { RootState } from '@/store';
import { GAME_STATUSES, TileType, TILE_STATUSES } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'clsx';
import { revealTile } from '@/utils/reveal-tile';
import { markTile } from '@/utils/mark-tile';
import { generateBoard } from '@/utils/generate-board';

interface TileProps {
	tile: TileType;
}

const Tile = ({ tile }: TileProps) => {
	const board = useSelector((state: RootState) => state.game.board);
	const gameStatus = useSelector((state: RootState) => state.game.status);

	const boardSize = useSelector((state: RootState) => state.game.boardSize);
	const minesCount = useSelector((state: RootState) => state.game.minesCount);

	const isStarted = useSelector((state: RootState) => state.game.isStarted);
	const dispatch = useDispatch();

	const [isLeftMouseDown, setIsLeftMouseDown] = useState(false);
	const tileRef = useRef<HTMLDivElement>(null);

	const tileClassName = cx('tile', {
		[tile.status]: !isLeftMouseDown,
		active: isLeftMouseDown,
	});

	// handle active tile style and 'oh' smiley
	const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
		if (e.button === 0 && tile.status === TILE_STATUSES.HIDDEN) {
			setIsLeftMouseDown(true);
			dispatch(setStatus(GAME_STATUSES.OH));
		}
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
		if (e.button === 0 && tile.status === TILE_STATUSES.HIDDEN) {
			setIsLeftMouseDown(false);
			dispatch(setStatus(GAME_STATUSES.UNDECIDED));
		}
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (
			isLeftMouseDown &&
			tileRef.current &&
			event.target instanceof Node &&
			!tileRef.current.contains(event.target)
		) {
			setIsLeftMouseDown(false);
			dispatch(setStatus(GAME_STATUSES.UNDECIDED));
		}
	};

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, [isLeftMouseDown]);

	const validateClick = () => {
		if (gameStatus === GAME_STATUSES.LOSS || gameStatus === GAME_STATUSES.WIN) {
			return;
		}

		if (!isStarted) {
			dispatch(startGame());
		}
	};

	const handleLeftClick = () => {
		if (!isStarted) {
			const newBoard = generateBoard(boardSize, minesCount, {
				x: tile.x,
				y: tile.y,
			});
			dispatch(setBoard(newBoard));
			dispatch(startGame());
			revealTile(newBoard[tile.x][tile.y], newBoard, dispatch);
		} else {
			validateClick();
			revealTile(tile, board, dispatch);
		}
	};

	const handleRightClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		validateClick();
		dispatch(setTile({ ...tile, status: markTile(tile) }));
	};

	return (
		<div
			ref={tileRef}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onClick={handleLeftClick}
			onContextMenu={handleRightClick}
			className={tileClassName}
		/>
	);
};

export default Tile;
