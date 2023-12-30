import { runPrompt } from '@/components/Cli';
import { Clear } from '@/components/Cli/cmd/clear';
import { PromptPrefix } from '@/components/Shell/PromptPrefix';
import { PromptHistoryContext } from '@/context/PromptHistoryContext/PromptHistoryContext';
import { PromptHistoryEntry } from '@/context/PromptHistoryContext/types';
import { useMobileDetect } from '@/hooks';
import { CustomEvents, RunEvent, SearchParams } from '@/util/types';
import { useLocation } from '@reach/router';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
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
  const [isStandaloneOpen, setIsStandaloneOpen] = useState(false);
  const isMobile = useMobileDetect();

  const location = useLocation();

  const handleRunEvent = useCallback(
    (event: any) => {
      if (event.detail.prompt === undefined) {
        throw new Error(`No prompt provided in run event!`);
      }
      const cmdResTuple = processRunRequest(event.detail.prompt);

      if (cmdResTuple.prompt !== new Clear().fileName) {
        setHistory((history) => [...history, cmdResTuple]);
        updateCmdSearchParam(cmdResTuple.prompt);
      }
      if (!isMobile) {
        textAreaRef.current?.focus();
      }
    },
    [setHistory],
  );

  const handleClearEvent = useCallback(() => {
    updateCmdSearchParam();
    setHistory([]);
  }, [setHistory]);

  const handleStartStandaloneEvent = useCallback(() => {
    setIsStandaloneOpen(true);
  }, [setIsStandaloneOpen]);

  const handleStopStandaloneEvent = useCallback(() => {
    setIsStandaloneOpen(false);
    setHistory((history) => {
      const newHistory = [...history];
      newHistory[newHistory.length - 1].response = null;
      return newHistory;
    });
  }, [setHistory, setIsStandaloneOpen]);

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
  }, [
    handleClearEvent,
    handleRunEvent,
    handleStartStandaloneEvent,
    handleStopStandaloneEvent,
    location.search,
  ]);

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
        event.preventDefault();
        if (currentHistoryIndex === 0) break;
        if (currentHistoryIndex === -1) {
          setCurrentPrompt(history[history.length - 1].prompt);
          break;
        }
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
        if (
          e.target instanceof HTMLDivElement &&
          e.target.nodeName === `MAIN` &&
          !isMobile
        ) {
          textAreaRef.current?.focus();
        }
      }}
    >
      {isStandaloneOpen ? (
        history[history.length - 1].response
      ) : (
        <>
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
              autoFocus={!isMobile}
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
        </>
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
