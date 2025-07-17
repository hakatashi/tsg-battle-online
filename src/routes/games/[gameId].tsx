import {useParams} from '@solidjs/router';
import {doc, type DocumentReference} from 'firebase/firestore';
import {createSignal, type JSX, type Component} from 'solid-js';
import {useFirestore} from 'solid-firebase';
import {db} from '~/lib/firebase';
import Doc from '~/lib/Doc';
import type {Game} from '~/lib/schema';

const GameDetail: Component = () => {
	const params = useParams();

	const [userAnswer, setUserAnswer] = createSignal(0);

	const game = useFirestore(
		doc(db, 'games', params.gameId) as DocumentReference<Game>,
	);

	const onSubmitAnswer: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
		event,
	) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (!game.data || !form) {
			return;
		}

		if (userAnswer() === game.data.configs.answer) {
			alert('Correct answer!');
		} else {
			alert('Wrong answer, try again!');
		}
	};

	return (
		<div>
			<h1>Game Details</h1>
			<Doc data={game} fallback={<p>Game not found</p>}>
				{(gameData) => (
					<div>
						<div>
							<p>Answer: {gameData.configs.answer}</p>
							<form onSubmit={onSubmitAnswer}>
								<input
									type="number"
									value={userAnswer()}
									onInput={(e) => setUserAnswer(Number(e.currentTarget.value))}
								/>
							</form>
						</div>
					</div>
				)}
			</Doc>
			<a href="/">← Back to Games</a>
		</div>
	);
};

export default GameDetail;
