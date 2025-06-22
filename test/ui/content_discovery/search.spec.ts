import { Selector } from "testcafe";

fixture`Advanced Search`
    .page`https://mangakatana.com/`

    test("Search partial name", async t =>
        {
            const searchBtn = Selector('#searchsubmit');
            await t
            .typeText('#input_search', 'toy')
            .click(searchBtn)
            await t.wait(5000)
            const bookListItems = Selector('#book_list .item');
            const count = await bookListItems.count;
            console.log('Booklist count:', count);

            for (let i = 0; i < count; i++) {
                const item = bookListItems.nth(i);
                const dataId = await item.getAttribute('data-id');
                const previousUrl = await t.eval(() => window.location.href);
                const title = Selector(`div.item[data-id="${dataId}"] h3.title`)
                const name = (await title.innerText)
                .toLowerCase()
                .replace(/[\s-]+/g, '');
                const target = 'toy'.toLowerCase().replace(/[\s-]+/g, '');
                if (name.includes(target)){
                    await t.expect(name.includes(target)).ok(`Name should contain "${target}" `);
                }

                else{
                    const link = item.find('a');
                    const href = await link.getAttribute('href');
                    if (!href) throw new Error('Manga link not found');
                    await t.navigateTo(href);
                    const altName = Selector('.alt_name');
                    const altText = (await altName.innerText)
                    .toLowerCase()
                    .replace(/[\s-]+/g, '');
                    await t.expect(altText.includes(target)).ok(`Alt name should contain "${target}" `);
                    await t.navigateTo(previousUrl);
                    await t.wait(2000);
                }
            }
        }
    );

     test("Search partial name with capital", async t =>
        {
            const searchBtn = Selector('#searchsubmit');
            await t
            .typeText('#input_search', 'aBc')
            .click(searchBtn)
            await t.wait(5000)
            const bookListItems = Selector('#book_list .item');
            const count = await bookListItems.count;
            console.log('Booklist count:', count);
            const previousUrl = await t.eval(() => window.location.href);

            for (let i = 0; i < count; i++) {
                const item = bookListItems.nth(i);
                const dataId = await item.getAttribute('data-id');
                const title = Selector(`div.item[data-id="${dataId}"] h3.title`)
                const name = (await title.innerText)
                .toLowerCase()
                .replace(/[\s-]+/g, '');
                const target = 'abc'.toLowerCase().replace(/[\s-]+/g, '');
                if (name.includes(target)){
                    await t.expect(name.includes(target)).ok(`Name should contain "${target}" `);
                }

                else{
                    const link = item.find('a');
                    const href = await link.getAttribute('href');
                    if (!href) throw new Error('Manga link not found');
                    await t.navigateTo(href);
                    const altName = Selector('.alt_name');
                    const altText = (await altName.innerText)
                    .toLowerCase()
                    .replace(/[\s-]+/g, '');
                    await t.expect(altText.includes(target)).ok(`Alt name should contain "${target}" `);
                    await t.navigateTo(previousUrl);
                    await t.wait(2000);
                }
            }
        }
    )

    test("Search by full name", async t =>
        {
            const searchBtn = Selector('#searchsubmit');
            await t
            .typeText('#input_search', "Naruto: Sasuke's Story—The Uchiha and the Heavenly Stardust: The Manga")
            .click(searchBtn);
            const title = Selector('#single_book h1').withText("Naruto: Sasuke's Story—The Uchiha and the Heavenl");
            await t.expect(title.exists).ok('Expected title not found');
        });

        test("Search by emoji", async t =>
        {
            const searchBtn = Selector('#searchsubmit');
            await t
            .typeText('#input_search', ":)")
            .click(searchBtn);
            await t.wait(5000)
            const bookListItems = Selector('#book_list .item');
            const count = await bookListItems.count;
            console.log('Booklist count:', count);
            await t.expect(count == 0).ok('Expect no result');
        });

        test("Search by special character", async t =>
        {
            const searchBtn = Selector('#searchsubmit');
            await t
            .typeText('#input_search', "@rg")
            .click(searchBtn);
            await t.wait(5000)
            const bookListItems = Selector('#book_list .item');
            const count = await bookListItems.count;
            console.log('Booklist count:', count);
            await t.expect(count == 0).ok('Expect no result');
        });

        test("Search less than one character", async t =>
        {
            const searchBtn = Selector('#searchsubmit');
            await t
            .click(searchBtn);
            await t.wait(5000)
            const error = Selector('#wrap_content div').withText('Not found any results. Please try at least 3 chara').nth(3);
            await t.expect(error.exists).ok('Expect an error');
            await t
            .typeText('#input_search', "1")
            .click(searchBtn);
            await t.wait(5000)
            await t.expect(error.exists).ok('Expect an error');;
            await t
            .typeText('#input_search', "2")
            .click(searchBtn);
            await t.wait(5000)
            await t.expect(error.exists).ok('Expect an error');
        });
