# TestCafe Manga Reading Website - Cucumber Reporting

This project contains automated tests for a manga reading website using TestCafe, with Cucumber-style reporting capabilities.

## Quick Start

### Installation
```bash
npm install
```

### Run Tests with Cucumber Reports
```bash
npm run test:with-report
```

This will:
1. Run your TestCafe tests in headless Firefox
2. Generate a JSON report
3. Convert it to a beautiful HTML report

## Project Structure

```
├── test/
│   ├── features/                    # Cucumber feature files
│   │   └── login.feature           # Login functionality scenarios
│   ├── step-definitions/           # Step definitions for Cucumber
│   │   └── login.steps.ts          # Login step implementations
│   ├── reporters/                  # Custom reporters
│   │   └── cucumber-html-reporter.ts
│   └── ui/                         # Your existing TestCafe tests
├── reports/                        # Generated reports
│   ├── cucumber-report.html        # Beautiful HTML report
│   └── cucumber-report.json        # JSON format for CI/CD
└── cucumber.js                     # Cucumber configuration
```

## Available Scripts

- `npm run test:with-report` - Run tests and generate HTML report
- `npm run generate-report` - Generate HTML report from existing JSON
- `npm run cucumber` - Run Cucumber tests directly
- `npm run test:headless` - Run tests in headless mode

## Reports

After running tests, you'll find:
- **HTML Report**: `reports/cucumber-report.html` - Beautiful visual report
- **JSON Report**: `reports/cucumber-report.json` - For CI/CD integration

The HTML report includes:
- Test summary dashboard
- Feature and scenario breakdown
- Pass/fail statistics
- Execution times
- Error details

## Configuration

The Cucumber configuration is in `cucumber.js` and includes:
- TypeScript support
- HTML and JSON output formats
- Progress bar display
- Custom formatting options

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firefox browser (for running tests)

## 📊 Cucumber Reporting Setup

This project has been configured with Cucumber-style reporting that provides:

- **Feature files** in Gherkin syntax (`test/features/`)
- **Step definitions** that map to your existing TestCafe tests (`test/step-definitions/`)
- **HTML reports** with beautiful visualizations
- **JSON reports** for integration with CI/CD pipelines

## 🏃‍♂️ Running Tests with Reports

### Option 1: Run Tests and Generate HTML Report
```bash
npm run test:with-report
```

This command will:
1. Run your TestCafe tests in headless Firefox
2. Generate a JSON report
3. Convert it to a beautiful HTML report

### Option 2: Run Custom Cucumber Integration
```bash
npm run run-cucumber-tests
```

This runs a custom script that:
1. Executes your existing TestCafe tests
2. Converts results to Cucumber JSON format
3. Generates comprehensive reports

### Option 3: Generate Report from Existing JSON
```bash
npm run generate-report
```

## 📁 Project Structure

```
automation_test_manga_reading_website/
├── test/
│   ├── features/                    # Cucumber feature files
│   │   └── login.feature           # Login functionality scenarios
│   ├── step-definitions/           # Step definitions for Cucumber
│   │   └── login.steps.ts          # Login step implementations
│   ├── reporters/                  # Custom reporters
│   │   ├── cucumber-html-reporter.ts
│   │   └── testcafe-cucumber-reporter.ts
│   ├── ui/                         # Your existing TestCafe tests
│   │   ├── auth/
│   │   ├── pages/
│   │   └── data/
│   └── run-tests-with-cucumber-report.ts
├── reports/                        # Generated reports
│   ├── cucumber-report.html        # Beautiful HTML report
│   ├── cucumber-report.json        # JSON format for CI/CD
│   └── testcafe-report.json        # Raw TestCafe results
├── cucumber.js                     # Cucumber configuration
└── package.json
```

## 🎯 Available Test Scenarios

The login feature includes the following scenarios:

### ✅ Positive Test Cases
- **Successful login** with valid credentials
- **Login with trimmed credentials** (handles leading/trailing spaces)
- **Case-insensitive username** login
- **Remember Me functionality** keeps user logged in
- **Session persistence** after page refresh

### ❌ Negative Test Cases
- **Empty username** validation
- **Empty password** validation
- **Invalid credentials** handling
- **SQL injection attempts** protection
- **Account locking** after multiple failed attempts

### 🔧 Technical Test Cases
- **Loading spinner** visibility
- **Tab order** accessibility
- **Cursor styling** on input fields
- **Form validation** messages

## 📈 Understanding the Reports

### HTML Report Features
- **Dashboard** with test summary
- **Feature breakdown** showing all scenarios
- **Step-by-step execution** details
- **Error details** with screenshots (if available)
- **Execution time** and performance metrics
- **Pass/Fail statistics**

### JSON Report Structure
```json
{
  "name": "Login Functionality",
  "keyword": "Feature",
  "elements": [
    {
      "name": "Successful login with valid credentials",
      "keyword": "Scenario",
      "steps": [
        {
          "name": "I should be logged in successfully",
          "result": {
            "status": "passed",
            "duration": 1500
          }
        }
      ]
    }
  ]
}
```

## 🔧 Configuration

### Cucumber Configuration (`cucumber.js`)
```javascript
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['test/features/**/*.ts', 'test/step-definitions/**/*.ts'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true
  }
};
```

### HTML Reporter Configuration
The HTML reporter is configured with:
- **Bootstrap theme** for modern styling
- **Metadata** including browser, platform, and test environment
- **Scenario timestamps** for detailed tracking
- **Auto-launch** of reports after generation

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Test with Cucumber Reports
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run test:with-report
      - uses: actions/upload-artifact@v2
        with:
          name: cucumber-report
          path: reports/
```

### Jenkins Integration
```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm run test:with-report'
            }
        }
        stage('Publish Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports',
                    reportFiles: 'cucumber-report.html',
                    reportName: 'Cucumber Test Report'
                ])
            }
        }
    }
}
```

## 🛠️ Customization

### Adding New Features
1. Create a new `.feature` file in `test/features/`
2. Write scenarios in Gherkin syntax
3. Implement step definitions in `test/step-definitions/`
4. Update the test runner if needed

### Customizing Reports
- Modify `test/reporters/cucumber-html-reporter.ts` for HTML report customization
- Update metadata in the reporter configuration
- Add custom themes or styling

### Extending Test Coverage
- Add new page objects in `test/ui/pages/`
- Create new test data in `test/ui/data/`
- Implement new test scenarios following the existing patterns

## 📝 Troubleshooting

### Common Issues

**Tests not running:**
- Ensure Firefox is installed
- Check that all dependencies are installed: `npm install`

**Reports not generating:**
- Verify the `reports/` directory exists
- Check that tests completed successfully
- Ensure JSON report file was created before generating HTML

**Import errors:**
- Run `npm run compile` to compile TypeScript
- Check that all dependencies are properly installed

### Debug Mode
Run tests with verbose output:
```bash
npm run test:headless -- --debug-mode
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add feature files for new functionality
3. Implement corresponding step definitions
4. Update this README with new features
5. Ensure all tests pass before submitting

## 📄 License

This project is licensed under the ISC License.

---

## Setting Up Test Data

1. Copy the example data files:
   ```sh
   cp -r test/ui/auth/data-example/* test/ui/auth/data/
   ```
2. Edit the files in `test/ui/auth/data/` to include your own test accounts, emails, and passwords.
   **Do not commit these files to git.** 