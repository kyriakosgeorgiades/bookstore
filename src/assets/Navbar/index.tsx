import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AuthDialog from "../Dialogs/AuthDialog/AuthDialog";
import LoadingContext from "../../Context/loadingContext";
import { showToast } from "../../helpers/toastHelper";
import UserMenu from "../UserMenu/UserMenu";
import { AuthContext } from "../../Providers/AuthContext";
import { SearchContext } from "../../Providers/SearchContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState("");

  const auth = useContext(AuthContext);
  const searchContext = useContext(SearchContext);
  const { isLoading, setLoading } = useContext(LoadingContext);
  const debounceTimerRef = useRef<number | null>(null);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  if (!searchContext) {
    throw new Error("SearchContext must be used within a SearchProvider");
  }

  const { setIsAuthenticated, setUser } = auth;
  const { setSearchValue: updateSearchValue } = searchContext;

  const handleLoginRegisterClick = (event: React.MouseEvent<HTMLElement>) => {
    if (auth.isAuthenticated) {
      // if user is logged in, show the hover menu
      handleOpenMenu(event);
    } else {
      // if user is logged out, open the dialog
      setOpen(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value); // local state update

    // Update the global search value. This can be used to trigger the API call in LandingPage.
  };

  useEffect(() => {
    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new debounce timer
    debounceTimerRef.current = window.setTimeout(() => {
      // Update the global search value after a delay of 500ms
      updateSearchValue(searchValue);
    }, 500);

    // Cleanup effect on unmount or if searchValue changes before the 500ms
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchValue]);

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
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(undefined);
    handleCloseMenu(); // Close the user menu after logout
    showToast("Logged out successfully!", "info");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Book Store</Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by Book Name or Author"
            value={searchValue}
            onChange={handleSearchChange}
            sx={{
              mx: 60,
              flexGrow: 1,
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
              ".MuiInputBase-input": {
                color: "black",
              },
              backgroundColor: "white",
            }}
          />

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
      <AuthDialog open={open} onClose={handleClose} />
    </>
  );
};

export default Navbar;
