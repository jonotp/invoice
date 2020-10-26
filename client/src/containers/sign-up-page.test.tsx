import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SignUpPage, {
  signUpPageTestIds,
} from "./sign-up-page.container";
import { Firebase, FirebaseContext } from "../contexts/firebase.context";
import { createMemoryHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import * as ROUTES from "../routes";
import { changeInputByTestId } from "../test-helper";

const firebase = new Firebase();
const testData = {
  name: "sponge bob",
  email: "spongebob@invoice.com",
  password: "test@1234",
  unmatchedPassword: "UOW@123",
  weakPassword: "asd",
  duplicateEmail: "duplicate@invoice.com"
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

  it("Renders appropriate input fields on sign up page", async () => {
    const { getByTestId } = render(<SignUpPage />);
    expect(getByTestId(signUpPageTestIds.page)).toBeInTheDocument();
    expect(getByTestId(signUpPageTestIds.name)).toBeInTheDocument();
    expect(getByTestId(signUpPageTestIds.name).getElementsByTagName("INPUT")[0]).toBeRequired();
    expect(getByTestId(signUpPageTestIds.email)).toBeInTheDocument();
    expect(
      getByTestId(signUpPageTestIds.email).getElementsByTagName("INPUT")[0]
    ).toBeRequired();
    expect(getByTestId(signUpPageTestIds.password)).toBeInTheDocument();
    expect(
      getByTestId(signUpPageTestIds.password).getElementsByTagName("INPUT")[0]
    ).toBeRequired();
    expect(getByTestId(signUpPageTestIds.passwordConfirmation)).toBeInTheDocument();
    expect(
      getByTestId(signUpPageTestIds.passwordConfirmation).getElementsByTagName("INPUT")[0]
    ).toBeRequired();
    expect(getByTestId(signUpPageTestIds.submitButton)).toHaveTextContent("Sign Up");
  });

  it("Can't create account with empty required fields", async () => {
    jest
      .spyOn(firebase, "signUp")
      .mockReturnValue(Promise.reject({ code: "auth/invalid-email" }));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId(signUpPageTestIds.page)).toBeInTheDocument();
    fireEvent.click(getByTestId(signUpPageTestIds.submitButton));
    await waitFor(() => queryByTestId(signUpPageTestIds.page));
  });

  it("Can't create account when password and password confirmation values do not match", async () => {
    jest
      .spyOn(firebase, "signUp")
      .mockReturnValue(Promise.reject({ code: "auth/invalid-email" }));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId(signUpPageTestIds.page)).toBeInTheDocument();

    changeInputByTestId(getByTestId)(signUpPageTestIds.name)(testData.name);
    changeInputByTestId(getByTestId)(signUpPageTestIds.email)(testData.email);

    const password = changeInputByTestId(getByTestId)(signUpPageTestIds.password)(
      testData.password
    );
    const passwordConfirmation = changeInputByTestId(getByTestId)(
      signUpPageTestIds.passwordConfirmation
    )(testData.unmatchedPassword);
    expect(password.value).not.toBe(passwordConfirmation.value);

    fireEvent.click(getByTestId(signUpPageTestIds.submitButton));
    await waitFor(() => queryByTestId(signUpPageTestIds.page));
  });

  it("Can't create account if the password is too weak", async () => {
    jest
      .spyOn(firebase, "signUp")
      .mockReturnValue(Promise.reject({ code: "auth/invalid-email" }));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId(signUpPageTestIds.page)).toBeInTheDocument();

    changeInputByTestId(getByTestId)(signUpPageTestIds.name)(testData.name);
    changeInputByTestId(getByTestId)(signUpPageTestIds.email)(testData.email);
    const password = changeInputByTestId(getByTestId)(signUpPageTestIds.password)(
      testData.weakPassword
    );
    const passwordConfirmation = changeInputByTestId(getByTestId)(
      signUpPageTestIds.passwordConfirmation
    )(testData.weakPassword);
    expect(password.value).toBe(passwordConfirmation.value);

    fireEvent.click(getByTestId(signUpPageTestIds.submitButton));
    await waitFor(() => queryByTestId(signUpPageTestIds.page));
  });

  it("Can't create account if the email address is already in use", async () => {
    jest
      .spyOn(firebase, "signUp")
      .mockReturnValue(Promise.reject({ code: "auth/email-alread-in-use" }));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId(signUpPageTestIds.page)).toBeInTheDocument();

    changeInputByTestId(getByTestId)(signUpPageTestIds.name)(testData.name);
    changeInputByTestId(getByTestId)(signUpPageTestIds.email)(testData.duplicateEmail);
    const password = changeInputByTestId(getByTestId)(signUpPageTestIds.password)(
      testData.password
    );
    const passwordConfirmation = changeInputByTestId(getByTestId)(
      signUpPageTestIds.passwordConfirmation
    )(testData.password);
    expect(password.value).toBe(passwordConfirmation.value);

    fireEvent.click(getByTestId(signUpPageTestIds.submitButton));
    expect(getByTestId(signUpPageTestIds.page)).toBeInTheDocument();
    await waitFor(() => queryByTestId(signUpPageTestIds.page));
  });

  it("Can create account if the required fields are entered and the email does not have an account already", async () => {
    jest
      .spyOn(firebase, "signUp")
      .mockReturnValue(Promise.resolve({ message: "Account created" }));

    const { getByTestId, queryByTestId } = renderMockApp();
    expect(getByTestId(signUpPageTestIds.page)).toBeInTheDocument();

    changeInputByTestId(getByTestId)(signUpPageTestIds.name)(testData.name);
    changeInputByTestId(getByTestId)(signUpPageTestIds.email)(testData.email);
    const password = changeInputByTestId(getByTestId)(signUpPageTestIds.password)(
      testData.password
    );
    const passwordConfirmation = changeInputByTestId(getByTestId)(
      signUpPageTestIds.passwordConfirmation
    )(testData.password);
    expect(password.value).toBe(passwordConfirmation.value);

    fireEvent.click(getByTestId(signUpPageTestIds.submitButton));
    await waitForElementToBeRemoved(() =>
      queryByTestId(signUpPageTestIds.page)
    );
  });
  
});

afterEach(cleanup);
