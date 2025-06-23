import { Selector } from "testcafe";

fixture `WeebCentral Debug`
    .page `https://mangakatana.com/reset-password?key=6a70344f5465385a546751426e4565324d426b79596a49712f665255466a7138524b6c43557261544764493d`;

test("Debug", async (t) => {

    await t
        // .click(loginBtn)
        // .click(forgotpwd)


    // const emailInput = Selector("input[name='email']");
    // await t.typeText(emailInput, "test@test.com");

    // const passwordInput = Selector("input[name='password']");
    // await t.typeText(passwordInput, "test");

    

    // const loginButton = Selector("button[type='submit']");
    // await t.click(loginButton);

    


    await t.debug();
});

