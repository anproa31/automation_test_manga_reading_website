import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME, INVALID_PASSWORD } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_08: Login with invalid password', async (t) => {
    await loginPage.login(VALID_USERNAME, INVALID_PASSWORD);

    await t.expect(loginPage.invalidCredentialsMessage.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_08.png' });
}); 