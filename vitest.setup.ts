import {beforeEach, vi} from 'vitest';

const originalFetch = global.fetch;
const fetchMock = vi.fn<typeof fetch>((...args) => {
	const [url] = args;
	if (url === '/__/firebase/init.json') {
		return Promise.resolve(
			new Response(
				JSON.stringify({
					apiKey: 'fakeApiKey',
					projectId: 'tsg-battle-online',
				}),
			),
		);
	}
	return originalFetch(...args);
});
vi.stubGlobal('fetch', fetchMock);

beforeEach(async () => {
	// Reset firestore data
	await originalFetch(
		'http://localhost:8080/emulator/v1/projects/tsg-battle-online/databases/(default)/documents',
		{
			method: 'DELETE',
		},
	);
});
