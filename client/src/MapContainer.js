import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from './index.css'
import 'mapbox-gl/dist/mapbox-gl.css';

// this is the react / mapbox direct approach
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

mapboxgl.accessToken = 'sk.eyJ1IjoidXdjYW1wdXNjb21wYXNzIiwiYSI6ImNsczVnZXVsYjE3N3MybG4yeDJrYXZwbWcifQ.TLarK5RAcGNSX0HV9v3f_Q';
// be sure to add key here ^^

export const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9); // starting longitude
  const [lat, setLat] = useState(42.35); // starting latitude
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className={ styles.sidebar }> {/* probably remove this? */}
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={ styles.MapContainer } />
    </div>
  );
}