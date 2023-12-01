import { FormEventHandler, useRef, useState } from 'react';

interface ShellProps {
  username: string;
  domain: URL['hostname'];
}

export default function Shell({ username, domain }: Readonly<ShellProps>) {
  const promptText = `${username}@${domain}: ~$ `;
  const promptTextPlaceholder = `_`.repeat(promptText.length);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // const [history, setHistory] = useState<string[]>([]);
  // fill with empty strings to match the length of the prompt
  const [userInput, setUserInput] = useState<string>(promptTextPlaceholder);

  const promptTextHtml = (
    <>
      <span className="text-info-500">{`${username}@${domain}`}</span>
      <span>:</span>&nbsp;
      <span className="text-log-500">~</span>
      <span>$</span>&nbsp;
    </>
  );

  const handleUserInput: FormEventHandler<HTMLTextAreaElement> = (event) => {
    const value = event.currentTarget.value;

    if (value.length < promptText.length) {
      setUserInput(promptTextPlaceholder);
      return;
    }

    event.currentTarget.style.height = `auto`; // Reset the height
    event.currentTarget.style.height = event.currentTarget.scrollHeight + `px`;

    setUserInput(value);
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
      {/* history.length > 0 && <span>{history}</span> */}
      <div className="w-full flex h-full relative">
        <div className="absolute">{promptTextHtml}</div>
        <textarea
          rows={1}
          ref={textAreaRef}
          onChange={handleUserInput}
          value={userInput}
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
