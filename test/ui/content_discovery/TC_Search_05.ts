import { Selector } from "testcafe";

fixture`Advanced Search`
    .page`https://mangakatana.com/`

const specialCharacterDictionary = ['!', '@', '#', '$', '%'];

specialCharacterDictionary.forEach((query) => {
        test("Search by special character", async t =>
        {
                const searchBtn = Selector('#searchsubmit');
                await t
                .typeText('#input_search', query + "rg", {replace : true})
                .click(searchBtn);
                await t.wait(5000)
                const bookListItems = Selector('#book_list .item');
                const count = await bookListItems.count;
                console.log('Booklist count:', count);
                await t.expect(count == 0).ok('Expect no result');

        });})