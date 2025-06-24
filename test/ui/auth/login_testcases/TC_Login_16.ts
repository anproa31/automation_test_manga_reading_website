import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME, VALID_PASSWORD } from '../data/loginTestData';
import { Role } from 'testcafe';

fixture(baseFixture.name).page(baseFixture.url);

const standardUser = Role('https://mangakatana.com/', async t => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD, false);
    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
}, { preserveUrl: true });

test('TC_Login_16: Login session should NOT persist after browser close without Remember Me', async t => {
    await t.useRole(standardUser);

    await t.useRole(Role.anonymous());

    await t.expect(loginPage.loginLink.exists).ok('User should be logged out after a simulated browser restart.');
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_17.png' });
}); 