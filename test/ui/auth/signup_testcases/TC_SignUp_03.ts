import { test } from 'testcafe';
import { signUpPage, baseFixture , TestUser} from '../setup/SignUpShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_03: Sign up with empty email field', async (t) => {
    const user = new TestUser();
    user.log();

    await signUpPage.signup(user.username, "", user.password, user.password, false);

    await t
        .expect(signUpPage.requireEmailMessage.exists)
        .ok('Expected error message for empty email not found');
                
    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_03.png' });
});