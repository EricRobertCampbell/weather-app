import React from "react";
import { render, screen, wait, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";

import DisplayTemperature, { QUERY_TEMP } from "./DisplayTemperature";

describe("<DisplayTemperature> should", () => {
  const mocks = [
    {
      request: {
        query: QUERY_TEMP,
        variables: {
          name: "Vancouver",
        },
      },
      result: {
        data: {
          getCityByName: {
            id: 1,
            country: "CA",
            weather: {
              temperature: {
                min: -5,
                max: 5,
              },
            },
          },
        },
      },
    },
  ];
  test("Match the snapshot", async () => {
    const { container, getByText, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DisplayTemperature city="Vancouver" />
      </MockedProvider>
    );

    //wait for the API call to finish
    await wait(() => getByText(/Vancouver/i));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <h2>
          Temperature in 
          Vancouver
        </h2>
        <p>
          Min: 
          -5
        </p>
        <p>
          Max: 
          5
        </p>
      </div>
    `);
  });
  test("Send out a query and display the results", async () => {
    const { getByText, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DisplayTemperature city="Vancouver" />
      </MockedProvider>
    );

    expect(await findByText(/Vancouver/i)).toBeInTheDocument();
    await wait(() => expect(getByText(/Vancouver/i)).toBeInTheDocument());
    // await expect(findByText(/Vancouver/i)).toBeInTheDocument();

    // await wait(() => expect(getByText(/min/i)).toBeInTheDocument());
  });
});
