import { useEffect, useState, type ReactNode, useMemo } from "react";
import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

import { useFastContext } from "../../context";

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
      <CircularProgress variant="determinate" size={350} value={value} />
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

export function CircularWithValueLabel() {
  const { start, end, isActive } = useFastContext();
  const [progress, setProgress] = useState(95);

  // useEffect(() => {
  //   if (!isActive) {
  //     setProgress(100);
  //     return;
  //   }
  //   const timerId = setInterval(() => {
  //     setProgress((durationSeconds / (16 * 60 * 60)) * 100);
  //   }, 1000);
  //   return () => clearInterval(timerId);
  // }, [durationSeconds, isActive]);

  return (
    <CircularProgressWithLabel
      value={progress}
      label={
        isActive ? (
          <Countdown />
        ) : (
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            [time] since your last fast
          </Typography>
        )
      }
    />
  );
}

function Countdown() {
  const { end, start, window } = useFastContext();
  const [timeLeft, setTimeLeft] = useState(() =>
    end ? (end.getTime() - Date.now()) / 1000 : 0,
  );

  useEffect(() => {
    if (!end) return;

    const timerId = setInterval(() => {
      const remaining = (end.getTime() - Date.now()) / 1000;
      if (remaining <= 0) {
        clearInterval(timerId);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [end]);

  const timeRemainingPercentage = window
    ? Math.floor((timeLeft / (window * 3600)) * 100)
    : 0;

  const formattedTimeLeft = useMemo(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = Math.floor(timeLeft % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((t: number) => {
        if (t <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <Stack alignItems={"center"}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Remaining ({timeRemainingPercentage}%)
      </Typography>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        {formattedTimeLeft}
      </Typography>
    </Stack>
  );
}
