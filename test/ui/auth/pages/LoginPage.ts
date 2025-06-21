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
    }

    async login(username: string, password: string, rememberMe = false) {
        await t
            .click(this.loginLink)
            .typeText(this.usernameInput, username)
            .typeText(this.passwordInput, password);

        if (rememberMe) {
            await t.click(this.rememberMeCheckbox);
        }

        await t.click(this.submitButton);
    }
} 