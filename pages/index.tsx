import Board from '@/components/Board';
import DifficultySelect from '@/components/DifficultySelect';
import Header from '@/components/Header';
import Stats from '@/components/Stats';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Minesweeper</title>
			</Head>

			<main style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<DifficultySelect />
				<div style={{ display: 'flex', gap: '8px' }}>
					<div className="container">
						<Header />
						<Board />
					</div>

					<Stats />
				</div>
			</main>
		</>
	);
}
