import { test } from 'testcafe';
import { commentPage, baseFixture , TestComment} from '../setup/CommentShared';
import { userRoleUnverified, userRoleVerified } from '../setup/UserRole';
import { VALID_USER_ID } from '../data/LoginData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Cmt_06: Comment with max allowed length', async (t) => {
    const testComment = new TestComment(3001);
    testComment.log();

    await t
        .useRole(userRoleVerified)
        .navigateTo(baseFixture.url)

        .scrollIntoView(commentPage.commentSection)
        .expect(commentPage.commentSection.exists)
        .ok('Comment section not found')

        .expect(commentPage.commentTextfield.exists)
        .ok('Comment textfield not found')
        .typeText(commentPage.commentTextfield, testComment.comment, { paste: true })

        .click(commentPage.submitCommentBtn)

    await t
        .expect(commentPage.commentMaxSizeMessage.exists)
        .ok('Expected max size message');

    await t.takeScreenshot({ path: 'screenshots/TC_Cmt_06.png' });
});
