import timeoutConfirm from './index.js';

const answer = await timeoutConfirm({
  message: 'Are you sure you want to delete?', 
  timeout: 5, 
  timeoutTips: (t) => `(Automatic confirmation in ${t} seconds)`
});

console.log(answer);
