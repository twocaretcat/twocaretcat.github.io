import { expect, test } from 'bun:test';
import { isolationState } from '../support/isolation-state.ts';

test('isolates mutable module state in the second test file', () => {
	expect(isolationState.count).toBe(0);

	isolationState.count += 1;
});
