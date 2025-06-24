import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { USERNAME_WITH_SPACES, PASSWORD_WITH_SPACES, VALID_USERNAME } from '../data/loginTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Login_02: Login with credentials containing leading/trailing spaces', async (t) => {
    await loginPage.login(USERNAME_WITH_SPACES, PASSWORD_WITH_SPACES);

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_02.png' });
}); 