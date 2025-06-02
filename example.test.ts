import { Selector } from 'testcafe';

fixture`TestCafe Example Page Tests`
    .page`https://devexpress.github.io/testcafe/example/`;

test('Submit feedback form', async t => {

    const nameInput = Selector('#developer-name');
    const commentTextarea = Selector('#comments');


    const remoteTestingCheckbox = Selector('input[name="remote"]');
    const reusingJsCheckbox = Selector('input[name="re-using"]');
    const linuxRadio = Selector('input[value="Linux"]');


    const interfaceSelect = Selector('#preferred-interface');
    const javascriptApiOption = interfaceSelect.find('option').withText('JavaScript API');


    const triedTestCafeSlider = Selector('#tried-test-cafe');


    const submitButton = Selector('#submit-button');

    await t

        .typeText(nameInput, 'John Doe')


        .click(remoteTestingCheckbox)
        .click(reusingJsCheckbox)


        .click(linuxRadio)


        .click(interfaceSelect)
        .click(javascriptApiOption)


        .drag(triedTestCafeSlider, 360, 0, { offsetX: 10, offsetY: 10 })


        .typeText(commentTextarea, 'This is a test comment')


        .click(submitButton)


        .expect(Selector('#article-header').innerText).contains('Thank you');
});

test('Validate required fields', async t => {
    const submitButton = Selector('#submit-button');
    const nameInput = Selector('#developer-name');

    await t

        .click(submitButton)
        

        .expect(nameInput.hasAttribute('data-testcafe-test-required')).ok()
        

        .typeText(nameInput, 'John Doe')
        .click(submitButton)
        

        .expect(Selector('#article-header').innerText).contains('Thank you');
});

test('Test feature toggles', async t => {
    const nameInput = Selector('#developer-name');
    const populateButton = Selector('#populate');
    const submitButton = Selector('#submit-button');

    await t

        .typeText(nameInput, 'John Doe')


        .click(populateButton)
        

        .expect(nameInput.value).contains('Peter')
        

        .click(submitButton)

        .expect(Selector('#article-header').innerText).contains('Thank you');
});

test('Check initial page state', async t => {
    await t

        .expect(Selector('h1').innerText).eql('Example')
        

        .expect(Selector('#developer-name').value).eql('')
        

        .expect(Selector('input[name="remote"]').checked).notOk()
        .expect(Selector('input[name="re-using"]').checked).notOk()
        

        .expect(Selector('#comments').hasAttribute('disabled')).ok();
});
