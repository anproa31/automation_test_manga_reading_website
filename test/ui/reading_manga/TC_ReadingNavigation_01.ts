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

test('Navigate to NEXT chapter', async () => {
    await navigateToFirstChapter();
    const nextBtn = Selector('#chapter a').withText('NЕXT');
    const currentChapter = await getChapterNumberFromHref(nextBtn);
    await t.click(nextBtn);
    const afterClickChapter = await getChapterNumberFromHref(nextBtn);
    const isSequential =
        afterClickChapter === currentChapter + 0.5 ||
        afterClickChapter === currentChapter + 1;
    await t.expect(isSequential).ok(
        `Expected next chapter to be ${currentChapter + 0.5} or ${currentChapter + 1}, but got ${afterClickChapter}`
    );
});