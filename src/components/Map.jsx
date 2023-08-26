import React, { useEffect, useState } from 'react'
import styles from "./Map.module.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';
import { useURLPosition } from '../hooks/useURLPosition';
const Map = () => {
  const [mapPosition, setMapPosition] = useState([40, 40])
  const [lat,lng]=useURLPosition();
  const navigate=useNavigate();
  const {
    isLoading:isLoadingPosition,
    position:geolocationPosition,
    getPosition
  }=useGeolocation()


  const { cities } = useCities()

  useEffect(()=>{
    if(lat && lng)
    setMapPosition([lat,lng])
  },[lat,lng])
  
  useEffect(()=>{
    if(geolocationPosition){
      setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
      navigate(`form?lat=${geolocationPosition.lat}&lng=${geolocationPosition.lng}`)
    }
  },[geolocationPosition])


  return (
    <div className={styles.mapContainer}>
      { <Button type="position" onClick={getPosition} >{isLoadingPosition ? "Loading": "Use Your Location"}</Button>}
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          cities.map((city) => <Marker position={[city.position.lat,city.position.lng]}>
            <Popup>
             <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>)
        }

      <ChangeCenter position={mapPosition} />
      <DetectClick />
      </MapContainer>
    </div>
  )
}


function ChangeCenter({position})
{
  const map =useMap();
  map.setView(position)
  // const {setView}=useMap()
  // console.log(setView)
  // setView(position)
  return null;
}

function DetectClick()
{
  const navigate=useNavigate()
  useMapEvents({
    click: e => {
      console.log(e)
      
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
      // setSearchParams()
    }
  })
}

export default Map