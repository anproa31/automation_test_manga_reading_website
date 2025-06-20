import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

fixture`Login - Mangakatana`
    .page`https://mangakatana.com/`;

test('Login with valid credentials', async (t) => {
    const username = 'auto_test';
    
    await loginPage.login(username, 'test@123');

    await t.expect(loginPage.displayName.withText(username).exists).ok();
});

test('Login with credentials containing leading/trailing spaces', async (t) => {
    const username = 'auto_test';
    const usernameWithSpaces = '   auto_test    ';
    const passwordWithSpaces = ' test@123    ';

    await loginPage.login(usernameWithSpaces, passwordWithSpaces);

    await t.expect(loginPage.displayName.withText(username).exists).ok();
});

test('Login with uppercase username and valid password', async (t) => {
    const expectedUsername = 'auto_test';
    const uppercaseUsername = 'Auto_test';
    const password = 'test@123';

    await loginPage.login(uppercaseUsername, password);

    await t.expect(loginPage.displayName.withText(expectedUsername).exists).ok();
});

test('Login with empty username', async (t) => {
    const password = 'test@123';
    const expectedError = 'Username is required!';


    await t
        .click(loginPage.loginLink)
        .typeText(loginPage.passwordInput, password)
        .click(loginPage.submitButton);

    await t.expect(loginPage.usernameError.withText(expectedError).exists).ok();
});

