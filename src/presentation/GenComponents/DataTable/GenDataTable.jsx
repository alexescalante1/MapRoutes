import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TextField, InputLabel, FormControl } from "@mui/material";

const customStyles = {
  rows: {
    style: {
      minHeight: "50px",
    },
  },
  headCells: {
    style: {
      padding: "5px",
      backgroundColor: "#0074C5",
      color: "#FFFFFF",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      fontSize: "14px",
    },
  },
};

export function GenDataTable(Props) {
  const [TotalPages, setTotalPages] = useState(1);
  const [Buscador, setBuscador] = useState("");
  const [DataTableLocal, setDataTableLocal] = useState([]);
  const [DataTableLPag, setDataTableLPag] = useState([]);
  const [lote, setLote] = useState(10);

  const handleChange = (event) => {
    setLote(event.target.value);
  };

  useEffect(() => {
    setDataTableLocal(Props.data);
  }, [Props.data]);

  const BuscarElemento = (e) => {
    e.preventDefault();
    setBuscador(e.target.value);
    const filtered = Props.data.filter(function (element) {
      let CopyObjetc = Object.assign({}, element);
      Props.columns.forEach((element) => {
        if (typeof CopyObjetc[element?.idName] === "object") {
          CopyObjetc[element?.idName] = "";
        }
      });
      let MyLinealElement = JSON.stringify(CopyObjetc)
        .replaceAll(/['"]+/g, "")
        .replaceAll(":", " ")
        .replaceAll("{", ",")
        .replaceAll("}", "");
      Props.columns.forEach((element) => {
        MyLinealElement = MyLinealElement.replaceAll("," + element?.idName, "");
      });
      if (MyLinealElement.match(new RegExp(`${e.target.value}.*`, "i"))) {
        return element;
      }
    });
    setDataTableLocal(filtered);
  };

  const ChangePage = (e) => {
    let DataView = DataTableLocal.slice((e - 1) * lote, (e - 1) * lote + lote);
    setDataTableLPag(DataView);
  };

  useEffect(() => {
    let DivPages = DataTableLocal.length / lote;
    let RoundPage = Math.round(DivPages);

    if (RoundPage - DivPages < 0) {
      RoundPage = RoundPage + 1;
    }
    setTotalPages(RoundPage);
    setDataTableLPag(DataTableLocal?.slice(0, lote));
  }, [DataTableLocal, lote]);

  return (
    <>
      <Grid
        lg={12}
        item
        container
        spacing={1}
        sx={{ marginBottom: "8px", marginTop: "8px" }}
      >
        <Grid item lg={8} sm={6} xs={12} />
        <Grid item lg={3} sm={4} xs={12}>
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            fullWidth
            value={Buscador}
            onChange={BuscarElemento}
            sx={{ margin: "0px" }}
          />
        </Grid>
        <Grid item lg={1} sm={2} xs={12}>
          <FormControl fullWidth size="small" sx={{ margin: "0px" }}>
            <Select value={lote} onChange={handleChange}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ borderRadius: "8px" }}>
        <DataTable
          className="justify-center"
          columns={Props?.columns}
          data={DataTableLPag}
          customStyles={customStyles}
          responsive
          persistTableHead
          noDataComponent={
            <span style={{ margin: "30px" }}>
              No se han encontrado resultados...
            </span>
          }
          //fixedHeaderfixedHeaderScrollHeight="100px"
          //progressPending={pending}
          //selectableRows
        />
      </div>

      <Stack
        spacing={2}
        style={{
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Pagination
          count={TotalPages}
          onChange={(event, value) => ChangePage(value)}
          siblingCount={0}
          color="primary"
        />
      </Stack>
    </>
  );
}
