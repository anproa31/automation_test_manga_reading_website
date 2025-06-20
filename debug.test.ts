import { Selector } from "testcafe";

fixture `WeebCentral Debug`
    .page `https://weebcentral.com/`;

test("Debug", async (t) => {
    const loginBtn = Selector("header button").withText("Login");
    await t.click(loginBtn);


    const emailInput = Selector("input[name='email']");
    await t.typeText(emailInput, "test@test.com");

    const passwordInput = Selector("input[name='password']");
    await t.typeText(passwordInput, "test");

    

    const loginButton = Selector("button[type='submit']");
    await t.click(loginButton);

    


    await t.debug();
});

