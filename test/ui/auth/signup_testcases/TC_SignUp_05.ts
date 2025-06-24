import { test } from 'testcafe';
import { signUpPage, baseFixture , TestUser} from '../setup/SignUpShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_05: Sign up with mismatched passwords', async (t) => {
    const user = new TestUser();
    user.log();

    await signUpPage.signup(user.username, user.email, user.password, user.password + "diff", false);

    await t
        .expect(signUpPage.passwordMismatchMessage.exists)
        .ok('Expected error message for password mismatch not found');
                
    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_05.png' });
});