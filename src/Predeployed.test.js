import { render, screen } from "@testing-library/react";
import Predeployed from "./Predeployed";

test("renders home page", () => {
  render(<Predeployed />);
  expect(screen.getByRole("h2")).toHaveTextContent(/Predeployment Floats/);
});
