import { Selector, t } from 'testcafe';

export default class CommentPage {
    commentSection: Selector;
    loginMessage: Selector;

    commentTextfield: Selector;
    commentList: Selector;
    submitCommentBtn: Selector;
    verifiedMessage: Selector;
    spoilerBtn: Selector;
    duplicateMessage: Selector;
    emptyMessage: Selector;
    commentMaxSizeMessage: Selector;
    commentTooFastMessage: Selector;

    constructor() {
        this.commentSection = Selector('#comment')
        this.loginMessage = Selector('#comment div').withText('Please log in to comment.')

        this.commentTextfield = Selector('#comment .editor')
        this.commentList = Selector('#comment_list')
        this.submitCommentBtn = Selector('#comment div').withText('POST').nth(5)
        this.verifiedMessage = Selector('#comment p').withText('You need to verify your email in order to perform')
        this.spoilerBtn = Selector('#comment .include.hide_check')
        this.duplicateMessage = Selector('#comment p').withText('You have already made this comment.')
        this.emptyMessage = Selector('#comment p').withText('Comment cannot be empty!')
        this.commentMaxSizeMessage = Selector('#comment p').withText('The maximum message size is 3000 characters!')
        this.commentTooFastMessage = Selector('#comment p').withText('You are commenting too fast. Please solve the capt')
    }

    async isUserCommentVisible(userId: string, commentText: string): Promise<boolean> {
        const commentList = Selector('#comment_list');
        const commentItems = commentList.find('li[data-uid="' + userId + '"]');
    
        const count = await commentItems.count;
    
        for (let i = 0; i < count; i++) {
            const item = commentItems.nth(i);
            const msg = item.find('div.msg');
    
            if ((await msg.innerText).trim() === commentText) {
                return true;
            }
        }
    
        return false;
    }

} 