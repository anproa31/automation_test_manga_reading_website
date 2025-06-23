import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { INVALID_USERNAME, VALID_PASSWORD } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_07: Login with invalid username', async (t) => {
    await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);

    await t.expect(loginPage.invalidCredentialsMessage.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_07.png' });
}); 