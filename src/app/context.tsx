import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { addMilliseconds } from "date-fns";

import { FastingWindow } from "../types";
import {
  useAppStore,
  events,
  sessions$,
  lastActiveSession$,
} from "../livestore";

const HOUR_IN_MS = 3_600_000;

interface FastSession {
  id: string;
  window: FastingWindow;
  start: Date | null;
  end: Date | null;
  isActive: boolean;
  setWindow: (window: FastingWindow) => void;
  startSession: () => void;
  endSession: () => void;
}

export interface Session {
  readonly id: string;
  readonly window: string;
  readonly startedAt: Date | null;
  readonly endedAt: Date | null;
}

interface FastContext {
  currentSession: FastSession;
  sessions: readonly Session[];
}

const FastContext = createContext<FastContext>({
  sessions: [],
  currentSession: {
    id: "0",
    window: FastingWindow.literals[0],
    start: null,
    end: null,
    isActive: false,
    setWindow: (window: FastingWindow) => {},
    startSession: () => {},
    endSession: () => {},
  },
});

export function FastProvider(props: PropsWithChildren) {
  const store = useAppStore();
  const sessions = store.useQuery(sessions$);
  const [lastActiveSession] = store.useQuery(lastActiveSession$);

  const [selectedWindow, setSelectedWindow] = useState<FastingWindow>(
    FastingWindow.literals[0],
  );

  const currentSession = useMemo(() => {
    if (!lastActiveSession?.startedAt || lastActiveSession.endedAt) {
      return {
        id: "0",
        window: selectedWindow,
        start: null,
        end: null,
        isActive: false,
      };
    }

    const window = Number(lastActiveSession.window) as FastingWindow;
    const start = new Date(lastActiveSession.startedAt);
    const end = addMilliseconds(start, window * HOUR_IN_MS);

    return {
      id: lastActiveSession.id,
      window,
      start,
      end,
      isActive: true,
    };
  }, [lastActiveSession, selectedWindow]);

  const handleSetWindow = (window: FastingWindow) => {
    setSelectedWindow(window);
  };

  const startSession = () => {
    const now = new Date();
    const id = crypto.randomUUID();

    store.commit(
      events.sessionStarted({
        id,
        startedAt: now,
        window: String(selectedWindow),
      }),
    );
  };

  const endSession = () => {
    store.commit(
      events.sessionEnded({
        id: currentSession.id,
        endedAt: new Date(),
      }),
    );
  };

  return (
    <FastContext.Provider
      value={{
        sessions,
        currentSession: {
          ...currentSession,
          setWindow: handleSetWindow,
          startSession,
          endSession,
        },
      }}
    >
      {props.children}
    </FastContext.Provider>
  );
}

// eslint-disable-next-line
export const useFastContext = () => {
  const context = useContext(FastContext);
  if (context === null) {
    throw new Error("useFastContext must be used within a FastProvider");
  }
  return context;
};
