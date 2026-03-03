import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { addMilliseconds } from "date-fns";

import { FastingWindow } from "../types";

interface FastSession {
  window: FastingWindow;
  start: Date | null;
  end: Date | null;
  isActive: boolean;
  setWindow: (window: FastingWindow) => void;
  startSession: () => void;
  endSession: () => void;
}

const defaultFastSession = {
  window: FastingWindow.literals[0],
  start: null,
  end: null,
  isActive: false,
  setWindow: (window: FastingWindow) => {},
  startSession: () => {},
  endSession: () => {},
};

const FastContext = createContext<FastSession>(defaultFastSession);

export function FastProvider(props: PropsWithChildren) {
  const [fastSession, setFastSession] = useState<FastSession>({
    ...defaultFastSession,
  });

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
    setFastSession({
      ...fastSession,
      start: now,
      end: endDate,
    });
  };

  const endSession = () => {
    // TODO: implement end session logic
    // const now = new Date();
    // const milliseconds = selectedWindow * 3600000;
    // const endDate = addMilliseconds(now, milliseconds);
    setFastSession(defaultFastSession);
  };

  return (
    <FastContext.Provider
      value={{
        ...fastSession,
        setWindow: handleSetWindow,
        isActive,
        startSession,
        endSession,
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
