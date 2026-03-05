import * as React from "react";
import MUIBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate, useLocation } from "react-router";
import { Paper } from "@mui/material";

import { useAppStore } from "../../livestore";

export function BottomNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { clientId } = useAppStore();

  const value = pathname === "/" ? 0 : 1;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate("/");
    if (newValue === 1) navigate(`/profile/${clientId}`);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <MUIBottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Today"
          icon={<TripOriginOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Me"
          icon={<AccountCircleOutlinedIcon />}
        />
      </MUIBottomNavigation>
    </Paper>
  );
}
