import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Box,
} from "@mui/material";

import { SplitButton } from "./split-button";
import { CircularWithValueLabel } from "./progress-bar";

export function Home() {
  return (
    <Box
      sx={{
        flex: 1,
        padding: 4,
        mt: 6,
      }}
    >
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
          <Button variant="contained">Start Fasting</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
