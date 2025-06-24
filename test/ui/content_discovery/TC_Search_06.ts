import { Selector } from "testcafe";

fixture`Advanced Search`
    .page`https://mangakatana.com/`

test("Search less than three character", async t =>
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