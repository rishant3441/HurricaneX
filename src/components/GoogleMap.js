import React, { useEffect, useRef, useState } from 'react';
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

const FOOD_BANKS = [
    {
        name: "Boca Helping Hands",
        position: { lat: 26.363913484245217, lng: -80.08694943037928 },
        address: "1500 NW 1st Ct, Boca Raton, FL 33432"
    },
    {
        name: "Feeding Palm Beach County",
        position: { lat: 26.541119723116104, lng: -80.07981464571766 },
        address: "4925 Park Ridge Blvd, Boynton Beach, FL 33426"
    },
    {
        name: "Restoration Bridge International (Food Distribution Center)",
        position: { lat: 26.686487808506, lng: -80.19431397270101 },
        address: "7255 S Military Trl, Greenacres, FL 33463"
    },
    {
        name: "CROS Ministries' Lake Worth Food Pantry",
        position: { lat: 26.615576739047718, lng: -80.06445205736068 },
        address: "1615 Lake Ave, Lake Worth Beach, FL 33460"
    },
    {
        name: "Palm Beach County Food Bank",
        position: { lat: 26.62596257849268, lng: -80.07712468804462 },
        address: "701 Boutwell Rd Suite A-2, Lake Worth Beach, FL 33461"
    },
    {
        name: "Palanca Pantry - Food Distribution Center",
        position: { lat: 26.622394908415018, lng: -80.10390437270269 },
        address: "3730 Kirk Road, Lake Worth Beach, FL 33461"
    },
    {
        name: "Farmworker Coordinating Council of Palm Beach County, Inc",
        position: { lat: 26.631896244715936, lng: -80.05780127455098 },
        address: "1123 Crestwood Blvd, Lake Worth Beach, FL 33460"
    },
    {
        name: "Palm Beach Harvest",
        position: { lat: 26.671058698640035, lng: -80.04791385920807 },
        address: "4601 S Flagler Dr, West Palm Beach, FL 33405"
    },
    {
        name: "Tree of Life Resource Center",
        position: { lat: 26.718027259952844, lng: -80.13873451687797 },
        address: "2701 Vista Pkwy Unit A-6, West Palm Beach, FL 33411"
    },
    {
        name: "Feed the Hungry Pantry",
        position: { lat: 26.715054999048487, lng: -80.09615780338457 },
        address: "900 Brandywine Rd, West Palm Beach, FL 33409"
    },
    {
        name: "Extended Hands Community Outreach",
        position: { lat: 26.73086148858527, lng: -80.05604378434477 },
        address: "528 Cheerful St, West Palm Beach, FL 33407"
    },
    {
        name: "Riviera Beach Community Outreach - Food Distribution Center",
        position: { lat: 26.768422504735028, lng: -80.07089517639646 },
        address: "1144 W 6th St, West Palm Beach, FL 33404"
    }
];

