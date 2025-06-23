import { test } from 'testcafe';
import { commentPage, baseFixture } from '../setup/CommentShared';
import { userRoleUnverified } from '../setup/UserRole';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Cmt_02: Comment without verified', async (t) => {
    await t
        .useRole(userRoleUnverified)
        .navigateTo(baseFixture.url)

        .scrollIntoView(commentPage.commentSection)
        .expect(commentPage.commentSection.exists)
        .ok('Comment section not found')

        .expect(commentPage.commentTextfield.exists)
        .ok('Comment textfield not found')
        .typeText(commentPage.commentTextfield, 'nice')

        .click(commentPage.submitCommentBtn)

        .expect(commentPage.verifiedMessage.exists)
        .ok('Expected verification message', { timeout: 5000 });

    await t.takeScreenshot({ path: 'screenshots/TC_Cmt_02.png' });
});