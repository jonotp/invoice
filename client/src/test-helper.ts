import { fireEvent } from "@testing-library/react";

const changeInputValueByEl = (el: HTMLInputElement, value: string) => fireEvent.change(el, { target: { value: value } });
const changeInputByTestId = (fn: (match: string) => HTMLElement) => (testId: string) => (value: string) => {
  const element = (getInputFieldsByTestId(fn)(testId)[0] as HTMLInputElement);
  fireEvent.change(element, { target: { value: value } });
  return element;
}

const getInputFieldByTestId = (fn: (match: string) => HTMLElement) => (testId: string) => getInputFieldsByTestId(fn)(testId)[0] as HTMLInputElement;
const getInputFieldsByTestId = (fn: (match: string) => HTMLElement) => (testId: string) => fn(testId).getElementsByTagName("INPUT");

export { changeInputValueByEl, changeInputByTestId, getInputFieldByTestId, getInputFieldsByTestId };
