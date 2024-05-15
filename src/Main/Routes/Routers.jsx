import React, { useEffect, useState, Component } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "./../../GlobalContext";
import { FragmentData } from "../Utilities/FragmentStorage/FragmentData";
import { InicializacionUseCase } from "../../Data";
import { Alertas } from "../../presentation/GenComponents";
import {
  DashBoardIndex,
  InicioPage,
  ResumeIndex,
  RutasIndex,
} from "../../presentation/View";

export default class RoutersApp extends Component {
  RefreshData = (e) => {
    this.setState({
      Refresh: (e = true ? false : true),
    });
  };

  render() {
    return (
      <>
        <ValidatorSession RefreshData={this.RefreshData} />
      </>
    );
  }
}

function ValidatorSession({ RefreshData }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new InicializacionUseCase().GetInitBase();
      } catch (error) {
        Alertas("error", error.message);
      }
    };

    fetchData();
  }, []);

  return <RutasIndex />;

  const DtVl = new FragmentData(process.env.REACT_APP_KPRT).GtParttnDtLS(
    process.env.REACT_APP_CPRT,
    "CrptU"
  );

  const [valLgn, setValLgn] = useState(DtVl ? JSON.parse(DtVl)?.lVal : false);
  const { state } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const objData = await new InicializacionUseCase().OnStateAuth();

        if (objData.success === 1) {
          setValLgn(true);
        } else if (
          valLgn === false &&
          valLgn != (DtVl ? JSON.parse(DtVl)?.lVal : false)
        ) {
          Alertas("info", objData.message);
          setValLgn(false);
        } else {
          setValLgn(false);
        }
      } catch (error) {
        Alertas("error", error.message);
        setValLgn(false);
      }
    };

    fetchData();
  }, [state?.loginDate]);

  if (valLgn) {
    return (
      <>
        <AllRoutersBody RefreshData={RefreshData} />
      </>
    );
  } else {
    return <InicioPage />;
  }
}

function AllRoutersBody({ RefreshData }) {
  const { pathname } = useLocation();
  const ArrRutas = pathname.split("/");

  return (
    <>
      <DashBoardIndex>
        <BodyPage ArrRutas={ArrRutas} pathRutas={pathname} />
      </DashBoardIndex>
    </>
  );
}

function BodyPage({ ArrRutas, pathname }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<ResumeIndex />} />
        <Route path="/1" element={<RutasIndex />} />
        <Route path="/2" element={<></>} />
        <Route path="*" element={<></>} />
      </Routes>
    </>
  );
}
