'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Map from "react-map-gl";

import 'mapbox-gl/dist/mapbox-gl.css';

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/sign-in")
    }, [user])

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
            </Map>
        </div>
    );
}

export default Page;