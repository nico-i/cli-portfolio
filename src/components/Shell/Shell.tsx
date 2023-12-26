import { runPrompt } from '@/components/Cli';
import { Clear } from '@/components/Cli/cmd/clear';
import { PromptPrefix } from '@/components/Shell/PromptPrefix';
import { PromptHistoryContext } from '@/context/PromptHistoryContext/PromptHistoryContext';
import { PromptHistoryEntry } from '@/context/PromptHistoryContext/types';
import { CustomEvents, RunEvent, SearchParams } from '@/util/types';
import { useLocation } from '@reach/router';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ShellProps {
  username: string;
  domain: URL['hostname'];
}

export const Shell = ({ username, domain }: Readonly<ShellProps>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { history, setHistory } = useContext(PromptHistoryContext);
  const [currentPrompt, setCurrentPrompt] = useState<string>(``);
  const [tmpPrompt, setTmpPrompt] = useState<string>(``); // used for arrow up/down
  const [isProgramOpen, setIsProgramOpen] = useState(false);

  const location = useLocation();

  const handleRunEvent = (event: any) => {
    setIsProgramOpen(false);
    if (event.detail.prompt === undefined) {
      throw new Error(`No prompt provided in run event!`);
    }
    const cmdResTuple = processRunRequest(event.detail.prompt);

    if (cmdResTuple.prompt !== new Clear().fileName) {
      setHistory((history) => [...history, cmdResTuple]);
      updateCmdSearchParam(cmdResTuple.prompt);
    }
    textAreaRef.current?.focus();
  };

  const handleClearEvent = () => {
    updateCmdSearchParam();
    setHistory([]);
  };

  const handleStartStandaloneEvent = () => {
    setIsProgramOpen(true);
  };

  const handleStopStandaloneEvent = () => {
    setIsProgramOpen(false);
    setHistory((history) => {
      const newHistory = [...history];
      newHistory[newHistory.length - 1].response = null;
      return newHistory;
    });
  };

  useEffect(() => {
    textAreaRef.current?.scrollIntoView();
  }, [currentPrompt]);

  useEffect(() => {
    window.addEventListener(CustomEvents.clear, handleClearEvent);
    window.addEventListener(CustomEvents.run, handleRunEvent);
    window.addEventListener(
      CustomEvents.startStandalone,
      handleStartStandaloneEvent,
    );
    window.addEventListener(
      CustomEvents.stopStandalone,
      handleStopStandaloneEvent,
    );
    // run cmd if in search string
    const searchParams = new URLSearchParams(location.search);
    const cmdParam = searchParams.get(SearchParams.cmd);
    if (cmdParam) {
      window.dispatchEvent(RunEvent(decodeURIComponent(cmdParam)));
    }

    return () => {
      window.removeEventListener(CustomEvents.clear, handleClearEvent);
      window.removeEventListener(CustomEvents.run, handleRunEvent);
      window.removeEventListener(
        CustomEvents.startStandalone,
        handleStartStandaloneEvent,
      );
      window.removeEventListener(
        CustomEvents.stopStandalone,
        handleStopStandaloneEvent,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserTextValueChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => setCurrentPrompt(e.target.value);

  const handleUserTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    if (event.key.length === 1) {
      setTmpPrompt(currentPrompt + event.key);
    }
    const currentHistoryIndex = history.findIndex(
      (entry) => entry.prompt === currentPrompt,
    );

    switch (event.key) {
      case `Backspace`:
        if (currentPrompt === ``) {
          event.preventDefault();
          break;
        }
        setTmpPrompt(currentPrompt.slice(0, -1));
        break;
      case `Enter`: {
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        window.dispatchEvent(RunEvent(currentPrompt));
        setCurrentPrompt(``);
        setTmpPrompt(``);
        break;
      }
      case `Tab`:
        event.preventDefault();
        // TODO: Add tab completion
        break;
      case `ArrowDown`:
        event.preventDefault();
        if (currentHistoryIndex === -1) break; // current prompt is not in history -> not currently navigating history
        if (currentHistoryIndex + 1 === history.length) {
          setCurrentPrompt(tmpPrompt);
          break;
        }
        setCurrentPrompt(history[currentHistoryIndex + 1].prompt);
        break;
      case `ArrowUp`:
        // Go back in history
        // Example history [first, second, third]
        console.log(currentHistoryIndex);
        console.log(history);
        event.preventDefault();
        if (currentHistoryIndex === 0) break;
        if (currentHistoryIndex === -1) {
          setCurrentPrompt(history[history.length - 1].prompt);
          break;
        }
        console.log(`setting tmp prompt`);
        setCurrentPrompt(history[currentHistoryIndex - 1].prompt);
        break;
    }
  };

  return (
    <main
      id="shell"
      className={`
        px-2.5
        lg:pt-8
        lg:pb-2.5
        pt-2.5
        pb-8
        min-h-full
        flex
        flex-col
        hover:cursor-text
        relative
        w-full`}
      onClickCapture={(e) => {
        e.preventDefault();
        if (
          e.target instanceof HTMLDivElement &&
          e.target.parentNode &&
          e.target.parentNode instanceof HTMLDivElement &&
          e.target.parentNode.id === `history`
        ) {
          textAreaRef.current?.focus();
        }
      }}
    >
      {isProgramOpen ? (
        history[history.length - 1].response
      ) : (
        <div id="history">
          {history.length > 0 &&
            history.map((entryTuple, i) => (
              <div key={i} className="flex flex-col">
                <span>
                  <PromptPrefix username={username} domain={domain} />
                  {entryTuple.prompt}
                </span>
                {entryTuple.response !== `` ? entryTuple.response : <>&nbsp;</>}
              </div>
            ))}
          <div id="active-prompt" className="w-full flex relative">
            <PromptPrefix username={username} domain={domain} />
            <label className="sr-only" htmlFor="prompt">
              CLI prompt
            </label>
            <textarea
              id="prompt"
              rows={1}
              ref={textAreaRef}
              onKeyDown={handleUserTextAreaKeyDown}
              onChange={handleUserTextValueChange}
              value={currentPrompt}
              className={`
              w-full
              focus:outline-none
              resize-none
              overflow-hidden`}
            />
          </div>
        </div>
      )}
    </main>
  );
};

const updateCmdSearchParam = (cmd?: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  if (cmd) {
    newSearchParams.set(`cmd`, encodeURIComponent(cmd));
  } else {
    newSearchParams.delete(SearchParams.cmd);
    newSearchParams.delete(SearchParams.clear);
  }
  const currentUrl = new URL(window.location.href);
  currentUrl.search = newSearchParams?.toString() || ``;
  window.history.replaceState({}, ``, currentUrl);
};

const processRunRequest = (userPrompt: string): PromptHistoryEntry => {
  const res: PromptHistoryEntry = {
    prompt: userPrompt,
    response: null,
  };
  const consecutivePrompts = userPrompt.split(`&&`).map((cmd) => cmd.trim());
  // recursively process commands
  if (consecutivePrompts.length > 1) {
    for (const cmd of consecutivePrompts) {
      const consecutiveCmdRes = processRunRequest(cmd);
      res.response = (
        <>
          {res.response}
          <br />
          {consecutiveCmdRes.response}
        </>
      );
    }
    return res;
  }
  try {
    res.response = runPrompt(userPrompt.split(` `));
  } catch (e) {
    res.response = (e as Error).message;
  }
  return res;
};
