import { test } from 'testcafe';
import { signUpPage, baseFixture } from '../setup/SignUpShared';
import { TestUser } from '../data/signUpTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_02: Sign up with empty username field', async (t) => {
    const user = new TestUser();
    user.log();

    await signUpPage.signup('', user.email, user.password, user.password, false);

    await t
        .expect(signUpPage.emptyUsernameMessage.exists)
        .ok('Expected error message for empty username not found');
        
    await t.takeScreenshot({ path: 'screenshots/TC_SignUp_02.png' });
});