import { Selector } from 'testcafe';

fixture`TestCafe Example Page Tests`
    .page`https://devexpress.github.io/testcafe/example/`;

test('Submit feedback form', async t => {
    // Input fields
    const nameInput = Selector('#developer-name');
    const commentTextarea = Selector('#comments');

    // Checkboxes and radio buttons
    const remoteTestingCheckbox = Selector('input[name="remote"]');
    const reusingJsCheckbox = Selector('input[name="re-using"]');
    const linuxRadio = Selector('input[value="Linux"]');

    // Dropdown
    const interfaceSelect = Selector('#preferred-interface');
    const javascriptApiOption = interfaceSelect.find('option').withText('JavaScript API');

    // Slider
    const triedTestCafeSlider = Selector('#tried-test-cafe');

    // Submit button
    const submitButton = Selector('#submit-button');

    await t
        // Fill in the name
        .typeText(nameInput, 'John Doe')

        // Select checkboxes
        .click(remoteTestingCheckbox)
        .click(reusingJsCheckbox)

        // Select radio button
        .click(linuxRadio)

        // Select from dropdown
        .click(interfaceSelect)
        .click(javascriptApiOption)

        // Move slider
        .drag(triedTestCafeSlider, 360, 0, { offsetX: 10, offsetY: 10 })

        // Add comment
        .typeText(commentTextarea, 'This is a test comment')

        // Submit the form
        .click(submitButton)

        // Verify submission
        .expect(Selector('#article-header').innerText).contains('Thank you');
});

test('Validate required fields', async t => {
    const submitButton = Selector('#submit-button');
    const nameInput = Selector('#developer-name');

    await t
        // Try to submit without name
        .click(submitButton)
        
        // Verify that validation message appears
        .expect(nameInput.hasAttribute('data-testcafe-test-required')).ok()
        
        // Fill in name and submit
        .typeText(nameInput, 'John Doe')
        .click(submitButton)
        
        // Verify successful submission
        .expect(Selector('#article-header').innerText).contains('Thank you');
});

test('Test feature toggles', async t => {
    const nameInput = Selector('#developer-name');
    const populateButton = Selector('#populate');
    const submitButton = Selector('#submit-button');

    await t
        // Fill in name
        .typeText(nameInput, 'John Doe')

        // Test the populate button
        .click(populateButton)
        
        // Verify that fields were populated
        .expect(nameInput.value).contains('Peter')
        
        // Submit the form
        .click(submitButton)
        
        // Verify submission
        .expect(Selector('#article-header').innerText).contains('Thank you');
});

test('Check initial page state', async t => {
    await t
        // Verify page title
        .expect(Selector('h1').innerText).eql('Example')
        
        // Verify that name input is empty
        .expect(Selector('#developer-name').value).eql('')
        
        // Verify that checkboxes are unchecked
        .expect(Selector('input[name="remote"]').checked).notOk()
        .expect(Selector('input[name="re-using"]').checked).notOk()
        
        // Verify that comment textarea is disabled by default
        .expect(Selector('#comments').hasAttribute('disabled')).ok();
});
