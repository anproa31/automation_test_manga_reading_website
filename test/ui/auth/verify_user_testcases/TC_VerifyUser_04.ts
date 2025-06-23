import { test } from 'testcafe';
import { verifyUserPage, baseFixture } from '../setup/VerifyUserShared';
import { SQL_INJECTION } from '../data/verifyUserData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_VerifyUser_04: Verify user with SQL injection attempt', async (t) => {
    await verifyUserPage.submitForVerification(SQL_INJECTION);

    await t.expect(verifyUserPage.usernameOrEmailError.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_VerifyUser_04.png' });
}); 