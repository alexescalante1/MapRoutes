import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

const columns = [
  {
    name: (
      <>
        <span style={{ minWidth: "300px" }}>TITULO</span>
      </>
    ),
    selector: (row) => row.title,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
  ,
  {
    name: "Mes",
    selector: (row) => row.year,
  },
  ,
  {
    name: "Day",
    selector: (row) => row.year,
  },
];

const filter = [
  {
    idName: "cTitulo",
    name: "TITULO",
  },
  {
    idName: "cNombre",
    name: "NOMBRE",
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "FI",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 5,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 6,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 7,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 8,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 9,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 10,
    title: "Ghostbusters",
    year: "1984",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Nombre',
  'Apellido',
  'Fecha',
];

const customStyles = {
  rows: {
    style: {
      minHeight: "60px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "15px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "#525252",
      color: "#FFFFFF",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: "16px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontSize: "14px",
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function GenDataTableBD() {
  
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [width, setWidth] = useState(
    window.innerWidth > 572 ? "400px" : "100%"
  );
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleResize = () => {
    if (window.innerWidth > 572) {
      setWidth("400px");
    } else {
      setWidth("100%");
    }
  };

  const [Pagina, setPagina] = useState(1);

  const [Buscador, setBuscador] = useState("");
  

  console.log(Pagina);

  //console.log(columns);

  console.log("Buscador", Buscador);

  return (
    <>
      <nav>
        <ul
          style={{
            display: "flex",
            marginBottom: "10px",
            float: "right",
            width: width,
          }}
        >
          <li style={{ width: "100%" }}>
            <TextField
              id="outlined-basic"
              label="Buscar"
              variant="outlined"
              size="small"
              fullWidth
              value={Buscador}
              onChange={(e) => setBuscador(e.target.value)}
            />
          </li>
          <li style={{ width: "50%", minWidth: "80px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label" size="small">Filtro</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                size="small"
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </li>

          <li>
            <Button
              variant="contained"
              style={{
                height: "38px",
                width: "5px",
              }}
            >
              <span className=" pi pi-search"></span>
            </Button>
          </li>
        </ul>
      </nav>

      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        style={{ borderRadius: "10px" }}
      />

      <Stack spacing={2} style={{ alignItems: "center", marginTop: "10px" }}>
        <Pagination
          count={11}
          onChange={(event, value) => setPagina(value)}
          siblingCount={0}
          color="primary"
        />
      </Stack>
    </>
  );
}
