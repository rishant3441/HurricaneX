'use client'
import React, { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Map, { Layer, Source } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { BeatLoader } from "react-spinners";
import GoogleMap from "@/components/GoogleMap";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [showAlerts, setShowAlerts] = useState(true); // State for toggling alerts
  const [isControlOpen, setControlOpen] = useState(false); // State for collapsible control

  useEffect(() => {
    if (user == null) router.push("/sign-in");
  }, [user]);

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

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

  if (isLoading) return <BeatLoader cssOverride={style} />;

  const layerStyle = {
    id: 'nhc-filled',
    type: 'fill',
    paint: {
      'fill-opacity': 0.3,
      'fill-color': '#FF0000'
    }
  };

  const alertStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: 'red'
  };

  const descriptionStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline'
  };

  return (
    <div className="flex flex-col">
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          latitude: 26.609,
          longitude: -80.352,
          zoom: 9.24
        }}
        style={{ width: '70vw', height: '70vw' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        interactiveLayerIds={['nhc-filled']}
        onMouseMove={onHover}
        onClick={onClick}
      >
        {showAlerts && data && (
          <Source id="nhc" type="geojson" data={data}>
            <Layer {...layerStyle} />
          </Source>
        )}
        {/* Collapsible control */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: '#ffffff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '5px',
          boxShadow: '0 0 5px rgba(0,0,0,0.3)',
          zIndex: 1,
          width: '200px'
        }}>
          <button
            onClick={() => setControlOpen(!isControlOpen)}
            style={{ width: '100%', marginBottom: '5px', padding: '5px', border: 'none', backgroundColor: '#007bff', color: '#ffffff', borderRadius: '4px' }}
          >
            {isControlOpen ? 'Hide Controls' : 'Show Controls'}
          </button>
          {isControlOpen && (
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={showAlerts}
                  onChange={() => setShowAlerts(!showAlerts)}
                />
                Show Alerts
              </label>
            </div>
          )}
        </div>
      </Map>
      <div style={{ width: '30vw', height: '70vw', padding: '10px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
        {(selectedInfo || hoverInfo) && (
          <div>
            <h3>
              <span style={alertStyle}>Alert: </span>
              {(selectedInfo || hoverInfo).feature.properties.headline}
            </h3>
            <p>
              <span style={descriptionStyle}>Description: </span>
              {(selectedInfo || hoverInfo).feature.properties.description}
            </p>
          </div>
        )}
      </div>
    </div>
    <GoogleMap className="flex" />
    </div>
  );
}

export default Page;
