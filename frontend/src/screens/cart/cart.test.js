import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "./cart.page.js";

import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CartPage", () => {
  test("renders Cart component without crashing", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    expect(screen.getByTestId("cart-id")).toBeInTheDocument();
  });

  test('displays "No items in the cart" when there are no items', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    expect(screen.getByText("No items in the cart")).toBeInTheDocument();
  });

  test("renders cart items correctly", () => {
    const cartItems = [
      { itemName: "Item 1", itemPrice: 10, itemQuantity: 2 },
      { itemName: "Item 2", itemPrice: 20, itemQuantity: 1 },
    ];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test('calls removeItem function when "Remove" button is clicked', () => {
    const cartItems = [
      { itemName: "Item 1", itemPrice: 10, itemQuantity: 2 },
      { itemName: "Item 2", itemPrice: 20, itemQuantity: 1 },
    ];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    const removeButton = screen.getAllByText("Remove");
    fireEvent.click(removeButton[0]);
  });

  test("updates the shippingMethod state when the shipping method is changed", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    const homeDeliveryRadio = screen.getByLabelText("Home Delivery");
    fireEvent.click(homeDeliveryRadio);
    expect(screen.getByLabelText("Home Delivery")).toBeChecked();
  });
});
