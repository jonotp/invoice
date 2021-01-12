import React, { useContext } from "react";
import {
  render,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Alerts, { alertCardTestIds } from "./alerts.container";
import { ALERT_ACTION_TYPE, ALERT_TYPE, IAlert } from "../types";
import {
  AlertsContext,
  AlertsContextProvider,
} from "./alerts.context";

const testIds = {
  page: "alert-test",
  submit: "submit-button",
  ...alertCardTestIds,
};

const testObj = {
  asyncFunction: async () => ({
    type: ALERT_TYPE.INFO,
    message: "This is dummy data",
    id: "912309123",
  }),
};

const AlertTestComponent = () => {
  const { alertsDispatch } = useContext(AlertsContext);
  const handleSubmit = async () => {
    try {
      const alertObj = await testObj.asyncFunction();
      alertsDispatch({ type: ALERT_ACTION_TYPE.ADD_ALERT, payload: alertObj });
    } catch (err) {
      alertsDispatch({ type: ALERT_ACTION_TYPE.ADD_ALERT, payload: err });
    }
  };

  return (
    <div data-testid={testIds.page}>
      <h1>Alert container</h1>
      <button data-testid={testIds.submit} onClick={handleSubmit}>
        Submit
      </button>
      <Alerts />
    </div>
  );
};

const App = () => (
  <AlertsContextProvider>
    <AlertTestComponent />
  </AlertsContextProvider>
);

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Alert unit tests", () => {
  it("Can see dispatched error message", async () => {
    const alert: IAlert = {
      type: ALERT_TYPE.ERROR,
      message: "This is an error alert",
      id: "1",
    };
    jest.spyOn(testObj, "asyncFunction").mockReturnValue(Promise.reject(alert));
    render(<App />);
    expect(screen.getByTestId(testIds.page)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByRole("alert");
    expect(
      screen.getByTestId(`${testIds.component}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.type}-${alert.type}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toHaveTextContent(alert.message);
    expect(
      screen.getByRole("heading", { name: new RegExp(alert.type, "i") })
    ).toBeInTheDocument();
  });

  it("Can see dispatched warning message", async () => {
    const alert = {
      type: ALERT_TYPE.WARNING,
      message: "This is an warning alert",
      id: "1",
    };
    jest.spyOn(testObj, "asyncFunction").mockReturnValue(Promise.reject(alert));
    render(<App />);
    expect(screen.getByTestId(testIds.page)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByRole("alert");
    expect(
      screen.getByTestId(`${testIds.component}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.type}-${alert.type}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toHaveTextContent(alert.message);
    expect(
      screen.getByRole("heading", { name: new RegExp(alert.type, "i") })
    ).toBeInTheDocument();
  });
  it("Can see dispatched info message", async () => {
    const alert = {
      type: ALERT_TYPE.INFO,
      message: "This is an info alert",
      id: "1",
    };
    jest
      .spyOn(testObj, "asyncFunction")
      .mockReturnValue(Promise.resolve(alert));
    render(<App />);
    expect(screen.getByTestId(testIds.page)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByRole("alert");
    expect(
      screen.getByTestId(`${testIds.component}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.type}-${alert.type}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toHaveTextContent(alert.message);
    expect(
      screen.getByRole("heading", { name: new RegExp(alert.type, "i") })
    ).toBeInTheDocument();
  });

  it("Can see dispatched success message", async () => {
    const alert = {
      type: ALERT_TYPE.SUCCESS,
      message: "This is an success alert",
      id: "1",
    };
    jest
      .spyOn(testObj, "asyncFunction")
      .mockReturnValue(Promise.resolve(alert));
    render(<App />);
    expect(screen.getByTestId(testIds.page)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByRole("alert");
    expect(
      screen.getByTestId(`${testIds.component}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.type}-${alert.type}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toHaveTextContent(alert.message);
    expect(
      screen.getByRole("heading", { name: new RegExp(alert.type, "i") })
    ).toBeInTheDocument();
  });

  it("Can see alert removed from clicking on close button", async () => {
    const alert = {
      type: ALERT_TYPE.SUCCESS,
      message: "This is an success alert",
      id: "1",
    };
    jest
      .spyOn(testObj, "asyncFunction")
      .mockReturnValue(Promise.resolve(alert));
    render(<App />);
    expect(screen.getByTestId(testIds.page)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByRole("alert");
    expect(
      screen.getByTestId(`${testIds.component}-${alert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${alert.id}`)
    ).toHaveTextContent(alert.message);
    expect(
      screen.getByRole("heading", { name: new RegExp(alert.type, "i") })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitForElementToBeRemoved(() => screen.queryByRole("alert"));
  });

  it("Can see multiple alerts displayed", async () => {
    const successAlert = {
      type: ALERT_TYPE.SUCCESS,
      message: "This is an success alert",
      id: "1",
    };
    jest
      .spyOn(testObj, "asyncFunction")
      .mockReturnValue(Promise.resolve(successAlert));
    render(<App />);
    expect(screen.getByTestId(testIds.page)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByRole("alert");
    expect(
      screen.getByTestId(`${testIds.component}-${successAlert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${successAlert.id}`)
    ).toHaveTextContent(successAlert.message);
    expect(
      screen.getByRole("heading", { name: new RegExp(successAlert.type, "i") })
    ).toBeInTheDocument();

    const errorAlert = {
      type: ALERT_TYPE.ERROR,
      message: "This is an error alert",
      id: "2",
    };
    jest
      .spyOn(testObj, "asyncFunction")
      .mockReturnValue(Promise.reject(errorAlert));
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findAllByRole("alert");
    expect(
      screen.getByRole("heading", { name: new RegExp(errorAlert.type, "i") })
    ).toBeInTheDocument();
  });

  it("Can remove specific alerts for a list of many alerts", async () => {
    const successAlert = {
      type: ALERT_TYPE.SUCCESS,
      message: "This is an success alert",
      id: "1",
    };
    jest
      .spyOn(testObj, "asyncFunction")
      .mockReturnValue(Promise.resolve(successAlert));
    render(<App />);
    expect(screen.getByTestId(testIds.page)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findByRole("alert");
    expect(
      screen.getByTestId(`${testIds.component}-${successAlert.id}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${testIds.message}-${successAlert.id}`)
    ).toHaveTextContent(successAlert.message);
    expect(
      screen.getByRole("heading", { name: new RegExp(successAlert.type, "i") })
    ).toBeInTheDocument();

    const errorAlert = {
      type: ALERT_TYPE.ERROR,
      message: "This is an error alert",
      id: "2",
    };
    jest
      .spyOn(testObj, "asyncFunction")
      .mockReturnValue(Promise.reject(errorAlert));
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    await screen.findAllByRole("alert");
    expect(
      screen.getByRole("heading", { name: new RegExp(errorAlert.type, "i") })
    ).toBeInTheDocument();

    const button = screen
      .getByTestId(`${testIds.component}-${errorAlert.id}`)
      .getElementsByTagName("BUTTON")[0];
    userEvent.click(button);
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId(`${testIds.component}-${errorAlert.id}`)
    );
  });
});
