import { test } from 'testcafe';
import { verifyUserPage, baseFixture } from '../setup/VerifyUserShared';
import { EMPTY_USERNAME } from '../data/verifyUserData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_VerifyUser_03: Verify user with empty username or email', async (t) => {
    await verifyUserPage.submitForVerification(EMPTY_USERNAME);

    await t.expect(verifyUserPage.usernameOrEmailRequiredMessage.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_VerifyUser_03.png' });
}); 