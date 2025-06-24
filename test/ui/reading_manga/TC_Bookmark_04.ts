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

fixture`Bookmark` .beforeEach(async () => {
    if(!href)
        href = await getFirstChapterUrl();
    });

test('Bookmark a manga', async () => {
    await t.useRole(userRole);
    const modifiedHref = href.replace(/\/fc/, '');
    await t.navigateTo(modifiedHref);
    const bookmarkBtn = Selector('#single_book button');
    await t.click(bookmarkBtn.withText('Bookmark'));
    await t.wait(5000);
    await t.expect(bookmarkBtn.withText('Bookmarked').exists).ok('Button text should change to "Bookmarked"');
    await t.click(bookmarkBtn.withText('Bookmarked'));
});