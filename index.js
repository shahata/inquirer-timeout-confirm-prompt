import {
  createPrompt,
  useState,
  useKeypress,
  usePrefix,
  isEnterKey,
  makeTheme,
  useEffect,
} from '@inquirer/core';

const time = () => Math.ceil(new Date().getTime() / 1000);

export default createPrompt((config, done) => {
  const { transformer = answer => (answer ? 'Yes' : 'No') } = config;
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState('');
  const [target] = useState(time() + config.timeout);
  const [remaining, setRemaining] = useState(target - time());
  const theme = makeTheme(config.theme);
  const prefix = usePrefix({ status, theme });

  useEffect(() => {
    const timerId = setInterval(() => {
      const timeout = target - time();
      if (timeout <= 0) {
        let answer = config.default !== false;
        setValue(transformer(answer));
        setStatus('done');
        done(answer);
      } else {
        setRemaining(timeout);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useKeypress((key, rl) => {
    if (isEnterKey(key)) {
      let answer = config.default !== false;
      if (/^(y|yes)/i.test(value)) answer = true;
      else if (/^(n|no)/i.test(value)) answer = false;

      setValue(transformer(answer));
      setStatus('done');
      done(answer);
    } else {
      setValue(rl.line);
    }
  });

  let formattedValue = '';
  let defaultValue = '';
  if (status === 'done') {
    formattedValue = theme.style.answer(value);
  } else {
    formattedValue = `${config.timeoutTips(remaining)} ${value}`;
    defaultValue = ` ${theme.style.defaultAnswer(
      config.default === false ? 'y/N' : 'Y/n',
    )}`;
  }

  const message = theme.style.message(config.message, status);
  return `${prefix} ${message}${defaultValue} ${formattedValue}`;
});
