import './App.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { PiMountainsLight } from "react-icons/pi";
import wainwright_info from "./json/wainwrights.json"
import Inputform from "./Inputform.js"
import {isEmpty} from "lodash"
import {MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import L from 'leaflet';
import mountainImg from './icons/unclimbedMountain.png';
import climbedMountain from './icons/climbedMountain.png';



function App() {
  const [viewMountain, setViewMountain] = useState()
  const [showForm, setShowForm] = useState(false);
  const position = [54.46, -3.09]
  const lakeDistrictBounds = [
    [54.20, -3.50], // South-West corner
    [54.85, -2.75], // North-East corner
  ];
const mountainIcon = new L.Icon({
  iconUrl: mountainImg,
  iconSize: [16, 16],
});

const climbedMountainIcon = new L.Icon({
  iconUrl: climbedMountain,
  iconSize: [16, 16],
});

const [climbed, setClimbed] = useState(() => {
  return new Set(Object.keys(localStorage));
});



const handleMarkerClick = (mountain) => {
    setViewMountain(mountain);
    setShowForm(true);
  };

  useEffect(() => {
    console.log(climbed)
  }, []);

  return (
    <div>
      <h1>Wainwight tracker</h1>
      <div className="map_container">
        <div className="map_row">
          <MapContainer
            center={position}
            zoom={10}
            minZoom={9}
            maxZoom={15}
            maxBounds={lakeDistrictBounds}
            maxBoundsViscosity={1.0}
            style={{ height: "85vh", width: "85vh" }}
            whenCreated={(map) => {
              map.fitBounds(lakeDistrictBounds);
            }}
            >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {Object.entries(wainwright_info).map(([key,value]) => (
              <Marker
                key={key}
                position={[value.latitude, value.longitude]}
                icon={!climbed.has(value.name) ? mountainIcon : climbedMountainIcon}
                eventHandlers={{ click: () => handleMarkerClick(value) }}
              >
                <Popup>{value.name}</Popup>
              </Marker>                 
              )
            )}
          </MapContainer>
        </div>
        <div className="input_row">
          {showForm && 
            <Inputform key={viewMountain.mountainId} mountain={viewMountain} setClimbed={setClimbed}/>
          }
        </div>

      </div>
    </div>
  );
}

export default App;
