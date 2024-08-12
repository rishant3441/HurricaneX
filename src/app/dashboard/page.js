'use client'
import React, { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Map, { Layer, Source, Popup } from "react-map-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import { BeatLoader } from "react-spinners";

function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

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
    <div>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          latitude: 26.609,
          longitude: -80.352,
          zoom: 9.24
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        interactiveLayerIds={['nhc-filled']}
        onMouseMove={onHover}
      >
        <Source id="nhc" type="geojson" data={data}>
          <Layer {...layerStyle} />
        </Source>
        {hoverInfo && (
          <Popup longitude={hoverInfo.feature.geometry.coordinates[0][0][0]} latitude={hoverInfo.feature.geometry.coordinates[0][0][1]}
            closeButton={false}
            offsetTop={-10}>
            <div>
              <strong>Alert:</strong> {hoverInfo.feature.properties.headline}
            </div>
            <div>
              <strong>Description:</strong> {hoverInfo.feature.properties.description}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default Page;
