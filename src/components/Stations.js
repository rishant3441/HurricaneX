'use client';

import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const QUERY = gql`
query LocationBySearchTerm($brandId: Int, $cursor: String, $fuel: Int, $lat: Float, $lng: Float, $maxAge: Int, $search: String) {
  locationBySearchTerm(
    lat: $lat
    lng: $lng
    search: $search
    priority: "locality"
  ) {
    stations(
      brandId: $brandId
      cursor: $cursor
      fuel: $fuel
      lat: $lat
      lng: $lng
      maxAge: $maxAge
      priority: "locality"
    ) {
      results {
        address {
          country
          line1
          locality
          postalCode
          region
        }
        name
      }
    }
  }
}
`;

export default function Stations({ setStations, userCoordinates }) {

  if (!userCoordinates || userCoordinates.lat == null || userCoordinates.lng == null) {
      const { data, loading, error } = useQuery(QUERY, {
        variables: {
          lat: 26.7056,
          lng: -80.0364,
          search: "", // Default search term
        },
      });

      useEffect(() => {
        console.log(data)
        console.log(loading)
        console.log(error)
        if (data) {
          const stations = data.locationBySearchTerm.stations.results.map(station => ({
            name: station.name,
            address: `${station.address.line1} ${station.address.locality} ${station.address.region} ${station.address.postalCode} ${station.address.country}`
          }));
          setStations(stations);
        }
      }, [data, setStations]);

      return <h1 style={{ color: 'white', backgroundColor: 'red', padding: '10px', textAlign: 'center', fontSize: '20px', borderRadius: '8px' }}>
        Error: Missing current location, local gas stations can not be shown. Please enable location access </h1>;
    }
  
  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      lat: userCoordinates.lat,
      lng: userCoordinates.lng,
      search: "", // Default search term
    },
  });

  useEffect(() => {
    console.log(data)
    console.log(loading)
    console.log(error)
    if (data) {
      const stations = data.locationBySearchTerm.stations.results.map(station => ({
        name: station.name,
        address: `${station.address.line1} ${station.address.locality} ${station.address.region} ${station.address.postalCode} ${station.address.country}`
      }));
      setStations(stations);
    }
  }, [data, setStations]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return null;
}