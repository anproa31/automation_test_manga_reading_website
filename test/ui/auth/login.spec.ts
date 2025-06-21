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
import { Selector, ClientFunction, Role } from 'testcafe';

const loginPage = new LoginPage();

const rememberedUser = Role('https://mangakatana.com/', async t => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD, true);
    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();

    const cookies = await t.getCookies();
    const sgnTokenCookie = cookies.find(cookie => cookie.name === 'sgn_token');
    await t.expect(sgnTokenCookie).ok('The sgn_token cookie should be set when "Remember Me" is checked.');

}, { preserveUrl: true });

const standardUser = Role('https://mangakatana.com/', async t => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD, false);
    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
}, { preserveUrl: true });

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

test('Tab order should be correct on the login form', async (t) => {

    await t
        .click(loginPage.loginLink)
        .click(loginPage.usernameInput);


    const getActiveElementId = ClientFunction(() => document.activeElement ? document.activeElement.id : '');
    const getActiveElementText = ClientFunction(() => document.activeElement ? document.activeElement.textContent : '');

    await t.pressKey('tab');
    await t.expect(getActiveElementId()).eql('pwd', 'Tabbing from username should focus on the password field.');


    await t.pressKey('tab');
    await t.expect(getActiveElementText()).contains('Log In', 'Tabbing from password should focus on the Log In button.');
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

test('Login session should persist after page refresh', async (t) => {

    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok('Login failed before refresh.');


    await t.eval(() => location.reload());


    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok('User was logged out after refresh.');
});

test('"Remember Me" functionality should keep user logged in across sessions', async t => {

    await t.useRole(rememberedUser);


    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok('User was not logged in automatically with "Remember Me" cookie.');
});

test('Login session should NOT persist after browser close without "Remember Me"', async t => {

    await t.useRole(standardUser);


    await t.useRole(Role.anonymous());


    await t.expect(loginPage.loginLink.exists).ok('User should be logged out after a simulated browser restart.');
});

test('Cursor should change to text over input fields', async (t) => {
    await t.click(loginPage.loginLink);


    await t.hover(loginPage.usernameInput);
    await t.expect(loginPage.usernameInput.getStyleProperty('cursor')).eql('text');


    await t.hover(loginPage.passwordInput);
    await t.expect(loginPage.passwordInput.getStyleProperty('cursor')).eql('text');


    await t.hover(loginPage.rememberMeCheckbox);
    await t.expect(loginPage.rememberMeCheckbox.getStyleProperty('cursor')).eql('pointer');

    await t.hover(loginPage.submitButton);
    await t.expect(loginPage.submitButton.getStyleProperty('cursor')).eql('pointer');

});


