import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AuthDialog from '../Dialogs/AuthDialog/AuthDialog';
import LoadingContext from '../../Context/loadingContext';
import { showToast } from '../../helpers/toastHelper';
import UserMenu from '../UserMenu/UserMenu';
import { AuthContext } from '../../Providers/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const auth = useContext(AuthContext);
  const { isLoading, setLoading } = useContext(LoadingContext);
  

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  const { setIsAuthenticated, setUser } = auth;

  const handleLoginRegisterClick = (event: React.MouseEvent<HTMLElement>) => {
    if (auth.isAuthenticated) {
      // if user is logged in, show the hover menu
      handleOpenMenu(event);
    } else {
      // if user is logged out, open the dialog
      setOpen(true);
    }
  };
  
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Remove JWT from local storage
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setUser(undefined);
    handleCloseMenu();  // Close the user menu after logout
    showToast("Logged out successfully!", "info");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Book Store
          </Typography>
          <IconButton color="inherit" onClick={handleLoginRegisterClick}>
  <AccountCircle />
</IconButton>

<UserMenu
  anchorEl={anchorEl}
  onClose={handleCloseMenu}
  onLogout={handleLogout}
/>

        </Toolbar>
      </AppBar>

      {/* Login/Register Dialog */}
      <AuthDialog open={open} onClose={handleClose} />
    </>
  );
};

export default Navbar;
