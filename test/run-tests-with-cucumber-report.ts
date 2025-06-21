import createTestCafe from 'testcafe';
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

async function runTestsWithCucumberReport() {
    const testcafe = await createTestCafe('localhost', 1337, 1338);
    const runner = testcafe.createRunner();
    
    const report: CucumberReport[] = [];
    
    try {
        const failedCount = await runner
            .src('test/ui/auth/login.spec.ts')
            .browsers('firefox:headless')
            .reporter('json', 'reports/testcafe-report.json')
            .run({
                stopOnFirstFail: false,
                quarantineMode: false
            });
        
        // After the run, read the report:
        const testcafeReport = JSON.parse(fs.readFileSync('reports/testcafe-report.json', 'utf8'));
        
        // Convert TestCafe results to Cucumber format
        const feature: CucumberReport = {
            name: 'Login Functionality',
            keyword: 'Feature',
            line: 1,
            id: 'login-functionality',
            tags: [],
            uri: 'test/features/login.feature',
            elements: []
        };
        
        // Process test results
        for (const testResult of testcafeReport.fixtures[0].tests) {
            const scenario: CucumberElement = {
                id: testResult.name.toLowerCase().replace(/\s+/g, '-'),
                keyword: 'Scenario',
                name: testResult.name,
                line: 1,
                description: '',
                type: 'scenario',
                tags: [],
                steps: []
            };
            
            // Add steps based on test result
            if (testResult.errs && testResult.errs.length > 0) {
                scenario.steps.push({
                    keyword: 'Then',
                    name: 'Test should pass',
                    line: 1,
                    match: { location: 'test/step-definitions/login.steps.ts' },
                    result: {
                        status: 'failed',
                        duration: testResult.durationMs,
                        error_message: testResult.errs[0].message
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
                        duration: testResult.durationMs
                    }
                });
            }
            
            feature.elements.push(scenario);
        }
        
        report.push(feature);
        
        // Ensure reports directory exists
        const reportsDir = 'reports';
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }
        
        // Write JSON report
        const jsonPath = path.join(reportsDir, 'cucumber-report.json');
        fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
        
        console.log(`✅ Tests completed!`);
        console.log(`📊 Cucumber JSON report generated: ${jsonPath}`);
        console.log(`📈 Total scenarios: ${feature.elements.length}`);
        console.log(`✅ Passed: ${feature.elements.filter(e => e.steps[0].result.status === 'passed').length}`);
        console.log(`❌ Failed: ${feature.elements.filter(e => e.steps[0].result.status === 'failed').length}`);
        
    } catch (error) {
        console.error('❌ Error running tests:', error);
    } finally {
        await testcafe.close();
    }
}

// Run the tests
runTestsWithCucumberReport().catch(console.error); 