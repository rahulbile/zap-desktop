import { waitForReact } from 'testcafe-react-selectors'
import {
  getBaseUrl,
  getUserDataDir,
  assertNoConsoleErrors,
  cleanTestEnvironment,
  cleanElectronEnvironment,
} from './utils/helpers'
import Onboarding from './pages/onboarding'

const onboarding = new Onboarding()

fixture('Onboarding (import)')
  .page(getBaseUrl())
  .beforeEach(async t => {
    await waitForReact()
    t.fixtureCtx.userDataDir = await getUserDataDir()
  })
  .afterEach(async t => {
    await assertNoConsoleErrors(t)
    await cleanTestEnvironment()
  })
  .after(async ctx => {
    await cleanElectronEnvironment(ctx)
  })

test('should import a wallet from an existing seed', async t => {
  const seed = [
    'abandon',
    'quick',
    'wing',
    'require',
    'monkey',
    'weather',
    'wrap',
    'child',
    'awake',
    'tooth',
    'tortoise',
    'lawsuit',
    'task',
    'stable',
    'number',
    'wash',
    'stuff',
    'other',
    'advice',
    'report',
    'mother',
    'session',
    'left',
    'ask',
  ]

  await t
    // Fill out and submit ConnectionType form.
    .expect(onboarding.connectionType.exists)
    .ok()
    .click(onboarding.connectionTypes.import.radio)
    .click(onboarding.nextButton)

  // Fill in the seed form.
  Array.from(Array(24).keys()).forEach(async index => {
    await t.typeText(onboarding.seedWordInputs[index], seed[index])
  })

  // Submit the seed.
  await t
    .click(onboarding.nextButton)

    // Fill out and submit Password form.
    .typeText(onboarding.passwordInput, 'password')
    .click(onboarding.nextButton)

    // Fill out and submit Name form.
    .typeText(onboarding.nameInput, 'My Test Wallet')
    .click(onboarding.nextButton)

    // Fill out and submit Network form.
    .expect(onboarding.network.exists)
    .ok()
    .click(onboarding.nextButton)

    // Fill out and submit Autopilot form.
    .expect(onboarding.autopilot.exists)
    .ok()
    .click(onboarding.nextButton)
})