import { StoreRegistry } from "@livestore/livestore";
import { StoreRegistryProvider } from "@livestore/react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";

import {
  CircularWithValueLabel,
  Footer,
  Header,
  MainSection,
  SimpleBottomNavigation,
} from "./components";
import { AppBar } from "./nav";
import { Button, Card, CardContent, Stack } from "@mui/material";

const errorBoundaryFallback = <div>Something went wrong</div>;
const suspenseFallback = <div>Loading app...</div>;

export function AppInternal() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Card
          sx={{
            minWidth: 600,
            maxWidth: 600,
          }}
        >
          <CardContent>
            <Stack alignItems={"center"} gap={2}>
              <Button
                sx={{
                  alignSelf: "flex-end",
                  borderRadius: 25
                }}
                color="secondary"
                variant="outlined"
              >
                24
              </Button>
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <CircularWithValueLabel />
              </Box>
              <Button variant="contained">Start Fasting</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <SimpleBottomNavigation />
    </Box>
  );
}

export function App() {
  const [storeRegistry] = useState(() => new StoreRegistry());

  return (
    <ErrorBoundary fallback={errorBoundaryFallback}>
      <Suspense fallback={suspenseFallback}>
        <StoreRegistryProvider storeRegistry={storeRegistry}>
          <AppInternal />
        </StoreRegistryProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
