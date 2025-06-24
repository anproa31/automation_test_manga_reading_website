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

test('Check chapter order', async () => {
    await navigateToFirstChapter();
    const chapterDropdown = Selector('#chapter .chapter_select.full-width');
    await t.click(chapterDropdown);
    const optionCount = await chapterDropdown.count;

     const chapterNumbers: number[] = [];

    for (let i = 0; i < optionCount; i++) {
        const text = await chapterDropdown.nth(i).textContent;
        const match = text?.match(/(\d+(\.\d+)?)/);
        if (match) {
            chapterNumbers.push(parseFloat(match[1]));
        }
    }

    chapterNumbers.sort((a, b) => b - a);

    let hasGap = false;
    for (let i = 1; i < chapterNumbers.length; i++) {
        const expectedNext = chapterNumbers[i - 1] - 0.5;
        const actualNext = chapterNumbers[i];

        const isValid = actualNext === expectedNext || actualNext === expectedNext - 0.5;
        if (!isValid) {
            hasGap = true;
            console.warn(
                `Gap detected: ${chapterNumbers[i - 1]} -> ${actualNext}`
            );
        }
    }

    await t.expect(hasGap).notOk(`Chapter list has gaps. List: ${chapterNumbers.join(', ')}`);
});