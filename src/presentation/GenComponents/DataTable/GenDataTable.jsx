import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const customStyles = {
  rows: {
    style: {
      minHeight: "60px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "#0074C5",
      color: "#FFFFFF",
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontSize: "12px",
      //width: "100%"
    },
  },
};

export function GenDataTable(Props) {
  const Sections = 10;
  const [TotalPages, setTotalPages] = useState(1);
  const [Buscador, setBuscador] = useState("");
  const [DataTableLocal, setDataTableLocal] = useState([]);
  const [DataTableLPag, setDataTableLPag] = useState([]);

  //======================================
  // RESIZE BUSCADOR
  //======================================

  const [width, setWidth] = useState(
    "100%"
    //window.innerWidth > 572 ? "200px" : "100%"
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setDataTableLocal(Props.data);
    //setDataTableLPag(Props.data);
  }, [Props.data]);

  const handleResize = () => {
    // if (window.innerWidth > 572) {
    //   setWidth("200px");
    // } else {
    setWidth("100%");
    //}
  };

  //======================================
  // RESIZE BUSCADOR
  //======================================

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

  let DivPages = DataTableLocal.length / Sections;
  let RoundPage = Math.round(DivPages);

  const ChangePage = (e) => {
    let DataView = DataTableLocal.slice(
      (e - 1) * Sections,
      (e - 1) * Sections + Sections
    );
    setDataTableLPag(DataView);
  };

  useEffect(() => {
    if (RoundPage - DivPages < 0) {
      RoundPage = RoundPage + 1;
    }
    setTotalPages(RoundPage);
    setDataTableLPag(DataTableLocal?.slice(0, Sections));
  }, [DataTableLocal]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <TextField
          id="search-input"
          label="Buscar"
          variant="outlined"
          size="small"
          value={Buscador}
          onChange={BuscarElemento}
        />
      </div>

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
