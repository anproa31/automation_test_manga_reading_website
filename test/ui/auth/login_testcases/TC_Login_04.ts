import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_PASSWORD, USERNAME_REQUIRED_ERROR } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_04: Login with empty username', async (t) => {
    await t
        .click(loginPage.loginLink)
        .typeText(loginPage.passwordInput, VALID_PASSWORD)
        .click(loginPage.submitButton);

    await t.expect(loginPage.usernameError.withText(USERNAME_REQUIRED_ERROR).exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_04.png' });
}); 