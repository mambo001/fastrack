import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { addMilliseconds } from "date-fns";

import { FastingWindow } from "../types";
import { useAppStore, events, sessions$, schema } from "../livestore";

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

const defaultFastSession = {
  id: "0",
  window: FastingWindow.literals[0],
  start: null,
  end: null,
  isActive: false,
  setWindow: (window: FastingWindow) => {},
  startSession: () => {},
  endSession: () => {},
};

interface FastContext {
  currentSession: FastSession;
  sessions: Session[];
}

const FastContext = createContext<FastContext>({
  sessions: [],
  currentSession: defaultFastSession,
});

export function FastProvider(props: PropsWithChildren) {
  const [fastSession, setFastSession] = useState<FastSession>({
    ...defaultFastSession,
  });
  const store = useAppStore();

  const sessions = store.useQuery(sessions$);

  const handleSetWindow = (window: FastingWindow) => {
    setFastSession({
      ...fastSession,
      window,
    });
  };

  const isActive = fastSession.start !== null;

  const startSession = () => {
    const now = new Date();
    const milliseconds = fastSession.window * 3600000;
    const endDate = addMilliseconds(now, milliseconds);
    const id = crypto.randomUUID();

    setFastSession({
      ...fastSession,
      id,
      start: now,
      end: endDate,
    });

    store.commit(
      events.sessionStarted({
        id,
        startedAt: now,
        window: String(fastSession.window),
      }),
    );
  };

  const endSession = () => {
    const now = new Date();

    setFastSession({ ...defaultFastSession, window: fastSession.window });

    store.commit(
      events.sessionEnded({
        id: fastSession.id,
        endedAt: now,
      }),
    );
  };

  return (
    <FastContext.Provider
      value={{
        sessions: sessions.map((session) => ({
          id: session.id,
          window: session.window,
          startedAt: session.startedAt,
          endedAt: session.endedAt,
        })),
        currentSession: {
          ...fastSession,
          setWindow: handleSetWindow,
          isActive,
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
