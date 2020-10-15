import { IItem } from "./types";
export const GENERIC_ACTION_TYPE = {
  DELETE_ALL: "DELETE_ALL",
};

export const USER_ACTION_TYPE = {
  SAVE_USER_DETAILS: "SAVE_USER_DETAILS",
  DELETE_USER_DETAILS: "DELETE_USER_DETAIL",
  UPDATE_USER_DETAILS: "UPDATE_USER_DETAILS",
};

export const getToTwoDecimalPlaces = (num: number) =>
  (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);

export const getLineTax = (item: IItem, taxAmount: number) => {
  return getToTwoDecimalPlaces(item.quantity * item.price * taxAmount * 0.01);
};

export const getLineTotal = (item: IItem, taxAmount: number) => {
  return taxAmount > 0
    ? getToTwoDecimalPlaces(
        item.quantity *
          (Number(item.price) + Number(item.price * taxAmount * 0.01))
      )
    : getToTwoDecimalPlaces(item.quantity * item.price);
};

export const getTaxTotal = (items: IItem[], taxAmount: number) => {
  if (taxAmount === 0) return getToTwoDecimalPlaces(0);
  return getToTwoDecimalPlaces(
    items.reduce(
      (prev, curr) => (prev += curr.price * (taxAmount * 0.01) * curr.quantity),
      0
    )
  );
};

export const getSubTotal = (items: IItem[]) => {
  return getToTwoDecimalPlaces(
    items.reduce((prev, curr) => (prev += curr.price * curr.quantity), 0)
  );
};
