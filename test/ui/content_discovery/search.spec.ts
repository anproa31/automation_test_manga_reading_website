import { Selector } from "testcafe";

fixture`Advanced Search`
    .page`https://weebcentral.com/search`

    test("Search By Filter", async t => 
        {
            const searchInput = Selector('main .w-full').nth(3)
            const filterButton = Selector('main button').withText('Filter')
            const searchButton = Selector('main button').withText('Search')
            const settingsButton = Selector('main .btn.btn-secondary').nth(2)

            const toggle = Selector('input[type="toggle"]').withText('Back to top button')
            const radio = Selector('input[type="radio"]')


            await t
            .typeText(searchInput, 'abc')
            .click(searchButton)
            .click(settingsButton)
            .click(toggle)
            .click(radio)


            .debug()
        } 
    )