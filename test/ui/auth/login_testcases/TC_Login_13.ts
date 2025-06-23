import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { ClientFunction } from 'testcafe';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_13: Tab order should be correct on the login form', async (t) => {
    await t
        .click(loginPage.loginLink)
        .click(loginPage.usernameInput);

    const getActiveElementId = ClientFunction(() => document.activeElement ? document.activeElement.id : '');
    const getActiveElementText = ClientFunction(() => document.activeElement ? document.activeElement.textContent : '');

    await t.pressKey('tab');
    await t.expect(getActiveElementId()).eql('pwd', 'Tabbing from username should focus on the password field.');

    await t.pressKey('tab');
    await t.expect(getActiveElementText()).contains('Log In', 'Tabbing from password should focus on the Log In button.');
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_13.png' });
}); 