export default function GoogleMap({ userCoordinates, popupInfo, setPopupInfo, showShelters, showFoodBanks, showGasStations, stations }) {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const hoverTimeout = useRef(null);
  const [stationMarkers, setStationMarkers] = useState([]);
  const [initialCenter, setInitialCenter] = useState({ lat: 26.609, lng: -80.352 });
  const [initialZoom, setInitialZoom] = useState(9.2);

  // Custom icon definitions
  const userLocationIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#4285F4',
    fillOpacity: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2,
    scale: 8
  };

  const shelterIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#FF0000',
    fillOpacity: 0.8,
    strokeColor: '#FFFFFF',
    strokeWeight: 2,
    scale: 10
  };

  const foodBankIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: '#00FF00',
    fillOpacity: 0.8,
    strokeColor: '#FFFFFF',
    strokeWeight: 2,
    scale: 10
  };

  const stationIcon = {
    url: '/fuel-station.png', // Path to your custom marker image
    scaledSize: new google.maps.Size(32, 32), // Adjust the size as needed
  };

  // Utility function to format fuel product names
  const formatFuelProductName = (name) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Combined handler for hover over any location (shelter, food bank, station)
  const handleMouseOver = (location) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (!clickedLocation) setHoveredLocation(location);
  };

  const handleMouseOut = () => {
    if (!clickedLocation) hoverTimeout.current = setTimeout(() => setHoveredLocation(null), 200);
  };

  const handleClick = (location) => {
    setClickedLocation(location);
    setHoveredLocation(null); // Clear hover on click
  };

  const handleCloseClick = () => setClickedLocation(null);

  // Fetch station markers if provided
  useEffect(() => {
    const geocodeAddress = async (address) => {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      if (data.results.length > 0) return data.results[0].geometry.location;
      else {
        console.error('Geocoding API error:', data);
        return null;
      }
    };

    const fetchStationCoordinates = async () => {
      const markers = await Promise.all(stations.map(async (station) => {
        const location = await geocodeAddress(station.address);
        if (location) {
          return {
            position: location,
            name: station.name,
            address: station.address,
            prices: station.prices,
            hasGas: station.hasGas
          };
        }
        return null;
      }));
      setStationMarkers(markers.filter(marker => marker !== null));
    };

    if (stations) fetchStationCoordinates();
  }, [stations]);

  useEffect(() => {
    if (userCoordinates) {
      setInitialCenter(userCoordinates);
      setInitialZoom(12);
    }
  }, [userCoordinates]);

  return (
    <Map
      style={{ width: '100vw', height: '100vh' }}
      //zoom={initialZoom}
      defaultCenter={initialCenter}
      defaultZoom={initialZoom}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
      {/* User location marker */}
      {userCoordinates && (
        <Marker position={userCoordinates} title="Your Location" icon={userLocationIcon} />
      )}

      {/* Shelter markers */}
      {showShelters && SHELTERS.map((shelter, index) => (
        <Marker
          key={index}
          position={shelter.position}
          icon={shelterIcon}
          onMouseOver={() => handleMouseOver(shelter)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(shelter)}
        />
      ))}

      {/* Food bank markers */}
      {showFoodBanks && FOOD_BANKS.map((foodBank, index) => (
        <Marker
          key={index}
          position={foodBank.position}
          icon={foodBankIcon}
          onMouseOver={() => handleMouseOver(foodBank)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(foodBank)}
        />
      ))}

      {/* Station markers */}
      {showGasStations && stationMarkers.map((station, index) => (
        <Marker
          key={index}
          position={station.position}
          title={station.name}
          icon={stationIcon}
          onMouseOver={() => handleMouseOver(station)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(station)}
        />
      ))}

      {/* InfoWindow for hovered location (no close button) */}
      {hoveredLocation && !clickedLocation && (
        <InfoWindow position={hoveredLocation.position} options={{ disableAutoPan: true }}>
          <div className="p-2">
            <h3 className="font-bold text-lg mb-1">{hoveredLocation.name}</h3>
            <p className="text-sm text-gray-600">{hoveredLocation.address}</p>
            {hoveredLocation.prices && (
              <div>
                <h4 className="font-bold text-md mb-1">Prices:</h4>
                <ul>
                  {hoveredLocation.prices.map((price, index) => (
                    <li key={index}>{formatFuelProductName(price.fuelProduct)}: {price.price ? `$${price.price}` : 'Data Not Available'}</li>
                  ))}
                </ul>
              </div>
            )}
            {hoveredLocation.hasGas !== undefined && (
              <p className="text-sm text-gray-600 font-bold">Has Gas: {hoveredLocation.hasGas ? 'Yes' : 'No'}</p>
            )}
          </div>
        </InfoWindow>
      )}

      {/* InfoWindow for clicked location (with close button) */}
      {clickedLocation && (
        <InfoWindow position={clickedLocation.position} onCloseClick={handleCloseClick}>
          <div className="p-2">
            <h3 className="font-bold text-lg mb-1">{clickedLocation.name}</h3>
            <p className="text-sm text-gray-600">{clickedLocation.address}</p>
            {clickedLocation.prices && (
              <div>
                <h4 className="font-bold text-md mb-1">Prices:</h4>
                <ul>
                  {clickedLocation.prices.map((price, index) => (
                    <li key={index}>{formatFuelProductName(price.fuelProduct)}: {price.price ? `$${price.price}` : 'Data Not Available'}</li>
                  ))}
                </ul>
              </div>
            )}
            {clickedLocation.hasGas !== undefined && (
              <p className="text-sm text-gray-600 font-bold">Has Gas: {clickedLocation.hasGas ? 'Yes' : 'No'}</p>
            )}
          </div>
        </InfoWindow>
      )}
    </Map>
  );
}