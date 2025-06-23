import { test } from 'testcafe';
import { commentPage, baseFixture } from '../setup/CommentShared';
import { userRoleUnverified, userRoleVerified } from '../setup/UserRole';
import { VALID_USER_ID } from '../data/LoginData';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Cmt_05: Comment with special characters', async (t) => {
    const specialComment = ('!@#$%^&*()_+-=[]{}|;\':",./<>? 😀🔥💯');

    await t
        .useRole(userRoleVerified)
        .navigateTo(baseFixture.url)

        .scrollIntoView(commentPage.commentSection)
        .expect(commentPage.commentSection.exists)
        .ok('Comment section not found')

        .expect(commentPage.commentTextfield.exists)
        .ok('Comment textfield not found')
        .typeText(commentPage.commentTextfield, specialComment)

        .click(commentPage.submitCommentBtn);

    await t.wait(3000);

    const found = await commentPage.isUserCommentVisible(VALID_USER_ID, specialComment);
    await t
        .expect(found)
        .ok('Special character comment not found');

    await t.takeScreenshot({ path: 'screenshots/TC_Cmt_05.png' });
});
