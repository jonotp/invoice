import React from "react";
import { render, cleanup } from "@testing-library/react";
import SignInPage from "./sign-in-page.container";

describe("Sign in tests", () => {

  it("Renders appropriate fields on sign in page", async () => {
    const { getByTestId } = render(<SignInPage />);
    expect(getByTestId("sign-in-page")).toBeInTheDocument();
    expect(getByTestId("email")).toBeInTheDocument();
    expect(getByTestId("email").getElementsByTagName("INPUT")[0]).toBeRequired();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByTestId("password").getElementsByTagName("INPUT")[0]).toBeRequired();
    expect(getByTestId("submit-button")).toHaveTextContent("Sign In");
  });

});

afterEach(cleanup);