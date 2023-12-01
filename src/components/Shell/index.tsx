import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ShellProps {
  username: string;
  domain: URL['hostname'];
}

export default function Shell({ username, domain }: Readonly<ShellProps>) {
  const promptPrefix = `${username}@${domain}: ~$ `;
  const promptPrefixPlaceholder = ` `.repeat(promptPrefix.length);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [busyMem, setBusyMem] = useState<string[]>([]);
  const [userTextAreaValue, setUserTextAreaValue] = useState<string>(
    promptPrefixPlaceholder,
  );
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isBusy) {
      document.body.style.cursor = `wait`;
      return;
    }

    document.body.style.cursor = `auto`;

    const userInputDuringBusy = busyMem.join(``);
    setBusyMem([]);

    setUserTextAreaValue(
      [promptPrefixPlaceholder, userInputDuringBusy].join(``),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on isBusy change
  }, [isBusy]);

  const promptPrefixHtml = (
    <>
      <span className="text-info-500">{`${username}@${domain}`}</span>
      <span>:</span>&nbsp;
      <span className="text-log-500">~</span>
      <span>$</span>&nbsp;
    </>
  );

  const handleUserTextAreaChange: FormEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    const value = event.currentTarget.value;

    if (value.length < promptPrefix.length) {
      setUserTextAreaValue(promptPrefixPlaceholder);
      return;
    }

    event.currentTarget.style.height = `auto`; // Reset the height
    event.currentTarget.style.height = event.currentTarget.scrollHeight + `px`;

    setUserTextAreaValue(value);
  };

  const handleUserTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (isBusy) {
      if (event.key !== `Enter`) {
        // check if key is a char or whitespace
        if (event.key.length > 1) {
          return;
        }
        setBusyMem((busyMem) => [...busyMem, event.key]);
        return;
      }
      if (event.shiftKey) {
        setBusyMem((busyMem) => [...busyMem, `\n`]);
        return;
      }
      return;
    }

    if (event.key === `Enter` && !event.shiftKey) {
      event.preventDefault();
      processCmd(userTextAreaValue.trim());
    }
  };

  const processCmd = async (userInput: string) => {
    setIsBusy(true);
    // TODO: Add real shell command handling
    const res = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(`I'm a fake shell, I don't do anything.`);
      }, 2000),
    ); // Simulate a 2000s process

    setIsBusy(false);
    setHistory((history) => [...history, [userInput, res].join(`\n`)]);

    textAreaRef.current?.focus();
  };

  return (
    <main
      className={`
        px-[10px]
        pt-[10px]
        h-full
        flex
        flex-col
        w-full`}
    >
      {history.length > 0 &&
        history.map((cmd, i) => (
          <span key={i}>
            {promptPrefixHtml}
            {cmd.split(`\n`).map((line, j) => (
              <span key={j}>
                {line}
                <br />
              </span>
            ))}
          </span>
        ))}
      <div className="w-full flex h-full relative">
        <div className="absolute">{promptPrefixHtml}</div>
        <textarea
          rows={1}
          readOnly={isBusy}
          ref={textAreaRef}
          onChange={handleUserTextAreaChange}
          onKeyDown={handleUserTextAreaKeyDown}
          value={userTextAreaValue}
          className={`
          w-full
          focus:outline-none
          resize-none
          overflow-hidden`}
        />
      </div>
    </main>
  );
}
