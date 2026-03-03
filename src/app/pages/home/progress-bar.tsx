import * as React from "react";
import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress variant="determinate" {...props} size={350} />
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
        <Typography
          variant="h6"
          sx={{ color: "text.secondary" }}
        >{`nth hours remaining`}</Typography>
      </Box>
    </Box>
  );
}

export function CircularWithValueLabel() {
  const [progress, setProgress] = React.useState(95);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 10,
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return <CircularProgressWithLabel value={progress} />;
}
