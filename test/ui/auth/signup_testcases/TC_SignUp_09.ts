import { test } from 'testcafe';
import { signUpPage, baseFixture , TestUser} from '../setup/SignUpShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_09: Sign up with existing email', async (t) => {
    const user = new TestUser();
    user.log();

    const isCaptchaSolved = await signUpPage.signup(user.username, "test@example.com", user.password, user.password, true);

    if (!isCaptchaSolved) {
        console.log("Captcha not solved")
        return
    }

    await t
        .expect(signUpPage.existedEmailMessage.exists)
        .ok('Error message not found after registration', { timeout: 5000 });

    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_09.png' });
});