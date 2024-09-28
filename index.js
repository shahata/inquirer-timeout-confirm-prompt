import {
  createPrompt,
  useState,
  useKeypress,
  usePrefix,
  isEnterKey,
  makeTheme,
  useEffect,
  useMemo,
} from '@inquirer/core';

const time = () => Math.ceil(new Date().getTime() / 1000);

export default createPrompt((config, done) => {
  const defaultAnswer = config.default !== false;
  const { transformer = answer => answer ? 'Yes' : 'No' } = config;
  const theme = makeTheme(config.theme);
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState('');
  const prefix = usePrefix({ status, theme });
  const target = useMemo(() => time() + config.timeout, [config]);
  const [remaining, setRemaining] = useState(target - time());

  function submit(value) {
    let answer = defaultAnswer;
    if (/^(y|yes)/i.test(value)) answer = true;
    else if (/^(n|no)/i.test(value)) answer = false;
    setValue(transformer(answer));
    setStatus('done');
    done(answer);
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      const timeout = target - time();
      if (timeout <= 0) submit();
      else setRemaining(timeout);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useKeypress((key, rl) => {
    if (isEnterKey(key)) submit(value);
    else setValue(rl.line);
  });

  const message = theme.style.message(config.message, status);
  if (status === 'done') {
    const formattedValue = theme.style.answer(value);
    return `${prefix} ${message} ${formattedValue}`;
  } else {
    const defaultValue = ` ${theme.style.defaultAnswer(defaultAnswer ? 'Y/n' : 'y/N')}`;
    const formattedValue = `${config.timeoutTips(remaining)} ${value}`;
    return `${prefix} ${message}${defaultValue} ${formattedValue}`;
  }
});
