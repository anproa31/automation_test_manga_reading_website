import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME, INVALID_PASSWORD } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_14: Multiple failed login attempts should lock account', async (t) => {
    await t.click(loginPage.loginLink);

    for (let i = 0; i < 10; i++) {
        await t
            .typeText(loginPage.usernameInput, VALID_USERNAME, { replace: true })
            .typeText(loginPage.passwordInput, INVALID_PASSWORD, { replace: true })
            .click(loginPage.submitButton);
    }

    await t.expect(loginPage.accountLockedMessage.exists)
        .ok('The account was not locked after 10 failed login attempts.');
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_14.png' });
}); 