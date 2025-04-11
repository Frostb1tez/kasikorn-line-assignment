import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

interface AccountMenuProps {
  isMainAccount: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ isMainAccount }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMenuClick} sx={{ color: "text.white" }}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
        {isMainAccount && (
          <MenuItem onClick={handleMenuClose}>Set main account</MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>Copy account number</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Name and Color</MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
