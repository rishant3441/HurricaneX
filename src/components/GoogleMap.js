<<<<<<< HEAD
// GoogleMap.js
import { Map, Marker } from '@vis.gl/react-google-maps';

// Updated shelter data with addresses
const SHELTERS = [
    {
        name: "West Boca Raton High School",
        position: { lat: 26.361944, lng: -80.247222 },
        address: "12811 Glades Rd, Boca Raton, FL 33498"
    },
    {
        name: "Park Vista High School",
        position: { lat: 26.559000, lng: -80.144028 },
        address: "7900 Jog Rd, Lake Worth Corridor, FL 33467"
    },
    {
        name: "West Boynton Park and Recreation Center",
        position: { lat: 26.560361, lng: -80.140611 },
        address: "6000 Northtree Blvd, Lake Worth Beach, FL 33463"
    },
    {
        name: "Palm Beach Central High School",
        position: { lat: 26.651028, lng: -80.178611 },
        address: "8499 W Forest Hill Blvd, Wellington, FL 33411"
    },
    {
        name: "Seminole Ridge High School",
        position: { lat: 26.746667, lng: -80.310694 },
        address: "4601 Seminole Pratt Whitney Rd, Loxahatchee, FL 33470"
    },
    {
        name: "Atlantic Community High School",
        position: { lat: 26.462611, lng: -80.098250 },
        address: "2455 W Atlantic Ave, Delray Beach, FL 33445"
    },
    {
        name: "John I Leonard High School",
        position: { lat: 26.630139, lng: -80.116361 },
        address: "4701 10th Ave N, Greenacres, FL 33463"
    },
    {
        name: "Boca Raton High School",
        position: { lat: 26.364694, lng: -80.117389 },
        address: "1501 NW 15th Ct, Boca Raton, FL 33486"
    },
    {
        name: "Boynton Beach High School",
        position: { lat: 26.546250, lng: -80.083806 },
        address: "4975 Park Ridge Blvd, Boynton Beach, FL 33426"
    },
    {
        name: "Lake Shore Middle School",
        position: { lat: 26.689972, lng: -80.672750 },
        address: "425 W Canal St N, Belle Glade, FL 33430"
    },
    {
        name: "Forest Hill High School",
        position: { lat: 26.654639, lng: -80.064750 },
        address: "6901 Parker Ave, West Palm Beach, FL 33405"
    },
    {
        name: "West Gate Elementary School",
        position: { lat: 26.700056, lng: -80.090472 },
        address: "1545 Loxahatchee Dr, West Palm Beach, FL 33409"
    },
    {
        name: "Dr. Mary McLeod Bethune Elementary",
        position: { lat: 26.776056, lng: -80.083528 },
        address: "1501 Avenue U, West Palm Beach, FL 33404"
    },
    {
        name: "Pahokee Middle School",
        position: { lat: 26.826139, lng: -80.656639 },
        address: "850 Larrimore Rd, Pahokee, FL 33476"
    },
    {
        name: "Palm Beach Gardens High School",
        position: { lat: 26.824111, lng: -80.102500 },
        address: "4245 Holly Dr, Palm Beach Gardens, FL 33410"
    },
    {
        name: "Independence Middle School",
        position: { lat: 26.898389, lng: -80.121694 },
        address: "4001 Greenway Dr, Jupiter, FL 33458"
    }
];

export default function GoogleMap({ userCoordinates, popupInfo, setPopupInfo, showShelters }) {
    // Custom icon for user location
    const userLocationIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#4285F4',  // Google Maps blue
        fillOpacity: 1,
        strokeColor: '#FFFFFF',  // White border
        strokeWeight: 2,
        scale: 8  // Adjust size of the circle
    };

    return (
        <Map
            style={{ width: '100vw', height: '100vh' }}
            defaultCenter={{ lat: 26.609, lng: -80.352 }}
            defaultZoom={9.2}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        >
            {/* User location marker */}
            {userCoordinates && (
                <Marker
                    position={userCoordinates}
                    title="Your Location"
                    icon={userLocationIcon}
                />
            )}

            {/* Shelter markers */}
            {showShelters && SHELTERS.map((shelter, index) => (
                <Marker
                    key={index}
                    position={shelter.position}
                    title={`${shelter.name}\n${shelter.address}`}
                    onClick={() => setPopupInfo(shelter)}
                />
            ))}
        </Map>
    );
=======
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
>>>>>>> c82c0a9c0b33848514e65f1ee716a5f07701ad52
}