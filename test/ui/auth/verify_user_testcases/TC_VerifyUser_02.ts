import { test } from 'testcafe';
import { verifyUserPage, baseFixture } from '../setup/VerifyUserShared';
import { INVALID_USERNAME } from '../data/verifyUserData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_VerifyUser_02: Verify user with invalid account', async (t) => {
    await verifyUserPage.submitForVerification(INVALID_USERNAME);

    await t.expect(verifyUserPage.usernameOrEmailError.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_VerifyUser_02.png' });
}); 