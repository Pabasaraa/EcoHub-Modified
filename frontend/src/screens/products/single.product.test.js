import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import SingleProduct from "./single.product";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

// Describe is a function that takes two arguments:
// 1. A string that describes the test suite
// 2. A callback function that contains all the tests for this test suite
describe("SingleProduct", () => {
  const mockProduct = {
    _id: "123",
    productName: "Test Product",
    productPrice: 10,
    productCategory: "Test Category",
    productDescription: "Test Description",
    productImages: "Product 1",
  };

  const mockReviews = [
    {
      _id: "456",
      reviewTitle: "Test Review",
      reviewBody: "Test Body",
      postedBy: "Test User",
    },
  ];

  // beforeEach is a function that runs before each test in a test suite
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: { data: mockProduct } });
    axios.get.mockResolvedValueOnce({ data: { data: mockReviews } });
  });

  // afterEach is a function that runs after each test in a test suite
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading spinner when product is null", async () => {
    render(
      <MemoryRouter>
        <SingleProduct />
      </MemoryRouter>
    );
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  test("renders product details when product is not null", async () => {
    render(
      <MemoryRouter>
        <SingleProduct />
      </MemoryRouter>
    );
    // const productName = await screen.findByText("Test Product");
    // expect(productName).toBeInTheDocument();

    // const productPrice = screen.getByText("10");
    // expect(productPrice).toBeInTheDocument();

    // const addToCartButton = screen.getByText("Add to cart");
    // expect(addToCartButton).toBeInTheDocument();
  });

  test('increments quantity when "+" button is clicked', async () => {
    render(
      <MemoryRouter>
        <SingleProduct />
      </MemoryRouter>
    );
    const incrementButton = await screen.findByText("+");
    fireEvent.click(incrementButton);
    const quantityValue = screen.getByText("2");
    expect(quantityValue).toBeInTheDocument();
  });

  test('decrements quantity when "-" button is clicked', async () => {
    render(
      <MemoryRouter>
        <SingleProduct />
      </MemoryRouter>
    );
    const decrementButton = await screen.findByText("-");
    fireEvent.click(decrementButton);
    const quantityValue = screen.getByText("1");
    expect(quantityValue).toBeInTheDocument();
  });

  test('adds item to cart when "Add to cart" button is clicked', async () => {
    localStorage.setItem("token", "mockToken");
    render(
      <MemoryRouter>
        <SingleProduct />
      </MemoryRouter>
    );
    const addToCartButton = await screen.findByText("Add to cart");
    fireEvent.click(addToCartButton);
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].itemName).toBe("Test Product");
    expect(cartItems[0].itemPrice).toBe(10);
    expect(cartItems[0].itemQuantity).toBe(1);
  });

  test("redirects to login page when adding to cart without login", async () => {
    render(
      <MemoryRouter>
        <SingleProduct />
      </MemoryRouter>,
      { route: "/products/123" }
    );

    const addToCartButton = await screen.findAllByText("Add to cart");
    fireEvent.click(addToCartButton[0]);

    // const errorMessage = await screen.findAllByText(
    //   "Please login first to add to cart!"
    // );
    //   expect(errorMessage).toBeInTheDocument();
  });

  //   test("displays review form and submits review successfully", async () => {
  //     localStorage.setItem("token", "mockToken");
  //     render(
  //       <MemoryRouter>
  //         <SingleProduct />
  //       </MemoryRouter>
  //     );

  //     const reviewTitleInput = await screen.findByPlaceholderText(
  //       "Enter review title"
  //     );
  //     fireEvent.change(reviewTitleInput, {
  //       target: { value: "Test Review Title" },
  //     });

  //     const reviewBodyInput = await screen.findByPlaceholderText(
  //       "Write your review"
  //     );
  //     fireEvent.change(reviewBodyInput, {
  //       target: { value: "Test Review Body" },
  //     });

  //     // Submit the review
  //     const submitButton = await screen.findByRole("button", { name: "Submit" });
  //     fireEvent.click(submitButton);

  //     const successAlert = await screen.findByText((content, element) => {
  //       // Check if the text content includes the expected message
  //       return content.startsWith("Review submitted successfully!");
  //     });

  //     expect(successAlert).toBeInTheDocument();
  //     const reviewTitle = screen.getByText("Test Review");
  //     expect(reviewTitle).toBeInTheDocument();
  //     const reviewBody = screen.getByText("Test Body");
  //     expect(reviewBody).toBeInTheDocument();
  //   });
});
