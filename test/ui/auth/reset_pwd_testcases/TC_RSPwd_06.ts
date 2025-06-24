import { test } from 'testcafe';
import { resetPwdPage, baseFixtureLink1 } from '../setup/ResetPwdShared';
import { VALID_PASSWORD } from '../data/resetPwdData';
import { VALID_USERNAME } from '../data/verifyUserData';
import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

fixture(baseFixtureLink1.name).page(baseFixtureLink1.url);

test('TC_RSPwd_06: Reset password with valid data and login with new password', async (t) => {
    await resetPwdPage.changePassword(VALID_PASSWORD, VALID_PASSWORD);

    await t.expect(resetPwdPage.successMessage.exists).ok();

    await t.click(resetPwdPage.loginLink);

    await loginPage.fillLoginFormAndSubmit(VALID_USERNAME, VALID_PASSWORD);
    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok('Should be logged in with new password');
}); 