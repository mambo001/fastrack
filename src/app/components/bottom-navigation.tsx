import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Today" icon={<TripOriginOutlinedIcon />} />
      <BottomNavigationAction label="Me" icon={<AccountCircleOutlinedIcon />} />
    </BottomNavigation>
  );
}
