import { test } from 'testcafe';
import { signUpPage, baseFixture } from '../setup/SignUpShared';
import { TestUser } from '../data/signUpTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_01: Sign up with valid credentials', async (t) => {
    const user = new TestUser();
    user.log();

    const isCaptchaSolved = await signUpPage.signup(user.username, user.email, user.password, user.password, true);

    if (!isCaptchaSolved) {
        console.log("Captcha not solved")
        return
    }

    await t
        .expect(signUpPage.successMessage.exists)
        .ok('Success message not found after registration', { timeout: 5000 });

    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_01.png' });
});