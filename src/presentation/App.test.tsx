import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { App } from './App';

it('exibe Uai Recebe como título principal', () => {
  render(<App />);

  const main = screen.getByRole('main');

  const heading = within(main).getByRole('heading', {
    name: 'Uai Recebe',
    level: 1,
  });

  expect(heading).toBeVisible();
});
