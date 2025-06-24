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

fixture`BBookmark` .beforeEach(async () => {
    if(!href)
        href = await getFirstChapterUrl();
    });

    test('Bookmarked chapter persist', async () => {
        await t.useRole(userRole);
        await t.navigateTo(href);
        const bookmarkBtn = Selector('button').withText('Bookmark chapter');
        await t.click(bookmarkBtn)
        await t.navigateTo(href);
        const bookmarkedBtn = Selector('button').withText('Bookmarked');
        const isDisabled = await bookmarkedBtn.hasAttribute('disabled');
        await t.expect(isDisabled).ok('Button should be disabled');
    });