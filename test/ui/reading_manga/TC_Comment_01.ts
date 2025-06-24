import { log } from 'console';
import { get } from 'http';
import { Role, Selector,t } from 'testcafe';

let href: string;

const userRole = Role('https://mangakatana.com/', async t => {
    const loginBtn = Selector('header a').withText('Log In');
    await t.click(loginBtn);
    await t
        .typeText('#user_login', 'auto_test')
        .typeText('#pwd', 'test@ 123')
        .click('#signin_bt');
}, { preserveUrl: true });

async function getFirstChapterUrl() {
    await t.useRole(userRole);
    const readBtn = Selector('#book_list a').withText('First Chapter');
    const href = await readBtn.getAttribute('href');

    if (href === null) throw new Error('First Chapter link not found');

    return href;
}

fixture`Comment & bookmark` .beforeEach(async () => {
    if(!href)
        href = await getFirstChapterUrl();
    });

    test('Empty comment', async () => {
        await t.useRole(userRole);
        await t.navigateTo(href);
        const postBtn = Selector('#comment div').withText('POST').nth(5);
        await t.click(postBtn);
        await t.expect(Selector('#comment div').withText('You have already made this comment.').nth(2)).notOk('This should not be the error text');
    });