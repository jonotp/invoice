import React from "react";
import { render, screen } from "@testing-library/react";
import AlertCard, { alertCardTestIds } from "./alert-card.component";
import { ALERT_TYPE } from "../../types";

const testIds = {
  page: "alert-test",
  submit: "submit-button",
  ...alertCardTestIds,
};

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Alert unit tests", () => {
  it("Can see error message", () => {
    const alert = {
      type: ALERT_TYPE.ERROR,
      message: "This is an error alert",
      id: "1",
    };
    const { getByTestId } = render(
      <AlertCard alert={alert} onClose={() => {}} />
    );
    expect(getByTestId(`${testIds.component}-${alert.id}`)).toBeInTheDocument();
    expect(getByTestId(`${testIds.title}-${alert.id}`)).toBeInTheDocument();
    expect(
      getByTestId(`${testIds.type}-${alert.type}-${alert.id}`)
    ).toBeInTheDocument();
    expect(getByTestId(`${testIds.message}-${alert.id}`)).toBeInTheDocument();
    expect(getByTestId(`${testIds.message}-${alert.id}`)).toHaveTextContent(
      alert.message
    );
  });

  it("Can see warning message", () => {
    const alert = {
      type: ALERT_TYPE.WARNING,
      message: "This is an warning alert",
      id: "1",
    };
    const { getByTestId } = render(
      <AlertCard alert={alert} onClose={() => {}} />
    );
    expect(getByTestId(`${testIds.component}-${alert.id}`)).toBeInTheDocument();
    expect(getByTestId(`${testIds.title}-${alert.id}`)).toBeInTheDocument();
    expect(
      getByTestId(`${testIds.type}-${alert.type}-${alert.id}`)
    ).toBeInTheDocument();
    expect(getByTestId(`${testIds.message}-${alert.id}`)).toBeInTheDocument();
    expect(getByTestId(`${testIds.message}-${alert.id}`)).toHaveTextContent(
      alert.message
    );
  });

  it("Can see info message", () => {
    const alert = {
      type: ALERT_TYPE.INFO,
      message: "This is an info alert",
      id: "1",
    };
    const { getByTestId } = render(
      <AlertCard alert={alert} onClose={() => {}} />
    );
    expect(getByTestId(`${testIds.component}-${alert.id}`)).toBeInTheDocument();
    expect(getByTestId(`${testIds.title}-${alert.id}`)).toBeInTheDocument();
    expect(
      getByTestId(`${testIds.type}-${alert.type}-${alert.id}`)
    ).toBeInTheDocument();
    expect(getByTestId(`${testIds.message}-${alert.id}`)).toBeInTheDocument();
    expect(getByTestId(`${testIds.message}-${alert.id}`)).toHaveTextContent(
      alert.message
    );
  });

  it("Can see success message", () => {
    const alert = {
      type: ALERT_TYPE.SUCCESS,
      message: "This is an success alert",
      id: "1",
    };
    const { getByTestId } = render(
      <AlertCard alert={alert} onClose={() => {}} />
    );
    expect(getByTestId(`${testIds.component}-${alert.id}`)).toBeInTheDocument();
    expect(getByTestId(`${testIds.title}-${alert.id}`)).toBeInTheDocument();
    expect(
      getByTestId(`${testIds.type}-${alert.type}-${alert.id}`)
    ).toBeInTheDocument();
    expect(getByTestId(`${testIds.message}-${alert.id}`)).toBeInTheDocument();
    expect(getByTestId(`${testIds.message}-${alert.id}`)).toHaveTextContent(
      alert.message
    );
  });

  it("Can see alert title as the type when no title is given", () => {
    const alert = {
      type: ALERT_TYPE.SUCCESS,
      message: "This is an success alert",
      id: "1",
    };
    const { getByTestId } = render(
      <AlertCard alert={alert} onClose={() => {}} />
    );
    expect(getByTestId(`${testIds.title}-${alert.id}`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: new RegExp(alert.type, "i") })
    ).toBeInTheDocument();
  });

  it("Can see alert title from given title", () => {
    const alert = {
      type: ALERT_TYPE.SUCCESS,
      title: "Nice one",
      message: "This is an success alert",
      id: "1",
    };
    const { getByTestId } = render(
      <AlertCard alert={alert} onClose={() => {}} />
    );
    expect(getByTestId(`${testIds.title}-${alert.id}`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: new RegExp(alert.title, "i") })
    ).toBeInTheDocument();
  });
});
