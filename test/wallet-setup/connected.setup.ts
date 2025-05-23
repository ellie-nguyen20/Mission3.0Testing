import { defineWalletSetup } from '@synthetixio/synpress'
import { MetaMask, getExtensionId } from '@synthetixio/synpress/playwright'
import 'dotenv/config'

const SEED_PHRASE = process.env.SEED_PHRASE || ''
const PASSWORD = process.env.WALLET_PASSWORD || ''

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, 'MetaMask')

  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId)

  await metamask.importWallet(SEED_PHRASE)

  const page = await context.newPage()

  // Go to a locally hosted MetaMask Test Dapp.
  await page.goto('https://id-test.missionhub.io/')

  await page.getByText('Connect Wallet').first().click()

  const metamaskOption = page.locator('w3m-modal >> text=MetaMask');
  await metamaskOption.click();

  await metamask.connectToDapp(['Account 1'])
})