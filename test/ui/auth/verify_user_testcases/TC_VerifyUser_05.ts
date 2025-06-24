import { test } from 'testcafe';
import { verifyUserPage, baseFixture } from '../setup/VerifyUserShared';
import { VALID_EMAIL, INVALID_CHARS_FOR_EMAIL } from '../data/verifyUserData';

fixture(baseFixture.name).page(baseFixture.url);

INVALID_CHARS_FOR_EMAIL.forEach((char, index) => {
    const invalidEmail = `${VALID_EMAIL.slice(0, 5)}${char}${VALID_EMAIL.slice(5)}`;

    test(`TC_VerifyUser_05: Verify user with invalid email format ("${char}")`, async (t) => {
        await verifyUserPage.submitForVerification(invalidEmail);

        await t.expect(verifyUserPage.usernameOrEmailError.exists).ok();
        
        await t.takeScreenshot({ path: `screenshots/TC_VerifyUser_05_invalid_char_index_${index}.png` });
    });
}); 