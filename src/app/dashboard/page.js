'use client'
import React, { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Map, { Layer, Source } from "react-map-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import { BeatLoader } from "react-spinners";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);

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

  return (
    <div style={{ display: 'flex' }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          latitude: 26.609,
          longitude: -80.352,
          zoom: 9.24
        }}
        style={{ width: '70vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        interactiveLayerIds={['nhc-filled']}
        onMouseMove={onHover}
        onClick={onClick}
      >
        <Source id="nhc" type="geojson" data={data}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
      <div style={{ width: '30vw', height: '100vh', padding: '10px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
        {(selectedInfo || hoverInfo) && (
          <div>
            <h3>Alert: {(selectedInfo || hoverInfo).feature.properties.headline}</h3>
            <p>Description: {(selectedInfo || hoverInfo).feature.properties.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
