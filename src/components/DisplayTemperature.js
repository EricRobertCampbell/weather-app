import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY_TEMP = gql`
  query($name: String!) {
    getCityByName(name: $name) {
      id
      country
      weather {
        temperature {
          min
          max
        }
      }
    }
  }
`;

const DisplayTemperature = (props) => {
  const { loading, error, data } = useQuery(QUERY_TEMP, {
    variables: {
      name: props.city,
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return (
      <>
        <p>Error!</p>
        <pre>{JSON.stringify(error, null, 4)}</pre>
      </>
    );
  }

  const { min, max } = data.getCityByName.weather.temperature;
  return (
    <>
      <p>Min: {min}</p>
      <p>Max: {max}</p>
    </>
  );
};
export default DisplayTemperature;
