import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_06: Empty username and password', async (t) => {
    await t
        .click(loginPage.loginLink)
        .click(loginPage.submitButton);

    await t.expect(loginPage.usernameRequiredMessage.exists).ok();
    await t.expect(loginPage.passwordRequiredMessage.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_06.png' });
}); 