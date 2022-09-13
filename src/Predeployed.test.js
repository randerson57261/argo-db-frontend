import { render, screen } from "@testing-library/react";
import Predeployed from "./Predeployed";

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

test("renders home page", () => {
  render(<Predeployed />);
  expect(screen.getByRole("h2")).toHaveTextContent(/Predeployment Floats/);
});
