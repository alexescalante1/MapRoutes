import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import RegRujta from "./RegRujta";
import { GraficaRutas } from "./GraficaRutas";

export function RutasMapa({
  REGISTRAR_ROUTE,
  REGISTRAR_ROUTE_COLOR,
  POINTS_OF_REG,
  setPOINTS_OF_REG,
  ALL_ROUTES
}) {

  function LocationMarker({ lRegistra }) {
    const map = useMapEvents({
      click: (e) => {
        if (lRegistra) {
          setPOINTS_OF_REG([...POINTS_OF_REG, [e.latlng.lat, e.latlng.lng]]);
          //console.log(e.latlng);
        }
      },
    });
  }

  useEffect(() => {
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  return (
    <>
      <MapContainer
        center={[-15.476974133853286, -70.1160764694214]}
        zoom={13}
        scrollWheelZoom={true}
        wheelDebounceTime={3}
        keyboard={true}
        tap={true}
        touchZoom={true}
      >
        <LocationMarker lRegistra={REGISTRAR_ROUTE} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          style="width: 200px"
        />
        <RegRujta POINTS_OF_REG={POINTS_OF_REG} REGISTRAR_ROUTE_COLOR={REGISTRAR_ROUTE_COLOR} />
        {/* <GraficaRutas RUTA_BASE={RUTA_BASE_COPY} MODO_RENDER={2} /> */}
        <GraficaRutas ALL_ROUTES={ALL_ROUTES} MODO_RENDER={1} />
      </MapContainer>
    </>
  );
}
