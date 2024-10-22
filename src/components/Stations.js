import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";

const QUERY = gql`
query LocationBySearchTerm($brandId: Int, $cursor: String, $fuel: Int, $lat: Float, $lng: Float, $maxAge: Int, $search: String) {
  locationBySearchTerm(
    lat: $lat
    lng: $lng
    search: $search
    priority: "locality"
  ) {
    countryCode
    displayName
    latitude
    longitude
    regionCode
    stations(
      brandId: $brandId
      cursor: $cursor
      fuel: $fuel
      lat: $lat
      lng: $lng
      maxAge: $maxAge
      priority: "locality"
    ) {
      count
      cursor {
        next
        __typename
      }
      results {
        address {
          country
          line1
          line2
          locality
          postalCode
          region
          __typename
        }
        emergencyStatus {
          hasDiesel {
            nickname
            reportStatus
            updateDate
            __typename
          }
          hasGas {
            nickname
            reportStatus
            updateDate
            __typename
          }
          hasPower {
            nickname
            reportStatus
            updateDate
            __typename
          }
          __typename
        }
        fuels
        hasActiveOutage
        name
        prices {
          cash {
            nickname
            postedTime
            price
            formattedPrice
            __typename
          }
          credit {
            nickname
            postedTime
            price
            formattedPrice
            __typename
          }
          discount
          fuelProduct
          __typename
        }
        priceUnit
        __typename
      }
      __typename
    }
    trends {
      areaName
      country
      today
      todayLow
      trend
      __typename
    }
    __typename
  }
}
`;

export default function Countries() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div>
        
    </div>
  );
}