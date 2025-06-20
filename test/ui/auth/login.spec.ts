import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

fixture`Login - Mangakatana`
    .page`https://mangakatana.com/`;

test('Login with valid credentials', async (t) => {
    const username = 'auto_test';
    
    await loginPage.login(username, 'test@123');

    await t.expect(loginPage.displayName.withText(username).exists).ok();
});

