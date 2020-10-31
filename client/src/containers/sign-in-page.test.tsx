import React from "react";
import {
  render,
  waitForElementToBeRemoved,
  waitFor,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import SignInPage from "./sign-in-page.container";
import * as ROUTES from "../routes";
import { Router, Switch, Route } from "react-router-dom";
import { Firebase, FirebaseContext } from "../contexts/firebase.context";
import { typeIntoTextBox, typeIntoLabelField } from "../test-helper";
import Alerts from "./alerts.container";
import { AlertsContextProvider } from "../contexts/alerts.context";

const firebase = new Firebase();

const testData = {
  email: "spongebob@invoice.com",
  password: "asdf213@",
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
  it("Can see appropriate fields on sign in page", async () => {
    render(<SignInPage />);
    expect(screen.getByRole("heading")).toHaveTextContent(/sign in/i);
    expect(screen.getByRole("textbox", { name: /email/i })).toBeRequired();
    expect(screen.getByLabelText(/password/i)).toBeRequired();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("Can't submit the sign in form wth empty required fields", async () => {
    jest
      .spyOn(firebase, "signIn")
      .mockReturnValue(Promise.reject({ code: "auth/invalid-email" }));

    renderMockApp();
    expect(screen.getByRole("heading")).toHaveTextContent(/sign in/i);

    userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
        "aria-invalid",
        "true"
      )
    );
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("Can't sign in with an invalid user", async () => {
    jest
      .spyOn(firebase, "signIn")
      .mockReturnValue(Promise.reject({ code: "auth/user-not-found" }));

    renderMockApp();
    expect(screen.getByRole("heading")).toHaveTextContent(/sign in/i);
    const email = typeIntoTextBox("Email", testData.email);
    expect(email).toHaveValue(testData.email);
    const password = typeIntoLabelField("Password", testData.weakPassword);
    expect(password).toHaveValue(testData.weakPassword);

    userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
        "aria-invalid",
        "true"
      )
    );
    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("Can sign in with a valid user", async () => {
    jest
      .spyOn(firebase, "signIn")
      .mockReturnValue(Promise.resolve({ message: "works" }));

    renderMockApp();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /sign in/i
    );
    typeIntoTextBox("Email", testData.email);
    typeIntoLabelField("Password", testData.password);

    userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitForElementToBeRemoved(() =>
      screen.getByRole("heading", { level: 1 })
    );
  });

  it("Can see alert message after invalid sign in", async () => {
    jest
      .spyOn(firebase, "signIn")
      .mockReturnValue(Promise.reject({ code: "auth/invalid-email" }));

    render(
      <FirebaseContext.Provider value={firebase}>
        <AlertsContextProvider>
          <div>
            <SignInPage />
            <Alerts />
          </div>
        </AlertsContextProvider>
      </FirebaseContext.Provider>
    );

    userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await screen.findByRole("alert");
    screen.getByText("Bad credentials. Please login again.");
  });
});
