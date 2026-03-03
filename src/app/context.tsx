import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import { FastingWindow } from "../types";

interface FastSession {
  window: FastingWindow;
  start: Date | null;
  end: Date | null;
  setWindow: (window: FastingWindow) => void;
}

const fastSession = {
  window: FastingWindow.literals[0],
  start: null,
  end: null,
  setWindow: (window: FastingWindow) => {},
};

const FastContext = createContext<FastSession | null>(fastSession);

export function FastProvider(props: PropsWithChildren) {
  const [window, setWindow] = useState<FastingWindow>(fastSession.window);
  const handleSetWindow = (window: FastingWindow) => {
    setWindow(window);
  };
  return (
    <FastContext.Provider
      value={{ ...fastSession, window, setWindow: handleSetWindow }}
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
