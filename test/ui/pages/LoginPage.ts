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
    }

    async login(username: string, password: string) {
        await t
            .click(this.loginLink)
            .typeText(this.usernameInput, username)
            .typeText(this.passwordInput, password)
            .click(this.submitButton);
    }
} 