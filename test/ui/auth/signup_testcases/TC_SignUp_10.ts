import { test } from 'testcafe';
import { signUpPage, baseFixture } from '../setup/SignUpShared';
import { TestUser } from '../data/signUpTestData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_10: Sign up with existing email', async (t) => {
    let passCount = 0;
    let failCount = 0;

    for (let length = 1; length < 6; length++) {
        const user = new TestUser(length);
        user.log();

        console.log(`🔒 Testing password length: ${user.password.length} → "${user.password}"`);

        await signUpPage.signup(user.username, user.email, user.password, user.password, false);

        const isErrorVisible = await signUpPage.weakPasswordMessage.exists;

        if (isErrorVisible) {
            console.log(`Rejected weak password of length ${length} (PASS)`);
            passCount++;
        } else {
            console.log(`Weak password of length ${length} NOT rejected (FAIL)`);
            failCount++;
        }

        await t.takeScreenshot({ path: `screenshots/TC_SignUp_10_${length}.png` });
        await t.navigateTo('https://mangakatana.com/');
    }

    console.log('Summary for TC_SignUp_10:');
    console.log(`Passed: ${passCount}`);
    console.log(`Failed: ${failCount}`);

    await t.expect(failCount).eql(0, 'Some weak passwords were not rejected');
});