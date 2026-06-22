/// <reference types="bun" />

import type { AsymmetricMatcher } from 'bun:test';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

type BunCompatibleJestDomMatchers<T> = Omit<
	TestingLibraryMatchers<AsymmetricMatcher, T>,
	'toBeEmpty'
>;

declare module 'bun:test' {
	interface Matchers<T> extends BunCompatibleJestDomMatchers<T> {}

	interface AsymmetricMatchers
		extends BunCompatibleJestDomMatchers<AsymmetricMatcher> {}
}
