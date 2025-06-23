import { Selector, t } from 'testcafe';

const readBtn = Selector('#book_list a').withText('First Chapter');

async function navigateToFirstChapter() {
    await t.navigateTo('https://mangakatana.com/');
    const href = await readBtn.getAttribute('href');

    if (href === null) throw new Error('First Chapter link not found');
    await t.navigateTo(href);
}

async function getChapterNumberFromHref(btn: Selector): Promise<number> {
    const href = await btn.getAttribute('href');
    const match = href?.match(/\/c(\d+(\.\d+)?)/i);

    if (!match) throw new Error(`Could not extract chapter number from href: ${href}`);
    return parseFloat(match[1]);
}

fixture`Reading - MangaKatana`;

test('Navigate to last chapter', async () => {
    await navigateToFirstChapter();
    const chapterDropdown = Selector('#chapter .chapter_select.full-width');
    await t.click(chapterDropdown);
    await t.click(chapterDropdown.find('option').nth(1));

    const nextBtn = Selector('#chapter a').withText('NЕXT');
    await t.expect(nextBtn.exists).notOk('Next button should not exist');
});