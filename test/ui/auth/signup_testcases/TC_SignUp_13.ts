import { test } from 'testcafe';
import { signUpPage, baseFixture , TestUser} from '../setup/SignUpShared';


fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_13: Sign up with SQL injection in password', async (t) => {
    const user = new TestUser();
    user.password = "admin'; DROP TABLE users;--" + user.username;
    user.log();

    const isCaptchaSolved = await signUpPage.signup(user.username, user.email, user.password, user.password, true);

    if (!isCaptchaSolved) {
        console.log("Captcha not solved")
        return
    }

    await t
        .expect(signUpPage.invalidMessage.exists)
        .ok('Expected rejection for destructive SQL injection in password');

    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_13.png' });
});