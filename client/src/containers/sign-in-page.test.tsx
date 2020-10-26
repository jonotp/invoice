import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import SignInPage, { signInPageTestIds } from "./sign-in-page.container";
import * as ROUTES from "../routes";
import { Router, Switch, Route } from "react-router-dom";
import { Firebase, FirebaseContext } from "../contexts/firebase.context";
import { changeInputByTestId } from "../test-helper";

const firebase = new Firebase();

const testData = {
  email: "spongebob@invoice.com",
  password: "test@1234",
  weakPassword: "asd",
};

const renderMockApp = () => {
  const MockedHomePage = () => <div>Home page</div>;
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
  jest.restoreAllMocks();
});

describe("Sign in tests", () => {
  it("Renders appropriate fields on sign in page", async () => {
    const { getByTestId } = render(<SignInPage />);
    expect(getByTestId(signInPageTestIds.page)).toBeInTheDocument();
    expect(getByTestId(signInPageTestIds.email)).toBeInTheDocument();
    expect(
      getByTestId(signInPageTestIds.email).getElementsByTagName("INPUT")[0]
    ).toBeRequired();
    expect(getByTestId(signInPageTestIds.password)).toBeInTheDocument();
    expect(
      getByTestId(signInPageTestIds.password).getElementsByTagName("INPUT")[0]
    ).toBeRequired();
    expect(getByTestId(signInPageTestIds.submitButton)).toHaveTextContent(
      "Sign In"
    );
  });

  it("Can't submit the sign in form empty required fields", async () => {
    jest
      .spyOn(firebase, "signIn")
      .mockReturnValue(Promise.reject({ code: "auth/invalid-email" }));

    const { getByTestId } = renderMockApp();
    expect(getByTestId(signInPageTestIds.page)).toBeInTheDocument();

    expect(getByTestId(signInPageTestIds.submitButton)).toHaveTextContent(
      "Sign In"
    );
    fireEvent.click(getByTestId(signInPageTestIds.submitButton));
  });

  it("Can't sign in with an invalid user", async () => {
    jest
      .spyOn(firebase, "signIn")
      .mockReturnValue(Promise.reject({ code: "auth/user-not-found" }));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId(signInPageTestIds.page)).toBeInTheDocument();

    const email = changeInputByTestId(getByTestId)(signInPageTestIds.email)(
      testData.email
    );
    expect(email.value).toBe(testData.email);
    const password = changeInputByTestId(getByTestId)(
      signInPageTestIds.password
    )(testData.weakPassword);
    expect(password.value).toBe(testData.weakPassword);

    fireEvent.click(getByTestId(signInPageTestIds.submitButton));
    await waitFor(() => queryByTestId(signInPageTestIds.page));
  });

  it("Can sign in with a valid user", async () => {
    jest
      .spyOn(firebase, "signIn")
      .mockReturnValue(Promise.resolve({ message: "works" }));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId(signInPageTestIds.page)).toBeInTheDocument();

    changeInputByTestId(getByTestId)(signInPageTestIds.email)(testData.email);
    changeInputByTestId(getByTestId)(signInPageTestIds.password)(
      testData.password
    );

    fireEvent.click(getByTestId(signInPageTestIds.submitButton));
    await waitForElementToBeRemoved(() =>
      queryByTestId(signInPageTestIds.page)
    );
  });
});

afterEach(cleanup);
