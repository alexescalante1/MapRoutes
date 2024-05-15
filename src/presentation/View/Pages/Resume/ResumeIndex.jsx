import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { GenFirebaseServiceCls } from "../../../../Infra/Firebase";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function ResumeIndex() {
  const [reload, setReload] = useState();
  const [myImg, setMyImg] = useState();

  const subirData = async (e) => {
    e.preventDefault();
    // console.log(e.target.files[0]);
    const res = await GenFirebaseServiceCls.UploadFileBlob(
      e.target.files[0],
      "Img/",
      "Perfil"
    );
    setMyImg(res);
    console.log(res);
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                width: "100%",
                height: "700px",
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onChange={(e) => subirData(e)}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
              <br />
              <img src={myImg} alt="" />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
