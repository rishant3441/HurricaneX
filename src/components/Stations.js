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
        prices {
          fuelProduct
          credit {
            price
          }
        }
        emergencyStatus {
          hasGas {
            reportStatus
          }
        }
      }
    }
  }
}
`;

export default function Stations({ setStations, userCoordinates }) {

  const processStationData = (data) => {
    if (data && data.locationBySearchTerm && data.locationBySearchTerm.stations) {
      const stations = data.locationBySearchTerm.stations.results.map(station => ({
        name: station.name || "not available",
        address: `${station.address.line1 || "not available"} ${station.address.locality || "not available"} ${station.address.region || "not available"} ${station.address.postalCode || "not available"} ${station.address.country || "not available"}`,
        prices: station.prices.map(price => ({
          fuelProduct: price.fuelProduct || "not available",
          price: price.credit.price || "not available"
        })),
        hasGas: (station.emergencyStatus && station.emergencyStatus.hasGas && station.emergencyStatus.hasGas.reportStatus) || "not available"
      }));
      setStations(stations);
    }
  };

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
      processStationData(data);
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
    processStationData(data);
  }, [data, setStations]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return null;
}
