import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { RutasMapa } from "../../../GenComponents";
// import RegistrarRutas from "./RutasOpciones/RegistrarRutas";
// import {
//   AutorizacionDT,
//   RutasDT,
// } from "../../../../../../../Data/UseCases/Apps";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Alertas } from "../../../GenComponents";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";

import Autocomplete from "@mui/material/Autocomplete";

function TabPanel(props) {
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

TabPanel.propTypes = {
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

export function MapsLicencias({ actualizar }) {
  const [REGISTRAR_ROUTE, setREGISTRAR_ROUTE] = useState(false);
  const [REGISTRAR_ROUTE_COLOR, setREGISTRAR_ROUTE_COLOR] = useState("#BB5302");
  const [POINTS_OF_REG, setPOINTS_OF_REG] = useState([]);
  const [ALL_ROUTES, setALL_ROUTES] = useState([]);
  const [dataRouters, setDataRouters] = useState([]);
  const [reloadData, setReloadData] = useState(0);
  const [actVizualisa, setActVizualisa] = useState(0);

  const ActualizarVisualizacion = async (e) => {
    e.preventDefault();
    setActVizualisa(actVizualisa + 1);
  };

  //===========================================================
  //===========================================================
  //===========================================================

  const ObternerData = async (e) => {
    // const Access = ApiContextRequest("23");
    // if (Access.cPath != "ErrorDeAcceso") {
    //   try {
    //     const data = await new RutasDT(
    //       Access.cPath,
    //       Access.cMethod
    //     ).GetAllRutas();
    //     if (data?.header?.success === 1) {
    //       const rows = [];
    //       data?.data.forEach((items) => {
    //         rows.push({
    //           label: items?.cRucEmpresa + " / " + items?.cNombreComercial,
    //           idAuthr: items?.idAutorizacion,
    //           name: items?.cNombreComercial,
    //           idEmpresa: items?.idEmpresa,
    //           Ruc: items?.cRucEmpresa,
    //           arrCoordenada: items?.arrCoordenada,
    //         });
    //       });
    //       setDataRouters(rows);
    //       //console.log(rows);
    //     } else {
    //       Alertas("error", data?.header?.message);
    //     }
    //   } catch (e) {}
    // }
  };

  useEffect(() => {
    ObternerData();
  }, [actualizar, reloadData]);

  ///===============================================

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setValue(newValue);
  };

  //===============================================

  let RUTA_BASE0 = [
    {
      Properties: {
        color: "red",
        opacity: 0.3,
        weight: 10,
        stroke: true,
        fillRule: "evenodd",
        bubblingMouseEvents: true,
      },
      Nombre: "Ruta Vilcapaza",
      GenPoints: [
        [-15.480414, -70.120049],
        [-15.484868, -70.12448],
        [-15.48807, -70.123429],
      ],
    },
    {
      Properties: {
        color: "blue",
        opacity: 0.3,
        weight: 10,
        stroke: true,
        fillRule: "evenodd",
        bubblingMouseEvents: true,
      },
      Nombre: "Segunda Ruta",
      GenPoints: [
        [-15.476375502781025, -70.1160764694214],
        [-15.475640565246986, -70.11726737022401],
        [-15.474636491439478, -70.11885523796083],
        [-15.476603229374575, -70.12090444564821],
        [-15.477938530266192, -70.12240648269655],
        [-15.480774722173692, -70.126451253891],
        [-15.480474543118154, -70.12686967849733],
      ],
    },
  ];

  let RUTA_BASE3 = [];

  RUTA_BASE3.push({
    ID_AUTH_ROUTES: "1-linea2",
    ID_RENDER: 1,
    idAutorizacion: "1",
    cNombreComercial: "LINEA 2",
    cRazonSocial: "EMPRESA DE TRANSPORTES PRUEBA 3 S.R.L",
    arrCoordenada: [
      {
        Properties: {
          color: "lime",
          opacity: 0.3,
          weight: 10,
          stroke: true,
          fillRule: "evenodd",
          bubblingMouseEvents: true,
        },
        Nombre: "Ruta Ida",
        GenPoints: [
          [-15.476375502781025, -70.1160764694214],
          [-15.475640565246986, -70.11726737022401],
          [-15.474636491439478, -70.11885523796083],
          [-15.476603229374575, -70.12090444564821],
          [-15.477938530266192, -70.12240648269655],
          [-15.480774722173692, -70.126451253891],
          [-15.480474543118154, -70.12686967849733],
        ],
      },
      {
        Properties: {
          color: "red",
          opacity: 0.3,
          weight: 10,
          stroke: true,
          fillRule: "evenodd",
          bubblingMouseEvents: true,
        },
        Nombre: "Ruta Retorno",
        GenPoints: [
          [-15.476974133853286, -70.10834634304048],
          [-15.47831978346887, -70.1100254058838],
          [-15.478205921148003, -70.11026144027711],
          [-15.477315722661396, -70.11226773262025],
          [-15.477947142913063, -70.1125466823578],
          [-15.477087996852005, -70.11446177959444],
          [-15.476435181856004, -70.1160228252411],
          [-15.474499496251141, -70.11408627033235],
          [-15.472242898733677, -70.11659681797029],
          [-15.47010531922184, -70.1145261526108],
          [-15.468438716493182, -70.11285781860353],
        ],
      },
    ],
  });

  RUTA_BASE3.push({
    ID_AUTH_ROUTES: "2-linea2",
    ID_RENDER: 1,
    idAutorizacion: "2",
    cNombreComercial: "LINEA 2",
    cRazonSocial: "EMPRESA DE TRANSPORTES PRUEBA 3 S.R.L",
    arrCoordenada: [
      {
        Properties: {
          color: "lime",
          opacity: 0.3,
          weight: 10,
          stroke: true,
          fillRule: "evenodd",
          bubblingMouseEvents: true,
        },
        Nombre: "Ruta Ida",
        GenPoints: [
          [-15.485083462985674, -70.10904067510553],
          [-15.483059868129398, -70.10976843077079],
          [-15.483679942503231, -70.11159186294417],
          [-15.485684836922443, -70.11077668150195],
          [-15.485994870406728, -70.11182783651954],
          [-15.486366909974326, -70.11253575724568],
          [-15.486668240156034, -70.11358676021845],
          [-15.487432984939698, -70.11330788235665],
          [-15.48908647750571, -70.11796299743456],
          [-15.489726440968184, -70.11796400369491],
          [-15.490212150393358, -70.11772803011952],
          [-15.49078053231423, -70.11758859118862],
          [-15.491152563270793, -70.11738479582804],
          [-15.505390454378462, -70.11208878138484],
          [-15.506382465295529, -70.11620759288235],
          [-15.523581435308335, -70.10895656943475],
          [-15.541405954057995, -70.10118909116812],
        ],
      },
      {
        Properties: {
          color: "blue",
          opacity: 0.3,
          weight: 10,
          stroke: true,
          fillRule: "evenodd",
          bubblingMouseEvents: true,
        },
        Nombre: "Ruta Retorno",
        GenPoints: [
          [-15.479255493205711, -70.0986997689884],
          [-15.481446454635238, -70.0980562046919],
          [-15.483141333407199, -70.0974126403954],
          [-15.483430701565688, -70.09801330040548],
          [-15.483720069319368, -70.09882848184769],
          [-15.484712184258347, -70.09947204614419],
          [-15.48500155021906, -70.10024432329998],
          [-15.485373591573657, -70.10131693046077],
          [-15.485497605209796, -70.1020033990437],
          [-15.480412985153993, -70.10440603908391],
          [-15.481281099865173, -70.10650834911912],
          [-15.481281099865173, -70.10749514770706],
          [-15.481777163778803, -70.108481946295],
          [-15.481942518152291, -70.10938293631007],
        ],
      },
    ],
  });

  RUTA_BASE3.push({
    ID_AUTH_ROUTES: "3-linea3",
    ID_RENDER: 1,
    idAutorizacion: "3",
    cNombreComercial: "LINEA 2",
    cRazonSocial: "EMPRESA DE TRANSPORTES PRUEBA 3 S.R.L",
    arrCoordenada: [
      {
        Properties: {
          color: "lime",
          opacity: 0.3,
          weight: 10,
          stroke: true,
          fillRule: "evenodd",
          bubblingMouseEvents: true,
        },
        Nombre: "Ruta Ida",
        GenPoints: [
          [-15.493098846000002, -70.08489576819876],
          [-15.498555171719218, -70.08970104827921],
          [-15.508806060661511, -70.08489576819876],
          [-15.505830048541425, -70.0948495626511],
        ],
      },
    ],
  });

  //

  let Popacity = 0.3;
  let Pweight = 10;
  let Pstroke = true;
  let PfillRule = "evenodd";
  let PbubblingMouseEvents = true;

  let RUTA_BASE_COPY = GeneraPuntosRuta(RUTA_BASE0).slice();

  // console.log("COPY",RUTA_BASE_COPY);
  // console.log("BSE",RUTA_BASE0);

  function GeneraPuntosRuta(RUTA_BASE0) {
    let RUTA_BASE_COPY = RUTA_BASE0;
    for (let i = 0; i < RUTA_BASE_COPY.length; i++) {
      if (RUTA_BASE_COPY[i]?.GenPoints) {
        let PUNTOS_GENERADOS = [];
        for (let j = 1; j < RUTA_BASE_COPY[i]?.GenPoints.length; j++) {
          let P1 = RUTA_BASE_COPY[i]?.GenPoints[j - 1];
          let P2 = RUTA_BASE_COPY[i]?.GenPoints[j];

          let PointsInterm = PuntosInterm(P1, P2);

          for (let k = 1; k < PointsInterm.length; k++) {
            let PI1 = PointsInterm[k - 1];
            let PI2 = PointsInterm[k];

            PUNTOS_GENERADOS.push({
              Properties: {
                color: RUTA_BASE_COPY[i]?.Properties?.color,
                opacity: Popacity,
                weight: Pweight,
                stroke: Pstroke,
                fillRule: PfillRule,
                bubblingMouseEvents: PbubblingMouseEvents,
              },
              Points: [PI1, PI2],
            });
          }
        }
        RUTA_BASE_COPY[i].PartialPoints = PUNTOS_GENERADOS;
      }
    }
    return RUTA_BASE0;
  }

  function PuntosInterm(P1, P2) {
    let Puntos = [];
    Puntos.push(P1);
    Puntos.push(
      PuntoMedio(P1, PuntoMedio(P1, PuntoMedio(P1, PuntoMedio(P1, P2))))
    );
    Puntos.push(PuntoMedio(P1, PuntoMedio(P1, PuntoMedio(P1, P2))));
    Puntos.push(
      PuntoMedio(
        PuntoMedio(P1, PuntoMedio(P1, PuntoMedio(P1, P2))),
        PuntoMedio(P1, PuntoMedio(P1, P2))
      )
    );
    Puntos.push(PuntoMedio(P1, PuntoMedio(P1, P2)));
    Puntos.push(
      PuntoMedio(
        PuntoMedio(P1, PuntoMedio(P1, P2)),
        PuntoMedio(PuntoMedio(P1, PuntoMedio(P1, P2)), PuntoMedio(P1, P2))
      )
    );
    Puntos.push(
      PuntoMedio(PuntoMedio(P1, PuntoMedio(P1, P2)), PuntoMedio(P1, P2))
    );
    Puntos.push(
      PuntoMedio(
        PuntoMedio(PuntoMedio(P1, PuntoMedio(P1, P2)), PuntoMedio(P1, P2)),
        PuntoMedio(P1, P2)
      )
    );
    Puntos.push(PuntoMedio(P1, P2));
    Puntos.push(
      PuntoMedio(
        PuntoMedio(P1, P2),
        PuntoMedio(PuntoMedio(P1, P2), PuntoMedio(PuntoMedio(P1, P2), P2))
      )
    );
    Puntos.push(
      PuntoMedio(PuntoMedio(P1, P2), PuntoMedio(PuntoMedio(P1, P2), P2))
    );
    Puntos.push(
      PuntoMedio(
        PuntoMedio(PuntoMedio(P1, P2), PuntoMedio(PuntoMedio(P1, P2), P2)),
        PuntoMedio(PuntoMedio(P1, P2), P2)
      )
    );
    Puntos.push(PuntoMedio(PuntoMedio(P1, P2), P2));
    Puntos.push(
      PuntoMedio(
        PuntoMedio(PuntoMedio(P1, P2), P2),
        PuntoMedio(PuntoMedio(PuntoMedio(P1, P2), P2), P2)
      )
    );
    Puntos.push(PuntoMedio(PuntoMedio(PuntoMedio(P1, P2), P2), P2));
    Puntos.push(
      PuntoMedio(PuntoMedio(PuntoMedio(PuntoMedio(P1, P2), P2), P2), P2)
    );
    Puntos.push(P2);
    return Puntos;
  }

  function PuntoMedio(P1, P2) {
    return [(P1[0] + P2[0]) / 2, (P1[1] + P2[1]) / 2];
  }

  return (
    <>
      <Grid lg={12} item container spacing={2}>
        <Grid item lg={8} sm={8} xs={12}>
          <RutasMapa ///RENDERIZA TODO EL MAPA
            REGISTRAR_ROUTE={REGISTRAR_ROUTE}
            REGISTRAR_ROUTE_COLOR={REGISTRAR_ROUTE_COLOR}
            POINTS_OF_REG={POINTS_OF_REG}
            setPOINTS_OF_REG={setPOINTS_OF_REG}
            ALL_ROUTES={ALL_ROUTES}
          />
        </Grid>
        <Grid item lg={4} sm={4} xs={12}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="VER"
                  {...a11yProps(0)}
                  onClick={ActualizarVisualizacion}
                />
                <Tab label="NUEVO" {...a11yProps(1)} />
                {/* <Tab label="VERIFICAR" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <VisualizarRutas
                actVizualisa={actVizualisa}
                dataRouters={dataRouters}
                ALL_ROUTES={ALL_ROUTES}
                setALL_ROUTES={setALL_ROUTES}
                setPOINTS_OF_REG={setPOINTS_OF_REG}
                setREGISTRAR_ROUTE={setREGISTRAR_ROUTE}
                setREGISTRAR_ROUTE_COLOR={setREGISTRAR_ROUTE_COLOR}
                POINTS_OF_REG={POINTS_OF_REG}
                reloadData={reloadData}
                setReloadData={setReloadData}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <>
                <RegistrarPointsRuta
                  setREGISTRAR_ROUTE={setREGISTRAR_ROUTE}
                  setREGISTRAR_ROUTE_COLOR={setREGISTRAR_ROUTE_COLOR}
                  POINTS_OF_REG={POINTS_OF_REG}
                  setPOINTS_OF_REG={setPOINTS_OF_REG}
                  ALL_ROUTES={ALL_ROUTES}
                  setALL_ROUTES={setALL_ROUTES}
                  dataRouters={dataRouters}
                  reloadData={reloadData}
                  setReloadData={setReloadData}
                />
              </>
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </Grid>
      </Grid>

    </>
  );
}

export function RegistrarPointsRuta({
  setREGISTRAR_ROUTE,
  setREGISTRAR_ROUTE_COLOR,
  POINTS_OF_REG,
  setPOINTS_OF_REG,
  ALL_ROUTES,
  setALL_ROUTES,
  dataRouters,
  reloadData,
  setReloadData,
}) {
  let listEmpresas = dataRouters.filter(function (element) {
    return element?.arrCoordenada == "";
  });

  const [dataBuscarAuth, setDataBuscarAuth] = useState([]);
  const [ImputOne, setImputOne] = useState(false);
  const [ImputTwo, setImputTwo] = useState(false);
  const [AutoCompleteVal, setAutoCompleteVal] = useState("");

  const InsertDataRegBase = async (e) => {
    var RutaRegistrar = ALL_ROUTES.find(
      (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
    );
    let MY_ROUTES = [];
    if (RutaRegistrar == undefined) {
      MY_ROUTES.push({
        ID_AUTH_ROUTES: "REGISTRAR_RUTA_PREV",
        ID_RENDER: 1,
        idAutorizacion: "1",
        NombreComercial: "LINEA 2",
        RazonSocial: "EMPRESA DE TRANSPORTES PRUEBA 3 S.R.L",
        arrCoordenada: [],
      });
      setALL_ROUTES(MY_ROUTES);
    } else {
      setALL_ROUTES(MY_ROUTES);
    }
  };

  useEffect(() => {
    InsertDataRegBase();
  }, []);

  //======================================================
  // REGISTRO DE PUNTOS
  //======================================================

  const RegRutaIda = async (e) => {
    e.preventDefault();
    const RUTA_IDA_STRUCT = await new RutasDT().ObtRutasRegistro(
      "RUTA DE IDA",
      document.getElementById("ColorIda").value,
      POINTS_OF_REG
    );

    if (RUTA_IDA_STRUCT.GenPoints.length > 0) {
      //BUSCADOR
      var RutaRegistrar = ALL_ROUTES.find(
        (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
      );
      if (RutaRegistrar !== undefined) {
        RutaRegistrar.arrCoordenada[0] = RUTA_IDA_STRUCT;
        setALL_ROUTES(ALL_ROUTES);
      }
    }

    setPOINTS_OF_REG([]);
    setImputTwo(false);
    setREGISTRAR_ROUTE(false);
  };

  const RegRutaRet = async (e) => {
    e.preventDefault();
    const RUTA_RET_STRUCT = await new RutasDT().ObtRutasRegistro(
      "RUTA DE RETORNO",
      document.getElementById("ColorRet").value,
      POINTS_OF_REG
    );
    if (RUTA_RET_STRUCT.GenPoints.length > 0) {
      //BUSCADOR
      var RutaRegistrar = ALL_ROUTES.find(
        (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
      );
      if (RutaRegistrar !== undefined) {
        RutaRegistrar.arrCoordenada[1] = RUTA_RET_STRUCT;
        setALL_ROUTES(ALL_ROUTES);
      }
    }
    setPOINTS_OF_REG([]);
    setImputOne(false);
    setREGISTRAR_ROUTE(false);
  };

  //======================================================
  // GUARDAR RUTAS
  //======================================================

  const RegRutas = async (e) => {
    e.preventDefault();
    //BUSCADOR
    var RutaRegistrar = ALL_ROUTES.find(
      (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
    );

    if (RutaRegistrar.arrCoordenada.length == 2) {
      const stringReg = JSON.stringify(RutaRegistrar.arrCoordenada);
      const Access = ApiContextRequest("25");
      if (Access.cPath != "ErrorDeAcceso") {
        try {
          const data = await new RutasDT(
            Access.cPath,
            Access.cMethod
          ).SetRutaRegistrar({
            idEmpresa: dataBuscarAuth?.idEmpresa,
            arrCoordenada: stringReg,
          });
          //console.log(data);
          if (data) {
            Alertas("success", "Ruta Almacenado Correctamente");
            setReloadData(reloadData + 1);
            setALL_ROUTES([]);
            setAutoCompleteVal(" ");
          } else {
            Alertas("error", data?.header?.message);
          }
        } catch (e) {
          Alertas("error", "Error Desconocido");
        }
      }
    } else {
      Alertas("error", "Ingrese Ambas Rutas");
    }
  };

  const RemoveUltPoint = async (e) => {
    e.preventDefault();
    let POINTS = [];
    POINTS_OF_REG.forEach((element) => {
      POINTS.push(element);
    });
    POINTS.pop();
    setPOINTS_OF_REG(POINTS);
  };

  //======================================================
  // INICIO DE REGISTRO Y ACTUALIZACION DE PARAMETROS
  //======================================================

  const RegPointsOne = async (e) => {
    e.preventDefault();
    //BUSCADOR
    var RutaRegistrar = ALL_ROUTES.find(
      (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
    );
    if (RutaRegistrar !== undefined) {
      RutaRegistrar.arrCoordenada = RutaRegistrar.arrCoordenada.filter(
        (item) => item?.Nombre !== "RUTA DE IDA"
      );
      setALL_ROUTES(ALL_ROUTES);
    }
    setREGISTRAR_ROUTE(true);
    setImputTwo(true);
    setREGISTRAR_ROUTE_COLOR(document.getElementById("ColorIda").value);
  };
  const RegPointsTwo = async (e) => {
    e.preventDefault();
    //BUSCADOR
    var RutaRegistrar = ALL_ROUTES.find(
      (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
    );
    if (RutaRegistrar !== undefined) {
      RutaRegistrar.arrCoordenada = RutaRegistrar.arrCoordenada.filter(
        (item) => item?.Nombre !== "RUTA DE RETORNO"
      );
      setALL_ROUTES(ALL_ROUTES);
    }
    setREGISTRAR_ROUTE(true);
    setImputOne(true);
    setREGISTRAR_ROUTE_COLOR(document.getElementById("ColorRet").value);
  };

  const CambioColorIda = async (e) => {
    e.preventDefault();
    setREGISTRAR_ROUTE_COLOR(document.getElementById("ColorIda").value);
  };
  const CambioColorRet = async (e) => {
    e.preventDefault();
    setREGISTRAR_ROUTE_COLOR(document.getElementById("ColorRet").value);
  };

  //======================================================
  // INICIO DE REGISTRO Y ACTUALIZACION DE PARAMETROS
  //======================================================

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%", marginBottom: "10px" }}>
        <Autocomplete
          id="BuscarAuth"
          onChange={(event, value) => setDataBuscarAuth(value)}
          freeSolo
          value={AutoCompleteVal}
          options={listEmpresas}
          renderInput={(params) => (
            <TextField {...params} label="BUSCAR EMPRESA" />
          )}
        />
      </Stack>
      <SectionEdit
        ImputOne={ImputOne}
        ImputTwo={ImputTwo}
        CambioColorIda={CambioColorIda}
        CambioColorRet={CambioColorRet}
        dataBuscarAuth={dataBuscarAuth}
        RegPointsOne={RegPointsOne}
        RegPointsTwo={RegPointsTwo}
        RegRutaIda={RegRutaIda}
        RegRutaRet={RegRutaRet}
        RemoveUltPoint={RemoveUltPoint}
        RegRutas={RegRutas}
        buttonEditar={true}
      />
    </>
  );
}

export function VisualizarRutas({
  actVizualisa,
  dataRouters,
  ALL_ROUTES,
  setALL_ROUTES,
  setPOINTS_OF_REG,
  setREGISTRAR_ROUTE,
  setREGISTRAR_ROUTE_COLOR,
  POINTS_OF_REG,
  reloadData,
  setReloadData,
}) {
  let listEmpresas = dataRouters.filter(function (element) {
    return element?.arrCoordenada != "";
  });

  const registrarRuta = (e) => {
    e.preventDefault();
  };

  const [dataBuscarAuth, setDataBuscarAuth] = useState([]);
  const [buttonEditar, setButtonEditar] = useState(false);
  const [ImputOne, setImputOne] = useState(false);
  const [ImputTwo, setImputTwo] = useState(false);
  const [AutoCompleteVal, setAutoCompleteVal] = useState("");

  const ObternerData = async (e) => {
    let MY_ROUTERS = [];
    listEmpresas.forEach((element) => {
      let arrCoord = JSON.parse(element?.arrCoordenada);
      MY_ROUTERS.push({
        ID_AUTH_ROUTES: element?.Ruc + "_" + element?.name,
        ID_RENDER: 1,
        idAutorizacion: element?.idAuthr,
        idEmpresa: element?.idEmpresa,
        NombreComercial: element?.name,
        RazonSocial: "",
        arrCoordenada: arrCoord,
      });
    });
    setALL_ROUTES(MY_ROUTERS);
    setPOINTS_OF_REG([]);
    setREGISTRAR_ROUTE(false);
    setButtonEditar(false);
    setImputOne(false);
    setImputTwo(false);
  };

  useEffect(() => {
    ObternerData();
  }, [dataRouters]);

  const ViewOneRoute = async (e) => {
    if (dataBuscarAuth != null) {
      if (dataBuscarAuth?.length != 0) {
        let MY_ROUTERS = [];
        let arrCoord = JSON.parse(dataBuscarAuth?.arrCoordenada);
        MY_ROUTERS.push({
          ID_AUTH_ROUTES: dataBuscarAuth?.Ruc + "_" + dataBuscarAuth?.name,
          ID_RENDER: 1,
          idAutorizacion: dataBuscarAuth?.idAuthr,
          idEmpresa: dataBuscarAuth?.idEmpresa,
          NombreComercial: dataBuscarAuth?.name,
          RazonSocial: "",
          arrCoordenada: arrCoord,
        });
        setALL_ROUTES(MY_ROUTERS);
        setPOINTS_OF_REG([]);
        setREGISTRAR_ROUTE(false);
        setButtonEditar(false);
      }
    }
  };

  useEffect(() => {
    ViewOneRoute();
  }, [dataBuscarAuth]);

  const CambioEstButton = async (e) => {
    e.preventDefault();
    setButtonEditar(true);
    InsertDataRegBase();
  };

  //==================================================
  // EDITAR
  //==================================================

  const InsertDataRegBase = async (e) => {
    var RutaRegistrar = ALL_ROUTES.find(
      (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
    );
    let MY_ROUTES = [];
    if (RutaRegistrar == undefined) {
      MY_ROUTES.push({
        ID_AUTH_ROUTES: "REGISTRAR_RUTA_PREV",
        ID_RENDER: 1,
        idAutorizacion: "1",
        NombreComercial: "LINEA 2",
        RazonSocial: "EMPRESA DE TRANSPORTES PRUEBA 3 S.R.L",
        arrCoordenada: [],
      });
      setALL_ROUTES(MY_ROUTES);
    }
  };

  //======================================================
  // REGISTRO DE PUNTOS
  //======================================================

  const RegRutaIda = async (e) => {
    e.preventDefault();
    const RUTA_IDA_STRUCT = await new RutasDT().ObtRutasRegistro(
      "RUTA DE IDA",
      document.getElementById("ColorIda").value,
      POINTS_OF_REG
    );

    if (RUTA_IDA_STRUCT.GenPoints.length > 0) {
      //BUSCADOR
      var RutaRegistrar = ALL_ROUTES.find(
        (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
      );
      if (RutaRegistrar !== undefined) {
        RutaRegistrar.arrCoordenada[0] = RUTA_IDA_STRUCT;
        setALL_ROUTES(ALL_ROUTES);
      }
    }

    setPOINTS_OF_REG([]);
    setImputTwo(false);
    setREGISTRAR_ROUTE(false);
  };

  const RegRutaRet = async (e) => {
    e.preventDefault();
    const RUTA_RET_STRUCT = await new RutasDT().ObtRutasRegistro(
      "RUTA DE RETORNO",
      document.getElementById("ColorRet").value,
      POINTS_OF_REG
    );
    if (RUTA_RET_STRUCT.GenPoints.length > 0) {
      //BUSCADOR
      var RutaRegistrar = ALL_ROUTES.find(
        (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
      );
      if (RutaRegistrar !== undefined) {
        RutaRegistrar.arrCoordenada[1] = RUTA_RET_STRUCT;
        setALL_ROUTES(ALL_ROUTES);
      }
    }
    setPOINTS_OF_REG([]);
    setImputOne(false);
    setREGISTRAR_ROUTE(false);
  };

  //======================================================
  // GUARDAR RUTAS
  //======================================================

  const RegRutas = async (e) => {
    e.preventDefault();
    //BUSCADOR
    var RutaRegistrar = ALL_ROUTES.find(
      (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
    );

    if (RutaRegistrar.arrCoordenada.length == 2) {
      const stringReg = JSON.stringify(RutaRegistrar.arrCoordenada);

      console.log(stringReg);

      const Access = ApiContextRequest("26");
      if (Access.cPath != "ErrorDeAcceso") {
        try {
          const data = await new RutasDT(
            Access.cPath + "?idEmpresa=" + dataBuscarAuth?.idEmpresa,
            Access.cMethod
          ).SetRutaEditar({
            arrCoordenada: stringReg,
          });
          console.log(data);
          if (data) {
            Alertas("success", "Ruta Almacenado Correctamente");
            setReloadData(reloadData + 1);
            setALL_ROUTES([]);
            setAutoCompleteVal(" ");
          } else {
            Alertas("error", data?.header?.message);
          }
        } catch (e) {
          Alertas("error", "Error Desconocido");
        }
      }
    } else {
      Alertas("error", "Ingrese Ambas Rutas");
    }
  };

  const RemoveUltPoint = async (e) => {
    e.preventDefault();
    let POINTS = [];
    POINTS_OF_REG.forEach((element) => {
      POINTS.push(element);
    });
    POINTS.pop();
    setPOINTS_OF_REG(POINTS);
  };

  //======================================================
  // INICIO DE REGISTRO Y ACTUALIZACION DE PARAMETROS
  //======================================================

  const RegPointsOne = async (e) => {
    e.preventDefault();
    //BUSCADOR
    var RutaRegistrar = ALL_ROUTES.find(
      (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
    );
    if (RutaRegistrar !== undefined) {
      RutaRegistrar.arrCoordenada = RutaRegistrar.arrCoordenada.filter(
        (item) => item?.Nombre !== "RUTA DE IDA"
      );
      setALL_ROUTES(ALL_ROUTES);
    }
    setREGISTRAR_ROUTE(true);
    setImputTwo(true);
    setREGISTRAR_ROUTE_COLOR(document.getElementById("ColorIda").value);
  };
  const RegPointsTwo = async (e) => {
    e.preventDefault();
    //BUSCADOR
    var RutaRegistrar = ALL_ROUTES.find(
      (x) => x.ID_AUTH_ROUTES == "REGISTRAR_RUTA_PREV"
    );
    if (RutaRegistrar !== undefined) {
      RutaRegistrar.arrCoordenada = RutaRegistrar.arrCoordenada.filter(
        (item) => item?.Nombre !== "RUTA DE RETORNO"
      );
      setALL_ROUTES(ALL_ROUTES);
    }
    setREGISTRAR_ROUTE(true);
    setImputOne(true);
    setREGISTRAR_ROUTE_COLOR(document.getElementById("ColorRet").value);
  };

  const CambioColorIda = async (e) => {
    e.preventDefault();
    setREGISTRAR_ROUTE_COLOR(document.getElementById("ColorIda").value);
  };
  const CambioColorRet = async (e) => {
    e.preventDefault();
    setREGISTRAR_ROUTE_COLOR(document.getElementById("ColorRet").value);
  };

  return (
    <>
      <Button variant="contained" fullWidth onClick={ObternerData}>
        visualizar todo
      </Button>

      <Stack spacing={2} sx={{ width: "100%", marginTop: "20px" }}>
        <Autocomplete
          id="BuscarAuth"
          onChange={(event, value) => setDataBuscarAuth(value)}
          freeSolo
          options={listEmpresas}
          renderInput={(params) => (
            <TextField {...params} label="BUSCAR EMPRESA" />
          )}
        />
      </Stack>

      <ButtonEdit
        dataBuscarAuth={dataBuscarAuth}
        CambioEstButton={CambioEstButton}
      />

      <SectionEdit
        ImputOne={ImputOne}
        ImputTwo={ImputTwo}
        CambioColorIda={CambioColorIda}
        CambioColorRet={CambioColorRet}
        dataBuscarAuth={dataBuscarAuth}
        RegPointsOne={RegPointsOne}
        RegPointsTwo={RegPointsTwo}
        RegRutaIda={RegRutaIda}
        RegRutaRet={RegRutaRet}
        RemoveUltPoint={RemoveUltPoint}
        RegRutas={RegRutas}
        buttonEditar={buttonEditar}
      />
    </>
  );
}

export function ButtonEdit({ dataBuscarAuth, CambioEstButton }) {
  if (dataBuscarAuth != null) {
    if (dataBuscarAuth?.length == 0) {
      return <></>;
    } else {
      return (
        <>
          <Button
            variant="contained"
            fullWidth
            sx={{ width: "100%", marginTop: "20px", backgroundColor: "green" }}
            onClick={CambioEstButton}
          >
            EDITAR RUTA
          </Button>
        </>
      );
    }
  } else {
    return <></>;
  }
}

export function SectionEdit({
  ImputOne,
  ImputTwo,
  CambioColorIda,
  CambioColorRet,
  dataBuscarAuth,
  RegPointsOne,
  RegPointsTwo,
  RegRutaIda,
  RegRutaRet,
  RemoveUltPoint,
  RegRutas,
  buttonEditar,
}) {
  if (dataBuscarAuth !== null) {
    if (dataBuscarAuth?.length !== 0) {
      if (buttonEditar === true) {
        return (
          <>
            <div
              style={{ margin: "10px", marginBottom: "15px", fontSize: "20px" }}
            >
              <hr />
              <h1 style={{ fontWeight: "bold" }}>RUC:</h1>
              <h1 style={{ margin: "10px" }}>{dataBuscarAuth?.Ruc}</h1>
              <h1 style={{ fontWeight: "bold" }}>NOMBRE:</h1>
              <h1 style={{ margin: "10px" }}>{dataBuscarAuth?.name}</h1>
              <hr />
            </div>

            <div>
              <div style={{ marginBottom: "15px" }}>
                <h3
                  style={{
                    margin: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  RUTA DE INICIO:
                  <input
                    id="ColorIda"
                    type="color"
                    style={{ width: "23px", height: "23px", marginLeft: "5px" }}
                    onChange={CambioColorIda}
                    disabled={ImputOne}
                  />
                </h3>
              </div>

              <Button
                variant="contained"
                style={{ width: "48%", padding: "3px", marginRight: "4%" }}
                onClick={RegPointsOne}
                disabled={ImputOne}
              >
                Inicio
              </Button>
              <Button
                variant="contained"
                style={{ width: "48%", padding: "3px" }}
                color="success"
                onClick={RegRutaIda}
                disabled={ImputOne}
              >
                Fin
              </Button>
            </div>

            <div>
              <div style={{ marginBottom: "15px" }}>
                <h3
                  style={{
                    margin: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  RUTA DE RETORNO:
                  <input
                    id="ColorRet"
                    type="color"
                    style={{ width: "23px", height: "23px", marginLeft: "5px" }}
                    onChange={CambioColorRet}
                    disabled={ImputTwo}
                  />
                </h3>
              </div>

              <Button
                variant="contained"
                style={{ width: "48%", padding: "3px", marginRight: "4%" }}
                onClick={RegPointsTwo}
                disabled={ImputTwo}
              >
                Inicio
              </Button>
              <Button
                variant="contained"
                style={{ width: "48%", padding: "3px" }}
                color="success"
                onClick={RegRutaRet}
                disabled={ImputTwo}
              >
                Fin
              </Button>
            </div>
            <Button
              variant="contained"
              style={{ marginTop: "20px", backgroundColor: "red" }}
              fullWidth
              onClick={RemoveUltPoint}
            >
              DESHACER ULTIMO PUNTO
            </Button>
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              fullWidth
              onClick={RegRutas}
            >
              REGISTRAR RUTAS
            </Button>
          </>
        );
      }
    }
  }
  return <></>;
}
