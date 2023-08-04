import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
interface UserMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, onClose, onLogout }) => {
  const open = Boolean(anchorEl);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Button onClick={onLogout}>Logout</Button>
    </Popover>
  );
};

export default UserMenu;
