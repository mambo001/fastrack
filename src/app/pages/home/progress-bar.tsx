import { useEffect, useState, type ReactNode, useMemo } from "react";
import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

import { useFastContext } from "../../context";

function toPercent(timeLeft: number, window: number) {
  return Math.floor((timeLeft / (window * 3600)) * 100);
}

function useTimeLeft(end: Date | null) {
  const [timeLeft, setTimeLeft] = useState(() =>
    end ? (end.getTime() - Date.now()) / 1000 : 0,
  );

  useEffect(() => {
    setTimeLeft(end ? (end.getTime() - Date.now()) / 1000 : 0);
  }, [end]);

  useEffect(() => {
    if (!end) return;
    const timerId = setInterval(() => {
      const remaining = (end.getTime() - Date.now()) / 1000;
      setTimeLeft(remaining <= 0 ? 0 : remaining);
      if (remaining <= 0) clearInterval(timerId);
    }, 1000);
    return () => clearInterval(timerId);
  }, [end]);

  return timeLeft;
}

export function CircularWithValueLabel() {
  const { currentSession } = useFastContext();
  const { end, window, isActive } = currentSession;
  const timeLeft = useTimeLeft(end);

  const progressValue = useMemo(() => {
    return isActive ? toPercent(timeLeft, window) - 100 : 0;
  }, [isActive, timeLeft, window]);

  return (
    <CircularProgressWithLabel
      value={progressValue}
      label={
        isActive ? (
          <Countdown timeLeft={timeLeft} window={window} />
        ) : (
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            [time] since your last fast
          </Typography>
        )
      }
    />
  );
}

type CircularProgressWithLabelProps = CircularProgressProps & {
  value: number;
  label: ReactNode;
};

function CircularProgressWithLabel({
  value,
  label,
  ...props
}: CircularProgressWithLabelProps) {
  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        {...props}
        variant="determinate"
        size={350}
        value={value}
        enableTrackSlot
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label}
      </Box>
    </Box>
  );
}

function Countdown({ timeLeft, window }: { timeLeft: number; window: number }) {
  const formattedTimeLeft = useMemo(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = Math.floor(timeLeft % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  return (
    <Stack alignItems={"center"}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Remaining ({toPercent(timeLeft, window)}%)
      </Typography>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        {formattedTimeLeft}
      </Typography>
    </Stack>
  );
}
