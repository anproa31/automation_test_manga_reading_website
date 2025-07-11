import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME, SQL_INJECTION_STRING } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_11: Login with SQL injection attempt in password', async (t) => {
    await loginPage.login(VALID_USERNAME, SQL_INJECTION_STRING);

    await t.expect(loginPage.invalidCredentialsMessage.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_11.png' });
}); 