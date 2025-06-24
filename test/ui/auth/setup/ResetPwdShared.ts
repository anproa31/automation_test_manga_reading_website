import ResetPwdPage from '../pages/resetPwdPage';
import { RESET_PWD_LINK_1, RESET_PWD_LINK_2 } from '../data/resetPwdData';

export const resetPwdPage = new ResetPwdPage();

export const baseFixtureLink1 = {
    name: 'Reset Password - Link 1',
    url: RESET_PWD_LINK_1,
};

export const baseFixtureLink2 = {
    name: 'Reset Password - Link 2',
    url: RESET_PWD_LINK_2,
};
