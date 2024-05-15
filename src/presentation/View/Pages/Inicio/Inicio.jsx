import React, { useState } from "react";
import { ParticlesContent } from "../../../GenComponents/Particles/Particles";

import { Card, Grid } from "@mui/material";
import { LoginPage } from "./Login";
import { RegisterPage } from "./Register";

export const InicioPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleSwitch = (index) => {
    setCurrentPage(index);
  };

  const pages = [
    <LoginPage handleSwitch={handleSwitch} />,
    <RegisterPage handleSwitch={handleSwitch} />,
  ];

  return (
    <>
      <ParticlesContent>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ zIndex: 1, height: "80vh" }}
        >
          <Card sx={{ maxWidth: 350, margin: "30px" }}>
            {pages[currentPage]}
          </Card>
        </Grid>
      </ParticlesContent>
    </>
  );
};
