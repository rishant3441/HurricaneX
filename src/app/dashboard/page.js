'use client'
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GoogleMap, LoadScript, Data } from '@react-google-maps/api';
import { BeatLoader } from "react-spinners";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [showAlerts, setShowAlerts] = useState(true);
  const [isControlOpen, setControlOpen] = useState(false);

  // Ensure hooks are called unconditionally
  const center = useMemo(() => ({ lat: 26.609, lng: -80.352 }), []);

  useEffect(() => {
    if (user == null) router.push("/sign-in");
  }, [user, router]);

  useEffect(() => {
    fetch('https://api.weather.gov/alerts/active?area=FL')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  const onHover = useCallback((event) => {
    // Implement hover logic if needed
  }, []);

  const onClick = useCallback((event) => {
    // Implement click logic if needed
  }, []);

  if (isLoading) return <BeatLoader cssOverride={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />;

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
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            center={center}
            zoom={9.24}
            mapContainerStyle={{ width: '70vw', height: '70vw' }}
            onClick={onClick}
            onMouseMove={onHover}
          >
            {showAlerts && data && (
              <Data>
                {data.features.map((feature, index) => (
                  <Data.Feature
                    key={index}
                    geometry={feature.geometry}
                    options={{ fillColor: '#FF0000', fillOpacity: 0.3 }}
                  />
                ))}
              </Data>
            )}
          </GoogleMap>
        </LoadScript>
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
      </div>
      <div style={{ width: '30vw', height: '70vw', padding: '10px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
        {(selectedInfo || hoverInfo) && (
          <div>
            <h3>
              <span style={alertStyle}>Alert: </span>
              {(selectedInfo || hoverInfo)?.feature?.properties?.headline}
            </h3>
            <p>
              <span style={descriptionStyle}>Description: </span>
              {(selectedInfo || hoverInfo)?.feature?.properties?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
