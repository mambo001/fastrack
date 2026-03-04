import { Card, CardContent, Container, Stack, Typography } from "@mui/material";

import { sessions$, useAppStore } from "../../../livestore";
import { FastingSessionsTable } from "./table";

export function Profile() {
  const store = useAppStore();
  const sessions = store.useQuery(sessions$);
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
        <Typography variant="h6">Recent sessions</Typography>
        <FastingSessionsTable />
      </Stack>
    </Container>
  );
}
