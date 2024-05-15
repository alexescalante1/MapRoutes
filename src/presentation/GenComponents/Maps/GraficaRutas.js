import React from "react";
import { Polyline, CircleMarker, Tooltip } from "react-leaflet";
import MarcadorRuta from "./MarcadorRuta";

export function GraficaRutas({ ALL_ROUTES, MODO_RENDER }) {

  return (
    <div>
      {React.Children.toArray(
        ALL_ROUTES.map((Authorization) => (
          Authorization.arrCoordenada.map((AuthRoutes, i) => (
            <div>
            <MarcadorRuta
              position={AuthRoutes.GenPoints[AuthRoutes.GenPoints?.length - 1]}
              descripcion={AuthRoutes.Nombre}
              pathOptions={AuthRoutes.Properties}
              key={i}
            />

            <GraficaPoints ALL_ROUTES={AuthRoutes} MODO_RENDER={MODO_RENDER} />

            <CircleMarker
              center={AuthRoutes.GenPoints[0]}
              pathOptions={AuthRoutes.Properties}
              radius={5}
            >
              <Tooltip sticky>{AuthRoutes.Nombre}</Tooltip>
            </CircleMarker>
          </div>
          ))
        ))
      )}
    </div>
  );
}

export function GraficaPoints({ ALL_ROUTES, MODO_RENDER }) {
  if (MODO_RENDER === 1) {
    return (
      <>
        <Polyline
          pathOptions={ALL_ROUTES.Properties}
          positions={ALL_ROUTES.GenPoints}
          key={1}
        />
      </>
    );
  } else if (MODO_RENDER === 2) {
    return (
      <>
        {React.Children.toArray(
          ALL_ROUTES.PartialPoints.map((e, i) => (
            <>
              <Polyline
                pathOptions={e.Properties}
                positions={e.Points}
                key={i}
              />
            </>
          ))
        )}
      </>
    );
  } else {
    return <></>;
  }
}
