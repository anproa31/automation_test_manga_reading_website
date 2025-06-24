import { test } from 'testcafe';
import { resetPwdPage, baseFixtureLink1 } from '../setup/ResetPwdShared';
import { MINIMAL_PASSWORD } from '../data/resetPwdData';

fixture(baseFixtureLink1.name).page(baseFixtureLink1.url);

test('TC_RSPwd_11: Reset password with minimal password', async (t) => {
    await resetPwdPage.changePassword(MINIMAL_PASSWORD, MINIMAL_PASSWORD);

    await t.expect(resetPwdPage.successMessage.exists).notOk(
        'Password should not be changed successfully with a minimal password.'
    );
}); 