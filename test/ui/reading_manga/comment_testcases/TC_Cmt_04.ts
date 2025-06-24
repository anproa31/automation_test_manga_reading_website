import { test } from 'testcafe';
import { commentPage, baseFixture } from '../setup/CommentShared';
import { userRoleUnverified, userRoleVerified } from '../setup/UserRole';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Cmt_04: Comment empty string', async (t) => {
    await t
        .useRole(userRoleVerified)
        .navigateTo(baseFixture.url)

        .scrollIntoView(commentPage.commentSection)
        .expect(commentPage.commentSection.exists)
        .ok('Comment section not found')

        .expect(commentPage.commentTextfield.exists)
        .ok('Comment textfield not found')
        .typeText(commentPage.commentTextfield, ' ')

        .click(commentPage.submitCommentBtn)

        .expect(commentPage.emptyMessage.exists)
        .ok('Expected empty comment message', { timeout: 5000 });

    await t.takeScreenshot({ path: 'screenshots/TC_Cmt_04.png' });
});