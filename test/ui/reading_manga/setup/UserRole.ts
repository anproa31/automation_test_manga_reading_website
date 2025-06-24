import { Role, Selector } from 'testcafe';
import { VALID_USERNAME, VALID_PASSWORD, UNVERIFIED_USERNAME, UNVERIFIED_PASSWORD } from '../data/LoginData';

export const userRoleUnverified = Role('https://mangakatana.com/', async t => {
    const loginBtn = Selector('header a').withText('Log In');

    await t
        .click(loginBtn)
        .typeText('#user_login', UNVERIFIED_USERNAME, { replace: true })
        .typeText('#pwd', UNVERIFIED_PASSWORD, { replace: true })
        .click('#signin_bt');
}, { preserveUrl: true });

export const userRoleVerified = Role('https://mangakatana.com/', async t => {
    const loginBtn = Selector('header a').withText('Log In');

    await t
        .click(loginBtn)
        .typeText('#user_login', VALID_USERNAME, { replace: true })
        .typeText('#pwd', VALID_PASSWORD, { replace: true })
        .click('#signin_bt');
}, { preserveUrl: true });
