import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./apis"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import coordinates from './coordinates.json'

const containerStyle = {
  width: '800px',
  height: '600px'
};

const center = {
  lat: 40.425,
  lng: -86.918
};

let userPos = {}

navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log(position);
    //   setUserPos({
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   })
    userPos = {lat: position.coords.latitude, lng: position.coords.longitude}
      console.log(userPos)
    },
    function(error) {
      console.error("Error Code = " + error.code + " - " + error.message);
    }
  );

export const Directions = (props) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const fetchEvent = async () => {
    try {
      //get event
      const eventID = localStorage.getItem('eventID');
      const response = await api.getSingleEvent(eventID);
      const eObj = response.data;
      console.log(coordinates[response.data.location.split(" ")[0].toUpperCase()])
      //set the list
    } catch (error) {
      console.log(error);
    }
};

useEffect(() => {
    fetchEvent()
})

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);


    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        zoom={15}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      <Link to="/cal">
                <button size="45">Weekly View</button>
            </Link>
            </div>
  ) : <></>
}