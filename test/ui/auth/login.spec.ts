import LoginPage from '../pages/LoginPage';
import {
    VALID_USERNAME,
    VALID_PASSWORD,
    USERNAME_WITH_SPACES,
    PASSWORD_WITH_SPACES,
    UPPERCASE_USERNAME,
    USERNAME_REQUIRED_ERROR,
    PASSWORD_REQUIRED_ERROR,
    INVALID_USERNAME,
    INVALID_PASSWORD,
    INVALID_CREDENTIALS_ERROR,
    VALID_EMAIL,
    SQL_INJECTION_STRING,
    ACCOUNT_LOCKED_ERROR
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

test('Login with invalid username', async (t) => {
    await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);

    await t.expect(loginPage.invalidCredentialsError.withText(INVALID_CREDENTIALS_ERROR).exists).ok();
});

test('Login with invalid password', async (t) => {
    await loginPage.login(VALID_USERNAME, INVALID_PASSWORD);

    await t.expect(loginPage.invalidCredentialsError.withText(INVALID_CREDENTIALS_ERROR).exists).ok();
});

test('Login with email instead of username should fail', async (t) => {
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await t.expect(loginPage.invalidCredentialsError.withText(INVALID_CREDENTIALS_ERROR).exists).ok();
});

test('Login with SQL injection attempt in username', async (t) => {
    await loginPage.login(SQL_INJECTION_STRING, VALID_PASSWORD);

    await t.expect(loginPage.invalidCredentialsError.withText(INVALID_CREDENTIALS_ERROR).exists).ok();
});

test('Login with SQL injection attempt in password', async (t) => {
    await loginPage.login(VALID_USERNAME, SQL_INJECTION_STRING);

    await t.expect(loginPage.invalidCredentialsError.withText(INVALID_CREDENTIALS_ERROR).exists).ok();
});

test('Login button should show loading spinner on click', async (t) => {
    await t
        .click(loginPage.loginLink)
        .typeText(loginPage.usernameInput, VALID_USERNAME)
        .typeText(loginPage.passwordInput, VALID_PASSWORD)
        .click(loginPage.submitButton)


    await t.expect(loginPage.loadingSpinner.exists)
        .ok('Loading spinner should be visible immediately after clicking login.');


    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
});

test('Multiple failed login attempts should lock account', async (t) => {

    await t.click(loginPage.loginLink);

    for (let i = 0; i < 10; i++) {
        await t
            .typeText(loginPage.usernameInput, VALID_USERNAME, { replace: true })
            .typeText(loginPage.passwordInput, INVALID_PASSWORD, { replace: true })
            .click(loginPage.submitButton);
    }

    await t.expect(loginPage.accountLockedError.withText(ACCOUNT_LOCKED_ERROR).exists)
        .ok('The account was not locked after 10 failed login attempts.');
});
