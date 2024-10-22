import React, { useEffect, useRef } from 'react';
import { Map } from '@vis.gl/react-google-maps';

export default function GoogleMap({ userCoordinates }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current && userCoordinates) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: userCoordinates,
        zoom: 9.2,
        gestureHandling: 'greedy',
        disableDefaultUI: true,
      });

      const customIcon = {
        path: 'M 0,0 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0', // Circle path
        fillColor: 'blue',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2,
        scale: 1
      };

      new window.google.maps.Marker({
        position: userCoordinates,
        map,
        icon: customIcon,
        title: 'Your Location',
      });
    }
  }, [userCoordinates]);

  return (
    <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />
  );
}