import { Selector } from "testcafe";

fixture`Login - WeebCentral`
    .page`https://weebcentral.com/`;

test('Login with valid credentials', async (t) => {
    const loginBtn = Selector('header button').withText('Login');

    await t.click(loginBtn);
    await t.debug();
});