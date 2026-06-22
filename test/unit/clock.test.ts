import { describe, expect, test } from 'bun:test';
import {
	createFixedDate,
	FIXED_NOW_ISO,
	useFixedSystemTime,
} from '../support/clock.ts';

describe('Bun test environment', () => {
	test('runs with a deterministic UTC time zone', () => {
		expect(new Date(2026, 0, 1).getTimezoneOffset()).toBe(0);
		expect(createFixedDate().toISOString()).toBe(FIXED_NOW_ISO);
	});

	test('restores the real clock after setting a fixed system time', () => {
		const realNow = Date.now();
		const restoreSystemTime = useFixedSystemTime();

		try {
			expect(new Date().toISOString()).toBe(FIXED_NOW_ISO);
		} finally {
			restoreSystemTime();
		}

		expect(Date.now()).toBeGreaterThanOrEqual(realNow);
	});
});
