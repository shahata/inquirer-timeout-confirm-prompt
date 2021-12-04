# Timeout Confirm Prompt

[Inquirer](https://github.com/SBoudrias/Inquirer.js) Confirmation prompt, automatic confirmation after timeout

Based on https://github.com/zonday/inquirer-timeout-confirm-prompt

## Install

``` bash
npm install --save @shahata/inquirer-timeout-confirm-prompt
```

## Use

``` javascript
const inquirer = require('inquirer');
const TimeoutConfirm = require('@shahata/inquirer-time-confirm-prompt');

inquirer.registerPrompt('timeout-confirm', TimeoutConfirm);
inquirer
  .prompt({
    type: 'timeout-confirm',
    name: 'test',
    message: 'Are you sure you want to delete?',
    timeout: 5,
    timeoutTips: (t) => `（Automatic confirmation in ${t} seconds）`
  }).then(answers => {
     // ...
  });
```
