import Reporter from 'testcafe';
import * as fs from 'fs';
import * as path from 'path';

interface CucumberReport {
    name: string;
    keyword: string;
    line: number;
    id: string;
    tags: any[];
    uri: string;
    elements: CucumberElement[];
}

interface CucumberElement {
    id: string;
    keyword: string;
    name: string;
    line: number;
    description: string;
    type: string;
    tags: any[];
    steps: CucumberStep[];
}

interface CucumberStep {
    keyword: string;
    name: string;
    line: number;
    match: {
        location: string;
    };
    result: {
        status: string;
        duration?: number;
        error_message?: string;
    };
}

export class TestCafeCucumberReporter {
    private report: CucumberReport[] = [];
    private currentFeature: CucumberReport | null = null;
    private currentScenario: CucumberElement | null = null;
    private outputPath: string;

    constructor(outputPath: string = 'reports/cucumber-report.json') {
        this.outputPath = outputPath;
        
        // Ensure reports directory exists
        const reportsDir = path.dirname(this.outputPath);
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }
    }

    reportTestStart(name: string, meta: any, testRunInfo: any) {
        // Create a new feature for each test
        this.currentFeature = {
            name: name,
            keyword: 'Feature',
            line: 1,
            id: this.generateId(name),
            tags: [],
            uri: `test/ui/auth/${name.toLowerCase().replace(/\s+/g, '-')}.feature`,
            elements: []
        };
    }

    reportFixtureStart(name: string, path: string, meta: any) {
        // Fixture becomes the feature
        this.currentFeature = {
            name: name,
            keyword: 'Feature',
            line: 1,
            id: this.generateId(name),
            tags: [],
            uri: path,
            elements: []
        };
    }

    reportTestDone(name: string, testRunInfo: any, meta: any) {
        if (this.currentFeature) {
            // Create a scenario for the test
            const scenario: CucumberElement = {
                id: this.generateId(name),
                keyword: 'Scenario',
                name: name,
                line: 1,
                description: '',
                type: 'scenario',
                tags: [],
                steps: []
            };

            // Add steps based on test result
            if (testRunInfo.errs && testRunInfo.errs.length > 0) {
                scenario.steps.push({
                    keyword: 'Then',
                    name: 'Test should pass',
                    line: 1,
                    match: { location: 'test/step-definitions/login.steps.ts' },
                    result: {
                        status: 'failed',
                        duration: testRunInfo.durationMs,
                        error_message: testRunInfo.errs[0].message
                    }
                });
            } else {
                scenario.steps.push({
                    keyword: 'Then',
                    name: 'Test should pass',
                    line: 1,
                    match: { location: 'test/step-definitions/login.steps.ts' },
                    result: {
                        status: 'passed',
                        duration: testRunInfo.durationMs
                    }
                });
            }

            this.currentFeature.elements.push(scenario);
            this.report.push(this.currentFeature);
        }
    }

    reportTaskDone(startTime: number, endTime: number, userAgents: string[], errs: any[]) {
        // Write the report to file
        fs.writeFileSync(this.outputPath, JSON.stringify(this.report, null, 2));
        console.log(`Cucumber JSON report generated: ${this.outputPath}`);
    }

    private generateId(name: string): string {
        return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
} 