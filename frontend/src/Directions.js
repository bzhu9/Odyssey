import React, { Component, useEffect, useState } from "react";
import api from "./apis"
import coordinates from './coordinates.json'
import { Link } from "react-router-dom"
import { DirectionsRenderer, DirectionsService, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Button } from "rsuite";

// set containerStyle of google maps
const containerStyle = {
  width: '800px',
  height: '600px'
};

// set center of map
const center = {
  lat: 40.425,
  lng: -86.918
};

let userPos = {lat: 40.426786, lng: -86.925446}
console.log("user pos search started")
navigator.geolocation.getCurrentPosition(
  function(position) {
  userPos = {lat: position.coords.latitude, lng: position.coords.longitude}
  console.log('userPos', userPos)
  localStorage.setItem('userPos', userPos)
  },
  function(error) {
      console.error("Error Code = " + error.code + " - " + error.message);
  },
  {
    enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: Infinity
  }
);

export const Directions = (props) => {

  const [mapResponse, setMapResponse] = useState(null)
  const [destPos, setDestPos] = useState({})
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const setDestPosFunc = async () => {
    try {
      //get event
      const eventID = localStorage.getItem('eventID');
      const response = await api.getSingleEvent(eventID);
      const coords = coordinates[response.data.location.split(" ")[0].toUpperCase()]
      // destPos = {
      //   lat: Number(coords.lat),
      //   lng: Number(coords.long)
      // }
      setDestPos({lat: Number(coords.lat), lng: Number(coords.long)})
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setDestPosFunc()
  }, [])
  

  const directionsCallback = React.useCallback(function callback(response) {
    if (mapResponse == null) {
      setMapResponse(response)
    }
    console.log("callback")
  })

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    // const onLoad = React.useCallback(
    //   function onLoad (mapInstance) {
    //     // do something with map Instance
    //   }
    // )
    return <div>
    <GoogleMap
            // required
            id='direction-example'
            // required
            mapContainerStyle={containerStyle}
            // required
            zoom={15}
            // required
            center={center}
            // optional
            // optional
            onLoad={map => {
              console.log('DirectionsRenderer onLoad map: ', map)
            }}
            // optional
            onUnmount={map => {
              console.log('DirectionsRenderer onUnmount map: ', map)
            }}
          >
            {
              (
                destPos != {} &&
                userPos != {}
              ) && (
                <DirectionsService
                  // required
                  options={{
                    destination: destPos,
                    origin: userPos,
                    travelMode: "WALKING"
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  // optional
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                />
              )
            }

            {
              mapResponse !== null && (
                <DirectionsRenderer
                  // required
                  options={{
                    directions: mapResponse
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}
                  // optional
                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
              )
            }
          </GoogleMap>
          <Link to="/changeEvent">
        <button size ="45">Back</button>
      </Link>
      </div>  
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : (
    <div>
      <p>Loading</p>
      <Link to="/changeEvent">
        <button size ="45">Back</button>
      </Link>
    </div>
  )
}

export default Directions