import { test } from 'testcafe';
import { signUpPage, baseFixture } from '../setup/SignUpShared';
import { TestUser } from '../data/signUpTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_11: Sign up with password fields containing spaces', async (t) => {
    const user = new TestUser();
    user.password = user.password.slice(0, user.password.length / 2) + ' ' + user.password.slice(user.password.length / 2);

    user.log();

    await signUpPage.signup(user.username, user.email, user.password, user.password, true);

    await t
        .expect(signUpPage.invalidPasswordMessage.exists)
        .ok('Error message not found after registration', { timeout: 5000 });

    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_11.png' });
});