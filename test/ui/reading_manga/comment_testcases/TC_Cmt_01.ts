import { test } from 'testcafe';
import { commentPage, baseFixture } from '../setup/CommentShared';

fixture(baseFixture.name).page(baseFixture.url);

test('TC_Cmt_01: Comment without login', async (t) => {
    await t
        .scrollIntoView(commentPage.commentSection)
        .expect(commentPage.commentSection.exists)
        .ok('Comment section not found')
        
        .expect(commentPage.loginMessage.exists)
        .ok('Login message not visible to unauthenticated user', {timeout: 5000});
    
    await t.takeScreenshot({ path: 'screenshots/TC_Cmt_01.png' });
});