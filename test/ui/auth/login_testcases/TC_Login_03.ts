import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { UPPERCASE_USERNAME, VALID_PASSWORD, VALID_USERNAME } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_03: Login with uppercase username and valid password', async (t) => {
    await loginPage.login(UPPERCASE_USERNAME, VALID_PASSWORD);

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_03.png' });
}); 