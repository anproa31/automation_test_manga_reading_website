import { test, t } from 'testcafe';
import { resetPwdPage, baseFixtureLink2 } from '../setup/ResetPwdShared';
import { RESET_PWD_LINK_1 } from '../data/resetPwdData';


fixture(baseFixtureLink2.name).page(baseFixtureLink2.url);

test('TC_RSPwd_12: Only the newest password reset link should be active', async (t) => {

    await t.expect(resetPwdPage.newPasswordInput.exists).ok('The new reset link should be active and show password fields.');


    await t.navigateTo(RESET_PWD_LINK_1);


    await t.expect(resetPwdPage.newPasswordInput.exists).notOk('The old reset link should be expired and not show password fields.');
}); 