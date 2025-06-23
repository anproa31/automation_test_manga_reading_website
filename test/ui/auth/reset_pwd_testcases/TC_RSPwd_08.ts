import { test } from 'testcafe';
import { resetPwdPage, baseFixtureLink1 } from '../setup/ResetPwdShared';
import { VALID_PASSWORD, EMPTY_PASSWORD } from '../data/resetPwdData';

fixture(baseFixtureLink1.name).page(baseFixtureLink1.url);

test('TC_RSPwd_08: Reset password with password but without verify password', async (t) => {
    await resetPwdPage.changePassword(VALID_PASSWORD, EMPTY_PASSWORD);

    await t.expect(resetPwdPage.passwordMismatchError.exists).ok();
}); 