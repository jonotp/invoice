import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const changeInputValueByEl = (el: HTMLInputElement, value: string) => userEvent.type(el, value);
const changeInputByTestId = (fn: (match: string) => HTMLElement) => (testId: string) => async (value: string) => {
  const element = (getInputFieldsByTestId(fn)(testId)[0] as HTMLInputElement);
  await userEvent.type(element, value);
  return element;
}

const typeIntoElement = async (element: HTMLElement, value: string) => {
  // await userEvent.type(element, value);

  fireEvent.change(element, { target: { value: value } });
  return element;
}

const typeIntoLabelField = async (label: string, value: string) => {
  const element = screen.getByLabelText(new RegExp(label, "i"));

  // Having issues with userEvent.type where not all characters are entered in the field
  // await userEvent.type(element, value);

  fireEvent.change(element, { target: { value: value } });
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
