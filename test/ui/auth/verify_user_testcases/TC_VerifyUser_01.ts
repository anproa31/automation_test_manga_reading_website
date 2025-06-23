import { test } from 'testcafe';
import { verifyUserPage, baseFixture } from '../setup/VerifyUserShared';
import { VALID_USERNAME } from '../data/verifyUserData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_VerifyUser_01: Verify user with valid account', async (t) => {
    await verifyUserPage.submitForVerification(VALID_USERNAME);

    await t.expect(verifyUserPage.emailVerifySentMessage.exists).ok();
    
    await t.takeScreenshot({ path: 'screenshots/TC_VerifyUser_01.png' });
}); 