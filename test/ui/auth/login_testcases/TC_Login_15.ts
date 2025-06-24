import { test } from 'testcafe';
import { loginPage, baseFixture } from '../setup/LoginShared';
import { VALID_USERNAME, VALID_PASSWORD } from '../data/loginTestData';
import { Role } from 'testcafe';

fixture(baseFixture.name).page(baseFixture.url);

const rememberedUser = Role('https://mangakatana.com/', async t => {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD, true);
    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok();

    const cookies = await t.getCookies();
    const sgnTokenCookie = cookies.find(cookie => cookie.name === 'sgn_token');
    await t.expect(sgnTokenCookie).ok('The sgn_token cookie should be set when "Remember Me" is checked.');

}, { preserveUrl: true });

test('TC_Login_15: Remember Me functionality should keep user logged in across sessions', async t => {
    await t.useRole(rememberedUser);

    await t.expect(loginPage.displayName.withText(VALID_USERNAME).exists).ok('User was not logged in automatically with "Remember Me" cookie.');
    
    await t.takeScreenshot({ path: 'screenshots/TC_Login_16.png' });
}); 