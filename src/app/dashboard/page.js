'use client'
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Map, { Layer, Source } from "react-map-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import { BeatLoader } from "react-spinners";

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    React.useEffect(() => {
        if (user == null) router.push("/sign-in")
    }, [user])

    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    useEffect(() => {
        fetch('https://api.weather.gov/alerts/active?area=FL') // https://api.weather.gov/alerts/active/zone/FLZ068 should become this, currently showing alerts for all of florida
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
                console.log(data)
            })
            .catch(error => console.error(error))
    }, [])

    if (isLoading) return <BeatLoader cssOverride={style}/> 

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
                style={{width: 600, height: 400}}
                mapStyle="mapbox://styles/mapbox/streets-v12"
            >
                <Source id="nhc" type="geojson" data={data}>
                    <Layer {...layerStyle} />
                </Source>
            </Map>
        </div>
    );
}

export default Page;