import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_05: Login with empty password', async (t) => {
    await t
        .click(loginPage.loginLink)
        .typeText(loginPage.usernameInput, VALID_USERNAME)
        .click(loginPage.submitButton);

    await t.expect(loginPage.passwordRequiredMessage.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_05.png' });
}); 