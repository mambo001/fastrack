import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

import { SplitButton } from "./split-button";
import { CircularWithValueLabel } from "./progress-bar";
import { useFastContext } from "../../context";

export function Home() {
  const fastContext = useFastContext();

  const handleStartFastingClick = () => {
    fastContext.startSession();
  };

  const handleStopFastingClick = () => {
    fastContext.endSession();
  };

  return (
    <Container
      sx={{
        flex: 1,
        maxWidth: {
          xs: "100%",
          sm: "500px",
          md: "750px",
          lg: "800px",
          xl: "800px",
        },
      }}
    >
      <Stack marginTop={6} paddingBottom={4} gap={2}>
        <Typography>{JSON.stringify(fastContext || "", null, 2)}</Typography>
        <Typography>
          {JSON.stringify(
            {
              startHours: fastContext.start
                ? format(fastContext.start || new Date(), "MMMM dd, HH:mm:ss")
                : "NA",
              endHours: fastContext.end
                ? format(fastContext.end || new Date(), "MMMM dd, HH:mm:ss")
                : "NA",
            },
            null,
            2,
          )}
        </Typography>
        <Card
          sx={{
            maxWidth: 600,
            flex: 1,
          }}
        >
          <CardHeader action={<SplitButton />} />
          <CardContent
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <CircularWithValueLabel />
            </Box>
          </CardContent>
          <CardActions sx={{ py: 4, justifyContent: "center" }}>
            {!fastContext.isActive ? (
              <Button variant="contained" onClick={handleStartFastingClick}>
                Start Fasting
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleStopFastingClick}
              >
                Stop Fasting
              </Button>
            )}
          </CardActions>
        </Card>
      </Stack>
    </Container>
  );
}
