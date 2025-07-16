import type {DocumentData, FirestoreError, Timestamp} from 'firebase/firestore';

export interface UseFireStoreReturn<T> {
	data: T;
	loading: boolean;
	error: FirestoreError | null;
}

export interface Task extends DocumentData {
	uid: string;
	task: string;
	createdAt: Timestamp;
}

export interface Game extends DocumentData {
	id: string;
	createdAt: Timestamp;
	rules: {
		maxCorrectAnswers: number;
	};
	players: string[];
	configs: {
		answer: number;
	};
}
