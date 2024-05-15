import React from 'react'
import { Marker,Popup} from 'react-leaflet'
const MarcadorRuta = ({position, descripcion}) => {
  return (
    <Marker position={position}>
      <Popup>
        <p>{descripcion}</p>
      </Popup>
    </Marker>
  )
}

export default MarcadorRuta