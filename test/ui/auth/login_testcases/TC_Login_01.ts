import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME, VALID_PASSWORD } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_01: Login with valid credentials', async (t) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_01.png' });
}); 