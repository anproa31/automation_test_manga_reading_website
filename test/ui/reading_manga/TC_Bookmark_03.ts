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

        test('Remove bookmark a chapter', async () => {
            await t.useRole(userRole);
            await t.navigateTo(href);
            const bookmarkBtn = Selector('button').withText('Bookmark chapter');
            await t.click(bookmarkBtn)
            const modifiedHref = href.replace(/\/fc/, '');
            const idMatch = modifiedHref.match(/(\d{5})$/);
            if (!idMatch) throw new Error('ID not found in href');
            const id = idMatch[1];
            const bookmarkTabBtn = Selector('header .uk-icon-bookmark-o')
            await t.click(bookmarkTabBtn);
            const removeBtn = Selector(`#item-${id} .uk-icon-remove.remove_bm_chapter_bt`);
            await t.click(removeBtn);
            await t.navigateTo(href);
            const isDisabled = await bookmarkBtn.hasAttribute('disabled');
            await t.expect(isDisabled).notOk('Button should not be disabled');
        });