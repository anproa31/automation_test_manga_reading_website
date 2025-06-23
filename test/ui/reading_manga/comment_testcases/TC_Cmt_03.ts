import { test } from 'testcafe';
import { commentPage, baseFixture, TestComment } from '../setup/CommentShared';
import { userRoleVerified } from '../setup/UserRole';
import { VALID_USER_ID } from '../data/LoginData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Cmt_03: Comment normal', async (t) => {
    const testComment = new TestComment();
    testComment.log();

    await t
        .useRole(userRoleVerified)
        .navigateTo(baseFixture.url)

        .scrollIntoView(commentPage.commentSection)
        .expect(commentPage.commentSection.exists)
        .ok('Comment section not found')

        .expect(commentPage.commentTextfield.exists)
        .ok('Comment textfield not found')
        .typeText(commentPage.commentTextfield, testComment.comment)

        .click(commentPage.submitCommentBtn);

    await t.wait(3000);

    const found = await commentPage.isUserCommentVisible(VALID_USER_ID, testComment.comment);
    await t
        .expect(found)
        .ok('Expected comment from user not found');

    await t.takeScreenshot({ path: 'screenshots/TC_Cmt_03.png' });
});