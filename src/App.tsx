import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet'
import './App.css';
import { Site } from './interfaces'



function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Site[]>([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch('/api/teslasites')
      .then(res => res.json())
      .then(
        (result: Site[]) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error has happened</div>;
  } else if (!isLoaded) {
    return <div><div className="lds-dual-ring"></div></div>;
  } else {
    return (
      ///////////////////////////////Renders Map
      <MapContainer center={[37.871593, -122.272743]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* ///////////////Renders and Itirates through Markers on Map*/}
        {items.map(tsla => (
          <Marker key={tsla.id} position={[tsla.gps.latitude, tsla.gps.longitude]}>

            <Popup position={[tsla.gps.latitude, tsla.gps.longitude]}>
              <div>
                <button></button>
                <h1>{"Tesla Supercharging Stations"}</h1>
                <h2>{"Name: " + tsla.name}</h2>
                <p>{"Status: " + tsla.status}</p>
                <p>{"Number of Charging Stations: " + tsla.stallCount}</p>
              </div>
            </Popup>


          </Marker>
        ))}

      </MapContainer>
    );
  }
}

export default App;
