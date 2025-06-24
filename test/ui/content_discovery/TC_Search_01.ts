import { Selector } from "testcafe";

fixture`Advanced Search`
    .page`https://mangakatana.com/`

const searchDictionary = ['toy', 'hero', 'love', 'rove', 'gar'];

searchDictionary.forEach((term) => {
    test(`Search partial name: "${term}"`, async t => {
        const searchBtn = Selector('#searchsubmit');

        await t
            .typeText('#input_search', term, { replace: true })
            .click(searchBtn);

        await t.wait(5000);

        const bookListItems = Selector('#book_list .item');
        const count = await bookListItems.count;
        console.log(`"${term}" → Found ${count} results`);

        await t.expect(count).gt(0, `No results found for "${term}"`);

        for (let i = 0; i < count; i++) {
            const item = bookListItems.nth(i);
            const dataId = await item.getAttribute('data-id');
            const previousUrl = await t.eval(() => window.location.href);
            const title = Selector(`div.item[data-id="${dataId}"] h3.title`);
            const name = (await title.innerText)
                .toLowerCase()
                .replace(/[\s-]+/g, '');

            const normalizedTarget = term.toLowerCase().replace(/[\s-]+/g, '');

            if (name.includes(normalizedTarget)) {
                await t.expect(name.includes(normalizedTarget)).ok(`Title should contain "${term}"`);
            } else {
                const link = item.find('a');
                const href = await link.getAttribute('href');
                if (!href) throw new Error('Manga link not found');

                await t.navigateTo(href);

                const altName = Selector('.alt_name');
                const altText = (await altName.innerText)
                    .toLowerCase()
                    .replace(/[\s-]+/g, '');

                await t.expect(altText.includes(normalizedTarget)).ok(`Alt name should contain "${term}"`);

                await t.navigateTo(previousUrl);
                await t.wait(2000);
            }
        }
    });
});