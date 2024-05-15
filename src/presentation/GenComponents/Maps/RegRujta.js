import React from "react";
import { Marker, Popup, Polyline, CircleMarker, Tooltip } from "react-leaflet";

const RegRujta = (positionData) => {
  const { POINTS_OF_REG, REGISTRAR_ROUTE_COLOR } = positionData;

  const properties = {
    color: REGISTRAR_ROUTE_COLOR,
    opacity: 0.6,
    weight: 7,
    stroke: true,
    fillRule: "evenodd",
    bubblingMouseEvents: true,
  };

  return (
    <div>
      <Polyline pathOptions={properties} positions={POINTS_OF_REG} />
      {
        <CircleMarker
          pathOptions={properties}
          center={
            POINTS_OF_REG.length > 0
              ? POINTS_OF_REG[0]
              : [0, 0]
          }
          radius={3}
        >
          <Popup>Popup in CircleMarker</Popup>
          <Tooltip sticky>Inicio de Ruta</Tooltip>
        </CircleMarker>
      }
    </div>
  );
};

export default RegRujta;
