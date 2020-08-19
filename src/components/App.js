import React, { useState } from "react";

import CityInput from "./CityInput";
import DisplayTemperature from "./DisplayTemperature";

const App = (props) => {
  const [city, setCity] = useState();
  const handleSubmit = (city) => {
    setCity(city);
  };
  return (
    <>
      <CityInput onSubmit={handleSubmit} />
      {city ? <DisplayTemperature city={city} /> : null}
    </>
  );
};

export default App;
