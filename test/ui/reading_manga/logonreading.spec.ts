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

fixture`Logged-In Area` .beforeEach(async () => {
    if(!href)
        href = await getFirstChapterUrl();
    });

test('Bookmark a chapter', async () => {
    await t.useRole(userRole);
    await t.navigateTo(href);

    const bookmarkBtn = Selector('button').withText('Bookmark chapter');
    await t.click(bookmarkBtn)

    const bookmarkedBtn = Selector('button').withText('Bookmarked');
    const isDisabled = await bookmarkedBtn.hasAttribute('disabled');
    await t.expect(isDisabled).ok('Button should be disabled');
});

test('Bookmarked chapter persist', async () => {
    await t.useRole(userRole);
    await t.navigateTo(href);

    const bookmarkedBtn = Selector('button').withText('Bookmarked');
    const isDisabled = await bookmarkedBtn.hasAttribute('disabled');
    await t.expect(isDisabled).ok('Button should be disabled');
});

test('Remove bookmark a chapter', async () => {
    await t.useRole(userRole);
    const modifiedHref = href.replace(/\/fc/, '');
    const idMatch = modifiedHref.match(/(\d{5})$/);
    if (!idMatch) throw new Error('ID not found in href');
    const id = idMatch[1];
    const bookmarkTabBtn = Selector('header .uk-icon-bookmark-o')
    await t.click(bookmarkTabBtn);
    const removeBtn = Selector(`#item-${id} .uk-icon-remove.remove_bm_chapter_bt`);
    await t.click(removeBtn);
    await t.navigateTo(href);
    const bookmarkBtn = Selector('button').withText('Bookmark chapter');
    const isDisabled = await bookmarkBtn.hasAttribute('disabled');
    await t.expect(isDisabled).notOk('Button should not be disabled');
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

test('Empty comment', async () => {
    await t.useRole(userRole);
    await t.navigateTo(href);
    const postBtn = Selector('#comment div').withText('POST').nth(5);
    await t.click(postBtn);
    await t.expect(Selector('#comment div').withText('You have already made this comment.').nth(2)).notOk('This should not be the error text');
});

test('Duplicate comment', async () => {
    await t.useRole(userRole);
    await t.navigateTo(href);
    await t.typeText('.editor', 'good stuff')
    const postBtn = Selector('#comment div').withText('POST').nth(5);
    await t.click(postBtn);
    await t.typeText('.editor', 'good stuff')
    await t.click(postBtn);
    await t.expect(Selector('#comment div').withText('You have already made this comment.').nth(2)).ok('There should be an error here');
});