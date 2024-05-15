import React, { useState } from "react";
import { Alertas } from "../../../GenComponents";
import {
  Button,
  CardContent,
  TextField,
  Typography,
  Divider,
  Link,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import GoogleIcon from "@mui/icons-material/Google";
import { InicializacionUseCase } from "../../../../Data";
import { useGlobalContext } from "../.././../../GlobalContext";
import { useFormik } from "formik";
import * as yup from "yup";

export const LoginPage = ({ handleSwitch }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { dispatch } = useGlobalContext();

  //=======================================
  // VALIDATORS
  //=======================================

  const objUsuario = {
    cEmail: "",
    cPassword: "",
  };

  const validationSchema = yup.object({
    cEmail: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    cPassword: yup
      .string()
      .required("La contraseña es requerida")
      .min(6, "Requiere una contraseña minima de 6 letras"),
  });

  //=======================================
  // CONSTRUCTOR FORMIK
  //=======================================

  const formik = useFormik({
    initialValues: objUsuario,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      LoginUsuario(values);
    },
  });

  //=======================================
  // SUBMIT
  //=======================================

  const LoginUsuario = async (values) => {
    Alertas("info", "Procesando...");
    try {
      const objData = await new InicializacionUseCase().LoginAuth({
        cEmail: values.cEmail,
        cPassword: values.cPassword,
      });

      if (objData.success === 1) {
        await new InicializacionUseCase().GetInitConfig();
        Alertas("success", objData.message);
        dispatch({
          type: "UPDATE_STATE",
          payload: { loginDate: new Date().toISOString() },
        });
      } else {
        Alertas("error", objData.message);
      }
    } catch (e) {
      Alertas("error", e.message);
    }
  };

  const LoginGoogle = async (e) => {
    e.preventDefault();
    try {
      const objData = await new InicializacionUseCase().LoginGoogleAuth();
      if (objData.success === 1) {
        await new InicializacionUseCase().GetInitConfig();
        Alertas("success", objData.message);
        dispatch({
          type: "UPDATE_STATE",
          payload: { loginDate: new Date().toISOString() },
        });
      } else {
        Alertas("error", objData.message);
      }
    } catch (e) {
      Alertas("error", e.message);
    }
  };

  const ResetPass = async (e) => {
    e.preventDefault();
    try {
      const objData = await new InicializacionUseCase().ResetPass({
        cEmail: formik.values?.cEmail,
      });
      console.log(objData);
      if (objData.success === 1) {
        Alertas("success", objData.message);
      } else {
        Alertas("error", objData.message);
      }
    } catch (e) {
      Alertas("error", e.message);
    }
  };

  return (
    <>
      <CardContent>
        <Typography
          variant="h4"
          noWrap
          align="center"
          href="/"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 1000,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
            userSelect: "none",
          }}
        >
          ORSTED DEV
        </Typography>
        <Divider />

        <Typography
          align="center"
          href="/"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 1000,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
            userSelect: "none",
          }}
        >
          Plataforma integral para impulsar la innovación con eficiencia y un
          diseño técnico distintivo
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="cEmail"
            name="cEmail"
            label="E-mail"
            variant="standard"
            type="text"
            value={formik.values?.cEmail}
            onChange={formik.handleChange}
            error={formik.touched?.cEmail && Boolean(formik.errors?.cEmail)}
            helperText={formik.touched?.cEmail && formik.errors?.cEmail}
          />

          <FormControl
            fullWidth
            variant="standard"
            error={
              formik.touched?.cPassword && Boolean(formik.errors?.cPassword)
            }
          >
            <InputLabel htmlFor="cPassword">Password</InputLabel>
            <Input
              id="cPassword"
              name="cPassword"
              type={showPassword ? "text" : "password"}
              value={formik.values?.cPassword}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>
              {formik.touched?.cPassword && formik.errors?.cPassword}
            </FormHelperText>
          </FormControl>

          <Button
            fullWidth
            sx={{ marginBottom: "10px", marginTop: "15px" }}
            color="primary"
            variant="contained"
            type="submit"
            endIcon={<LoginIcon />}
          >
            LogIn
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "-20px",
            }}
          >
            <Link
              sx={{ cursor: "pointer", paddingBottom: "10px" }}
              onClick={ResetPass}
              underline="none"
            >
              {"Forgot Password?"}
            </Link>
            <Link
              sx={{ cursor: "pointer", paddingBottom: "10px" }}
              onClick={() => handleSwitch(1)}
              underline="none"
            >
              {"Registrar"}
            </Link>
          </div>
        </form>
      </CardContent>
      <Divider />
      <CardContent>
        Don't have an Account
        <Button
          fullWidth
          variant="outlined"
          size="small"
          endIcon={<GoogleIcon />}
          onClick={LoginGoogle}
        >
          Google Login
        </Button>
      </CardContent>
    </>
  );
};
