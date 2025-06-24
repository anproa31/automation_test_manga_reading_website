import { test } from 'testcafe';
import { resetPwdPage, baseFixtureLink1 } from '../setup/ResetPwdShared';
import { EMPTY_PASSWORD, VALID_PASSWORD } from '../data/resetPwdData';

fixture(baseFixtureLink1.name).page(baseFixtureLink1.url);

test('TC_RSPwd_09: Reset password with verify password but without password', async (t) => {
    await resetPwdPage.changePassword(EMPTY_PASSWORD, VALID_PASSWORD);

    await t.expect(resetPwdPage.passwordRequiredError.exists).ok();
}); 