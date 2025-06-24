import { Selector, t } from 'testcafe';

export default class VerifyUserPage {
    loginLink: Selector;
    forgotPwdLink: Selector;
    submitButton: Selector;
    usernameOrEmailInput: Selector;

    usernameOrEmailError: Selector;
    usernameOrEmailRequiredMessage: Selector;
    emailVerifySentMessage: Selector;


    

    constructor() {
        this.loginLink = Selector('a[data-form="signin"]').withText('Log In');
        this.forgotPwdLink = Selector('a[data-form="reset_pwd"]').withText('Forgot password?');
        this.usernameOrEmailInput = Selector('#user_login_2') // username or email
        this.submitButton = Selector('#reset_pwd_bt') //submit

        this.usernameOrEmailError = Selector('#reset_pwd_form span').withText('Error! Username or email not exists!')
        this.usernameOrEmailRequiredMessage = Selector('#user_login_2-error') //Please fill out this field!
        this.emailVerifySentMessage = Selector('#reset_pwd_form span').withText('Please check email to reset password.');
    }

    async submitForVerification(usernameOrEmail: string) {
        await t
            .click(this.loginLink)
            .click(this.forgotPwdLink);

        if (usernameOrEmail) {
            await t.typeText(this.usernameOrEmailInput, usernameOrEmail);
        }

        await t.click(this.submitButton);
    }
} 