import { StoreRegistry } from "@livestore/livestore";
import { StoreRegistryProvider } from "@livestore/react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";

import {
  CircularWithValueLabel,
  SimpleBottomNavigation,
  SplitButton,
} from "./components";
import { AppBar } from "./nav";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";

const errorBoundaryFallback = <div>Something went wrong</div>;
const suspenseFallback = <div>Loading app...</div>;

export function AppInternal() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar />
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
