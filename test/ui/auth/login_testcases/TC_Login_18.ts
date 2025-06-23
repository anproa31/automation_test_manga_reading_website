import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_18: Cursor should change to text over input fields', async (t) => {
    await t.click(loginPage.loginLink);

    await t.hover(loginPage.usernameInput);
    await t.expect(loginPage.usernameInput.getStyleProperty('cursor')).eql('text');

    await t.hover(loginPage.passwordInput);
    await t.expect(loginPage.passwordInput.getStyleProperty('cursor')).eql('text');

    await t.hover(loginPage.rememberMeCheckbox);
    await t.expect(loginPage.rememberMeCheckbox.getStyleProperty('cursor')).eql('pointer');

    await t.hover(loginPage.submitButton);
    await t.expect(loginPage.submitButton.getStyleProperty('cursor')).eql('pointer');
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_18.png' });
}); 