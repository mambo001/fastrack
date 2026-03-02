import * as React from "react";
import MUIBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate, useLocation } from "react-router";
import { useQuery } from "@livestore/react";

// import { queries } from "../store";

export function BottomNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const { profileId } = useQuery(queries.profile());
  const profileId = "123";

  const value = pathname === "/" ? 0 : 1;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate("/");
    if (newValue === 1) navigate(`/profile/${profileId}`);
  };

  return (
    <MUIBottomNavigation showLabels value={value} onChange={handleChange}>
      <BottomNavigationAction label="Today" icon={<TripOriginOutlinedIcon />} />
      <BottomNavigationAction label="Me" icon={<AccountCircleOutlinedIcon />} />
    </MUIBottomNavigation>
  );
}
