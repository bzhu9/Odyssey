import React, { Component, useEffect, useState } from "react";
import coordinates from './coordinates.json'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { DirectionsRenderer, DirectionsService, DistanceMatrixService, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

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
  const location = useLocation();
  const navigate = useNavigate();
  const [mapResponse, setMapResponse] = useState(null)
  const [destPos, setDestPos] = useState({})
  const [timeString, setTimeString] = useState("Loading...")
  // const [timeString, setTimeString] = useState("Loading...")
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const setDestPosFunc = async () => {
    try {
      //get event
      // const eventID = localStorage.getItem('eventID');
      // const response = await api.getSingleEvent(eventID);
      // const coords = coordinates[response.data.location.split(" ")[0].toUpperCase()]
      const loc = location.state.location;
      if (!loc) {
        return;
      }
      const coords = coordinates[loc.split(" ")[0].toUpperCase()]
      // destPos = {
      //   lat: Number(coords.lat),
      //   lng: Number(coords.long)
      // }
      setDestPos({lat: Number(coords.lat), lng: Number(coords.long)})
    } catch (error) {
      console.log(error);
    }
  }

//   const findTime = async () => {
//     const matrix = new google.maps.DistanceMatrixService();

//     matrix.getDistanceMatrix({
//     origins: [new google.maps.LatLng(25.7694708, -80.259947)],
//     destinations: [new google.maps.LatLng(25.768915, -80.254659)],
//     travelMode: google.maps.TravelMode.DRIVING,
// }, function(response, status) {
//     timeString = response.data.rows.elements.duration.text
//     timeFound = true
// });
//   }

//   useEffect(() => {
//     if (!timeFound) {
//     if (userPos.lat != undefined && destPos.lat != undefined) {
//       findTime()
//       timeFound = true
//     }
//     else {
//       console.log("happened")
//     }
//     }
//   }, [userPos, destPos])

  useEffect(() => {
    setDestPosFunc()
  }, [])
  

  const directionsCallback = React.useCallback(function callback(response) {
    if (mapResponse == null) {
      setMapResponse(response)
    }
    console.log("callback")
  })

  const timeCallback = React.useCallback(function callback(response) {
    if (timeString == "Loading...") {
      setTimeString("Estimated travel duration: " + response.rows[0].elements[0].duration.text)
      console.log(timeString)
    }
  })

  function goBack() {
    navigate("../changeEvent", {
      state: {
        location: location.state.location,
      }
    })
  }

  // useEffect(() => {
  //   if (timeString != "Loading...") {
  //     finalTimeString = timeString
  //   }
  // }, [timeString])

  

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
                userPos != {lat: 40.426786, lng: -86.925446}
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

            {
              (destPos != {} && userPos != {lat: 40.426786, lng: -86.925446}) && timeString == "Loading..." && (
                <DistanceMatrixService
                  options={{
                    destinations: [destPos],
                    origins: [userPos],
                    travelMode: "WALKING"
                  }}
                  callback={timeCallback}
                  onLoad={distanceMatrixService => {
                    console.log('DistanceMatrix onLoad: ' + distanceMatrixService)
                  }}
                  onUnmount={distanceMatrixService => {
                    console.log('DistanceMatrix onUnmount: ' + distanceMatrixService)
                  }}
                />
              )
            }
          </GoogleMap>
          <p>{timeString}</p>
      {/* <Link to="/changeEvent"> */}
      <button size ="45" onClick={goBack}>Back</button>
      {/* </Link> */}
      </div>  
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : (
    <div>
      <p>Loading</p>
      {/* <Link to="/changeEvent"> */}
        <button size ="45" onClick={goBack}>Back</button>
      {/* </Link> */}
    </div>
  )
}

export default Directions