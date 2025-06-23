import { test } from 'testcafe';
import { resetPwdPage, baseFixtureLink1 } from '../setup/ResetPwdShared';
import { EMPTY_PASSWORD } from '../data/resetPwdData';

fixture(baseFixtureLink1.name).page(baseFixtureLink1.url);

test('TC_RSPwd_07: Reset password with empty password', async (t) => {
    await resetPwdPage.changePassword(EMPTY_PASSWORD, EMPTY_PASSWORD);

    await t.expect(resetPwdPage.passwordRequiredError.exists).ok();
    await t.expect(resetPwdPage.passwordMismatchError.exists).ok();
}); 