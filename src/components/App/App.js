import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import UserLocation from '../UserLocation/UserLocation';
import SearchBar from '../SearchBar/SearchBar';
import Page from '../Page/Page';
import TimeZone from '../TimeZone/TimeZone';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Layout, Col, Row } from 'antd';
const { Header, Footer, Content } = Layout;

// Declare parameters for useLoadScript here to avoid re-render
const libraries = ['places'];
const mapContainerStyle = {
  width: "100vw",
  height: "75vh",
  marginBottom: "20px"
};

const center = {
  lat: 49,
  lng: -79
}


function App() {
  const { isLoaded, loadError } = useLoadScript({
    // For testing convenience, I pasted my API key here [should avoid doing so for safety reasons]
    googleMapsApiKey: "AIzaSyAtaq8slmudqh6cqimEhKGAn16DzyVLv3E",
    libraries: libraries,
  })
  const [markers, setMarkers] = useState([]);
  const lastMarker = markers ? markers[markers.length - 1] : false;

  //retain the real map instance
  const mapRef = useRef();
  //onLoad function to get map instance when map is loaded
  const onMapLoad = useCallback((map) => {
    //set map instance got from google map component to mapRef
    mapRef.current = map;
  }, []);

  // Move / Recenter the map after grabbing new {lat, lng} 
  const panTo = useCallback(({ lat, lng }, zoom) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoom);
  }, []);

  // Store the new marker after searching
  const markersStore = (newMarker) => {
    console.log(newMarker);
    setMarkers((prev) => [...prev, newMarker]);
  }

  // Delete seleted markers from the history table
  const handleDelete = (deleteIdArray) => {
    if (deleteIdArray) {
      console.log(deleteIdArray);
      setMarkers(markers.filter(m => !deleteIdArray.includes(m.id)));
    }


  }

  if (!isLoaded) return "Loading...";


  return (
    <div>
      <Layout>
        <Header>
          <SearchBar panTo={panTo} markersStore={markersStore} />
          <UserLocation panTo={panTo} />
        </Header>

        <Content>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
            // onClick={onMapClick}
            onLoad={onMapLoad}

          >
            {markers.map(marker => <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />)}
          </GoogleMap>



          {/* <Page markers={markers} handleDelete={handleDelete} /> */}
          {/* <TimeZone lastMarker={lastMarker} /> */}

          <Row>
            <Col flex={4}><Page markers={markers} handleDelete={handleDelete} /></Col>
            <Col flex={2}><TimeZone lastMarker={lastMarker} /></Col>
          </Row>

        </Content>


        <Footer>
          <p>Created by Xinying</p>
          <p>Referrences: GoogleMapsAPI Documents, AntD Documents</p>
        </Footer>
      </Layout>

    </div>
  );
}
export default App;
