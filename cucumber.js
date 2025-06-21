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