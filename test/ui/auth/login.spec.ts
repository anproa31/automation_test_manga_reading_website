import LoginPage from '../pages/LoginPage';
import {
    VALID_USERNAME,
    VALID_PASSWORD,
    USERNAME_WITH_SPACES,
    PASSWORD_WITH_SPACES,
    UPPERCASE_USERNAME,
    USERNAME_REQUIRED_ERROR,
    PASSWORD_REQUIRED_ERROR
} from '../data/testData';

const loginPage = new LoginPage();

fixture`Login - Mangakatana`
    .page`https://mangakatana.com/`;

test('Login with valid credentials', async (t) => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
});

test('Login with credentials containing leading/trailing spaces', async (t) => {
    await loginPage.login(USERNAME_WITH_SPACES, PASSWORD_WITH_SPACES);

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
});

test('Login with uppercase username and valid password', async (t) => {
    await loginPage.login(UPPERCASE_USERNAME, VALID_PASSWORD);

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
});

test('Login with empty username', async (t) => {
    await t
        .click(loginPage.loginLink)
        .typeText(loginPage.passwordInput, VALID_PASSWORD)
        .click(loginPage.submitButton);

    await t.expect(loginPage.usernameError.withText(USERNAME_REQUIRED_ERROR).exists).ok();
});

test('Login with empty password', async (t) => {
    await t
        .click(loginPage.loginLink)
        .typeText(loginPage.usernameInput, VALID_USERNAME)
        .click(loginPage.submitButton);

    await t.expect(loginPage.passwordError.withText(PASSWORD_REQUIRED_ERROR).exists).ok();
});

test('Empty username and password', async (t) => {
    await t
        .click(loginPage.loginLink)
        .click(loginPage.submitButton);

    await t.expect(loginPage.usernameError.withText(USERNAME_REQUIRED_ERROR).exists).ok();
    await t.expect(loginPage.passwordError.withText(PASSWORD_REQUIRED_ERROR).exists).ok();
});
