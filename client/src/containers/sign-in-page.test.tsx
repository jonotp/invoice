import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { createMemoryHistory } from "history";
import SignInPage from "./sign-in-page.container";
import * as ROUTES from "../routes";
import { Router, Switch, Route } from "react-router-dom";
import { Firebase, FirebaseContext } from "../contexts/firebase.context";
import { getInputFieldByTestId } from "../test-helper";

jest.mock("../contexts/firebase.context");

const renderMockApp = (firebase: Firebase = new Firebase()) => {
  const MockedHomePage = () => <div>Home page</div>
  const history = createMemoryHistory();
  history.push(ROUTES.SIGN_IN);
  const renderer = render(
    <FirebaseContext.Provider value={firebase}>
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={MockedHomePage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          </Switch>
        </Router>
      </div>
    </FirebaseContext.Provider>
  );
  return renderer;
};

beforeEach(() => {
  mocked(Firebase).mockClear();
});

describe("Sign in tests", () => {
  it("Renders appropriate fields on sign in page", async () => {
    const { getByTestId } = render(<SignInPage />);
    expect(getByTestId("sign-in-page")).toBeInTheDocument();
    expect(getByTestId("email")).toBeInTheDocument();
    expect(
      getByTestId("email").getElementsByTagName("INPUT")[0]
    ).toBeRequired();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(
      getByTestId("password").getElementsByTagName("INPUT")[0]
    ).toBeRequired();
    expect(getByTestId("submit-button")).toHaveTextContent("Sign In");
  });

  it("Can't submit the sign in form empty required fields", async () => {
    const signIn = jest.fn();
    Firebase.prototype.signIn = signIn;
    signIn.mockReturnValue(Promise.reject({code:"auth/invalid-email"}));

    const { getByTestId } = renderMockApp();
    expect(getByTestId("sign-in-page")).toBeInTheDocument();

    expect(getByTestId("submit-button")).toHaveTextContent("Sign In");
    fireEvent.click(getByTestId("submit-button"));
  });

  it("Can't sign in with an invalid user", async () => {
    const signIn = jest.fn();
    Firebase.prototype.signIn = signIn;
    signIn.mockReturnValue(Promise.reject({code:"auth/user-not-found"}));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId("sign-in-page")).toBeInTheDocument();

    const email = getInputFieldByTestId(getByTestId)("email");
    fireEvent.change(email, { target: { value: "spongebob@invoice.com" } });
    expect(email.value).toBe("spongebob@invoice.com");

    const password = getInputFieldByTestId(getByTestId)("password");
    fireEvent.change(password, { target: { value: "asd" } });
    expect(password.value).toBe("asd");

    fireEvent.click(getByTestId("submit-button"));
    await waitFor(() => queryByTestId("sign-in-page"));
  });

  it("Can sign in with a valid user", async () => {
    const signIn = jest.fn();
    Firebase.prototype.signIn = signIn;
    signIn.mockReturnValue(Promise.resolve("works"));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId("sign-in-page")).toBeInTheDocument();

    const email = getInputFieldByTestId(getByTestId)("email");
    fireEvent.change(email, { target: { value: "spongebob@invoice.com" } });

    const password = getInputFieldByTestId(getByTestId)("password");
    fireEvent.change(password, { target: { value: "12qwert" } });

    fireEvent.click(getByTestId("submit-button"));
    await waitForElementToBeRemoved(() => queryByTestId("sign-in-page"));
  });
});

afterEach(cleanup);
