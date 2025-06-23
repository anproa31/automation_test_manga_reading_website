import { Given, When, Then, Before, After, setWorldConstructor, World } from '@cucumber/cucumber';
import { Selector, ClientFunction, Role } from 'testcafe';
import LoginPage from '../ui/auth/pages/LoginPage';
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
} from '../ui/auth/data/loginTestData';

// Custom World class to hold TestCafe test controller
class CustomWorld extends World {
    public testController: any;

    constructor(options: any) {
        super(options);
    }

    setTestController(tc: any) {
        this.testController = tc;
    }
}

setWorldConstructor(CustomWorld);

let loginPage: LoginPage;

Before(async function(this: CustomWorld) {
    loginPage = new LoginPage();
    // The test controller will be set by the TestCafe integration
});

Given('I am on the login page', async function(this: CustomWorld) {
    await this.testController.navigateTo('https://mangakatana.com/');
    await this.testController.click(loginPage.loginLink);
});

When('I enter valid username and password', async function(this: CustomWorld) {
    await this.testController
        .typeText(loginPage.usernameInput, VALID_USERNAME)
        .typeText(loginPage.passwordInput, VALID_PASSWORD);
});

When('I enter username with leading/trailing spaces', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.usernameInput, USERNAME_WITH_SPACES);
});

When('I enter password with leading/trailing spaces', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.passwordInput, PASSWORD_WITH_SPACES);
});

When('I enter uppercase username', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.usernameInput, UPPERCASE_USERNAME);
});

When('I enter valid password', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.passwordInput, VALID_PASSWORD);
});

When('I leave username field empty', async function(this: CustomWorld) {
    // Do nothing - field remains empty
});

When('I leave password field empty', async function(this: CustomWorld) {
    // Do nothing - field remains empty
});

When('I enter invalid username', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.usernameInput, INVALID_USERNAME);
});

When('I enter invalid password', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.passwordInput, INVALID_PASSWORD);
});

When('I enter valid email', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.usernameInput, VALID_EMAIL);
});

When('I enter SQL injection string in username', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.usernameInput, SQL_INJECTION_STRING);
});

When('I enter SQL injection string in password', async function(this: CustomWorld) {
    await this.testController.typeText(loginPage.passwordInput, SQL_INJECTION_STRING);
});

When('I click the login button', async function(this: CustomWorld) {
    await this.testController.click(loginPage.submitButton);
});

When('I click on username field', async function(this: CustomWorld) {
    await this.testController.click(loginPage.usernameInput);
});

When('I press tab key', async function(this: CustomWorld) {
    await this.testController.pressKey('tab');
});

When('I attempt to login with invalid credentials {int} times', async function(this: CustomWorld, attempts: number) {
    for (let i = 0; i < attempts; i++) {
        await this.testController
            .typeText(loginPage.usernameInput, VALID_USERNAME, { replace: true })
            .typeText(loginPage.passwordInput, INVALID_PASSWORD, { replace: true })
            .click(loginPage.submitButton);
    }
});

When('I login with valid credentials', async function(this: CustomWorld) {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
});

When('I refresh the page', async function(this: CustomWorld) {
    await this.testController.eval(() => location.reload());
});

When('I login with remember me checked', async function(this: CustomWorld) {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD, true);
});

When('I simulate browser restart', async function(this: CustomWorld) {
    await this.testController.useRole(Role.anonymous());
});

When('I login without remember me checked', async function(this: CustomWorld) {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD, false);
});

When('I hover over username field', async function(this: CustomWorld) {
    await this.testController.hover(loginPage.usernameInput);
});

Then('I should be logged in successfully', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
});

Then('I should see my username displayed', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
});

Then('I should see username required error message', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.usernameError.withText(USERNAME_REQUIRED_ERROR).exists).ok();
});

Then('I should see password required error message', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.passwordError.withText(PASSWORD_REQUIRED_ERROR).exists).ok();
});

Then('I should see invalid credentials error message', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.invalidCredentialsError.withText(INVALID_CREDENTIALS_ERROR).exists).ok();
});

Then('I should see loading spinner', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.loadingSpinner.exists).ok();
});

Then('password field should be focused', async function(this: CustomWorld) {
    const getActiveElementId = ClientFunction(() => document.activeElement ? document.activeElement.id : '');
    await this.testController.expect(getActiveElementId()).eql('pwd');
});

Then('login button should be focused', async function(this: CustomWorld) {
    const getActiveElementText = ClientFunction(() => document.activeElement ? document.activeElement.textContent : '');
    await this.testController.expect(getActiveElementText()).contains('Log In');
});

Then('I should see account locked error message', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.accountLockedError.withText(ACCOUNT_LOCKED_ERROR).exists).ok();
});

Then('I should remain logged in', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
});

Then('I should be automatically logged in', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();
});

Then('I should be logged out', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.loginLink.exists).ok();
});

Then('cursor should be text type', async function(this: CustomWorld) {
    await this.testController.expect(loginPage.usernameInput.getStyleProperty('cursor')).eql('text');
}); 