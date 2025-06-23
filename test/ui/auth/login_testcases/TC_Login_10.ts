import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { SQL_INJECTION_STRING, VALID_PASSWORD, INVALID_CREDENTIALS_ERROR } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_10: Login with SQL injection attempt in username', async (t) => {
    await loginPage.login(SQL_INJECTION_STRING, VALID_PASSWORD);

    await t.expect(loginPage.invalidCredentialsError.withText(INVALID_CREDENTIALS_ERROR).exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_10.png' });
}); 