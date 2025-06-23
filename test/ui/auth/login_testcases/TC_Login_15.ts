import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME, VALID_PASSWORD } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_15: Login session should persist after page refresh', async (t) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok('Login failed before refresh.');

    await t.eval(() => location.reload());

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok('User was logged out after refresh.');
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_15.png' });
}); 