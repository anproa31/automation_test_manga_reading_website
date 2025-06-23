import { Selector } from "testcafe";

fixture `WeebCentral Debug`
    .page `https://mangakatana.com/`;

test("Debug", async (t) => {
    const loginBtn = Selector('a[data-form="signin"]').withText('Log In');
    const forgotpwd = Selector('a[data-form="reset_pwd"]').withText('Forgot password?');
    Selector('#user_login_2') // username or email
    Selector('#reset_pwd_bt') //submit
    Selector('#reset_pwd_form span').withText('Error! Username or email not exists!')
    Selector('#user_login_2-error') //Please fill out this field!

    await t
        .click(loginBtn)
        .click(forgotpwd)


    // const emailInput = Selector("input[name='email']");
    // await t.typeText(emailInput, "test@test.com");

    // const passwordInput = Selector("input[name='password']");
    // await t.typeText(passwordInput, "test");

    

    // const loginButton = Selector("button[type='submit']");
    // await t.click(loginButton);

    


    await t.debug();
});

