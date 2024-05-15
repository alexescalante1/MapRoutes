import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { blueGrey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import { FragmentData } from "../../../Main/Utilities/FragmentStorage/FragmentData";

const allPages = [
  { iconName: "Authentication", icon: <People /> },
  { iconName: "Database", icon: <Dns /> },
  { iconName: "Storage", icon: <PermMedia /> },
  { iconName: "Hosting", icon: <Public /> },
];

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export const AssideDashBoard = () => {
  const apps = new FragmentData(process.env.REACT_APP_KPRT ?? "").GtParttnDtLS(
    process.env.REACT_APP_CPRT ?? "",
    "IndtApp"
  );

  const pages = new FragmentData(process.env.REACT_APP_KPRT ?? "").GtParttnDtLS(
    process.env.REACT_APP_CPRT ?? "",
    "IndtPags"
  );

  const [state, setState] = React.useState({
    left: false,
  });

  const [openApp, setOpenApp] = React.useState(
    apps
      ? JSON.parse(apps)?.map((item) => {
          return {
            idApp: item?.data?.idApp,
            name: item?.data?.name,
            open: false,
          };
        })
      : []
  );

  const [dataAcc, setDataAcc] = React.useState(
    pages
      ? JSON.parse(pages)?.map((item) => {
          const iconItem = allPages.find(
            (x) => x.iconName === item?.data?.iconName
          );
          return {
            idApp: item?.data?.idApp,
            idPgs: item?.data?.idPgs,
            dadId: item?.data?.dadId,
            name: item?.data?.name,
            router: item?.data?.router,
            icon: iconItem != null ? iconItem?.icon : <Dns />,
          };
        })
      : []
  );

  const toggleDrawer = (anchor, openApp) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: openApp });
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer("left", true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? blueGrey[100] : "#022830",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Paper elevation={0} sx={{ maxWidth: 256 }}>
            <FireNav component="nav" disablePadding>
              <ListItemButton component="a" href="#customized-list">
                <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                <ListItemText
                  sx={{ my: 0 }}
                  primary="OrstedDev"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                />
              </ListItemButton>
              <Divider />
              <ListItem component="div" disablePadding>
                <ListItemButton sx={{ height: 56 }}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText
                    primary="Project Overview"
                    primaryTypographyProps={{
                      fontWeight: "medium",
                      variant: "body2",
                    }}
                  />
                </ListItemButton>
                <Tooltip title="Project Settings">
                  <IconButton size="large">
                    <Settings />
                    <ArrowRight
                      sx={{ position: "absolute", right: 4, opacity: 0 }}
                    />
                  </IconButton>
                </Tooltip>
              </ListItem>
              <Divider />

              {openApp.map((item, index) => (
                <Box key={index}>
                  <ListItemButton
                    alignItems="flex-start"
                    onClick={() =>
                      setOpenApp((e) => {
                        return e.map((x) => {
                          if (x.idApp === item.idApp) {
                            return { ...x, open: !x.open };
                          }
                          return x;
                        });
                      })
                    }
                    sx={{
                      pt: 2.5,
                    }}
                  >
                    <ListItemText
                      primary={item?.name}
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: "medium",
                        lineHeight: "20px",
                        mb: "2px",
                      }}
                      secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                      secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                      sx={{ my: 0 }}
                    />
                  </ListItemButton>

                  {openApp.find((x) => x.idApp === item.idApp)?.open &&
                    dataAcc
                      .filter((i) => i.idApp === item.idApp)
                      .map((xyz, index) => (
                        <ListItemButton
                          key={index}
                          sx={{
                            py: 0,
                            minHeight: 30,
                          }}
                        >
                          <ListItemIcon sx={{ color: "inherit" }}>
                            {xyz.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={xyz.name}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: "medium",
                            }}
                          />
                        </ListItemButton>
                      ))}
                </Box>
              ))}
            </FireNav>
          </Paper>
        </Box>
      </Drawer>
    </>
  );
};
