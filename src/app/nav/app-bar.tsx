import * as React from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Container,
  Slide,
} from "@mui/material";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

export function AppBar(props: React.PropsWithChildren) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <MUIAppBar>
          {/* <Toolbar variant="dense"> */}
          <Toolbar>
            <Typography variant="h6" component="div">
              fastrack
            </Typography>
          </Toolbar>
        </MUIAppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>{props.children}</Container>
    </React.Fragment>
  );
}
