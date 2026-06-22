import { setSystemTime } from 'bun:test';

export const FIXED_NOW_ISO = '2026-01-01T12:00:00.000Z';

export function createFixedDate(): Date {
	return new Date(FIXED_NOW_ISO);
}

export function useFixedSystemTime(now = createFixedDate()): () => void {
	setSystemTime(now);

	return () => {
		setSystemTime();
	};
}
