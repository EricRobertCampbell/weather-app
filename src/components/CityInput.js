import React from "react";
import { Form, Text, FormState } from "informed";

const CityInput = (props) => {
  return (
    <>
      <Form onSubmit={(values) => props.onSubmit(values.city)}>
        <Text field="city" />
        <button type="submit">Submit!</button>
      </Form>
    </>
  );
};

export default CityInput;
