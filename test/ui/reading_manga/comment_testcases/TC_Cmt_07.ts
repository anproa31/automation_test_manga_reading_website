import { test } from 'testcafe';
import { commentPage, baseFixture, TestComment } from '../setup/CommentShared';
import { userRoleVerified } from '../setup/UserRole';
import { VALID_USER_ID } from '../data/LoginData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Cmt_07: Spam comment', async (t) => {
    await t
        .useRole(userRoleVerified)
        .navigateTo(baseFixture.url);

    let spamDetected = false;

    for (let i = 1; i <= 10; i++) {
        const rapidComment = new TestComment();
        rapidComment.log();

        await t
            .scrollIntoView(commentPage.commentTextfield)
            .typeText(commentPage.commentTextfield, rapidComment.comment, { paste: true })
            .click(commentPage.submitCommentBtn);

        await t.wait(3000);

        if (await commentPage.commentTooFastMessage.exists) {
            spamDetected = true;
            break;
        }
    }

    await t.expect(spamDetected).ok('Spam protection was not triggered after 10 rapid comments');

    await t.takeScreenshot({ path: 'screenshots/TC_Cmt_07.png' });
});