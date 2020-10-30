import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const changeInputValueByEl = (el: HTMLInputElement, value: string) => userEvent.type(el, value);
const changeInputByTestId = (fn: (match: string) => HTMLElement) => (testId: string) => (value: string) => {
  const element = (getInputFieldsByTestId(fn)(testId)[0] as HTMLInputElement);
  userEvent.type(element, value);
  return element;
}

const typeIntoElement = (element: HTMLElement, value: string) => {
  userEvent.type(element, value);
  return element;
}

const typeIntoLabelField = (label: string, value: string) => {
  const element = screen.getByLabelText(new RegExp(label, "i"));
  userEvent.type(element, value);
  return element;
}
const typeIntoTextBox = (textboxName: string, value: string) => {
  const element = screen.getByRole("textbox", { name: new RegExp(textboxName, "i") });
  fireEvent.change(element, { target: { value: value } });
  return element;
}
const getInputFieldByTestId = (fn: (match: string) => HTMLElement) => (testId: string) => getInputFieldsByTestId(fn)(testId)[0] as HTMLInputElement;
const getInputFieldsByTestId = (fn: (match: string) => HTMLElement) => (testId: string) => fn(testId).getElementsByTagName("INPUT");

export { changeInputValueByEl, changeInputByTestId, getInputFieldByTestId, getInputFieldsByTestId, typeIntoElement, typeIntoTextBox, typeIntoLabelField };
