import React from "react";
import ExplorerComponent from "./ExplorerComponent";
import * as data from "./data.json";
import { render } from "@testing-library/react";

test("explorer component renders title", () => {
  const { getByText } = render(
    <ExplorerComponent
      title={data.title}
      url={data.url}
      method={data.method}
      body={data.body}
    />
  );
  const title = getByText(/Add new user/i);
  expect(title).toBeInTheDocument();
});

test("explorer component renders url", () => {
  const { getByText } = render(
    <ExplorerComponent
      title={data.title}
      url={data.url}
      method={data.method}
      body={data.body}
    />
  );
  const url = getByText(/Base URL/i);
  expect(url).toBeInTheDocument();
});

test("explorer component renders method", () => {
  const { getByText } = render(
    <ExplorerComponent
      title={data.title}
      url={data.url}
      method={data.method}
      body={data.body}
    />
  );
  const method = getByText(data.method);
  expect(method).toBeInTheDocument();
});

test("explorer component renders form body", () => {
  const { getByText } = render(
    <ExplorerComponent
      title={data.title}
      url={data.url}
      method={data.method}
      body={data.body}
    />
  );
  const body = getByText(/body/i);
  expect(body).toBeInTheDocument();
});
