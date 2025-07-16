import {createSignal, type Component, type JSX} from 'solid-js';
import {auth, Games} from '~/lib/firebase';
import {useAuth, useFirestore} from 'solid-firebase';
import Collection from '~/lib/Collection';
import {addDoc, orderBy, query, Timestamp} from 'firebase/firestore';

import styles from './index.module.css';

const Index: Component = () => {
	const games = useFirestore(query(Games, orderBy('createdAt', 'desc')));
	const authState = useAuth(auth);
	const [maxCorrectAnswers, setMaxCorrectAnswers] = createSignal(10);
	const [answer, setAnswer] = createSignal(0);

	const onSubmitGame: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
		event,
	) => {
		event.preventDefault();
		const form = event.currentTarget;

		if (!(authState.data && form)) {
			return;
		}

		await addDoc(Games, {
			id: crypto.randomUUID(),
			createdAt: Timestamp.now(),
			rules: {
				maxCorrectAnswers: maxCorrectAnswers(),
			},
			players: [authState.data.uid],
			configs: {
				answer: answer(),
			},
		});

		setMaxCorrectAnswers(10);
		setAnswer(0);
	};

	return (
		<div>
			<h1>Games</h1>
			<ul class={styles.tasks}>
				<Collection data={games}>
					{(gameData) => (
						<li class={styles.task}>
							<div>Game ID: {gameData.id}</div>
							<div>Max Correct Answers: {gameData.rules.maxCorrectAnswers}</div>
							<div>Players: {gameData.players.length}</div>
							<div>Answer: {gameData.configs.answer}</div>
							<div>Created: {gameData.createdAt.toDate().toLocaleString()}</div>
						</li>
					)}
				</Collection>
				<li class={styles.addTask}>
					<form onSubmit={onSubmitGame}>
						<div>
							<label>
								Max Correct Answers:
								<input
									type="number"
									name="maxCorrectAnswers"
									value={maxCorrectAnswers()}
									min="1"
									onChange={(event) => setMaxCorrectAnswers(Number(event.currentTarget?.value))}
								/>
							</label>
						</div>
						<div>
							<label>
								Answer:
								<input
									type="number"
									name="answer"
									value={answer()}
									onChange={(event) => setAnswer(Number(event.currentTarget?.value))}
								/>
							</label>
						</div>
						<button type="submit" disabled={!authState.data}>
							Create Game
						</button>
					</form>
				</li>
			</ul>
		</div>
	);
};

export default Index;
