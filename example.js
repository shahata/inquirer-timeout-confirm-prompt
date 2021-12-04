const inquirer = require('inquirer');
const TimeoutConfirm = require('@shahata/inquirer-timeout-confirm-prompt');

inquirer.registerPrompt('timeout-confirm', TimeoutConfirm);
inquirer
  .prompt({
    type: 'timeout-confirm',
    name: 'test',
    message: 'Are you sure you want to delete?',
    timeout: 5,
    timeoutTips: (t) => `（Automatic confirmation in ${t} seconds）`
  }).then(answers => {
    console.log(answers);
  });
