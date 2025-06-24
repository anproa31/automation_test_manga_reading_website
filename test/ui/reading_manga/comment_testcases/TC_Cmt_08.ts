import { test } from 'testcafe';
import { commentPage, baseFixture, TestComment } from '../setup/CommentShared';
import { userRoleVerified } from '../setup/UserRole';
import { VALID_USER_ID } from '../data/LoginData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Cmt_08: Comment XSS Payload', async (t) => {
    const xssPayload = `<img src=x onerror=alert('XSS')>`;

    await t
        .useRole(userRoleVerified)
        .navigateTo(baseFixture.url)

        .scrollIntoView(commentPage.commentSection)
        .expect(commentPage.commentSection.exists)
        .ok('Comment section not found')

        .expect(commentPage.commentTextfield.exists)
        .ok('Comment textfield not found')
        .typeText(commentPage.commentTextfield, xssPayload)

        .click(commentPage.submitCommentBtn);

    await t.wait(3000);

    const found = await commentPage.isUserCommentVisible(VALID_USER_ID, xssPayload);
    await t.expect(found).ok('XSS payload was not found — may have been blocked');

    await t.takeScreenshot({ path: 'screenshots/TC_Cmt_08png' });
});