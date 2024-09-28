# Timeout Confirm Prompt

[Inquirer](https://github.com/SBoudrias/Inquirer.js) Confirmation prompt, automatic confirmation after timeout

Based on https://github.com/zonday/inquirer-timeout-confirm-prompt

## Install

``` bash
npm install --save @shahata/inquirer-timeout-confirm-prompt
```

## Use

``` javascript
import timeoutConfirm from '@shahata/inquirer-timeout-confirm-prompt';

const answer = await timeoutConfirm({
  message: 'Are you sure you want to delete?', 
  timeout: 5, 
  timeoutTips: (t) => `(Automatic confirmation in ${t} seconds)`
});

console.log(answer);
```
