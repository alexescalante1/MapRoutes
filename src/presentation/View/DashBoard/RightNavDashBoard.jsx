import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { FullscreenButton } from "./FullPageButton";
import { DarkModeButton } from "./DarkModeButton";
import { useGlobalContext } from "./../../../GlobalContext";
import { Alertas } from "../../GenComponents";
import { InicializacionUseCase } from "../../../Data";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ContactsIcon from "@mui/icons-material/Contacts";
import Avatar from "@mui/material/Avatar";

export const RightNavDashBoard = () => {
  const FrUsrtU = new FragmentData(process.env.REACT_APP_KPRT).GtParttnDtLS(
    process.env.REACT_APP_CPRT,
    "UsrtU"
  );

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { dispatch } = useGlobalContext();
  const [imagenCargada, setImagenCargada] = useState(true);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const photoURL =
    "https://firebasestorage.googleapis.com/v0/b/mypersonalapp-e743e.appspot.com/o/Img%2FPerfil?alt=media&token=32d0b9a7-e03c-478d-a344-69ce20d36613"; //FrUsrtU ? JSON.parse(FrUsrtU)?.photoURL : "";

  const handleImagenCargada = () => {
    setImagenCargada(true);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const salir = async (e) => {
    try {
      const objData = await new InicializacionUseCase().OnLogoutAuth();

      if (objData.success === 1) {
        dispatch({
          type: "UPDATE_STATE",
          payload: { loginDate: new Date().toISOString() },
        });
      }
    } catch (e) {
      Alertas("error", e.message);
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <InsertEmoticonIcon />
        <Typography>Profile</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ContactsIcon />
        <Typography>Contactos</Typography>
      </MenuItem>
      <MenuItem onClick={salir} sx={{ color: "red" }}>
        <ExitToAppIcon />
        <Typography>LogOut</Typography>
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {imagenCargada ? (
            <Avatar
              sx={{ width: 25, height: 25 }}
              alt="Remy Sharp"
              src={photoURL}
              onLoad={handleImagenCargada}
            />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <FullscreenButton />
        <DarkModeButton />
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="success">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          {imagenCargada ? (
            <Avatar
              sx={{ width: 25, height: 25 }}
              alt="Remy Sharp"
              src={photoURL}
              onLoad={handleImagenCargada}
            />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
};
