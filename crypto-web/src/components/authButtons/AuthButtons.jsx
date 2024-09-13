import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export const AuthButtons = () => {
  const { activeUser, currentUser, logoutUser } = useContext(AuthContext);
  // console.log(currentUser);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logoutUser();
    navigate("/");
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle sx={{ fontSize: 32 }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {activeUser ? (
            <div>
              <Link to="/profile">
                <MenuItem sx={{borderBottom:"1px solid #989898"}} onClick={handleClose}>{currentUser?.name}</MenuItem>
              </Link>
              <Link to="/favorites">
                <MenuItem onClick={handleClose}>Favoritos</MenuItem>
              </Link>
              <MenuItem onClick={handleLogOut}>Cerrar sesión</MenuItem>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <MenuItem onClick={handleClose}>Ingresar</MenuItem>
              </Link>
              <Link to="/register">
                <MenuItem onClick={handleClose}>registrarse</MenuItem>
              </Link>
            </div>
          )}
        </Menu>
      </Toolbar>
    </Box>
  );
};
