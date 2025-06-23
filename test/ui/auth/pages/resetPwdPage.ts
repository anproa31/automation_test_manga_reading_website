import { Selector, t } from 'testcafe';

export default class ResetPwdPage {
    newPasswordInput: Selector;
    verifyNewPasswordInput: Selector;
    submitButton: Selector;
    loginLink: Selector;
    
    successMessage: Selector;
    passwordMismatchError: Selector;
    passwordRequiredError: Selector;

    constructor() {
        this.newPasswordInput = Selector('#new_pwd')
        this.verifyNewPasswordInput = Selector('#new_pwd2')
        this.submitButton = Selector('#update_bt')
        this.successMessage = Selector('#ajax_msg span').withText('Your password has been reset successfully! Click h')
        this.passwordMismatchError = Selector('#new_pwd2-error')
        this.loginLink = Selector('#ajax_msg a').withText('here')
        this.passwordRequiredError = Selector('#new_pwd-error')

    }


async changePassword(newPass: string, verifyPass: string) {
    if (newPass) {
        await t.typeText(this.newPasswordInput, newPass);
    }
    if (verifyPass) {
        await t.typeText(this.verifyNewPasswordInput, verifyPass);
    }
    await t.click(this.submitButton);
}
}

