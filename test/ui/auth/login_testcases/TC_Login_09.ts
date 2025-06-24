import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_EMAIL, VALID_PASSWORD } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_09: Login with email instead of username should fail', async (t) => {
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await t.expect(loginPage.invalidCredentialsMessage.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_09.png' });
}); 