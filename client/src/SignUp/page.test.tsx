import React from "react";
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpPage from "./page";
import Firebase from "../Firebase/firebase";
import FirebaseContext from "../Firebase/firebase.context";
import { createMemoryHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import * as ROUTES from "../routes";
import { typeIntoElement, typeIntoTextBox } from "../test-helper";
import Alerts from "../Alert/alerts.container";
import AlertsProvider from "../Alert/alerts.provider";

const firebase = new Firebase();
const testData = {
  name: "sponge bob",
  email: "spongebob@invoice.com",
  password: "1Asdjfk#$(1",
  unmatchedPassword: "asdfj1",
  weakPassword: "asd",
  duplicateEmail: "duplicate@invoice.com",
};

const renderMockApp = () => {
  const MockedHomePage = () => <div test-dataid="home">Home page</div>;
  const history = createMemoryHistory();
  history.push(ROUTES.SIGN_UP);
  const renderer = render(
    <FirebaseContext.Provider value={firebase}>
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={MockedHomePage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
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

describe("Sign up tests", () => {
  it("Can see appropriate input fields on sign up page", async () => {
    render(<SignUpPage />);
    expect(screen.getByRole("textbox", { name: /name/i })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeRequired();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeRequired();
    expect(screen.getByRole("button", { name: /sign up/i }));
  });

  it("Can't create account with empty required fields", async () => {
    jest
      .spyOn(firebase, "signUp")
      .mockRejectedValueOnce({ code: "auth/invalid-email" });

    renderMockApp();

    userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: /name/i })).toHaveAttribute(
        "aria-invalid",
        "true"
      )
    );
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(screen.getByPlaceholderText(/^password$/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("Can't create account if the password is too weak", async () => {
    try {
      jest
        .spyOn(firebase, "signUp")
        .mockRejectedValueOnce({ code: "auth/invalid-email" });

      renderMockApp();
      typeIntoTextBox("name", testData.name);
      typeIntoTextBox("email", testData.email);
      const password = (await typeIntoElement(
        screen.getByPlaceholderText(/^password$/i),
        testData.weakPassword
      )) as HTMLInputElement;

      userEvent.click(screen.getByRole("button", { name: /sign up/i }));
      await waitFor(() =>
        expect(screen.getByPlaceholderText(/^password$/i)).toHaveAttribute(
          "aria-invalid",
          "true"
        )
      );
      expect(screen.getByRole("textbox", { name: /name/i })).toHaveAttribute(
        "aria-invalid",
        "false"
      );
      expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
        "aria-invalid",
        "false"
      );
    } catch (error) {
      console.error(error);
    }
  });

  it("Can create account if the required fields are entered and the email does not have an account already", async () => {
    jest
      .spyOn(firebase, "signUp")
      .mockReturnValue(Promise.resolve({ message: "Account created" }));

    renderMockApp();

    typeIntoTextBox("name", testData.name);
    typeIntoTextBox("email", testData.email);
    typeIntoElement(
      screen.getByPlaceholderText(/^password$/i),
      testData.password
    );

    userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    await waitForElementToBeRemoved(() =>
      screen.getByRole("button", { name: /sign up/i })
    );
  });

  it("Can see alert when failing to create account with an email address already in use", async () => {
    jest
      .spyOn(firebase, "signUp")
      .mockRejectedValueOnce({ code: "auth/email-already-in-use" });

    render(
      <FirebaseContext.Provider value={firebase}>
        <AlertsProvider>
          <div>
            <SignUpPage />
            <Alerts />
          </div>
        </AlertsProvider>
      </FirebaseContext.Provider>
    );

    typeIntoTextBox("name", testData.name);
    typeIntoTextBox("email", testData.email);
    typeIntoElement(
      screen.getByPlaceholderText(/^password$/i),
      testData.password
    );

    userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    await screen.findByRole("alert");
    screen.getByText(/email already in use/i);
    expect(screen.getByPlaceholderText(/^password$/i)).toHaveAttribute(
      "aria-invalid",
      "false"
    );
    expect(screen.getByRole("textbox", { name: /name/i })).toHaveAttribute(
      "aria-invalid",
      "false"
    );
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
      "aria-invalid",
      "false"
    );
  });
});
