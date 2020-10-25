const getInputFieldByTestId  = (fn: (match: string) => HTMLElement) => (testId: string) => getInputFieldsByTestId(fn)(testId)[0] as HTMLInputElement;
const getInputFieldsByTestId = (fn: (match: string) => HTMLElement) => (testId: string) => fn(testId).getElementsByTagName("INPUT");

export { getInputFieldByTestId, getInputFieldsByTestId };
