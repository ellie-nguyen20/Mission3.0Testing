import { metaMaskFixtures } from '@synthetixio/synpress/playwright'
import connectedSetup from '../wallet-setup/connected.setup'
import { testWithSynpress } from '@synthetixio/synpress'

// Create test with connected setup cache fixture
const test = testWithSynpress(metaMaskFixtures(connectedSetup))
const { expect } = test

test('should coonect to the MissionHub Dapp', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('0xcfdc...e329')).toBeVisible()
})