import React, { useState, useRef } from 'react'; 
import { Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';

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
    const [hoveredShelter, setHoveredShelter] = useState(null);
    const [clickedShelter, setClickedShelter] = useState(null); // State for clicked marker
    const hoverTimeout = useRef(null); // Use a ref to hold the timeout

    // Custom icon for user location
    const userLocationIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 8
    };

    // Custom icon for shelter markers
    const shelterIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#FF0000',
        fillOpacity: 0.8,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
        scale: 10
    };

    const handleMouseOver = (shelter) => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        if (!clickedShelter) { // Only update hovered state if no shelter is clicked
            setHoveredShelter(shelter);
        }
    };

    const handleMouseOut = () => {
        if (!clickedShelter) { // Only hide hover popup if no shelter is clicked
            hoverTimeout.current = setTimeout(() => {
                setHoveredShelter(null);
            }, 200); // 200ms delay
        }
    };

    const handleMarkerClick = (shelter) => {
        setClickedShelter(shelter); // Set clicked shelter
        setHoveredShelter(null); // Close any hover popup
    };

    const handleCloseClick = () => {
        setClickedShelter(null); // Clear clicked shelter state when X button is clicked
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

            {/* Shelter markers with hover and click functionality */}
            {showShelters && SHELTERS.map((shelter, index) => (
                <div key={index}>
                    <Marker
                        position={shelter.position}
                        icon={shelterIcon}
                        onMouseOver={() => handleMouseOver(shelter)}
                        onMouseOut={handleMouseOut}
                        onClick={() => handleMarkerClick(shelter)}
                    />
                    
                    {/* Info Window for hover effect (no close button) */}
                    {hoveredShelter === shelter && !clickedShelter && (
                        <InfoWindow
                            position={shelter.position}
                            options={{ disableAutoPan: true, closeBoxURL: '' }} // No close button for hover window
                        >
                            <div className="p-2">
                                <h3 className="font-bold text-lg mb-1">{shelter.name}</h3>
                                <p className="text-sm text-gray-600">{shelter.address}</p>
                            </div>
                        </InfoWindow>
                    )}

                    {/* Info Window for clicked marker (has close button) */}
                    {clickedShelter === shelter && (
                        <InfoWindow
                            position={shelter.position}
                            onCloseClick={handleCloseClick} // Handle default "X" button click
                        >
                            <div className="p-2">
                                <h3 className="font-bold text-lg mb-1">{shelter.name}</h3>
                                <p className="text-sm text-gray-600">{shelter.address}</p>
                            </div>
                        </InfoWindow>
                    )}
                </div>
            ))}
        </Map>
    );
}
