import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { toBeInTheDocument } from "@testing-library/jest-dom/extend-expect";

import AllProducts from "./all.products";

jest.mock("axios");

describe("AllProducts", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            _id: 1,
            adminId: "Product 1",
            productName: "Product 1",
            productDescription: "Product 1",
            productPrice: "Product 1",
            productImages: "Product 1",
            productCategory: "Product 1",
          },
          {
            _id: 1,
            adminId: "Product 1",
            productName: "Product 1",
            productDescription: "Product 1",
            productPrice: "Product 1",
            productImages: "Product 1",
            productCategory: "Product 1",
          },
        ],
      },
    });
  });

  it("renders without error", () => {
    render(
      <MemoryRouter>
        <AllProducts />
      </MemoryRouter>
    );
    expect(screen.getByTestId("all-products")).toBeInTheDocument();
  });

  it("displays loader when products are loading", () => {
    render(
      <MemoryRouter>
        <AllProducts />
      </MemoryRouter>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("displays product cards when products are loaded", async () => {
    render(
      <MemoryRouter>
        <AllProducts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
      expect(screen.getByTestId("product-card-1")).toBeInTheDocument();
      expect(screen.getByTestId("product-card-2")).toBeInTheDocument();
    });
  });
});
