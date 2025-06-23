import { test } from 'testcafe';
import { resetPwdPage, baseFixtureLink1 } from '../setup/ResetPwdShared';
import { VALID_PASSWORD, MISMATCH_PASSWORD } from '../data/resetPwdData';

fixture(baseFixtureLink1.name).page(baseFixtureLink1.url);

test('TC_RSPwd_10: Reset password with mismatch verify password', async (t) => {
    await resetPwdPage.changePassword(VALID_PASSWORD, MISMATCH_PASSWORD);

    await t.expect(resetPwdPage.passwordMismatchError.exists).ok();
}); 