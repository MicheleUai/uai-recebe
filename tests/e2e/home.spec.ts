import { expect, test } from '@playwright/test';

test('abre a tela inicial em português', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Uai Recebe');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  const heading = page.getByRole('heading', { name: 'Uai Recebe', level: 1 });
  await expect(heading).toBeVisible();
});
