import { test } from 'testcafe';
import { signUpPage, baseFixture , TestUser} from '../setup/SignUpShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_04: Sign up with empty password field', async (t) => {
    const user = new TestUser();
    user.log();

    await signUpPage.signup(user.username, user.email, "", "", false);

    await t
        .expect(signUpPage.emptyPasswordMessage.exists)
        .ok('Expected error message for empty password not found');
                
    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_04.png' });
});