import React, { useState } from "react";
import { MapsLicencias } from "./MapsLicencias";
import { Empresas } from "./Empresas";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function RutasIndex() {
  const [actualizar, setActualizar] = useState(0);
  const ActualizarCard = async (e) => {
    e.preventDefault();
    setActualizar(actualizar + 1);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Empresas Automotoras" {...a11yProps(0)} />
            <Tab label="Rutas" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <CustomTabPanel value={value} index={0}>
          <Empresas />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MapsLicencias actualizar={actualizar} />
        </CustomTabPanel>
      </Box>
    </>
  );
}
