import { Selector } from "testcafe";

fixture`Login - Mangakatana`
    .page`https://mangakatana.com/`;

test('Login with valid credentials', async (t) => {
    const loginBtn = Selector('a[data-form="signin"]').withText('Log In');
    const usernameInput = Selector('#user_login');
    const passwordInput = Selector('#pwd');
    const submitLoginBtn = Selector('#modal_form button').withText('Log In');

    const displayName = Selector('b.display_name').withText('auto_test');

    await t.click(loginBtn);
    await t.typeText(usernameInput, 'auto_test');
    await t.typeText(passwordInput, 'test@123');
    await t.click(submitLoginBtn);


    await t.expect(displayName.exists).ok();
});

