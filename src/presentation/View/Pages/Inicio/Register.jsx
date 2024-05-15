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
import { InicializacionUseCase } from "../../../../Data";
import { useFormik } from "formik";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const RegisterPage = ({ handleSwitch }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //=======================================
  // VALIDATORS
  //=======================================

  const objUsuario = {
    cEmail: "",
    cPassword: "",
    cDocumento: "",
    cNombres: "",
    cApellidos: "",
    cCelular: "",
    cDireccion: "",
    cGenero: "",
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
    cDocumento: yup
      .string()
      .required("El Dni es requerido")
      .min(8, "Documento Invalido")
      .max(8, "Llego al limite de caracteres"),
    cNombres: yup
      .string()
      .min(3, "Requiere minimo de 3 letras")
      .required("El nombre es requerido"),
    cApellidos: yup
      .string()
      .min(3, "Requiere minimo de 3 letras")
      .required("El Apellido es requerido")
      .max(50, "Llego al limite de caracteres"),
    cCelular: yup
      .string()
      .min(9, "Numero Invalido")
      .max(9, "Llego al limite de caracteres")
      .required("El Numero es requerido"),
    cDireccion: yup
      .string()
      .min(5, "Requiere minimo de 5 letras")
      .required("La Direccion es requerido"),
    cGenero: yup
      .string()
      .required("Seleccione un Genero")
      .min(1, "Seleccione un Genero"),
  });

  //=======================================
  // CONSTRUCTOR FORMIK
  //=======================================

  const formik = useFormik({
    initialValues: objUsuario,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      RegistrarUsuario(values);
    },
  });

  //=======================================
  // SUBMIT
  //=======================================

  const RegistrarUsuario = async (values) => {
    try {
      const objData = await new InicializacionUseCase().SetUserAuth({
        cEmail: values.cEmail,
        cPassword: values.cPassword,
        cDocumento: values.cDocumento,
        cNombres: values.cNombres,
        cApellidos: values.cApellidos,
        cCelular: values.cCelular,
        cDireccion: values.cDireccion,
        cGenero: values.cGenero,
      });

      if (objData.success === 1) {
        Alertas("success", objData.message);
        handleSwitch(0);
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
            paddingBottom: "10px",
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
          REGISTRO DE USUARIO
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

          <TextField
            fullWidth
            id="cDocumento"
            name="cDocumento"
            label="Número de Documento"
            variant="standard"
            type="number"
            value={formik.values?.cDocumento}
            onChange={formik.handleChange}
            error={
              formik.touched?.cDocumento && Boolean(formik.errors?.cDocumento)
            }
            helperText={formik.touched?.cDocumento && formik.errors?.cDocumento}
          />

          <TextField
            fullWidth
            id="cNombres"
            name="cNombres"
            label="Nombres"
            variant="standard"
            type="text"
            value={formik.values?.cNombres}
            onChange={formik.handleChange}
            error={formik.touched?.cNombres && Boolean(formik.errors?.cNombres)}
            helperText={formik.touched?.cNombres && formik.errors?.cNombres}
          />

          <TextField
            fullWidth
            id="cApellidos"
            name="cApellidos"
            label="Apellidos"
            variant="standard"
            type="text"
            value={formik.values?.cApellidos}
            onChange={formik.handleChange}
            error={
              formik.touched?.cApellidos && Boolean(formik.errors?.cApellidos)
            }
            helperText={formik.touched?.cApellidos && formik.errors?.cApellidos}
          />

          <TextField
            fullWidth
            id="cCelular"
            name="cCelular"
            label="Celular"
            variant="standard"
            type="number"
            value={formik.values?.cCelular}
            onChange={formik.handleChange}
            error={formik.touched?.cCelular && Boolean(formik.errors?.cCelular)}
            helperText={formik.touched?.cCelular && formik.errors?.cCelular}
          />

          <TextField
            fullWidth
            id="cDireccion"
            name="cDireccion"
            label="Dirección"
            variant="standard"
            type="text"
            value={formik.values?.cDireccion}
            onChange={formik.handleChange}
            error={
              formik.touched?.cDireccion && Boolean(formik.errors?.cDireccion)
            }
            helperText={formik.touched?.cDireccion && formik.errors?.cDireccion}
          />

          <FormControl
            fullWidth
            variant="standard"
            error={formik.touched?.cGenero && Boolean(formik.errors?.cGenero)}
          >
            <InputLabel htmlFor="cGenero">Género</InputLabel>
            <Select
              fullWidth
              id="cGenero"
              name="cGenero"
              value={formik.values?.cGenero}
              onChange={formik.handleChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
            <FormHelperText
              error={formik.touched?.cGenero && Boolean(formik.errors?.cGenero)}
            >
              {formik.touched?.cGenero && formik.errors?.cGenero}
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
            REGISTRAR
          </Button>

          <Link
            sx={{ cursor: "pointer", paddingBottom: "10px" }}
            onClick={() => handleSwitch(0)}
            underline="none"
          >
            {"Regresar al Login"}
          </Link>
        </form>
      </CardContent>
    </>
  );
};
