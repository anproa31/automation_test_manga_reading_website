import { Selector, t } from 'testcafe';

export default class LoginPage {
    loginLink: Selector;
    usernameInput: Selector;
    passwordInput: Selector;
    submitButton: Selector;
    displayName: Selector;

    constructor() {
        this.loginLink = Selector('a[data-form="signin"]').withText('Log In');
        this.usernameInput = Selector('#user_login');
        this.passwordInput = Selector('#pwd');
        this.submitButton = Selector('#modal_form button').withText('Log In');
        this.displayName = Selector('b.display_name');
    }

    async login(username: string, password: string) {
        await t
            .click(this.loginLink)
            .typeText(this.usernameInput, username)
            .typeText(this.passwordInput, password)
            .click(this.submitButton);
    }
} 