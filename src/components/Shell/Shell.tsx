import { getSuggestions, runPrompt } from '@/components/Cli';
import {
  ArgCountError,
  NotExecutableError,
  UnknownCommandError,
  UnknownFileError,
  UnknownFlagsError,
  ValueError,
} from '@/components/Cli/cmd/types';
import { PromptPrefix } from '@/components/Shell/PromptPrefix';
import {
  PromptHistoryAction,
  PromptHistoryContext,
} from '@/context/PromptHistoryContext/PromptHistoryContext';
import { promptResponseSortFn } from '@/context/PromptHistoryContext/helper';
import {
  PromptHistoryEntry,
  PromptResult,
} from '@/context/PromptHistoryContext/types';
import { useCharDimensions } from '@/hooks';
import { CustomEvents, RunEvent, SearchParams } from '@/util/types';
import { useLocation } from '@reach/router';
import clsx from 'clsx';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import {
  ChangeEventHandler,
  Fragment,
  KeyboardEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ShellProps {
  username: string;
  domain: URL['hostname'];
  initialPrompt?: string;
}

export const Shell = ({
  username,
  domain,
  initialPrompt,
}: Readonly<ShellProps>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaCopyRef = useRef<HTMLTextAreaElement>(null);

  const { promptHistory, dispatch } = useContext(PromptHistoryContext);
  const [currentPrompt, setCurrentPrompt] = useState<string>(``);
  const [tmpPrompt, setTmpPrompt] = useState<string>(``); // used for arrow up/down
  const [standalone, setStandalone] = useState<ReactNode | null>(null);
  const [currentDescHistoryIndex, setCurrentDescHistoryIndex] = useState(-1); // -1 means current prompt is not in history
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([]);
  const [isMainFlexCol, setIsMainFlexCol] = useState<boolean>(false);

  const { height: charHeight } = useCharDimensions();
  const location = useLocation();
  const { t } = useTranslation();

  const run = useCallback(
    (fullUserPrompt: string): PromptHistoryEntry => {
      const responses: PromptResult[] = [];
      const consecutivePrompts = fullUserPrompt
        .split(`&&`)
        .map((cmd) => cmd.trim());
      for (const cmd of consecutivePrompts) {
        const currentResponse: PromptResult = {
          prompt: cmd,
          timestamp: Date.now(),
          result: ``,
          isStandalone: false,
        };
        try {
          const { isStandalone, result } = runPrompt(cmd.split(` `));
          currentResponse.isStandalone = isStandalone;
          currentResponse.result = result;
        } catch (e) {
          if (e instanceof ArgCountError) {
            currentResponse.result = t((e as ArgCountError).message, {
              start: (e as ArgCountError).expectedInterval[0],
              end: (e as ArgCountError).expectedInterval[1],
              actual: (e as ArgCountError).actual,
            });
          } else if (e instanceof ValueError) {
            currentResponse.result = t((e as ValueError).message, {
              expectedType: (e as ValueError).expectedType,
              value: (e as ValueError).value,
            });
          } else if (e instanceof UnknownFlagsError) {
            currentResponse.result = t((e as UnknownFlagsError).message, {
              flags: (e as UnknownFlagsError).flags,
            });
          } else if (e instanceof UnknownCommandError) {
            currentResponse.result = t((e as UnknownCommandError).message, {
              command: (e as UnknownCommandError).command,
            });
          } else if (e instanceof UnknownFileError) {
            currentResponse.result = t((e as UnknownFileError).message, {
              file: (e as UnknownFileError).file,
            });
          } else if (e as NotExecutableError) {
            currentResponse.result = t((e as NotExecutableError).message, {
              file: (e as NotExecutableError).file,
            });
          } else {
            currentResponse.result = t(`cli.errors.server`, {
              error: (e as Error).message,
            });
          }
        }
        responses.push(currentResponse);
      }
      return { fullPrompt: fullUserPrompt, results: responses };
    },
    [t],
  );

  const handleRunEvent = useCallback(
    (event: any) => {
      if (event.detail.prompt === undefined) {
        throw new Error(`No prompt provided in run event!`);
      }
      const { fullPrompt: prompt, results: responses } = run(
        event.detail.prompt,
      );
      setStandalone(
        responses[responses.length - 1].isStandalone
          ? responses[responses.length - 1].result
          : null,
      );

      dispatch({
        type: PromptHistoryAction.INSERT,
        payload: {
          fullPrompt: prompt,
          results: responses,
        },
      });

      if (!(`ontouchstart` in window)) {
        textAreaRef.current?.focus();
      }
    },
    [dispatch, run],
  );

  const handleStopStandaloneEvent = useCallback(() => {
    if (!standalone) return;
    setStandalone(null);
    const lastEntryIndex = promptHistory.length - 1;
    const lastEntry = promptHistory[lastEntryIndex];
    const newValue = lastEntry.results.map((response) => {
      if (!response.isStandalone) return response;
      const newResponse: PromptResult = { ...response, hideResult: true };
      return newResponse;
    });
    dispatch({
      type: PromptHistoryAction.UPDATE,
      payload: {
        fullPrompt: lastEntry.fullPrompt,
        results: newValue,
      },
    });
  }, [dispatch, promptHistory, standalone]);

  useEffect(() => {
    window.addEventListener(CustomEvents.run, handleRunEvent);
    window.addEventListener(
      CustomEvents.stopStandalone,
      handleStopStandaloneEvent,
    );

    return () => {
      window.removeEventListener(CustomEvents.run, handleRunEvent);
      window.removeEventListener(
        CustomEvents.stopStandalone,
        handleStopStandaloneEvent,
      );
    };
  }, [handleRunEvent, handleStopStandaloneEvent]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cmdParam = searchParams.get(SearchParams.cmd);
    if (cmdParam) {
      const decodedCmdParam = decodeURIComponent(cmdParam);
      handleRunEvent(RunEvent(decodedCmdParam));
    } else if (initialPrompt) {
      handleRunEvent(RunEvent(initialPrompt));
    }
  }, [handleRunEvent, initialPrompt, location.search]);

  const handleUserTextValueChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    setCurrentPrompt(e.target.value);
    if (!textAreaRef.current || !textAreaCopyRef.current) return;
    textAreaRef.current.style.height = `auto`; // reset height
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // auto grow the textarea to fit the text
    setIsMainFlexCol(
      textAreaCopyRef.current.scrollHeight > charHeight &&
        e.target.value !== ``,
    );
  };

  const handleUserTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setTabSuggestions([]);
    textAreaRef.current?.scrollIntoView();
    if (event.key.length === 1) {
      setCurrentDescHistoryIndex(-1); // only reset history index if user is typing
      setTmpPrompt(currentPrompt + event.key);
    }

    if (event.key === `ArrowDown` || event.key === `ArrowUp`) {
      event.preventDefault();
      const descPromptHistory = promptHistory.toSorted((a, b) =>
        promptResponseSortFn(`DESC`, a, b),
      );
      if (event.key === `ArrowUp`) {
        // Go back in history
        if (currentDescHistoryIndex === descPromptHistory.length - 1) return;
        setCurrentDescHistoryIndex((currentDescHistoryIndex) => {
          const newIndex = currentDescHistoryIndex + 1;
          setCurrentPrompt(descPromptHistory[newIndex].fullPrompt);
          return newIndex;
        });
      } else {
        // Go forward in history
        if (currentDescHistoryIndex === -1) return;
        setCurrentDescHistoryIndex((currentDescHistoryIndex) => {
          const newIndex = currentDescHistoryIndex - 1;
          setCurrentPrompt(
            newIndex === -1
              ? tmpPrompt
              : descPromptHistory[newIndex].fullPrompt,
          );
          return newIndex;
        });
      }
      return;
    }

    if (event.key === `Tab`) {
      event.preventDefault();
      const args = currentPrompt.split(` `);
      if (args.length === 0) return;

      const suggestions = getSuggestions(args);
      if (suggestions.length === 0) return;

      if (suggestions.length === 1) {
        // only one suggestion, so auto-complete
        if (args.length === 1) {
          setCurrentPrompt(suggestions[0]);
        } else {
          setCurrentPrompt(args.slice(0, -1).join(` `) + ` ` + suggestions[0]);
        }
        return;
      }
      setTabSuggestions(suggestions);
      return;
    }

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
        break-words
        w-full`}
      onClickCapture={(e) => {
        if (
          e.target instanceof HTMLDivElement &&
          e.target.nodeName === `MAIN` &&
          !(`ontouchstart` in window)
        ) {
          textAreaRef.current?.focus();
        }
      }}
    >
      {standalone || (
        <>
          {promptHistory.length > 0 &&
            promptHistory.map((entryTuple, i) => {
              const { results: responses, fullPrompt, hideEntry } = entryTuple;
              if (hideEntry) return null;
              return (
                <Fragment key={i}>
                  <span>
                    <PromptPrefix username={username} domain={domain} />
                    {fullPrompt}
                  </span>
                  {responses.map((response, j) => {
                    if (response.hideResult) return null;
                    return (
                      <Fragment key={j}>
                        {response.result !== `` ? (
                          <>{response.result}</>
                        ) : (
                          <>&nbsp;</>
                        )}
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          <div
            id="active-prompt"
            className={clsx(
              `
              w-full
              flex
              relative`,
              isMainFlexCol && `flex-col`,
            )}
          >
            <label className="sr-only" htmlFor="prompt">
              CLI prompt
            </label>
            <PromptPrefix username={username} domain={domain} />
            <textarea
              id="prompt"
              rows={1}
              tabIndex={0}
              autoFocus={!(`ontouchstart` in window)}
              ref={textAreaRef}
              onKeyDown={handleUserTextAreaKeyDown}
              onChange={handleUserTextValueChange}
              value={currentPrompt}
              className={
                `
                w-full
                focus:outline-none
                overflow-hidden
                resize-none 
                `
                // overflow-hidden and resize-none are necessary for the auto grow textarea
              }
            />
          </div>
          {tabSuggestions.length > 0 && (
            <div className="flex flex-col">
              {tabSuggestions
                .toSorted((a, b) => a.localeCompare(b))
                .map((suggestion, i) => (
                  <span key={i}>{suggestion}</span>
                ))}
            </div>
          )}
        </>
      )}
      {/* Hidden prompt copy for width measurement */}
      <div
        className="
        invisible 
        -z-10
        -mt-6
        flex
        w-full"
      >
        <PromptPrefix
          username={username}
          domain={domain}
          className="pointer-events-none"
        />
        <textarea
          rows={1}
          tabIndex={-1}
          readOnly
          disabled
          ref={textAreaCopyRef}
          value={currentPrompt}
          className={`
            w-full
            pointer-events-none
            `}
        />
      </div>
    </main>
  );
};
