import {test, expect} from 'vitest';
import {render, waitFor} from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import Index from './index.js';

const user = userEvent.setup();

test('has create game button', async () => {
	const {getByRole} = render(() => <Index />);
	const createGameButton = getByRole('button');
	expect(createGameButton).toHaveTextContent('Create Game');
});

test('is able to create game', async () => {
	const {getByText, getAllByRole, getByLabelText} = render(() => <Index />);

	{
		const maxCorrectAnswersInput = getByLabelText('Max Correct Answers:');
		expect(maxCorrectAnswersInput).toHaveValue(10);

		const answerInput = getByLabelText('Answer:');
		expect(answerInput).toHaveValue(0);

		const createGameButton = getByText('Create Game');
		expect(createGameButton).not.toBeDisabled();

		const games = getAllByRole('listitem');
		expect(games).toHaveLength(1);

		await user.clear(maxCorrectAnswersInput);
		await user.type(maxCorrectAnswersInput, '5');
		await user.clear(answerInput);
		await user.type(answerInput, '42');
		await user.click(createGameButton);
	}

	await waitFor(
		() => {
			const maxCorrectAnswersInput = getByLabelText('Max Correct Answers:');
			expect(maxCorrectAnswersInput).toHaveValue(10);
			const answerInput = getByLabelText('Answer:');
			expect(answerInput).toHaveValue(0);
		},
		{
			timeout: 1000,
		},
	);

	{
		const games = getAllByRole('listitem');
		expect(games).toHaveLength(2);

		const lastGame = games[games.length - 2];
		expect(lastGame).toHaveTextContent('Max Correct Answers: 5');
		expect(lastGame).toHaveTextContent('Answer: 42');
	}
});
