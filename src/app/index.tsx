import { HashRouter, Outlet, Route, Routes } from "react-router";
import { StoreRegistry } from "@livestore/livestore";
import { StoreRegistryProvider } from "@livestore/react";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";

import { BottomNavigation } from "./components";
import { AppBar } from "./nav";
import { Home, Profile } from "./pages";
import { FastProvider } from "./context";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./theme";

const errorBoundaryFallback = <div>Something went wrong</div>;
const suspenseFallback = <div>Loading app...</div>;

function AppLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar />
      <Outlet />
      <BottomNavigation />
    </Box>
  );
}

export function AppInternal() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/profile/:profileId" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export function App() {
  const [storeRegistry] = useState(() => new StoreRegistry());

  return (
    <ErrorBoundary fallback={errorBoundaryFallback}>
      <Suspense fallback={suspenseFallback}>
        <StoreRegistryProvider storeRegistry={storeRegistry}>
          <HashRouter>
            <FastProvider>
              <ThemeProvider theme={appTheme}>
                <AppInternal />
              </ThemeProvider>
            </FastProvider>
          </HashRouter>
        </StoreRegistryProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
