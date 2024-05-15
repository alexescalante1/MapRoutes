import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alertas } from "../../../../GenComponents/Alertas";

const RegistrarRutas = ({
  datosCoordenadas,
  rutasCoordenadas,
  setDatosCoordenadas,
  setEstadoRegistro,
  setSaveRutas,
}) => {
  const [nombreRuta, setNombreRuta] = useState("");
  const [colorRuta, setColorRuta] = useState("");
  const [coordenadaGuardar, setCoordenadaGuardar] = useState("");
  
  const registrarRuta = (e) => {
    e.preventDefault();
    const rutasGuardar = {
      colorRuta: {
        color: colorRuta,
      },
      coordenada: datosCoordenadas,
      nombre: nombreRuta,
    };
    rutasCoordenadas.push(rutasGuardar);
    setDatosCoordenadas("");
    Alertas("success", "Ruta Almacenado Correctamente");
    console.log(rutasCoordenadas);
    setNombreRuta("");
    setColorRuta("");
    setCoordenadaGuardar("");
    setEstadoRegistro(false);
    setSaveRutas("");
  };
  return (
    <div>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
        className="mt-4 mb-4"
      >
        <form onSubmit={registrarRuta}>
          <TextField
            fullWidth
            label="Nombre de la Ruta"
            id="fullWidth"
            className="mb-4"
            onChange={(e) => setNombreRuta(e.target.value)}
            value={nombreRuta}
          />
          <TextField
            fullWidth
            type="color"
            label="Color de la Ruta"
            id="fullWidth"
            className="mb-4"
            onChange={(e) => setColorRuta(e.target.value)}
            value={colorRuta}
          />
          <TextField
            id="outlined-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            maxRows={10}
            value={datosCoordenadas}
            onChange={(e) => setCoordenadaGuardar(e)}
            multiline
            className="w-full"
          />
          <Button
            type="submit"
            className="text-center w-full mt-4"
            variant="contained"
          >
            Registrar Ruta
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default RegistrarRutas;
