import { Selector, t } from 'testcafe';

export default class SignUpPage {
    signupLink: Selector;
    usernameInput: Selector;
    emailInput: Selector;
    password1Input: Selector;
    password2Input: Selector;
    submitButton: Selector;

    successMessage: Selector;
    emptyUsernameMessage: Selector;
    requireEmailMessage: Selector;
    emptyPasswordMessage: Selector;
    invalidPasswordMessage: Selector;
    passwordMismatchMessage: Selector;
    invalidEmailAfterSubmitMessage: Selector;
    invalidEmailMessage: Selector;
    existedUsernameMessage: Selector;
    existedEmailMessage: Selector;
    weakPasswordMessage: Selector;

    invalidMessage: Selector;

    constructor() {
        this.signupLink = Selector('a[data-form="signup"]').withText('Sign Up');
        this.usernameInput = Selector('#username');
        this.emailInput = Selector('#email');
        this.password1Input = Selector('#pwd1');
        this.password2Input = Selector('#pwd2');
        this.submitButton = Selector('#signup_bt');

        this.successMessage = Selector('#signup_form div')
        .withText('Your registration is completed. Click here to login')
        .nth(2);
        this.emptyUsernameMessage = Selector('#signup_form').withText('Username is required');
        this.requireEmailMessage = Selector('#signup_form').withText('Email is required');
        this.emptyPasswordMessage = Selector('#signup_form').withText('Password is required!')
        this.invalidPasswordMessage = Selector('#signup_form').withText('Invalid password');
        this.passwordMismatchMessage = Selector('#signup_form').withText('Passwords do not match!');
        this.invalidEmailAfterSubmitMessage = Selector('#signup_form').withText('Email address is invalid!');
        this.invalidEmailMessage= Selector('#signup_form').withText('Please enter a valid email address.');
        this.existedUsernameMessage = Selector('#signup_form').withText('Username already exists!');
        this.existedUsernameMessage = Selector('#signup_form').withText('Email address already exists!');
        this.weakPasswordMessage = Selector('#signup_form').withText('Must have at least 6 characters');
        this.invalidMessage = Selector('#signup_form').withText('invalid');

    }

    async signup(
        username?: string,
        email?: string,
        password1?: string,
        password2?: string,
        needSubmitCaptcha: boolean = false
    ) : Promise<boolean> {
        await t
        .deleteCookies()
        .click(this.signupLink);

        if (username) await t.typeText(this.usernameInput, username);
        if (email) await t.typeText(this.emailInput, email);
        if (password1) await t.typeText(this.password1Input, password1);
        if (password2) await t.typeText(this.password2Input, password2);

        // 🔐 CAPTCHA
        if (needSubmitCaptcha) {
            const shouldAbort = await this.solveCaptcha();
            if (shouldAbort) return false;
        }

        await t.click(this.submitButton);
        return true
    }


    private async solveCaptcha(): Promise<boolean> {
        const recaptchaFrame = Selector('iframe').withAttribute('title', 'reCAPTCHA');
        const recaptchaAnchor = Selector('#recaptcha-anchor');
        const recaptchaCheckedClass = Selector('.recaptcha-checkbox-checked');

        await t.expect(recaptchaFrame.exists).ok('❌ reCAPTCHA iframe not found', { timeout: 10000 });
        await t.switchToIframe(recaptchaFrame);

        await t.expect(recaptchaAnchor.exists).ok('❌ reCAPTCHA checkbox not found', { timeout: 10000 });
        await t.expect(recaptchaAnchor.visible).ok('❌ reCAPTCHA checkbox not visible', { timeout: 10000 });

        await t.click(recaptchaAnchor);

        let isCaptchaSolved = false;
        for (let i = 0; i < 60; i++) {
            const ariaChecked = await recaptchaAnchor.getAttribute('aria-checked');
            const classSolved = await recaptchaCheckedClass.exists;
            isCaptchaSolved = ariaChecked === 'true' || classSolved;

            if (isCaptchaSolved) {
                console.log(`✅ CAPTCHA solved after ${i + 1} second(s).`);
                break;
            }

            await t.wait(1000);
        }

        await t.switchToMainWindow();

        if (!isCaptchaSolved) {
            console.log('❌ CAPTCHA not solved within 60 seconds.');
            await t.takeScreenshot({ path: 'captcha-failed.png' });

            // Return true to signal abort
            return true;
        }

        return false;
    }
}
