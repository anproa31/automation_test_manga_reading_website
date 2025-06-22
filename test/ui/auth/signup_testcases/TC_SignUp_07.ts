import { test } from 'testcafe';
import { signUpPage, baseFixture } from '../setup/SignUpShared';
import { TestUser } from '../data/signUpTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_07: Sign up with invalid characters in email field', async (t) => {
    const invalidChars = ['(', ')', ',', ':', ';', '<', '>', '@', '[', '\\', ']', ' '];

    var index = 0
    for (const char of invalidChars) {
        const user = new TestUser();
        user.email = `invalid${char}email@gmail.com`;

        console.log(`Testing email: ${user.email}`);
        
        await signUpPage.signup(user.username, user.email, user.password, user.password, false);

        await t
            .expect(signUpPage.invalidEmailMessage.exists)
            .ok(`Expected validation error for email containing "${char}" not found`,{ timeout: 5000 });

        await t.takeScreenshot({ path: 'screenshots/TC_SignUp_07_' + index++ + '.png' });

        await t.navigateTo('https://mangakatana.com/');
    }
});
