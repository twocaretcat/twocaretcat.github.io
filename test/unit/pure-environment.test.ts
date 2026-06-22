import { expect, test } from 'bun:test';

test('does not preload browser globals for pure tests', () => {
	expect('window' in globalThis).toBe(false);
	expect('document' in globalThis).toBe(false);
	expect('HTMLElement' in globalThis).toBe(false);
});
