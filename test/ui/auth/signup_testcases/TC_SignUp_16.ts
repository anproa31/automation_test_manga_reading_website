import { test } from 'testcafe';
import { signUpPage, baseFixture , TestUser} from '../setup/SignUpShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_16: Sign up with email containing subdomain', async (t) => {
    const user = new TestUser(6);
    user.email = user.email + ".example.com";

    user.log();

    const isCaptchaSolved = await signUpPage.signup(user.username, user.email, user.password, user.password, true);

    if (!isCaptchaSolved) {
        console.log("Captcha not solved")
        return
    }

    await t
        .expect(signUpPage.successMessage.exists)
        .ok('Success message not found after registration', { timeout: 5000 });

    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_16.png' });
});