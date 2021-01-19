import React from "react";
import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import * as ROUTES from "../routes";
import { Route, Router, Switch } from "react-router-dom";
import { PermanentSideBar } from "./side-bar";
import AppContext from "../App/app.context";
import AppProvider from "../App/app.provider";

const renderUnauthenticatedApp = () => {
  const history = createMemoryHistory();
  history.push(ROUTES.HOME);
  const renderer = render(
    <AppProvider>
      <Router history={history}>
        <PermanentSideBar />
        <Switch>
          <Route exact path={ROUTES.HOME} render={() => <h1>Home page</h1>} />
        </Switch>
      </Router>
    </AppProvider>
  );
  return renderer;
};
const renderAuthenicatedApp = () => {
  const history = createMemoryHistory();
  history.push(ROUTES.HOME);
  const providervalue = {
    state: {
      user: {
        email: "john@doe.com",
        userId: "1",
        name: "john doe",
      },
      auth: null,
    },
    dispatch: () => {},
  };

  const renderer = render(
    <AppContext.Provider value={providervalue}>
      <Router history={history}>
        <PermanentSideBar />
        <Switch>
          <Route exact path={ROUTES.HOME} render={() => <h1>Home page</h1>} />
          <Route exact path={ROUTES.INVOICE_FORM} render={() => <h1>Invoice page</h1>} />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
  return renderer;
};

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Side bar test", () => {
  it("Cannot see side bar for unauthenticated user", async () => {
    renderUnauthenticatedApp();
    expect(screen.getByRole("heading")).toHaveTextContent(/home page/i);
    expect(screen.queryAllByRole("link").length).toBe(0);
  });

  it("Can see side bar for authenticated user", async () => {
    renderAuthenicatedApp();
    expect(screen.getByRole("heading")).toHaveTextContent(/home page/i);
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
  });

  it("Can navigate to invoice form from side bar", async () => {
    renderAuthenicatedApp();
    expect(screen.getByRole("heading")).toHaveTextContent(/home page/i);
    userEvent.click(screen.getByRole("link",{name:/new invoice/i}));
    expect(screen.getByRole("heading")).toHaveTextContent(/invoice page/i);
  });
});
