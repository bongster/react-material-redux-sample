import React from "react";
import { createBrowserHistory } from "history";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const history = createBrowserHistory();
  render(<App history={history} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
