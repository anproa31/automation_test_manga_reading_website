import { fixture, test } from 'testcafe';
import { setWorldConstructor, World } from '@cucumber/cucumber';

// Extend the World to include TestCafe's test controller
export class CustomWorld extends World {
    public testController: any;

    constructor(options: any) {
        super(options);
    }

    setTestController(tc: any) {
        this.testController = tc;
    }
}

setWorldConstructor(CustomWorld);

// Create a TestCafe fixture that will run Cucumber scenarios
fixture('Cucumber TestCafe Integration')
    .page('https://mangakatana.com/');

// This will be used by the step definitions to access the test controller
export let currentTestController: any;

test.before(async (t) => {
    currentTestController = t;
})('Cucumber Scenarios', async (t) => {
    // The actual test logic will be handled by Cucumber step definitions
    // This is just a placeholder to ensure TestCafe runs
    await t.expect(true).ok();
}); 