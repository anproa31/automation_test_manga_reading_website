import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { USERNAME_REQUIRED_ERROR, PASSWORD_REQUIRED_ERROR } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_06: Empty username and password', async (t) => {
    await t
        .click(loginPage.loginLink)
        .click(loginPage.submitButton);

    await t.expect(loginPage.usernameError.withText(USERNAME_REQUIRED_ERROR).exists).ok();
    await t.expect(loginPage.passwordError.withText(PASSWORD_REQUIRED_ERROR).exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_06.png' });
}); 