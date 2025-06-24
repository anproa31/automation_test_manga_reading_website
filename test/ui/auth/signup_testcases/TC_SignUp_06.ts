import { test } from 'testcafe';
import { signUpPage, baseFixture , TestUser} from '../setup/SignUpShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_06: Sign up without "." in email field', async (t) => {
    const user = new TestUser();
    user.log();

    const dotlessEmail = user.email.trim().split('@')[0] + "@gmailcom"

    const isCaptchaSolved = await signUpPage.signup(user.username, dotlessEmail, user.password, user.password, true);

    if (!isCaptchaSolved) {
        console.log("Captcha not solved")
        return
    }

    await t
        .expect(signUpPage.invalidEmailAfterSubmitMessage.exists)
        .ok('Expected error message for invalid email not found')
                
    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_06.png' });
});