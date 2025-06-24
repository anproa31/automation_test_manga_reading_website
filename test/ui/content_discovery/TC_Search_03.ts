import { Selector } from "testcafe";

fixture`Advanced Search`
    .page`https://mangakatana.com/`

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