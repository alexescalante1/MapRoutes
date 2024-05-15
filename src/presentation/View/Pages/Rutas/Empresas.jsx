import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Alertas, GenDataTable } from "../../../GenComponents";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import { RutasEmpresaUseCase } from "../../../../Data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Empresas() {
  const [open, setOpen] = React.useState(false);
  const [actualizar, setActualizar] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //=======================================
  // VALIDATORS
  //=======================================

  const objUsuario = {
    cNombre: "",
    cRucEmpresa: "",
    cDireccion: "",
    cCelular: "",
    cTipoEmpresa: "",
  };

  const validationSchema = yup.object({
    cNombre: yup
      .string()
      .min(3, "Requiere minimo de 3 letras")
      .required("El nombre es requerido"),
    cRucEmpresa: yup
      .string()
      .min(11, "Numero Invalido")
      .max(11, "Llego al limite de caracteres")
      .required("El Número es requerido"),
    cDireccion: yup
      .string()
      .min(5, "Requiere minimo de 5 letras")
      .required("La Dirección es requerida"),
    cCelular: yup
      .string()
      .min(9, "Numero Invalido")
      .max(9, "Llego al limite de caracteres")
      .required("El Número es requerido"),
    cTipoEmpresa: yup
      .string()
      .required("Seleccione un tipo")
      .min(1, "Seleccione un tipo"),
  });

  //=======================================
  // CONSTRUCTOR FORMIK
  //=======================================

  const formik = useFormik({
    initialValues: objUsuario,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      RegistrarEmpresa(values);
      resetForm();
    },
  });

  //=======================================
  // SUBMIT
  //=======================================

  const RegistrarEmpresa = async (values) => {
    setOpen(false);
    try {
      const objData = await new RutasEmpresaUseCase().SetNewEmpresa({
        cNombre: values.cNombre,
        cRucEmpresa: values.cRucEmpresa,
        cDireccion: values.cDireccion,
        cTipoEmpresa: values.cTipoEmpresa,
        cCelular: values.cCelular,
        lEstado: true,
        arrCoordenada: "",
      });
      if (objData.success === 1) {
        Alertas("success", objData.message);
        setActualizar(values.cNombre);
      } else {
        Alertas("error", objData.message);
      }
    } catch (e) {
      Alertas("error", e.message);
    }
  };

  //=======================================
  // EMPRESAS
  //=======================================
  const columns = [
    {
      name: <SettingsSuggestIcon />,
      idName: "Actions",
      selector: (row) => row?.Actions,
      width: "50px",
      center: true,
    },
    {
      name: "NOMBRE",
      idName: "cNombre",
      selector: (row) => row?.cNombre,
      cell: (row) => <div>{row?.cNombre}</div>,
      minWidth: "200px",
      compact: true,
      sortable: true,
      grow: 3,
    },
    {
      name: "RUC",
      idName: "cRucEmpresa",
      selector: (row) => row?.cRucEmpresa,
      cell: (row) => <div>{row?.cRucEmpresa}</div>,
      maxWidth: "100px",
      compact: true,
    },
    {
      name: "DIRECCIÓN",
      idName: "cDireccion",
      selector: (row) => row?.cDireccion,
      cell: (row) => <div>{row?.cDireccion}</div>,
    },
    {
      name: "TIPO EMPRESA",
      idName: "cTipoEmpresa",
      selector: (row) => row?.cTipoEmpresa,
      cell: (row) => <div>{row?.cTipoEmpresa}</div>,
      compact: true,
      center: true,
    },
    {
      name: "CEL.",
      idName: "cCelular",
      selector: (row) => row?.cCelular,
      width: "80px",
      compact: true,
      center: true,
    },
    {
      name: "ESTADO",
      idName: "lEstado",
      selector: (row) => row?.lEstado,
      width: "70px",
      center: true,
    },
  ];

  const [dataRows, setdataRows] = useState([]);

  const deleteEmpresa = async (id) => {
    try {
      const res = await new RutasEmpresaUseCase().DeleteEmpresa(id);
      if (res === true) {
        Alertas("success", "La empresa se ha eliminado!");
        setActualizar(id);
      } else {
        Alertas("error", "Ups. Ocurrio un problema...");
      }
    } catch (error) {
      Alertas("error", error.message);
    }
  };

  //============================
  //CARGAR DATA TABLE INICIAL
  //============================

  const ObternerData = async (e) => {
    try {
      const objData = await new RutasEmpresaUseCase().GetAllEmpresas();
      if (objData?.success === 1) {
        const rows = [];
        objData?.data.forEach((items) => {
          rows.push({
            Actions: (
              <>
                <div
                  style={{
                    color: "white",
                    background: "red",
                    borderRadius: "5px",
                    padding: "3px",
                    cursor: "pointer",
                  }}
                  onClick={async () => deleteEmpresa(items?.id)}
                >
                  <DeleteIcon />
                </div>
              </>
            ),
            cNombre: items?.cNombre,
            cRucEmpresa: items?.cRucEmpresa,
            cDireccion: items?.cDireccion,
            cTipoEmpresa: items?.cTipoEmpresa,
            cCelular: items?.cCelular,
            lEstado:
              items?.lEstado == true ? (
                <div
                  style={{
                    background: "green",
                    color: "white",
                    borderRadius: "5px",
                    padding: "3px",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  Vigente
                </div>
              ) : (
                <div
                  style={{
                    background: "red",
                    color: "white",
                    borderRadius: "5px",
                    padding: "3px",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  Baja
                </div>
              ),
          });
        });
        setdataRows(rows);
      } else {
        Alertas("error", objData?.message);
      }
    } catch (error) {
      Alertas("error", error.message);
    }
  };

  useEffect(() => {
    ObternerData();
  }, [actualizar]);

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        REGISTRAR EMPRESA
      </Button>

      <GenDataTable columns={columns} data={dataRows} />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="xs"
      >
        <DialogTitle>{"Registro de Empresas"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="cNombre"
              name="cNombre"
              label="Nombres"
              variant="standard"
              type="text"
              value={formik.values?.cNombre}
              onChange={formik.handleChange}
              error={formik.touched?.cNombre && Boolean(formik.errors?.cNombre)}
              helperText={formik.touched?.cNombre && formik.errors?.cNombre}
            />

            <TextField
              fullWidth
              id="cRucEmpresa"
              name="cRucEmpresa"
              label="Ruc"
              variant="standard"
              type="number"
              inputProps={{ maxLength: 11 }}
              value={formik.values?.cRucEmpresa}
              onChange={(e) => {
                if (e.target.value.length <= 11) {
                  formik.handleChange(e);
                }
              }}
              error={
                formik.touched?.cRucEmpresa &&
                Boolean(formik.errors?.cRucEmpresa)
              }
              helperText={
                formik.touched?.cRucEmpresa && formik.errors?.cRucEmpresa
              }
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
              helperText={
                formik.touched?.cDireccion && formik.errors?.cDireccion
              }
            />

            <TextField
              fullWidth
              id="cCelular"
              name="cCelular"
              label="Celular"
              variant="standard"
              type="number"
              inputProps={{ maxLength: 9 }}
              value={formik.values?.cCelular}
              onChange={(e) => {
                if (e.target.value.length <= 9) {
                  formik.handleChange(e);
                }
              }}
              error={
                formik.touched?.cCelular && Boolean(formik.errors?.cCelular)
              }
              helperText={formik.touched?.cCelular && formik.errors?.cCelular}
            />

            <FormControl
              fullWidth
              variant="standard"
              error={
                formik.touched?.cTipoEmpresa &&
                Boolean(formik.errors?.cTipoEmpresa)
              }
            >
              <InputLabel htmlFor="cTipoEmpresa">Tipo de Empresa</InputLabel>
              <Select
                fullWidth
                id="cTipoEmpresa"
                name="cTipoEmpresa"
                value={formik.values?.cTipoEmpresa}
                onChange={formik.handleChange}
              >
                <MenuItem value={"Individual"}>Individual</MenuItem>
                <MenuItem value={"Cooperativa"}>Cooperativa</MenuItem>
              </Select>
              <FormHelperText
                error={
                  formik.touched?.cTipoEmpresa &&
                  Boolean(formik.errors?.cTipoEmpresa)
                }
              >
                {formik.touched?.cTipoEmpresa && formik.errors?.cTipoEmpresa}
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
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
