import React from "react";
import { Polyline, CircleMarker, Tooltip } from "react-leaflet";
import MarcadorRuta from "./MarcadorRuta";
const IterarRutas = (rutasCoordenadas) => {
  // console.log(rutasCoordenadas);
  
  return (
    <div>
      {React.Children.toArray(
        rutasCoordenadas.rutas.map((e, i) => (
          <div>
            <MarcadorRuta
              position={e.coordenada[e.coordenada.length - 1]}
              descripcion={e.nombre}
              key={i}
            />
            <Polyline
              pathOptions={e.colorRuta}
              positions={e.coordenada}
              key={i + 5}
            />
            <CircleMarker
              center={e.coordenada[0]}
              pathOptions={e.colorRuta}
              radius={4}
              >
              <Tooltip sticky>{e.nombre}</Tooltip>
            </CircleMarker>
          </div>
        ))
      )}
    </div>
  );
};

export default IterarRutas;
