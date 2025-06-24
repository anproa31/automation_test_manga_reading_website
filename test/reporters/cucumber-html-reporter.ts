import * as reporter from 'cucumber-html-reporter';
import * as fs from 'fs';
import * as path from 'path';

interface TestCafeReport {
    startTime: string;
    endTime: string;
    userAgents: string[];
    passed: number;
    total: number;
    fixtures: TestCafeFixture[];
}

interface TestCafeFixture {
    name: string;
    path: string;
    tests: TestCafeTest[];
}

interface TestCafeTest {
    name: string;
    errs: string[];
    durationMs: number;
}

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

export class CucumberHtmlReporter {
    private options: reporter.Options = {
        theme: 'bootstrap' as const,
        jsonFile: 'reports/cucumber-report.json',
        output: 'reports/cucumber-report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        brandTitle: 'Cucumber HTML Reporter',
        name: 'TestCafe - MangaKatana',
        metadata: {
            "App Version": "1.0.0",
            "Test Environment": "STAGING",
            "Browser": "Chrome",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };

    convertTestCafeToCucumber(testcafeReportPath: string): CucumberReport[] {
        if (!fs.existsSync(testcafeReportPath)) {
            throw new Error(`TestCafe report not found: ${testcafeReportPath}`);
        }

        const testcafeData: TestCafeReport = JSON.parse(fs.readFileSync(testcafeReportPath, 'utf8'));
        const cucumberReports: CucumberReport[] = [];

        for (const fixture of testcafeData.fixtures) {
            const feature: CucumberReport = {
                name: fixture.name,
                keyword: 'Feature',
                line: 1,
                id: this.generateId(fixture.name),
                tags: [],
                uri: fixture.path,
                elements: []
            };

            for (const test of fixture.tests) {
                const scenario: CucumberElement = {
                    id: this.generateId(test.name),
                    keyword: 'Scenario',
                    name: test.name,
                    line: 1,
                    description: '',
                    type: 'scenario',
                    tags: [],
                    steps: []
                };

                // Add steps based on test result
                if (test.errs && test.errs.length > 0) {
                    scenario.steps.push({
                        keyword: 'Then',
                        name: 'Test should pass',
                        line: 1,
                        match: { location: 'test/step-definitions/login.steps.ts' },
                        result: {
                            status: 'failed',
                            duration: test.durationMs,
                            error_message: test.errs[0]
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
                            duration: test.durationMs
                        }
                    });
                }

                feature.elements.push(scenario);
            }

            cucumberReports.push(feature);
        }

        return cucumberReports;
    }

    generateReport(testcafeReportPath: string = 'reports/testcafe-report.json') {
        try {
            // Convert TestCafe report to Cucumber format
            const cucumberReports = this.convertTestCafeToCucumber(testcafeReportPath);
            
            // Write Cucumber JSON report
            const cucumberJsonPath = 'reports/cucumber-report.json';
            fs.writeFileSync(cucumberJsonPath, JSON.stringify(cucumberReports, null, 2));
            
            // Generate HTML report
            const jsonFile = this.options.jsonFile;
            if (jsonFile && fs.existsSync(jsonFile)) {
                reporter.generate(this.options);
                console.log('✅ HTML report generated successfully!');
                console.log(`📊 Report location: ${this.options.output}`);
                console.log(`📈 Total scenarios: ${cucumberReports.reduce((sum, f) => sum + f.elements.length, 0)}`);
                console.log(`✅ Passed: ${cucumberReports.reduce((sum, f) => sum + f.elements.filter(e => e.steps[0].result.status === 'passed').length, 0)}`);
                console.log(`❌ Failed: ${cucumberReports.reduce((sum, f) => sum + f.elements.filter(e => e.steps[0].result.status === 'failed').length, 0)}`);
            } else {
                console.error('❌ JSON report file not found after conversion.');
            }
        } catch (error) {
            console.error('❌ Error generating report:', error);
        }
    }

    private generateId(name: string): string {
        return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
}

// Auto-generate report if this file is executed directly
if (require.main === module) {
    const reporter = new CucumberHtmlReporter();
    reporter.generateReport();
} 