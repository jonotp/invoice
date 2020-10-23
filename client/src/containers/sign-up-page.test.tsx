import React from "react";
import { render, cleanup } from "@testing-library/react";
import SignUpPage from "./sign-up-page.container";

describe("Sign up tests", () => {

  it("Renders appropriate input felds on sign up page", async () => {
    const { getByTestId } = render(<SignUpPage />);
    expect(getByTestId("sign-up-page")).toBeInTheDocument();
    expect(getByTestId("name")).toBeInTheDocument();
    expect(getByTestId("name").getElementsByTagName("INPUT")[0]).toBeRequired();
    expect(getByTestId("email")).toBeInTheDocument();
    expect(getByTestId("email").getElementsByTagName("INPUT")[0]).toBeRequired();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByTestId("password").getElementsByTagName("INPUT")[0]).toBeRequired();
    expect(getByTestId("password-confirmation")).toBeInTheDocument();
    expect(getByTestId("password-confirmation").getElementsByTagName("INPUT")[0]).toBeRequired();
    expect(getByTestId("submit-button")).toHaveTextContent("Sign Up");
  });

});

afterEach(cleanup);