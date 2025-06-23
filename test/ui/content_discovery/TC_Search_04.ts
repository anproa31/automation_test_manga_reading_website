import { Selector, ClientFunction } from "testcafe";

const setEmojiValue = ClientFunction((value: string) => {
    const input = document.querySelector('#input_search') as HTMLInputElement;
    if (input) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
});

const emojiList = ['😭😭😭', '😂😂😂', '🔥🔥🔥', '😊😊😊', '👍👍👍', '🥺🥺🥺', '😎😎😎', '💀💀💀', '😡😡😡'];

fixture`Advanced Search by Emoji`
    .page`https://mangakatana.com/`;

emojiList.forEach((emoji) => {
    test(`Search by emoji: ${emoji}`, async t => {
        const searchBtn = Selector('#searchsubmit');

        await setEmojiValue(emoji);
        await t.click(searchBtn);

        await t.wait(3000);

        const bookListItems = Selector('#book_list .item');
        const count = await bookListItems.count;

        console.log(`Emoji "${emoji}" resulted in ${count} results.`);

        await t.expect(count).eql(0, `Expect no result for emoji "${emoji}"`);
    });
});