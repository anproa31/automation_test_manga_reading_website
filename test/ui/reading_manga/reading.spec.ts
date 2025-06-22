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

test('Navigate to PREV chapter', async () => {
    await navigateToFirstChapter();
    const nextBtn = Selector('#chapter a').withText('NЕXT');
    const prevBtn = Selector('#chapter a').withText('PREV');
    await t.click(nextBtn);
    const currentChapter = await getChapterNumberFromHref(prevBtn);
    await t.click(prevBtn);
    const afterClickChapter = await getChapterNumberFromHref(nextBtn);
    const isSequential =
        afterClickChapter === currentChapter + 0.5 ||
        afterClickChapter === currentChapter + 1;
    await t.expect(isSequential).ok(
        `Expected next chapter to be ${currentChapter + 0.5} or ${currentChapter + 1}, but got ${afterClickChapter}`
    );
});

test('Navigate to last chapter', async () => {
    await navigateToFirstChapter();
    const chapterDropdown = Selector('#chapter .chapter_select.full-width');
    await t.click(chapterDropdown);
    await t.click(chapterDropdown.find('option').nth(1));

    const nextBtn = Selector('#chapter a').withText('NЕXT');
    await t.expect(nextBtn.exists).notOk('Next button should not exist');
});


test('Navigate to first chapter', async () => {
    await navigateToFirstChapter();

    const prevBtn = Selector('#chapter a').withText('PREV');
    await t.expect(prevBtn.exists).notOk('Next button should not exist');
});

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