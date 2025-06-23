import CommentPage from '../pages/CommentPage';
export { TestComment } from '../data/CommentData';

export const commentPage = new CommentPage();

export const baseFixture = {
    name: 'Comment - Mangakatana',
    url: 'https://mangakatana.com/manga/nightmare-of-solomon.14687',
};
