import Home from "@/pages/index.page";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("Home", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: "Hello World" })).toBeDefined();
});
