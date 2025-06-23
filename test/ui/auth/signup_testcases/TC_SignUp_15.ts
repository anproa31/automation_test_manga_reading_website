import { test } from 'testcafe';
import { signUpPage, baseFixture } from '../setup/SignUpShared';
import { TestUser } from '../data/signUpTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_15: Sign up with email containing unicode characters', async (t) => {
    const user = new TestUser(6);
    user.email = "alô" + user.email;

    user.log();

    await signUpPage.signup(user.username, user.email, user.password, user.password, false);

    await t
        .expect(signUpPage.invalidEmailMessage.exists)
        .ok('Expected error message for email with unicode not found');

    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_15.png' });
});