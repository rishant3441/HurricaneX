"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Map, { Layer, Source, Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { BeatLoader } from "react-spinners";
import { AlertCircle, Info } from 'lucide-react';

function Page() {
  // All existing state and hooks remain the same
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [showAlerts, setShowAlerts] = useState(true);
  const [isControlOpen, setControlOpen] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [nextRadGoes, setNextRadGoes] = useState(false);
  const [nextRadP24H, setnextRadP24H] = useState(false);
  const [isSatellite, setIsSatellite] = useState(false);

  // All existing useEffects and callbacks remain the same
  useEffect(() => {
    if (user == null) router.push("/sign-in");
  }, [user]);

  useEffect(() => {
    fetch('https://api.weather.gov/alerts/active?area=FL')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const onHover = useCallback(event => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  const onClick = useCallback(event => {
    const { features } = event;
    const clickedFeature = features && features[0];
    setSelectedInfo(clickedFeature && { feature: clickedFeature });
  }, []);

  // All existing styles remain the same
  const layerStyle = {
    id: 'nhc-filled',
    type: 'fill',
    paint: {
      'fill-opacity': 0.3,
      'fill-color': '#FF0000',
      'fill-outline-color': '#000000'
    }
  };

  const markerStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: '#3B82F6',
    borderRadius: '50%',
    border: '3px solid white',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    cursor: 'pointer'
  };

  const radarLayerStyle3 = {
    id: 'nexrad-p24h',
    type: 'raster',
    source: 'nexrad-p24h',
    paint: {
      'raster-opacity': 0.6
    }
  };

  const radarLayerStyle4 = {
    id: 'nexrad-goes',
    type: 'raster',
    source: 'nexrad-goes',
    paint: {
      'raster-opacity': 0.3
    }
  };

  if (isLoading) return <BeatLoader color="#3B82F6" cssOverride={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />;

  return (
    <div className="flex flex-col">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">HurricaneX Weather Dashboard</h1>
        <p className="text-sm mt-1">Stay informed with real-time weather alerts and conditions</p>
      </div>
      <div style={{ display: 'flex', minHeight: '100%', height: 'calc(100vh - 116px)' }}>
        <Map
          id="map"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            latitude: 26.609,
            longitude: -80.352,
            zoom: 9.24
          }}
          style={{ width: '70vw', height: '100%' }}
          mapStyle={isSatellite ? "mapbox://styles/mapbox/satellite-v9" : "mapbox://styles/mapbox/streets-v12"}
          interactiveLayerIds={['nhc-filled']}
          onMouseMove={onHover}
          onClick={onClick}
        >
          {/* All existing map layers and sources remain the same */}
          {nextRadP24H && (
            <Source id="nexrad-p24h" type="raster" sceme="tms" tiles={["https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-p24h/{z}/{x}/{y}.png"]}>
              <Layer {...radarLayerStyle3} />
            </Source>
          )}
          {nextRadGoes && (
            <Source id="nexrad-goes" type="raster" sceme="tms" tiles={["https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/goes_east_fulldisk_ch09/{z}/{x}/{y}.png"]}>
              <Layer {...radarLayerStyle4} />
            </Source>
          )}
          {showAlerts && data && (
            <Source id="nhc" type="geojson" data={data}>
              <Layer {...layerStyle} />
            </Source>
          )}
          {userCoordinates && (
            <Marker
              latitude={userCoordinates.latitude}
              longitude={userCoordinates.longitude}
              onClick={() => setPopupInfo(userCoordinates)}
            >
              <div style={markerStyle} title="Your Location"></div>
            </Marker>
          )}
          {popupInfo && (
            <Popup
              latitude={popupInfo.latitude}
              longitude={popupInfo.longitude}
              onClose={() => setPopupInfo(null)}
              closeOnClick={false}
            >
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">Your Location</h3>
                <p>Latitude: {popupInfo.latitude.toFixed(4)}</p>
                <p>Longitude: {popupInfo.longitude.toFixed(4)}</p>
              </div>
            </Popup>
          )}

          {/* Enhanced control panel */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden w-64">
            <button
              onClick={() => setControlOpen(!isControlOpen)}
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-between"
            >
              <span>{isControlOpen ? 'Hide Controls' : 'Show Controls'}</span>
              <Info size={18} />
            </button>
            {isControlOpen && (
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 mb-2">Map Layers</h3>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={showAlerts}
                      onChange={() => setShowAlerts(!showAlerts)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">Weather Alerts</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={nextRadGoes}
                      onChange={() => setNextRadGoes(!nextRadGoes)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">Satellite Imagery</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={nextRadP24H}
                      onChange={() => setnextRadP24H(!nextRadP24H)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">24-Hour Precipitation</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={isSatellite}
                      onChange={() => setIsSatellite(!isSatellite)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">Satellite View</span>
                  </label>
                </div>
                <div className="text-xs text-gray-500 mt-4 p-2 bg-blue-50 rounded">
                  <p className="font-medium mb-1">How to use:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Toggle layers using the checkboxes above</li>
                    <li>Click on red areas to view weather alerts</li>
                    <li>Blue dot shows your current location</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Map>

        {/* Enhanced alert panel */}
        <div className="w-[30vw] h-full overflow-y-auto bg-gray-50 border-l border-gray-200">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="mr-2 text-blue-600" />
              Weather Alerts
            </h2>
            {(selectedInfo || hoverInfo) ? (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  {(selectedInfo || hoverInfo).feature.properties.headline}
                </h3>
                <p className="text-gray-700 mt-2">
                  {(selectedInfo || hoverInfo).feature.properties.description}
                </p>
              </div>
            ) : (
              <div className="text-gray-500 text-center p-4">
                <p>Click or hover over a red area on the map to view alert details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;