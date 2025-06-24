import SignUpPage from '../pages/SignUpPage';
export { TestUser } from '../data-example/signUpTestData';

export const signUpPage = new SignUpPage();

export const baseFixture = {
    name: 'Signup - Mangakatana',
    url: 'https://mangakatana.com/',
};