import {useParams} from '@solidjs/router';
import {doc, type DocumentReference} from 'firebase/firestore';
import type {Component} from 'solid-js';
import {useFirestore} from 'solid-firebase';
import {db} from '~/lib/firebase';
import Doc from '~/lib/Doc';
import type {Game} from '~/lib/schema';

const GameDetail: Component = () => {
	const params = useParams();

	const game = useFirestore(
		doc(db, 'games', params.gameId) as DocumentReference<Game>,
	);

	return (
		<div>
			<h1>Game Details</h1>
			<Doc data={game} fallback={<p>Game not found</p>}>
				{(gameData: Game) => (
					<div>
						<h2>Game ID: {gameData.id}</h2>
						<div>
							<h3>Rules</h3>
							<p>Max Correct Answers: {gameData.rules.maxCorrectAnswers}</p>
						</div>
						<div>
							<h3>Players</h3>
							<p>Number of Players: {gameData.players.length}</p>
							<ul>
								{gameData.players.map((player) => (
									<li>{player}</li>
								))}
							</ul>
						</div>
						<div>
							<h3>Configuration</h3>
							<p>Answer: {gameData.configs.answer}</p>
						</div>
						<div>
							<h3>Created</h3>
							<p>{gameData.createdAt.toDate().toLocaleString()}</p>
						</div>
					</div>
				)}
			</Doc>
			<a href="/">← Back to Games</a>
		</div>
	);
};

export default GameDetail;
