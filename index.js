const chalk = require('chalk');
const ConfirmPrompt = require('inquirer/lib/prompts/confirm');

class TimeoutConfirmPrompt extends ConfirmPrompt {
  constructor(...args) {
    super(...args);
    this.opt.timeoutTips = this.opt.timeoutTips || (t => `(${t}s)`);
    this.opt.timeout = this.opt.timeout || 10;
  }

  _run(cb) {
    this.targetDate = new Date(new Date().getTime() + this.opt.timeout * 1000);
    this.timeout = Math.ceil((this.targetDate.getTime() - new Date().getTime()) / 1000);
    const timerId = setInterval(() => {
      this.timeout = Math.ceil((this.targetDate.getTime() - new Date().getTime()) / 1000);
      if (this.timeout <= 0) {
        clearInterval(timerId);
        this.onEnd(this.opt.default === 'Y/n' ? 'Yes' : 'No');
      } else {
        this.render();
      }
    }, 1000);

    /* eslint-disable-next-line */
    return super._run((...args) => {
      clearInterval(timerId);
      return cb(...args);
    });
  }

  render(answer) {
    let message = this.getQuestion();

    if (this.timeout !== 0 && answer === undefined) {
      message += this.opt.timeoutTips(this.timeout);
    }

    if (typeof answer === 'boolean') {
      message += chalk.cyan(answer ? 'Yes' : 'No');
    } else {
      message += this.rl.line;
    }

    this.screen.render(message);
    return this;
  }
}

module.exports = TimeoutConfirmPrompt;
