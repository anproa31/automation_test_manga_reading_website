import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME, VALID_PASSWORD } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_12: Login button should show loading spinner on click', async (t) => {
    await t
        .click(loginPage.loginLink)
        .typeText(loginPage.usernameInput, VALID_USERNAME)
        .typeText(loginPage.passwordInput, VALID_PASSWORD)
        .click(loginPage.submitButton);

    await t.expect(loginPage.loadingSpinner.exists)
        .ok('Loading spinner should be visible immediately after clicking login.');

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_12.png' });
}); 