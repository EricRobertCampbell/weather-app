import React from "react";
import { useQuery, gql } from "@apollo/client";

export const QUERY_TEMP = gql`
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
      <h2>Temperature in {props.city}</h2>
      <p>Min: {min}</p>
      <p>Max: {max}</p>
    </>
  );
};
export default DisplayTemperature;
