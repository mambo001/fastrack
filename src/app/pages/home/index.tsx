import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Box,
  Container,
  Stack,
} from "@mui/material";

import { SplitButton } from "./split-button";
import { CircularWithValueLabel } from "./progress-bar";

export function Home() {
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
        <Card
          sx={{
            maxWidth: 600,
            flex: 1,
            backgroundColor: "blue",
          }}
        >
          <CardHeader action={<SplitButton />} />
          <CardContent
            sx={{
              backgroundColor: "red",
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
      </Stack>
    </Container>
  );
}
