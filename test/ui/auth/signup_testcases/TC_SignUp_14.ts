import { test } from 'testcafe';
import { signUpPage, baseFixture , TestUser} from '../setup/SignUpShared';


fixture(baseFixture.name).page(baseFixture.url);

test('TC_SignUp_14: Sign up with invalid email dot placements', async (t) => {
    const invalidEmails = [
        { label: 'Double dot in local part', email: 'john..doe@gmail.com' },
        { label: 'Dot at start of local part', email: '.john.doe@gmail.com' },
        { label: 'Dot at end of local part', email: 'john.doe.@gmail.com' },
        { label: 'Double dot in domain part', email: 'john.doe@gmail..com' },
    ];

    let passCount = 0;
    let failCount = 0;

    for (const { label, email } of invalidEmails) {
        const user = new TestUser(8);
        user.email = email;

        console.log(`Testing: ${label} → ${email}`);

        try {
            await signUpPage.signup(user.username, user.email, user.password, user.password, false);

            const exists = await signUpPage.invalidEmailMessage.exists;

            if (exists) {
                console.log(`${label} correctly rejected.`);
                passCount++;
            } else {
                console.log(`${label} NOT rejected (fail).`);
                failCount++;
            }

            await t.takeScreenshot({ path: `screenshots/TC_SignUp_14_${label.replace(/\s+/g, '_')}.png` });

        } catch (err) {
            console.log(`${label} test errored out:`, err);
            failCount++;
        }

        await t.navigateTo('https://mangakatana.com/');
    }

    console.log('Summary for TC_SignUp_14:');
    console.log(`Passed: ${passCount}`);
    console.log(`Failed: ${failCount}`);

    await t.expect(failCount).eql(0, 'Some invalid emails were not rejected.');
});
