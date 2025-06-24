import { Selector, t } from 'testcafe';

export default class LoginPage {
    loginLink: Selector;
    usernameInput: Selector;
    passwordInput: Selector;
    submitButton: Selector;
    displayName: Selector;
    usernameError: Selector;
    passwordError: Selector;
    invalidCredentialsError: Selector;
    accountLockedError: Selector;
    loadingSpinner: Selector;
    rememberMeCheckbox: Selector;

    usernameRequiredMessage: Selector;
    passwordRequiredMessage: Selector;
    invalidCredentialsMessage: Selector;
    accountLockedMessage: Selector;

    constructor() {
        this.loginLink = Selector('a[data-form="signin"]').withText('Log In');
        this.usernameInput = Selector('#user_login');
        this.passwordInput = Selector('#pwd');
        this.submitButton = Selector('#modal_form button').withText('Log In');
        this.displayName = Selector('b.display_name');
        this.usernameError = Selector('#user_login-error');
        this.passwordError = Selector('#pwd-error');
        this.invalidCredentialsError = Selector('div.uk-text-danger');
        this.accountLockedError = Selector('div.uk-alert-danger');
        this.loadingSpinner = Selector('i.uk-icon-spinner.uk-icon-spin');
        this.rememberMeCheckbox = Selector('label[for="remember"]');

        this.usernameRequiredMessage = Selector('#modal_form').withText('Username is required!');
        this.passwordRequiredMessage = Selector('#modal_form').withText('Password is required!');
        this.invalidCredentialsMessage = Selector('#modal_form').withText('Username or password incorrect!');
        this.accountLockedMessage = Selector('#modal_form').withText('Too many failed login attempts. Your account has been temporarily locked.');
    }

    async login(username: string, password: string, rememberMe = false) {
        await t.click(this.loginLink);
        await this.fillLoginFormAndSubmit(username, password, rememberMe);
    }

    async fillLoginFormAndSubmit(username: string, password: string, rememberMe = false) {
        await t
            .typeText(this.usernameInput, username)
            .typeText(this.passwordInput, password);

        if (rememberMe) {
            await t.click(this.rememberMeCheckbox);
        }

        await t.click(this.submitButton);
    }
} 