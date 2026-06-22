import { render, screen } from '@testing-library/react';
import { expect, test } from 'bun:test';
import { Pill } from '../../src/components/pill.tsx';

test('renders pill text', () => {
	render(<Pill text="Content curation" />);

	expect(screen.getByText('Content curation')).toBeInTheDocument();
});
